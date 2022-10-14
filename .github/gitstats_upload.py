from bisect import bisect
from datetime import datetime, timedelta
import re
import gitstats
import requests
import os
import pytz

### Environment variables

CANVAS_TOKEN = os.environ["CANVAS_TOKEN"]
COURSE_ID = os.environ["COURSE_ID"]
GITHUB_TOKEN = os.environ["GITHUB_TOKEN"]
GITHUB_REPO = os.environ["GITHUB_REPO"]

### Request headers for Canvas API Requests

headers = {"Authorization": "Bearer " + CANVAS_TOKEN}

### Get all assignments

assignments = requests.get(
    'https://canvas.ubc.ca/api/v1/courses/' + COURSE_ID + '/assignments',
    headers=headers,
    params={
      "per_page": 1000
    }
  ).json()

### Filter GitStats assignments

def isGitstatsAssignment(assignment):
  name = str(assignment["name"]).lower()
  return "gitstats" in name or ("git" in name and "week" in name)

gitstats_assignments = sorted([
  a for a in assignments if isGitstatsAssignment(a)
], key=lambda a:datetime.strptime(a["due_at"], "%Y-%m-%dT%H:%M:%SZ"))

### Get next due GitStats assignment

current_assignment = gitstats_assignments[
  bisect([
      datetime.strptime(a["due_at"],"%Y-%m-%dT%H:%M:%SZ")
      for a in gitstats_assignments
    ], datetime.utcnow()
  )
]

### Generate GitStats report

week = None
try:
  week = re.match(r'week \d+', current_assignment["name"], "i")[0]
except:
  pass

repository = "jribbink/equifood"
group_name = "Equifood Group C" + (" " + week if week is not None else "")

today = datetime.utcnow().astimezone(pytz.timezone('US/Pacific'))
last_saturday = (today - timedelta(((today.weekday() - 5) % 7))).replace(hour=0, minute=0, second=0, microsecond=0).replace(tzinfo=None)
next_friday = (today + timedelta((today.weekday() - 4) % 7)).replace(hour=23, minute=59, second=59, microsecond=999).replace(tzinfo=None)

gitstats_output = gitstats.report(GITHUB_TOKEN,
                        group_name,
                        repository,
                        start=last_saturday,
                        end=next_friday,
                        excluded_users=[])

### Generate PDF

import textwrap
from fpdf import FPDF

def text_to_pdf(text, filename):
    a4_width_mm = 210
    pt_to_mm = 0.35
    fontsize_pt = 10
    fontsize_mm = fontsize_pt * pt_to_mm
    margin_bottom_mm = 10
    character_width_mm = 7 * pt_to_mm
    width_text = a4_width_mm / character_width_mm

    pdf = FPDF(orientation='P', unit='mm', format='A4')
    pdf.set_auto_page_break(True, margin=margin_bottom_mm)
    pdf.add_page()
    pdf.set_font(family='Courier', size=fontsize_pt)
    splitted = text.split("\n")

    for line in splitted:
        lines = textwrap.wrap(line, width_text)

        if len(lines) == 0:
            pdf.ln()

        for wrap in lines:
            pdf.cell(0, fontsize_mm, wrap, ln=1)

    pdf.output(filename, 'F')

text_to_pdf(gitstats_output, "gitstats_report.pdf")

### Upload File to current GitStats assignment

# Upload file
file_upload_path = requests.post(
  "https://canvas.ubc.ca/api/v1/courses/" + str(COURSE_ID) + "/assignments/" + str(current_assignment["id"]) + "/submissions/self/files",
  params={
    "name": "gitstats_report.pdf"
  },
  headers=headers
).json()

file_info = requests.post(
  file_upload_path["upload_url"],
  params=file_upload_path["upload_params"],
  files={'file': open('gitstats_report.pdf', 'rb')}
).json()

requests.post(
  "https://canvas.ubc.ca/api/v1/courses/" + str(COURSE_ID) + "/assignments/" + str(current_assignment["id"]) + "/submissions",
  params={
    "comment[text_comment]": "**Auto-generated GitStats CI workflow**",
    "submission[submission_type]": "online_upload",
    "submission[file_ids][]": file_info["id"]
  },
  headers=headers
)
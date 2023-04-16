#!/bin/bash 
pandoc --pdf-engine=pdflatex -V geometry:margin=1in -f markdown+hard_line_breaks+autolink_bare_uris+tex_math_single_backslash -o final-report.pdf final-report.md --to latex
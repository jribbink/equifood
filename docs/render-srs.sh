#!/bin/bash 
pandoc --pdf-engine=pdflatex -V geometry:margin=1in -f gfm+hard_line_breaks -o software-requirements-spec.pdf software-requirements-spec.md
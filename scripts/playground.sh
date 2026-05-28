#!/bin/bash
set -e

# Setup python bin path
export PROJECT_ROOT=$1

PYTHON_BIN=$1/venv/bin/python

$PYTHON_BIN ./playground.py ${@:2}
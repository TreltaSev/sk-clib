"""
Able to create/re-create a playground to test out the sk-clib package.
"""

import shutil
import sys

from shared.project import project
from shared.cmd import run
from shared.console import console

playground = project.root / "packages/playground"


def create():
    """
    Clears out the playground and remakes it.
    Builds the sk-clib package and links it to the playground
    """

    if playground.exists():
        shutil.rmtree(playground)

    playground.mkdir(exist_ok=True)

    args = [
        "--template minimal",
        "--types ts",
        "--add prettier eslint tailwindcss=plugins:none",
        '--no-dir-check',
        "--no-download-check",
        "--install npm",
        "."
    ]

    # Create playground
    run(f"npx sv create {' '.join(args)}", playground)

    
def link():
    # Setup sk-clib and link it
    run(f"just package", project.root)

    # Link sk-clib to playground
    run(f"npm link sk-clib", playground)
    
def start():
    # Start running the app
    run(f"npm run dev", playground)


command = sys.argv[1:][0]

if command == "create":
    console.info("Creating playground...")
    create()
    
elif command == "link":
    console.info("Linking sk-clib to playground...")
    link()
    
elif command == "start":
    console.info("Starting Development Server...")
    start()
    
else:
    console.error("Missing match, create|link|start")
    
console.info("Finished...")

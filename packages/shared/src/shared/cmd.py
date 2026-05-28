import shutil

import subprocess
from pathlib import Path


def run(command: str, cwd: Path):
    """
    Run a command on a given cwd
    """
    subprocess.run(
        command.split(" "),
        cwd=cwd,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def has(name: str) -> bool:
    """
    Returns if a command exists or not
    """
    return True if shutil.which(name) is not None else False

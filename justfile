# ========================================= LOGIC ========================================= #

VENV_DIR := 'venv'

# Create virtual environment
[working-directory: './']
setup-venv:
    python3 -m venv {{VENV_DIR}}
    # Install Deps
    ./{{VENV_DIR}}/bin/pip install -r requirements.txt
    ./{{VENV_DIR}}/bin/pip install ./packages/shared

PIP_BIN := 'venv/bin/pip'

# Run the virtual environment's pip command
[working-directory: './']
pip *ARGS:
    {{PIP_BIN}} {{ARGS}}

# Dump all the pip packages to requirements.txt
[working-directory: './']
pip-dump *ARGS:
    {{PIP_BIN}} freeze | grep -v shared > requirements.txt

# Run the before script to generate all necessary files
[working-directory: './compose/before']
before: setup-venv
    bash before.sh {{justfile_directory()}}

# Install packages for the package
[working-directory: './packages/sk-clib']
setup-package:
    npm i

# Build project for the package
[working-directory: './packages/sk-clib']
build-package: setup-package
    npm run build

# ========================================= COMMANDS ========================================= #
[working-directory: './scripts/']
playground *ARGS: before
    bash ./playground.sh {{justfile_directory()}} {{ARGS}}

# Compose command template
[working-directory: './']
compose *ARGS: before
    docker compose {{ARGS}}

# Package the sk-clib package and link it
[working-directory: './packages/sk-clib']
@package: build-package
    npm link
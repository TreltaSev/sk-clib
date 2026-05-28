import os
from pathlib import Path

class Project:
    
    # Saves the root path into an object we can access later.
    root = Path(os.environ["PROJECT_ROOT"])
    
project = Project()
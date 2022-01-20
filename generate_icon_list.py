import os
import json
from pathlib import Path

iconPath = "./node_modules/bootstrap-icons/icons"
icons = os.listdir(iconPath)
iconsList = [{"name":""+Path(icon).stem+"","path":""+icon+""}
             for icon in icons]
with open("./list.json", "w") as writer:
    writer.write(json.dumps(iconsList))
print("Icons list generation done!")

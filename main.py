from pathlib import Path
import re

p = Path(".")
limit = 5
counter = 0

for directory in p.iterdir():
    if counter > limit:
        continue
    elif not directory.is_dir():
        continue
    elif directory.name[0] == ".":
        continue
    counter = counter + 1

    print(directory.name)
    name = re.sub("^[0-9]*-", "", directory.name)
    print(f"\tnew name: {name}")
    project_path = Path(directory)


# loop through each directory
# loop through each file
# get directory name
# remove ##- prefix => $NAME
# rename each file $NAME.filetype
# Add all css and js files to a dir named static
# add all html and md files to a dir named templates
# go through text of each html file and rename script and css references to $NAME

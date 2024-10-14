from pathlib import Path
import re
import shutil

testing = False
p = Path(".")
limit = 1000
counter = 0

# loop through each directory
for directory in p.iterdir():
    if counter >= limit:
        break
    pattern = re.compile("^[0-9]*-[a-z-]*")
    if not pattern.fullmatch(directory.name):
        continue
    else:
        counter += 1

    # get directory name, remove ##- prefix => $NAME
    name = re.sub("^[0-9]*-", "", directory.name)

    if testing:
        counter = counter + 1
        print(directory.name)
        print(f"\tnew name: {name}")

    path_dict = {
        ".js": Path("static"),
        ".css": Path("static"),
        ".html": Path("templates"),
        ".md": Path("documentation"),
    }

    project_path = Path(directory)
    for file in project_path.iterdir():
        # Create New File Path
        new_file_path = Path(f"{path_dict[file.suffix].__fspath__()}\\{name}{file.suffix}")

        src = file.__fspath__()
        dst = new_file_path.__fspath__()

        if testing:
            print(f"\t{src} => {dst}")

        # Copy file to new path
        shutil.copyfile(src, dst)

from pathlib import Path
import re
import shutil

testing = True
p = Path(".")
limit = 5
counter = 0

# loop through each directory
for directory in p.iterdir():
    if counter > limit:
        continue
    elif not directory.is_dir():
        continue
    elif directory.name[0] == ".":
        continue
    # get directory name, remove ##- prefix => $NAME
    name = re.sub("^[0-9]*-", "", directory.name)

    if testing:
        counter = counter + 1
        print(directory.name)
        print(f"\tnew name: {name}")

    project_path = Path(directory)

    # Add all css and js files to a dir named static
    static_path = Path("static")
    static_extensions = [".css", ".js"]

    # add all html and md files to a dir named templates
    template_path = Path("templates")
    template_extensions = [".html", ".md"]

    for file in project_path.iterdir():
        extension = file.suffix
        if extension in static_extensions:
            new_dir = static_path
        elif extension in template_extensions:
            new_dir = template_path
        else:
            raise Exception(f"{file.name.split('.')[-1]} error")

        # New File Path
        new_file_path = Path(f"{new_dir.__fspath__()}\\{name}{extension}")

        # Copy
        # shutil.copy(f".\\{file.__fspath__()}", new_dir.__fspath__())
        shutil.copyfile(file.__fspath__(), new_file_path.__fspath__())

        if testing:
            print(f"\t{file.__fspath__()} => {new_file_path.__fspath__()}")

        # rename copied file $NAME.filetype
        # new_file_path.rename(name)



# go through text of each html file and rename script and css references to $NAME

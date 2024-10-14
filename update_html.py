from pathlib import Path
import re

# Init
css = {
    "line_in_html": None,
    "preceding_spaces": None
}
js = {
    "line_in_html": None,
    "preceding_spaces": None
}

static_file_directory = "portfolio/fcc-javascript"


def leading_spaces(string):
    return int(len(string) - len(string.lstrip()))


# Loop through each template html file to update css and js references
counter = 0
for file_obj in Path("templates").iterdir():
    # Init
    css_replacement = []
    js_replacement = []

    # Limiter
    counter += 1
    if counter > 1000:
        break

    # Read file to memory
    lines = []
    with open(str(file_obj.__fspath__()), "r") as r_file:
        for line in r_file:
            lines.append(line)

    # Determine lines that JS and CSS are referenced on
    line_counter = 0
    for line in lines:
        if re.compile("script.js").search(line):
            js["line_in_html"] = line_counter
            js["preceding_spaces"] = leading_spaces(line)

        elif re.compile("styles.css").search(line):
            css["line_in_html"] = line_counter
            css["preceding_spaces"] = leading_spaces(line)

        line_counter += 1

    # Replacement Strings for Django Templates
    project_name = file_obj.name.split('.')[0]
    css_replacement.append(css["preceding_spaces"] * ' ')
    css_replacement.append('<link type ="text/css" rel="stylesheet" href="{% static')
    css_replacement.append(f" '{static_file_directory}/{project_name}.css' ")
    css_replacement.append('%}" />\n')

    js_replacement.append(js["preceding_spaces"] * " ")
    js_replacement.append('<script src="{% static')
    js_replacement.append(f" '{static_file_directory}/{project_name}.js' ")
    js_replacement.append('%}"></script>\n')

    # rewrite file with new js and css references
    with open(str(file_obj.__fspath__()), "w") as w_file:
        w_file.write("{% load static %}\n")
        for index in range(len(lines)):
            if index == css["line_in_html"]:
                w_file.write("".join(css_replacement))
            elif index == js["line_in_html"]:
                w_file.write("".join(js_replacement))
            else:
                w_file.write(lines[index])

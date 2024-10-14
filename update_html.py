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

css_replacement = []
js_replacement = []
static_file_directory = "portfolio/fcc-javascript"


def leading_spaces(string):
    return int(len(string) - len(string.lstrip()))


# Loop through each template html file to update css and js references
counter = 0
for file_obj in Path("templates").iterdir():
    counter += 1
    if counter > 1:
        break

    # Patterns for regex search
    js_pattern = re.compile("script.js")
    css_pattern = re.compile("styles.css")

    # Loop through each line and search
    line_counter = 0
    with open(str(file_obj.__fspath__()), "r") as r_file:
        for line in r_file:

            print(f"{line_counter}: {line}")

            if js_pattern.search(line):
                js["line_in_html"] = line_counter
                js["preceding_spaces"] = leading_spaces(line)
                print(js)
            elif css_pattern.search(line):
                css["line_in_html"] = line_counter
                css["preceding_spaces"] = leading_spaces(line)
                print(css)

            line_counter += 1

    # Replacement Strings for Django Templates
    project_name = file_obj.name.split('.')[0]
    css_replacement.append("""<link type ="text/css" rel="stylesheet" href="{% static""")
    css_replacement.append(f"'{static_file_directory}/{project_name}.css'")
    css_replacement.append("""%}" />""")

    js_replacement.append("""<script src="{% static""")
    js_replacement.append(f"'{static_file_directory}/{project_name}.js'")
    js_replacement.append("""%}"></script>""")

    # write new data in
    # print((css["preceding_spaces"] * " ") + " ".join(css_replacement))
    with open(str(file_obj.__fspath__()), "w") as w_file:

        pass

    print(line_counter)

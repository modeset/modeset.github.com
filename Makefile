
CSS_DIR = stylesheets
SCSS_DIR = app/stylesheets/scss

help:
	@echo ""
	@echo "USAGE: make <target>"
	@echo "styles           Converts the stylesheets from scss to a single css file"
	@echo "commit           Run this before committing changes for sweetness"
	@echo "-------------------------------------------------------------------------------"
	@echo "In development mode run the following to generate js, css, specs on the fly:"
	@echo "watchn .watchn"
	@echo "This assumes node.js is installed and you've run 'npm install watchn -g'"
	@echo ""

styles:
	sass $(SCSS_DIR)/white.scss > $(CSS_DIR)/white.css --style compressed


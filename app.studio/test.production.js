const shelljs = require("shelljs")

shelljs.echo("ON")

shelljs.exec(`ng build && lite-server --baseDir="dist/app.studio"`)

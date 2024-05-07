const shelljs = require("shelljs")

shelljs.echo("ON")

shelljs.exec(`ng build --configuration production && lite-server --baseDir="dist/app.agendahub "`)

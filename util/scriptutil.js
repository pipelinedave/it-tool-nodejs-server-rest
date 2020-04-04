const Powershell = require("node-powershell");

module.exports = {
  initShell: function () {
    return new Powershell({
      pwsh: true,
      executionPolicy: "Bypass",
      verbose: true
    });
  },

  prepShell: function (req, shell, script) {
    shell.addCommand(script);
  },

  invokeShell: async function (shell, res) {
    try {
      let result = await shell.invoke();
      res.send(result);
    } catch (err) {
      let errmsg = [
        JSON.stringify(
          `Something went wrong while processing the powershell request: ${err}`
        )
      ];
      console.error(errmsg);
      res.send(errmsg);
    }
  },

  pwshScript: class {
    constructor(label, name, path, content, parameter) {
      this.label = label;
      this.name = name;
      this.path = path;
      this.content = content;
      this.parameter = parameter;
    }
  },

  getScriptMap: function (scriptdir, fs) {
    var scriptmap = [];
    fs.readdirSync(scriptdir).forEach(scriptfile => {
      const scriptlabel = scriptfile.replace(".ps1", "");
      const scriptname = scriptfile;
      const scriptpath = `${scriptdir}\\${scriptfile}`;
      const scriptcontentstring = fs
        .readFileSync(scriptpath, "utf8")
        .toString();

      let scriptcontentarray = scriptcontentstring
        .replace(/\r\n/g, "\n")
        .split("\n");

      let scriptparameter = [];
      const start = scriptcontentarray.indexOf("param (");
      const end = scriptcontentarray.indexOf(")");
      for (var i = start + 1; i < end; i++) {
        if (scriptcontentarray[i].match(/\$/)) {
          scriptparameter.push(
            scriptcontentarray[i]
              .toLowerCase()
              .trim()
              .replace("$", "")
              .replace(",", "")
              .split(" ")[0]
          );
        }
      }

      const scriptobject = new this.pwshScript(
        scriptlabel,
        scriptname,
        scriptpath,
        scriptcontentarray,
        scriptparameter
      );
      scriptmap.push(scriptobject);
      global.scriptmap = scriptmap;
    });
  }
};

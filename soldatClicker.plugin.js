//META{"name":"soldatClicker"}*//
const fs = require('fs');
var clicked_message;
function soldatClicker() {}

soldatClicker.prototype.start = function () {
  var soldat_location = soldatClicker.prototype.getLocation();
   $('.message-group').on('dblclick', function(){
    clicked_message = $(this);
    if(soldat_location.length == 0) {
      return false;
    }
    var regexp = /(soldat:\/\/.*\d)/
    var server_url = $(this).html().match(regexp)[0];
    var server_info = server_url.replace("soldat://", '').split(/:|\//);
    soldatClicker.prototype.openSoldat(soldat_location, server_info[0], server_info[1], server_info[2]);
  });
}

soldatClicker.prototype.readWriteFile = function() {
  var txt_path = 'soldat.txt'
  var contents;
  var error_state = false;
  if(fs.existsSync(txt_path)) {
    contents = fs.readFileSync(txt_path, 'utf8');
    if(contents.length == 0) {
      error_state = true;
    }
  } else {
    error_state = true;
  }
  if(error_state) {
    var element = '<div id="setup-wrapper" style="color: #fff; width: 100%; height: 200px; background: #000; padding: 15px;"><strong>Please enter the file path to soldat.exe</strong><br /><em style="font-size: 8pt">- Due to security in the browser I am unable to use a file selector</em><br /><em style="font-size: 8pt">- There will be a file created to your soldat path.  This file is location at <strong>%localappdata%/Discord/app-VERSION/"</strong>.  Delete this file is you want to change the path</em><br /><em style="font-size: 8pt">- Once you enter a path discord will reload</em><br /><br />PATH: <input type="text" id="path" style="width: 50%;" /></div>';
    $(".message-group:last").after(element);
    $("#path").on('change', function(){
      if($("#path").val() != "") {
        fs.writeFile(txt_path, $("#path").val().replace(/\//g, "\\"), function(err) {
          if(err) {
              return console.log(err);
          }
        });
        $("#setup-wrapper").remove();
        location.reload();
      } else {
        alert("Must enter a path!");
      }
    });
  } else {
    return contents;
  }
}

soldatClicker.prototype.getLocation = function() {
  return soldatClicker.prototype.readWriteFile();
}

soldatClicker.prototype.openSoldat = function(path, ip, port, password){
  var child = require('child_process').execFile
  var executablePath = path.replace(/\\/g, "\\\\");
  var parameters = ["-join", ip, port, password];

  child(executablePath, parameters, function(err, data) {
      console.log(err)
      console.log(data.toString());
  });
}

soldatClicker.prototype.load = function () {
};

soldatClicker.prototype.unload = function () {}
;

soldatClicker.prototype.stop = function () {
};

soldatClicker.prototype.onMessage = function () {

};

soldatClicker.prototype.onSwitch = function () {

};

soldatClicker.prototype.observer = function (e) {

};

soldatClicker.prototype.getSettingsPanel = function () {
    return "";
};

soldatClicker.prototype.getName = function () {
    return "Soldat Clicker Plugin";
};

soldatClicker.prototype.getDescription = function () {
    return "Allows you to click the gather bot server and open soldat";
};

soldatClicker.prototype.getVersion = function () {
    return "0.0.1";
};

soldatClicker.prototype.getAuthor = function () {
    return "Sting";
};
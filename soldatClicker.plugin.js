//META{"name":"soldatClicker"}*//
const fs = require('fs');
var clicked_message;
function soldatClicker() {}
soldatClicker.prototype.start = function () {
  var soldat_location = soldatClicker.prototype.getLocation();
   $('.message').on('dblclick', function(){
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
  var txtFile = 'soldat.txt'
  var contents;
  var error_state = false;
  if(localStorage.getItem("soldatLocation") == null) {
    var element = '<div id="setup-wrapper" style="color: #fff; width: 100%; height: 200px; background: #000; padding: 15px;"><strong>Please enter the file path to soldat.exe</strong><br /><em style="font-size: 8pt">- Due to security in the browser I am unable to use a file selector</em><br /><em style="font-size: 8pt">- Once you enter a path discord will reload</em><br /><br />PATH: <input type="text" id="path" style="width: 50%;" /></div>';
    $(".message:last").after(element);
    $("#path").on('change', function(){
      if($("#path").val() != "") {
        var soldatExec = $("#path").val().replace(/\//g, "\\");
        var foldarPath = soldatExec.replace(/soldat.exe/, "");
        localStorage.setItem("soldatLocation", soldatExec)
        $("#setup-wrapper").remove();
        location.reload();
      } else {
        alert("Must enter a path!");
      }
    });
  }
  return localStorage.getItem("soldatLocation");;
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
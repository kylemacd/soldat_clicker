//META{"name":"soldatClicker"}*//
const fs = require('fs');
function soldatClicker() {}

soldatClicker.prototype.start = function () {
  $('.markup').on('dblclick', function(){
    var soldat_location = soldatClicker.prototype.getLocation();
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
    var element = '<div id="setup-wrapper" style="width: 100%; height: 200px; background: #ccc;">PATH:<input type="text" id="path" style="width: 50%;" /></div>';
    $('body').insert(element);
    $("#path").on('change', function(){
      if($("#path").val() != "") {
        fs.writeFile(txt_path, $("#path").val(), function(err) {
          if(err) {
              return console.log(err);
          }
        });
        $("#setup-wrapper").remove();
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
    return "0.1.0";
};

soldatClicker.prototype.getAuthor = function () {
    return "Sting";
};
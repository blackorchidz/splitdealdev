//function demo()
//{
  //  alert("in demo function");
//document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    alert("device ready");
    /*navigator.splashscreen.hide();
    alert("splashscreen");*/
    var app = new App();
    alert("app()");
    app.run();
}

function App() {
}

App.prototype = {
    resultsField: null,
     
    run: function() {
        alert("run. . .");
        var that = this,
        scanButton = document.getElementById("scanButton");
        alert("scan button");
        //that.resultsField = document.getElementById("result");
        
        scanButton.addEventListener("click",
                                    function() { 
                                        that._scan.call(that); 
                                    });
        alert("after call to scan");
    },
    
    _scan: function() {
        var that = this;
        alert("in scan");
        if (window.navigator.simulator === true) {
            alert("Not Supported in Simulator.");
        }
        else {
            alert("in else part");
            cordova.plugins.barcodeScanner.scan(
                function(result) {
                    if (!result.cancelled) {
                        that._addMessageToLog(result.format + " | " + result.text);    
                    }
                }, 
                function(error) {
                    console.log("Scanning failed: " + error);
                });
        }
    },

    _addMessageToLog: function(message) {
        var that = this,
        currentMessage = that.resultsField.innerHTML;
        //alert("current message : "+currentMessage);
        alert("message : "+message);
        that.resultsField.innerHTML = currentMessage + message + '<br />'; 
    }
}
//}
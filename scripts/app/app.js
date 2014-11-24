var app = (function (win) {
    'use strict';

    // Global error handling
   var showAlert = function(message, title, callback) {
        navigator.notification.alert(message, callback || function () {
       }, title, 'OK');
    };

    var showError = function(message) {
        showAlert(message, 'Error occured');
    };

    win.addEventListener('error', function (e) {
        e.preventDefault();

        var message = e.message + "' from " + e.filename + ":" + e.lineno;

        showAlert(message, 'Error occured');

        return true;
    });

    // Global confirm dialog
    var showConfirm = function(message, title, callback) {
        navigator.notification.confirm(message, callback || function () {
        }, title, ['OK', 'Cancel']);
    };

    var isNullOrEmpty = function (value) {
        return typeof value === 'undefined' || value === null || value === '';
    };

    var isKeySet = function (key) {
        var regEx = /^\$[A-Z_]+\$$/;
        return !isNullOrEmpty(key) && !regEx.test(key);
    };

    

    // Handle device back button tap
    var onBackKeyDown = function(e) {
        e.preventDefault();

        navigator.notification.confirm('Do you really want to exit?', function (confirmed) {
            var exit = function () {
                navigator.app.exitApp();
            };

            if (confirmed === true || confirmed === 1) {
                // Stop EQATEC analytics monitor on app exit
                if (analytics.isAnalytics()) {
                    analytics.Stop();
                }
                AppHelper.logout().then(exit, exit);
            }
        }, 'Exit', ['OK', 'Cancel']);
    };

    var onDeviceReady = function() {
        // Handle "backbutton" event
        document.addEventListener('backbutton', onBackKeyDown, false);

        navigator.splashscreen.hide();

        if (analytics.isAnalytics()) {
            analytics.Start();
        }
        
        // Initialize AppFeedback
        if (app.isKeySet(appSettings.feedback.apiKey)) {
            try {
                feedback.initialize(appSettings.feedback.apiKey);
            } catch (err) {
                console.log('Something went wrong:');
                console.log(err);
            }
        } else {
            console.log('Telerik AppFeedback API key is not set. You cannot use feedback service.');
        }
    };
    

    // Handle "deviceready" event
    document.addEventListener('deviceready', onDeviceReady, false);
 
    // Initialize Everlive SDK
    var el = new Everlive({
                              apiKey: appSettings.everlive.apiKey,
                              scheme: appSettings.everlive.scheme
                          });

    var emptyGuid = '00000000-0000-0000-0000-000000000000';

// Lookup object we'll be using to map file
// extension to mime type values
var mimeMap = {
jpg : "image/jpeg",
jpeg: "image/jpeg",
png : "image/png",
gif : "image/gif"
};

    var AppHelper = {

        // Return user profile picture url
        resolveProfilePictureUrl: function (id) {
            if (id && id !== emptyGuid) {
                return el.Files.getDownloadUrl(id);
            } else {
                return 'styles/images/avatar.png';
            }
        },


        // Return current activity picture url
        resolvePictureUrl: function (id) {
            if (id && id !== emptyGuid) {
                return el.Files.getDownloadUrl(id);
            }
            else {
                return '';
            }
        },
         getBase64ImageFromInput : function (input, cb) {
            var reader = new FileReader();
            reader.onloadend = function (e) {
                if (cb)
                    cb(e.target.result);
            };
            reader.readAsDataURL(input);
        },
        getImageFileObject: function(input, cb) {
            var name = input.name;
            var ext = name.substr(name.lastIndexOf('.') + 1);
            var mimeType = mimeMap[ext];
            if(mimeType) {
                this.getBase64ImageFromInput(input, function(base64) {
                    var res = {
                        "Filename"    : name,
                        "ContentType" : mimeType,              
                        "base64"      : base64.substr(base64.lastIndexOf('base64,')+7)
                    }
                    cb(null, res);
                });
            } else {
                cb("File type not supported: " + ext);    
            }
        },
       

        // Date formatter. Return date in d.m.yyyy format
        formatDate: function (dateString) {
            return kendo.toString(new Date(dateString), 'MMM d, yyyy');
        },

        // Current user logout
        logout: function () {
            return el.Users.logout();
        }
    };


    var os = kendo.support.mobileOS,
        statusBarStyle = os.ios && os.flatVersion >= 700 ? 'black-translucent' : 'black';

    // Initialize KendoUI mobile application
    var mobileApp = new kendo.mobile.Application(document.body, {
                                                     transition: 'slide',
                                                     statusBarStyle: statusBarStyle,
                                                     skin: 'flat'
                                                 });

    var getYear = (function () {
        return new Date().getFullYear();
    }());

    return {
        showAlert: showAlert,
        showError: showError,
        showConfirm: showConfirm,
        isKeySet: isKeySet,
        mobileApp: mobileApp,
        helper: AppHelper,
        everlive: el,
        getYear: getYear
    };
}(window));

/**
 * Activities view model
 */

var app = app || {};

app.Posts = (function () {
    'use strict'

    // Activities model
    var watchListsModel = (function () {

        var watchListModel = {

            id: 'Id',
            fields: {
                Title: {
                    field: 'Title',
                    defaultValue: ''
                },
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                Picture: {
                    fields: 'Picture',
                    defaultValue: ''
                },
                SaleEndDate: {
                    field: 'SaleEndDate',
                    defaultValue: new Date()
                },
                UserId: {
                    field: 'User_id',
                    defaultValue: null
                },

                Description: {
                    field: 'Description',
                    default: null
                },
                Price: {
                    field: 'Price',
                    default: null
                }
            },
            CreatedAtFormatted: function () {

                return app.helper.formatDate(this.get('CreatedAt'));
            },
            
            PictureUrl: function () {

                return app.helper.resolvePictureUrl(this.get('Picture'));
            },
            User: function () {

                var userId = this.get('UserId');

                var user = $.grep(app.Users.users(), function (e) {
                    return e.Id === userId;
                })[0];

                return user ? {
                    DisplayName: user.DisplayName,
                    PictureUrl: app.helper.resolveProfilePictureUrl(user.Picture)
                } : {
                    DisplayName: 'Anonymous',
                    PictureUrl: app.helper.resolveProfilePictureUrl()
                };
            },
            isVisible: function () {
                var currentUserId = app.Users.currentUser.data.Id;
                var userId = this.get('UserId');

                return currentUserId === userId;
            }
        };

        // Activities data source. The Backend Services dialect of the Kendo UI DataSource component
        // supports filtering, sorting, paging, and CRUD operations.
        var watchListsDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: watchListModel
            },
            transport: {
                // Required by Backend Services
                typeName: 'Posts'
            },
            change: function (e) {

                if (e.items && e.items.length > 0) {
                    $('#no-activities-span').hide();
                } else {
                    $('#no-activities-span').show();
                }
            },
            sort: { field: 'CreatedAt', dir: 'desc' }
        });

        return {
            watchLists: watchListsDataSource
        };

    }());

    // Activities view model
    var watchListsViewModel = (function () {
 

        // Navigate to activityView When some activity is selected
        var activitySelected = function (e) {

            app.mobileApp.navigate('views/watch-View.html?uid=' + e.data.uid);
        };

        // Navigate to app home
        var navigateHome = function () {

            app.mobileApp.navigate('#welcome');
        };

        // Logout user
        var logout = function () {

            app.helper.logout()
                .then(navigateHome, function (err) {
                    app.showError(err.message);
                    navigateHome();
                });
        };

         var $newPicture;
  
    var observable = {
        picName: '',
        picTitle: '',
        picSelected: false,
        onPicSet: function(e) {
            this.set('picSelected', true);
            this.set('picName', e.target.files[0].name);
        },
        onRemovePic: function() {
            this.set("picSelected", false);
            // reset the file upload selector
            $newPicture = $newPicture || $("#postPicture");
            $newPicture.replaceWith($newPicture = $newPicture.clone(true));
        },
        onAddPic: function() {
            $newPicture = $newPicture || $("#postPicture");
            $newPicture.click();
        },
        saveItem: function() {
            var that = this;
            $newPicture = $newPicture || $("#postPicture");
            helper.getImageFileObject(
                $newPicture[0].files[0],
                function( err, fileObj ) {
                    if(err) {
                        navigator.notification.alert(err);    
                        return;
                    }
                    $.ajax({
                        type: "POST",
                        url: 'http://api.everlive.com/v1/IMregDJC77R1b1yM/Files',
                        contentType: "application/json",
                        data: JSON.stringify(fileObj),
                        error: function(error){
                            navigator.notification.alert(JSON.stringify(error));
                        }
                    }).done(function(data){
                        var item = watchListsModel.images.add();
                        item.Title = that.get('picTitle');
                        item.Picture = data.Result.Id;
                        watchListsModel.images.one('sync', function () {
                            mobileApp.navigate('#:back');
                        });
                        watchListsModel.images.sync();
                        
                        // reset the form
                        that.set("picSelected", false);
                        $newPicture.replaceWith($newPicture = $newPicture.clone(true));
                    });
                }
            );          
        }
    };
    // ***************** END ****************************

    // add image view model
    var addImageViewModel = (function () {
        var picName = "";
        var $newTitle;
        var $newPicture;
        var $picName;
        var $picInfo;
        var $newPicLabel;
        var validator;
        var initp = function () {
            validator = $('#enterItem').kendoValidator().data("kendoValidator");
            $newTitle = $('#newTitle');
            $picName = $('#picName');
            $newPicture = $('#postPicture');    
            $newPicLabel = $('#newPicLabel');
            $picInfo = $("#picInfo");
        };
        var show = function () {
            $newTitle.val('');
            $postPicture.val('').show();
            $newPicLabel.show();
            $picInfo.hide();
            validator.hideMessages();
        };
        var saveItem = function () {
            if (validator.validate()) {
                helper.getImageFileObject(
                    $newPicture[0].files[0],
                    function( err, fileObj ) {
                        if(err) {
                            navigator.notification.alert(err);    
                            return;
                        }
                        $.ajax({
                            type: "POST",
                            url: 'http://api.everlive.com/v1/IMregDJC77R1b1yM/Files',
                            contentType: "application/json",
                            data: JSON.stringify(fileObj),
                            error: function(error){
                                navigator.notification.alert(JSON.stringify(error));
                            }
                        }).done(function(data){
                            var item = watchListsModel.images.add();
                            item.Title = $newTitle.val();
                            item.Picture = data.Result.Id;
                            watchListsModel.images.one('sync', function () {
                                mobileApp.navigate('#:back');
                            });
                            watchListsModel.images.sync();
                            picSelected = false;
                        });
                    }
                );                
                
            }
        };
        var onPicSet = function(e) {
            $picName.text($newPicture[0].files[0].name);
            observable.set("picSelected", true);
            $postPicture.hide();
            $newPicLabel.hide();
        };
        var removePic = function() {
            $picName.text("");
            $picInfo.hide();
            $postPicture.val('').show();
            $newPicLabel.show();
        };

        return {
            watchLists: watchListsModel.watchLists,
            activitySelected: activitySelected,
            logout: logout,
            initp: initp,
            show: show,
            saveItem: saveItem,
            onPicSet: onPicSet,
            removePic : removePic
        };

    }());
return {
        viewModels: {
        
            addImage : observable
        }
    };

    return watchListsViewModel;

}());




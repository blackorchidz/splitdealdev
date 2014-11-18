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
                    defaultValue: null
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

        var $activityPicture;
        
        var init = function () {
            
            $activityPicture = $('#Picture');
        };
        var show = function (e) {
            
            
            $activityPicture[0].style.display = post.Picture ? 'block' : 'none';
            
            
            
            kendo.bind(e.view.element, post, kendo.mobile.ui);
        };

        // Navigate to activityView When some activity is selected
        var activitySelected = function (e) {

            app.mobileApp.navigate('views/watchListView.html?uid=' + e.data.uid);
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

        return {
            watchLists: watchListsModel.watchLists,
            init: init,
            activitySelected: activitySelected,
            logout: logout
        };

    }());

    return watchListsViewModel;

}());




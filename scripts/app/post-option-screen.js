/**
 * Created by mkale on 14/11/2014.
 */
/**
 * Activities view model
 */

var app = app || {};

app.PostTypes = (function () {
    'use strict'

    // Activities model
    var postsModel = (function () {

        var postOptionModel = {

            id: 'Id',
            fields: {
                CreatedAt: {
                    field: 'CreatedAt',
                    defaultValue: new Date()
                },
                TypeName: {
                    fields: 'TypeName',
                    defaultValue: null
                }
            },
            CreatedAtFormatted: function () {

                return app.helper.formatDate(this.get('CreatedAt'));
            },
            isVisible: function () {
                var currentUserId = app.Users.currentUser.data.Id;
                var userId = this.get('UserId');

                return currentUserId === userId;
            }
        };

        // Activities data source. The Backend Services dialect of the Kendo UI DataSource component
        // supports filtering, sorting, paging, and CRUD operations.
        var postsDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: postOptionModel
            },
            transport: {
                // Required by Backend Services
                typeName: 'PostTypes'
            },
            change: function (e) {

                if (e.items && e.items.length > 0) {
                    $('#no-activities-span').hide();
                } else {
                    $('#no-activities-span').show();
                }
            },
            sort: { field: 'CreatedAt', dir: 'desc' },
            selectable:true
        });

        return {
            posts: postsDataSource
        };

    }());

    // Activities view model
    var postsViewModel = (function () {

        // Navigate to activityView When some activity is selected
        var typeSelected = function () {
            app.mobileApp.navigate('views/BestBuy-Screen.html');
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
            posts: postsModel.posts,
            typeSelected: typeSelected,
            logout: logout
        };

    }());

    return postsViewModel;

}());




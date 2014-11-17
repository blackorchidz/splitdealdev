/**
 * Activities view model
 */

var app = app || {};

app.Maps = (function () {
    'use strict'


    // Activities model
    var activitiesModel = (function () {
        var activityModel = {
            id: 'Id',
            fields: {
                StoreName: {
                    field: 'StoreName',
                    defaultValue: null
<<<<<<< HEAD
                },
                UserId: {
                    field: 'User_id',
                    defaultValue: null
                }

=======
                }
>>>>>>> origin/master
            },
            CreatedAtFormatted: function () {

                return app.helper.formatDate(this.get('CreatedAt'));
            }
        };

        // Activities data source. The Backend Services dialect of the Kendo UI DataSource component
        // supports filtering, sorting, paging, and CRUD operations.
        var activitiesDataSource = new kendo.data.DataSource({
            type: 'everlive',
            schema: {
                model: activityModel
            },
            transport: {
                // Required by Backend Services
                typeName: 'Stores'
            },
            sort: { field: 'CreatedAt', dir: 'desc' }
        });

        return {
            activities: activitiesDataSource
        };

    }());

    // Activities view model
    var activitiesViewModel = (function () {

        // Navigate to activityView When some activity is selected
        var mapActivitySelected = function (e) {

            app.mobileApp.navigate('views/mapListView.html?uid=' + e.data.uid);
        };

        // Navigate to app home
        var navigateHome = function () {

            app.mobileApp.navigate('#welcome');
        };


        return {
            activities: activitiesModel.activities
        };

    }());

    return activitiesViewModel;
    console.log("Data read Successfully Successfully");

}());




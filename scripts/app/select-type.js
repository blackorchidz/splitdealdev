/**
 * Created by mkale on 14/11/2014.
 */
/**
 * Activities view model
 */

var app = app || {};

app.selectOption = (function () {
    'use strict'

    // Activities view model
    var selectOptionModel = (function () {

        var getURLParam = function (e) {
            /*alert("In getURLParam");
            productName = e.view.params.itemName;
            console.log("Product Name "+productName);*/
        };

        // Navigate to activityView When some activity is selected
        var typeFilter = function () {
            alert("In typeFilter");
            app.mobileApp.navigate('views/map.html');
        };

        var locationFilter = function () {
            alert("In locationFilter");
            app.mobileApp.navigate('views/map.html');
        };

        var categoryFilter = function () {
            alert("In categoryFilter");
            app.mobileApp.navigate('views/map.html');
        };

        // Navigate to app home
        var navigateHome = function () {

            app.mobileApp.navigate('#welcome');
        };

        return {
            getURLParam: getURLParam,
            typeFilter: typeFilter,
            locationFilter: locationFilter,
            categoryFilter: categoryFilter
        };

    }());

    return selectOptionModel;

}());




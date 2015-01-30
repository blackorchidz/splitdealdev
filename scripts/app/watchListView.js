/**
 * Activity view model
 */

var app = app || {};

app.Activity = (function () {
    'use strict'
    
    var $commentsContainer,
        listScroller;
    
    var activityViewModel = (function () {
        
        var activityUid,
            activity,
            $activityPicture;
        
        var init = function () {
            alert("in init function . . . ");
            //$commentsContainer = $('#comments-listview');
            $activityPicture = $('#picture');
        };
        
        var show = function (e) {
            alert("in show function . . . ");
            //$commentsContainer.empty();
            
            listScroller = e.view.scroller;
            listScroller.reset();
            
            activityUid = e.view.params.uid;
            alert("activity id : "+activityUid);
            
            // Get current activity (based on item uid) from Activities model
            activity = app.Posts.watchLists.getByUid(activityUid);
            alert("activity : "+activity);
            console.log("activity : "+activity);
            
            //$activityPicture[0].style.display = activity.Picture ? 'block' : 'none';
            
            kendo.bind(e.view.element, activity, kendo.mobile.ui);
        };
        
        var removeActivity = function () {
            
            var activities = app.Activities.activities;
            var activity = activities.getByUid(activityUid);
            
            app.showConfirm(
                appSettings.messages.removeActivityConfirm,
                'Delete Activity',
                function (confirmed) {
                    if (confirmed === true || confirmed === 1) {
                        
                        activities.remove(activity);
                        activities.one('sync', function () {
                            app.mobileApp.navigate('#:back');
                        });
                        activities.sync();
                    }
                }
            );
        };
        
        return {
            init: init,
            show: show,
            remove: removeActivity,
            activity: function () {
                return activity;
            },
        };
        
    }());
    
    return activityViewModel;
    
}());

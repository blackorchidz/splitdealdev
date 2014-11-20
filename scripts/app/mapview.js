document.addEventListener('deviceready', initializeMap, false);



function initializeMap() {
    var mapOptions = {
        center: new google.maps.LatLng(43.069452, -89.411373),
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
var marker = new google.maps.Marker({
    position: new google.maps.LatLng(43.069452, -89.411373),
    map: map,
    title: "This is a marker!",
    animation: google.maps.Animation.DROP
});
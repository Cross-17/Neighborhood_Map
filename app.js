var map;
var markers = [];
var locations = [
{title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
{title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
{title: 'Union Squre Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
{title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.9843777}},
{title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -73.9961237}}
];
var ViewModel = function() {
  var self = this;
  self.cityList = ko.observableArray([]);

  locations.forEach(function(item){
    self.cityList.push(item);
  });
  this.show = function(clicked) {
    markers
    };
  initMap()
  console.log("heheda");
}
function tryit(){
ko.applyBindings(new ViewModel());
}
    function initMap() {
       map = new google.maps.Map(document.getElementById('map'), {
         center: {lat: 40.74135, lng: -73.99802},
         zoom: 14
       });

       var infowindow = new google.maps.InfoWindow();

       for( i = 0; i < locations.length; i++) {
        var position = locations[i].location;
        var title = locations[i].title;
        var marker = new google.maps.Marker({
        map: map,
        position: position,
        title: title,
        id: i  
        });
        markers.push(marker);
        marker.addListener('click', function(){
          populateinfowindow(this,infowindow);
        });
       }
    function populateinfowindow(marker, infowindow) {
      if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>'+marker.title + '</div>');
        infowindow.open(map,marker);
        infowindow.addListener('cliseclick', function() {
          infowindow.setMarker(null);
        });
      }
    }
}
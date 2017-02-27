var locations = [{
    title: 'Park Ave Penthouse',
    location: {
        lat: 40.7713024,
        lng: -73.9632393
    }
},
{
    title: 'Chelsea Loft',
    location: {
        lat: 40.7444883,
        lng: -73.9949465
    }
},
{
    title: 'Union Squre Open Floor Plan',
    location: {
        lat: 40.7347062,
        lng: -73.9895759
    }
},
{
    title: 'East Village Hip Studio',
    location: {
        lat: 40.7281777,
        lng: -73.9843777
    }
},
{
    title: 'TriBeCa Artsy Bachelor Pad',
    location: {
        lat: 40.7195264,
        lng: -73.9961237
    }
}];
var ViewModel = function() {
    var self = this;

    self.cityList = ko.observableArray([]);
    for (i = 0; i < locations.length; i++) {
        var item = locations[i];
        self.cityList.push(item);
    }

    var map;
    this.searchString = ko.observable("");
    initMap();
    this.filtered = ko.computed(function() {
        function check(item) {
            var result = item.title.includes(self.searchString());
            if (!result) {
                item.marker.setVisible(false);
            } else {
                item.marker.setVisible(true);
            }
            return result;
        }
        return locations.filter(check);
    });
    this.animate = function(clicked) {
        new google.maps.event.trigger(clicked.marker, 'click');
    };
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: 40.74135,
                lng: -73.99802
            },
            zoom: 13
        });

        var infowindow = new google.maps.InfoWindow();

        for (i = 0; i < locations.length; i++) {
            var position = locations[i].location;
            var title = locations[i].title;
            var marker = new google.maps.Marker({
                map: map,
                position: position,
                title: title,
            });
            self.cityList()[i].marker = marker;
            marker.addListener('click',
            function() {
                populateinfowindow(this, infowindow);
                var self = this;
                this.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    self.setAnimation(null);
                },
                2000);
            });
        }
        function populateinfowindow(marker, infowindow) {
            if (infowindow.marker != marker) {
                infowindow.marker = marker;
                var baseurl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=afc1f6f05522aacb071b7429e378636f&extras=url_m&format=json&nojsoncallback=1&";
                var searchcontent = "lat=" + marker.position.lat() + "&lon=" + marker.position.lng();
                var url = baseurl + searchcontent;
                var imageurl = "";
                var RequestTimeout = setTimeout(function() {
                    alert("failed to get Flickr resources");
                },
                8000);

                $.getJSON(url,
                function(data) {
                    var index = RandomNum(0, 100);
                    imageurl = data.photos.photo[index].url_m;
                    clearTimeout(RequestTimeout);
                    infowindow.setContent('<div><p>image around ' + marker.title + '</p><img src= "' + imageurl + '""><p>from flickr</p></div>');
                    infowindow.open(map, marker);
                    infowindow.addListener('cliseclick',
                    function() {
                        infowindow.setMarker(null);
                    });
                });

            }
        }
    }
};
ko.applyBindings(new ViewModel());

function RandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
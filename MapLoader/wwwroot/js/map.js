document.addEventListener('DOMContentLoaded', function() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZmFyZ29zZSIsImEiOiJjbHRvcGxqOHcwaDAzMmtvNnBoZDdmeHR6In0.FG1xKdc6yT1blO0dcv1cqg';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: [-74.5, 40],
        zoom: 9
    });

    // Assuming you have a button element with the class "button"
    const button = document.querySelector('.button');

    // Add event listener for button click
    button.addEventListener('click', parseGeoJson);

    // Method to parse GeoJSON
    function parseGeoJson() {
        // Your code to parse GeoJSON goes here

        // store input from .wide-text-editor in a variable
        var input = document.querySelector('.wide-text-editor').value;
        // parse the input into a GeoJSON object
        var geojson = JSON.parse(input);
        // add the GeoJSON object to the map make points green color
        // variable id should be random guid
        var id = generateRandomGuid();

        function generateRandomGuid() {
            function generateRandomHex() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            return (
                generateRandomHex() +
                generateRandomHex() +
                '-' +
                generateRandomHex() +
                '-' +
                generateRandomHex() +
                '-' +
                generateRandomHex() +
                '-' +
                generateRandomHex() +
                generateRandomHex() +
                generateRandomHex()
            );
        }


        map.addLayer({
            "id": id,
            "type": "circle",
            "source": {
                "type": "geojson",
                "data": geojson
            },
            "paint": {
                "circle-color": "#00ff00",
                "circle-radius": 5
            }
        });

    }

    // add #fileUploader event to upload -> parse json file and display in .wide-text-editor textarea
    document.getElementById('fileUploader').addEventListener('change', function() {
        var fr = new FileReader();
        fr.onload = function() {
            var result = JSON.parse(fr.result);
            document.querySelector('.wide-text-editor').innerText = JSON.stringify(result);
        }
        fr.readAsText(this.files[0]);
    });


});
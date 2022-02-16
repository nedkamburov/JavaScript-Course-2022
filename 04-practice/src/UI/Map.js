export class Map {
    constructor(coords) {
        this.coords = coords;
        this.render(this.coords);
    }

    render(coordinates) {
        if (!google) {
            alert('Could not load Maps Library');
            return;
        }

        const map = new google.maps.Map(document.getElementById('map'), {center: coordinates, zoom:16});
        new google.maps.Marker({
            position: coordinates,
            map: map
        })

    }
}
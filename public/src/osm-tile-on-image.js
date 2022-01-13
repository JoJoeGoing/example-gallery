
const options = {
    center: [79.920757, 37.115117],
    zoom: 8,
    minZoom: 2,
    maxZoom: 20,
    showBaseZoomBar: true,
    showScaleBar: true,
    showMousePosition: true
};


const map = new UMap.Map('map', options);

const osm = new ol.layer.Tile({
    source: new ol.source.OSM()
});
map.addLayer(osm);

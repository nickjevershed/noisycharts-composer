//https://stackexchange.com/questions/5821/calculating-latitude-longitude-x-miles-from-point 
  /**
  * All coordinates expected EPSG:4326
  * @param {Array} start Expected [lon, lat]
  * @param {Array} end Expected [lon, lat]
  * @return {number} Distance - meter.
  */
  export function calculateDistance(start, end) {

    var lat1 = parseFloat(start[1]),
        lon1 = parseFloat(start[0]),
        lat2 = parseFloat(end[1]),
        lon2 = parseFloat(end[0]);

    return sphericalCosinus(lat1, lon1, lat2, lon2);
  }

  /**
  * All coordinates expected EPSG:4326
  * @param {number} lat1 Start Latitude
  * @param {number} lon1 Start Longitude
  * @param {number} lat2 End Latitude
  * @param {number} lon2 End Longitude
  * @return {number} Distance - meters.
  */
  export function sphericalCosinus(lat1, lon1, lat2, lon2) {
    var radius = 6371e3; // meters
    var dLon = toRad(lon2 - lon1),
        lat1 = toRad(lat1),
        lat2 = toRad(lat2),
        distance = Math.acos(Math.sin(lat1) * Math.sin(lat2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.cos(dLon)) * radius;

    return distance;
  }

  /**
  * @param {Array} coord Expected [lon, lat] EPSG:4326
  * @param {number} bearing Bearing in degrees
  * @param {number} distance Distance in meters
  * @return {Array} Lon-lat coordinate.
  */
  export function createCoord(coord, bearing, distance) {

    /** http://www.movable-type.co.uk/scripts/latlong.html
    * φ is latitude, λ is longitude, 
    * θ is the bearing (clockwise from north), 
    * δ is the angular distance d/R; 
    * d being the distance travelled, R the earth’s radius*
    **/
    var 
      radius = 6371e3, // meters
      δ = Number(distance) / radius, // angular distance in radians
      θ = toRad(Number(bearing)),
      φ1 = toRad(coord[1]),
      λ1 = toRad(coord[0]);

    var φ2 = Math.asin(Math.sin(φ1)*Math.cos(δ) + 
      Math.cos(φ1)*Math.sin(δ)*Math.cos(θ));

    var λ2 = λ1 + Math.atan2(Math.sin(θ) * Math.sin(δ)*Math.cos(φ1),
      Math.cos(δ)-Math.sin(φ1)*Math.sin(φ2));
    // normalise to -180..+180°
    λ2 = (λ2 + 3 * Math.PI) % (2 * Math.PI) - Math.PI; 

    return [toDeg(λ2), toDeg(φ2)];
  }
  /**
   * All coordinates expected EPSG:4326
   * @param {Array} start Expected [lon, lat]
   * @param {Array} end Expected [lon, lat]
   * @return {number} Bearing in degrees.
   */
  export function getBearing(start, end) {
    var
      startLat = toRad(start[1]),
      startLong = toRad(start[0]),
      endLat = toRad(end[1]),
      endLong = toRad(end[0]),
      dLong = endLong - startLong;

    var dPhi = Math.log(Math.tan(endLat/2.0 + Math.PI/4.0) / 
      Math.tan(startLat/2.0 + Math.PI/4.0));

    if (Math.abs(dLong) > Math.PI) {
      dLong = (dLong > 0.0) ? -(2.0 * Math.PI - dLong) : (2.0 * Math.PI + dLong);
    }

    return (toDeg(Math.atan2(dLong, dPhi)) + 360.0) % 360.0;
  }

  export function toDeg(n) { return n * 180 / Math.PI; }

  export function toRad(n) { return n * Math.PI / 180; }
  /**
   * All coordinates expected EPSG:4326
   * Convert latitude, longitude coordinates to x, y coordinates to be used with an image
   * https://stackoverflow.com/questions/2103924/mercator-longitude-and-latitude-calculations-to-x-and-y-on-a-cropped-map-of-the/10401734#10401734
   * https://thomasthoren.com/2016/02/28/making-a-new-york-times-map.html
   * https://stackoverflow.com/questions/14492284/center-a-map-in-d3-given-a-geojson-object/14691788#14691788
   */
  export function convertGeoToPixel(latitude, longitude,
                    mapWidth, // in pixels
                    mapHeight, // in pixels
                    mapLngLeft, // in degrees. the longitude of the left side of the map (i.e. the longitude of whatever is depicted on the left-most part of the map image)
                    mapLngRight, // in degrees. the longitude of the right side of the map
                    mapLatBottom) // in degrees.  the latitude of the bottom of the map
  {

    const mapLatBottomRad = mapLatBottom * Math.PI / 180
    const latitudeRad = latitude * Math.PI / 180
    const mapLngDelta = (mapLngRight - mapLngLeft)

    const worldMapWidth = ((mapWidth / mapLngDelta) * 360) / (2 * Math.PI)
    const mapOffsetY = (worldMapWidth / 2 * Math.log((1 + Math.sin(mapLatBottomRad)) / (1 - Math.sin(mapLatBottomRad))))

    const x = (longitude - mapLngLeft) * (mapWidth / mapLngDelta)
    const y = mapHeight - ((worldMapWidth / 2 * Math.log((1 + Math.sin(latitudeRad)) / (1 - Math.sin(latitudeRad)))) - mapOffsetY)

    return {x, y} // the pixel x,y value of this point on the map image
  }


function tileDistance(tileA, tileB) {
    const x = Math.abs(tileA.x - tileB.x);
    const y =  Math.abs(tileA.y - tileB.y);
    return Math.sqrt(x * x + y * y);
}

function tileDistanceMap(tile, tileMap) {
    let distanceMap = tileMap.map(end => {
        return [tileDistance(tile, end), end];
    })
    distanceMap = distanceMap.sort((a, b) => a[0] - b[0]);
    return distanceMap;
}

function tileMinDistanceMap(tile, tileMap) {
    if (tileMap && tileMap.length) {
        return tileDistanceMap(tile, tileMap)[0];
    } 
    return [0, null]
}

function tileMeanDistanceMap(tile, tileMap, max=3) {
    const distMap = tileDistanceMap(tile, tileMap);
    const count = Math.min(distMap.length, max);
    let distanceMean = 0;
    for (let i = 0; i < count; i++) {
        distanceMean += distMap[i][0]
    }
    return distanceMean / count;
}



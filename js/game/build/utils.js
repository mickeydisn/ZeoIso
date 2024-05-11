export const isNumber = function(value) {
    return typeof value === 'number';
  }

export const isArray = function(value) {
    return Array.isArray(value);
}

/*
 Return the insterselction of LA and LB . ( LA and LB , can be single value , or array )
    intersert([0,1], [0,1]) => [0, 1]
    intersert(1, [0,1]) => [1]
    intersert([0,1], 0) => [0]
    intersert(0, 0) => [0]
    intersert(1, 0) => []
*/
export const intersect = function(lA, lB) {
    return isArray(lA) 
        ? isArray(lB) ? lA.filter(x => lB.includes(x)) : lA.filter(x => lB == x)
        : isArray(lB) ? lB.filter(x => lA == x) : lA == lB ? [lA] : []
}

/*
// Example usage:
const A = [1, 2, 3, 4, 5];
const B = shiftArrayByOne(A);
//  Output: [2, 3, 4, 5, 1]
*/
export const shiftArrayByOne = function (A) {
    return A.map((_, index, array) => array[(index + array.length - 1) % array.length]);
}


// ============================

export const AXE_DIRECTION = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
]
export const AXE_DIRECTION2 = [
    [ 1,  1],
    [-1,  1],
    [ 1, -1],
    [-1, -1],
]


export const axeNextTile = (conf)  => {
    let near = conf.near;
    return ['_NW', '_NE', '_SE', '_SW'].map(axeKey => {
        const confAxe = { ...conf}
        if (confAxe.key) confAxe.key = confAxe.key + axeKey + (confAxe.sufix ? confAxe.sufix : '')

        confAxe.near = near;
        near = shiftArrayByOne(near)
        return confAxe
    })
}

export const axeNextTileOfList = (confs) => {
    return confs.map(conf => axeNextTile(conf)).flat()
}


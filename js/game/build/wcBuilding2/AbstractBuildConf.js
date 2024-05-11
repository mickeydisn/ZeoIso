

export class AbstractWcBuildConf {

    growLoopCount;
    endLoopMax;

    listTileOptions;
    listFaceKey;

    indexTileOptions_KeyFaceKey;

    faceLinks;

    constructor(conf) {
        Object.assign(this, conf)
        this.growLoopCount = conf.growLoopCount ? conf.growLoopCount : 10
        this.endLoopMax = conf.endLoopMax ? conf.endLoopMax : 2000

        this.preInit();
        // this.init();        
    }

    preInit() {

    }

    init() {
        this.startTileOptions = axeNextTileOfList(Array.isArray(this.__TILE_START) ? this.__TILE_START : [this.__TILE_START])
        this.listTileOptions = axeNextTileOfList(this.__TILE_LIST)

        this.listTileOptions.forEach(tconf => { tconf.lvl=this.mainLvl})

        const keyFaceKeyEntrie = this.listTileOptions
            .map(tileOpt => [tileOpt.face.join('|'), tileOpt])


        this.indexTileOptions_KeyFaceKey = keyFaceKeyEntrie.reduce((acc, v) => { 
                if(!acc[v[0]]) acc[v[0]] = []; 
                acc[v[0]].push(v[1])
                return acc
            }, {})
        

        // this.listFaceKey = Object.entries(this.indexTileOptions_KeyFaceKey).map(([k , _]) => k)
        this.listFaceKey = Object.entries(this.indexTileOptions_KeyFaceKey).map(([k , _]) => k.split('|'))
        this.listFaceKey = this.listFaceKey.map(f => f.map(key => "".localeCompare(key) == 0 ? null: key ))
    }


    get __TILE_START() { return [] }
    get __TILE_LIST() { return [] }

    get TILE_START_OPTIONS() { return this.startTileOptions }
    get TILE_START() { return pickRandomWeightedObject(this.startTileOptions) }


    reverseFaceLink(face) {
        const filterLink = this.faceLinks.filter(x => x[0].localeCompare(face) == 0)
        if (filterLink.length == 0 && face != null) {
            console.error ('==ERROR== not existing faceLink:', face)
        }
        return filterLink.length ? filterLink[0][1] : null
    }

    reverseFaceLinkList(face) {
        const filterLink = this.faceLinks.filter(x => x[0].localeCompare(face) == 0)
        if (filterLink.length == 0 && face != null) {
            console.error ('==ERROR== not existing faceLink:', face)
        }
        return filterLink.length ? filterLink.map(l => l[1]) : null
    }
}




export const shiftArrayByOne = function (A, shiftX=1) {
    return A.map((_, index, array) => array[(index + array.length - shiftX) % array.length]);
}


/*
export const axeNextTile = (conf)  => {
    let face = conf.face
    let dTag = ['_NW', '_NE', '_SE', '_SW']
    dTag = shiftArrayByOne(dTag, conf.keyR ? conf.keyR : 0)
    return dTag.map(axeKey => {
        const confAxe = { ...conf}
        if (confAxe.key) confAxe.key = confAxe.key + axeKey + (confAxe.sufix ? confAxe.sufix : '')

        confAxe.face = face;
        face = shiftArrayByOne(face)
        return confAxe
    })
}
*/
export const axeNextTile = (conf)  => {
    let face = conf.face
    const dTag = ['_NW', '_NE', '_SE', '_SW']
    // dTag = shiftArrayByOne(dTag, conf.keyR ? conf.keyR : 0)

    return [0, 1, 2, 3].map(axe => {
        const confAxe = { ...conf}
        const r = confAxe.keyR ? conf.keyR : 0
        const axeKey = dTag[(axe + 4 - r) % 4]
        if (confAxe.key) confAxe.key = confAxe.key + axeKey + (confAxe.sufix ? confAxe.sufix : '')

        if (confAxe.functions) {
            confAxe.functions = confAxe.functions.map(item => {
                const confItem = {...item}
                if (confItem.key) {
                    const r = confItem.keyR ? confItem.keyR : 0
                    const axeKey = dTag[(axe + 4 - r) % 4]
                    confItem.key = confItem.key + axeKey + (confItem.sufix ? confItem.sufix : '')
                }
                return confItem
            })
        }

        if (confAxe.items) {
            confAxe.items = confAxe.items.map(item => {
                const confItem = {...item}
                if (confItem.key) {
                    const r = confItem.keyR ? confItem.keyR : 0
                    const axeKey = dTag[(axe + 4 - r) % 4]
                    confItem.key = confItem.key + axeKey + (confItem.sufix ? confItem.sufix : '')
                }
                return confItem
            })
        }

        confAxe.face = face;
        face = shiftArrayByOne(face)
        return confAxe
    })

}

export const axeNextTileOfList = (confs) => {

    const flatConfs = confs.map(conf => conf.items.map(i => {return {...i, face:conf.face}})).flat()
    return flatConfs.map(conf => axeNextTile(conf)).flat()
}



export function pickRandomWeightedObject(array, rand=null) {
    const mrand = rand ? rand : Math.random()
    // Calculate the total weight of all objects in the array
    const totalWeight = array.reduce((acc, obj) => acc + obj.weight, 0);

    // Generate a random number between 0 and the total weight
    const randomWeight = mrand * totalWeight;

    // Iterate through the objects and accumulate their Tws until
    // the accumulated weight exceeds the randomWeight
    let accumulatedWeight = 0;
    for (const obj of array) {
        accumulatedWeight += obj.weight;
        if (accumulatedWeight >= randomWeight) {
            // Return the object when the accumulated weight exceeds the random weight
            return obj;
        }
    }

    // This should not happen, but if it does, return null or handle the case appropriately
    return null;
}

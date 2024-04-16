import { axeNextTileOfList2 } from "./utils.js"



export class BuildConf_Base2 {
    constructor(conf={}) {
        this.growLoopCount = conf.growLoopCount ? conf.growLoopCount : 100
        this.endLoopMax = conf.endLoopMax ? conf.endLoopMax : 200


        this.buildEmpty = true;
        this.nearAdvance = true;

        this.growTileTag = ["B0", "B1", "B2"]
        this.emptyTileTag = ["E0", 'E1']

        this.relationList = [

        ]
    }

    get BUILD_TILE_START() { return { 
        color: [0, 0, 0], 
        key: "corridor_end_SE", 
        face: ['A', '0', '0', '0'],
    }}

    get BUILD_TILE_LIST_EMPTY() { return axeNextTileOfList2([
        { 
            Tw: 1, 
            color: [0, 60, 0], 
            t: "empty",  
            allowMove:true,
            face: ['0', '0', '0', '0'],
        },
    ])}
    
    get BUILD_TILE_LIST() { return axeNextTileOfList2([
        { 
            Tw: .001, 
            color: [0, 60, 0], 
            t: "empty",  
            allowMove:true,
            face: ['0', '0', '0', '0'],
        }, {
            Tw: 2,
            color: [0, 0, 0], 
            key: "corridor_",
            face: ['A', '0', 'A', '0'],
        }, { 
            Tw: 2,
            color: [0, 0, 0], 
            key: "corridor_detailed",
            face: ['A', '0', 'A', '0'],
        }, { 
            Tw: 1, 
            color: [0, 0, 0], 
            key: "corridor_window",
            face: ['A', '0', 'A', '0'],

        }, {
            Tw: 5,
            color: [0, 0, 0], 
            key: "corridor_corner",
            face: ['A', '0', '0', 'A'],
        }, { 
            Tw: 1, 
            color: [0, 0, 0], 
            key: "corridor_cornerRound", 
            face: ['A', '0', '0', 'A'],
        }, { 
            Tw: 5,
            color: [0, 0, 0], 
            key: "corridor_cross", 
            face: ['A', 'A', 'A', 'A'],
        }, { 
            Tw: 10, 
            color: [0, 0, 0], 
            key: "corridor_split",  
            face: ['A', 'A', 'A', '0'],
        }, { 
            Tw: .001, 
            color: [0, 0, 0], 
            key: "corridor_end",  
            allowMove:true,
            face: ['0', '0', 'A', '0'],
        },
    ])}

    get BUILD_TILE_LIST_CLOSE() { return axeNextTileOfList2([

    ])}
}





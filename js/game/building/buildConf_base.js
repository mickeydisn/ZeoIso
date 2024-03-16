import { axeNextTileOfList } from "./utils.js"


export class BuildConf {
    constructor() {
        this.growLoopCount = 1;
        this.endLoopMax = 0;
        this.buildEmpty = true;

        this.growTileTag = ["B0", "B1", "B2", "B3"]
        this.emptyTileTag = ["E0"]

    }

    get BUILD_TILE_START() { return { } }

    get BUILD_TILE_LIST_EMPTY() { return axeNextTileOfList([])}
    get BUILD_TILE_LIST() { return axeNextTileOfList([])}
    get BUILD_TILE_LIST_CLOSE() { return axeNextTileOfList([])}

}


const __Ex = ["E0"]
const __Bx = ["B1", "B2"]

const _nEx = ["E0", "E1", null]
const _nBA = ["B1", null]
const _nBx = ["B1", "B2", null]


export class BuildConf_Base extends BuildConf{
    constructor() {
        super()

        this.growLoopCount = 50;
        this.endLoopMax = 100;
        this.buildEmpty = true;


        this.growTileTag = ['B0', "B1", "B2"]
        this.emptyTileTag = ["E0"]
    }

    get BUILD_TILE_START() { return { 
        Tm: "B2",
        key: "corridor_end_SE", 
        near:[["B1"], ["E0"], ["E0"], ["E0"]],
    }}

    get BUILD_TILE_LIST_EMPTY() { return [ 
            // { Tw: 1, t: "empty", near:[0, 0, 0, 0]},
        { Tm: "E0", Tw: 1, t: "empty", x:'0',  near:[__Bx, null, ['E1', null],  null]},
        { Tm: "E0", Tw: 1, t: "empty", x:'1',  near:[null, __Bx, null,  ['E1', null]]},
        { Tm: "E0", Tw: 1, t: "empty", x:'2',  near:[ ['E1', null], null, __Bx, null]},
        { Tm: "E0", Tw: 1, t: "empty", x:'3',  near:[null,  ['E1', null], null, __Bx]},
    ]}
    
    get BUILD_TILE_LIST() { return axeNextTileOfList([
        { 
            Tm: "B0", Tw: 3,
            key: "corridor_detailed",
            near:[
                ["B1", null], 
                _nEx, 
                ["B1", null], 
                _nEx
            ]
        }, { 
            Tm: "B0", Tw: 1, 
            key: "corridor_window",
            near:[
                ["B1", null], 
                _nEx, 
                ["B1", null], 
                _nEx
            ]
        }, {
            Tm: "B1", Tw: 1,
            key: "corridor_",
            near:[
                ["B0", "B1", "B2", null], 
                _nEx, 
                ["B0", "B1", "B2", null], 
                _nEx
            ]
        }, {
            Tm: "B2", Tw: 5,
            key: "corridor_corner",
            near:[_nBA, _nEx, _nEx, _nBA]
        }, { 
            Tm: "B2", Tw: 1, 
            key: "corridor_cornerRound", 
            near:[_nBA, _nEx, _nEx, _nBA]
        }, { 
            Tm: "B2", Tw: 10,
            key: "corridor_cross", 
            near:[_nBA, _nBA, _nBA, _nBA]
        }, { 
            Tm: "B2", Tw: 10, 
            key: "corridor_split",  
            near:[_nBA, _nBA, _nBA, _nEx]
        }, { 
            Tm: ["B2", "B1"], Tw: .001, 
            key: "corridor_corner",
            near:[_nBx, _nEx, _nEx, _nBx]
        }, { 
            Tm: ["B3", "B2", "B1"], Tw: .001, 
            key: "corridor_end",  
            near:[_nEx, _nEx, ['B1', 'B2'], _nEx]
        },
    ])}

    get BUILD_TILE_LIST_CLOSE() { return axeNextTileOfList([
        { 
            Tm: ["B2", "B1", 'B0'], Tw: 1, 
            key: "corridor_corner", 
            near:[['B1', 'B2', 'B0'], _nEx, _nEx, ['B1', 'B2', 'B0']]
        }, { 
            Tm: ["B2", "B1", 'B0'], Tw: 1, 
            key: "corridor_end",   
            near:[_nEx, _nEx, ['B1', 'B2', 'B0'], _nEx]
        },
    ])}
}





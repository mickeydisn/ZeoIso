import { axeNextTileOfList } from "./utils.js"


export class BuildConf {
    constructor() {
        this.growLoopCount = 100;
        this.endLoopMax = 0;
        this.buildEmpty = false;

        this.nearAdvance = true;

        this.growTileTag = ["B0", "B1", "B2", "B3"]
        this.emptyTileTag = ["E0"]

    }

    get BUILD_TILE_START() { return { } }

    get BUILD_TILE_LIST_EMPTY() { return axeNextTileOfList([])}
    get BUILD_TILE_LIST() { return axeNextTileOfList([])}
    get BUILD_TILE_LIST_CLOSE() { return axeNextTileOfList([])}

}



export class BuildConf_Base extends BuildConf{
    constructor() {
        super()

        this.growLoopCount = 100;
        this.endLoopMax = 200;
        this.buildEmpty = true;
        this.nearAdvance = true;

        this.growTileTag = ["B0", "B1", "B2"]
        this.emptyTileTag = ["E0", 'E1']
    }

    get BUILD_TILE_START() { return { 
        color: [0, 0, 0], 
        key: "corridor_end_SE", 
        near:[
            {is:'B0', con:['B0', null]},
            {is:'E0', con:['E1', null]},
            {is:'E0', con:['E1', null]},
            {is:'E0', con:['E1', null]},
        ]
}}

    get BUILD_TILE_LIST_EMPTY() { return axeNextTileOfList([
        { 
            Tw: 1, 
            color: [0, 60, 0], 
            t: "empty",  
            allowMove:true,
            near:[
                {is:'E1', con:['E1', 'E0', null]},
                {is:'E1', con:['E1', null]},
                {is:'E1', con:['E1', null]},
                {is:'E1', con:['E1', null]},
            ]
        },
    ])}
    
    get BUILD_TILE_LIST() { return axeNextTileOfList([
        { 
            Tw: .001, 
            color: [0, 60, 0], 
            t: "empty",  
            allowMove:true,
            near:[
                {is:'E1', con:['E1', 'E0', null]},
                {is:'E1', con:['E1', 'E0', null]},
                {is:'E1', con:['E1', 'E0', null]},
                {is:'E1', con:['E1', 'E0', null]},
            ]
        }, {
            Tw: 2,
            color: [0, 0, 0], 
            key: "corridor_", sufix:"#H8_I1",
            near:[
                {is:'B1', con:['B0', 'B1', null]},
                {is:'E0', con:['E1', null]},
                {is:'B1', con:['B0', 'B1', null]},
                {is:'E0', con:['E1', null]},
            ]

        }, { 
            Tw: 2,
            color: [0, 0, 0], 
            key: "corridor_detailed",
            near:[
                {is:'B1', con:['B0', 'B1', null]},
                {is:'E0', con:['E1', null]},
                {is:'B1', con:['B0', 'B1', null]},
                {is:'E0', con:['E1', null]},
            ]
        }, { 
            Tw: 1, 
            color: [0, 0, 0], 
            key: "corridor_window",
            near:[
                {is:'B1', con:['B0', 'B1', null]},
                {is:'E0', con:['E1', null]},
                {is:'B1', con:['B0', 'B1', null]},
                {is:'E0', con:['E1', null]},
            ]

        }, {
            Tw: 5,
            color: [0, 0, 0], 
            key: "corridor_corner",
            near:[
                {is:'B0', con:['B1', null]},
                {is:'E0', con:['E1', null]},
                {is:'E0', con:['E1', null]},
                {is:'B0', con:['B1', null]},
            ]
        }, { 
            Tw: 1, 
            color: [0, 0, 0], 
            key: "corridor_cornerRound", 
            near:[
                {is:'B0', con:['B1', null]},
                {is:'E0', con:['E1', null]},
                {is:'E0', con:['E1', null]},
                {is:'B0', con:['B1', null]},
            ]
        }, { 
            Tw: 5,
            color: [0, 0, 0], 
            key: "corridor_cross", 
            near:[
                {is:'B0', con:['B1', null]},
                {is:'B0', con:['B1', null]},
                {is:'B0', con:['B1', null]},
                {is:'B0', con:['B1', null]},
            ]
        }, { 
            Tw: 10, 
            color: [0, 0, 0], 
            key: "corridor_split",  
            near:[
                {is:'B0', con:['B1', null]},
                {is:'B0', con:['B1', null]},
                {is:'B0', con:['B1', null]},
                {is:'E0', con:['E1', null]},
            ]

        }, { 
            Tw: .001, 
            color: [0, 0, 0], 
            key: "corridor_corner",
            near:[
                {is:'B0', con:['B1', null]},
                {is:'E0', con:['E1', null]},
                {is:'E0', con:['E1', null]},
                {is:'B0', con:['B1', null]},
            ]
        }, { 
            Tw: .001, 
            color: [0, 0, 0], 
            key: "corridor_end",  
            allowMove:true,
            near:[
                {is:'E0', con:['E1', null]},
                {is:'E0', con:['E1', null]},
                {is:'B1', con:['B0', 'B1', null]},
                {is:'E0', con:['E1', null]},
            ]
        },
    ])}

    get BUILD_TILE_LIST_CLOSE() { return axeNextTileOfList([
        { 
            Tw: .001, 
            color: [0, 60, 0], 
            t: "empty",  
            allowMove:true,
            near:[
                {is:'E1', con:['E1', 'E0', null]},
                {is:'E1', con:['E1', 'E0', null]},
                {is:'E1', con:['E1', 'E0', null]},
                {is:'E1', con:['E1', 'E0', null]},
            ]
        }, {
            Tw: .001, 
            color: [0, 0, 0], 
            key: "corridor_end",  
            allowMove:true,
            near:[
                {is:'E0', con:['E1', null]},
                {is:'E0', con:['E1', null]},
                {is:'B0', con:['B0', 'B1', null]},
                {is:'E0', con:['E1', null]},
            ]
        },
        { 
            Tw: .001, 
            color: [0, 0, 0], 
            key: "corridor_end",  
            allowMove:true,
            near:[
                {is:'E0', con:['E1', null]},
                {is:'E0', con:['E1', null]},
                {is:'B1', con:['B0', 'B1', null]},
                {is:'E0', con:['E1', null]},
            ]
        },
    ])}
}





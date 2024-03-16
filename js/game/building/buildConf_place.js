import { axeNextTileOfList } from "./utils.js"



const _nE1 = ["E1", null]
const __Bx = ["B1", "B2", "B3", "B4"]


export class BuildConf_Place {
    constructor() {
        this.growLoopCount = 200;
        this.endLoopMax = 1000;
        this.buildEmpty = false;


        this.growTileTag = ['B0', "B1", "B2", "B3", "B4"]
        this.emptyTileTag = ["E0"]

    }

    get BUILD_TILE_START() { return { 
        Tm: "B1", 
        key: "structure_diagonal_SE", 
        near:[["B1"], ["B1"], ["B1"], ["B1"]]
    } }

    get BUILD_TILE_LIST_EMPTY() { return axeNextTileOfList([
        /*{ 
            Tm: "E0", Tw: 1, 
            t: "empty", x:'0',  
            near:[["B2", "B3", "B4"], null, _nE1,  null]
        },*/
    ])}

    get BUILD_TILE_LIST() { return axeNextTileOfList([

    { 
        Tm: "B0", Tw: 2,
        key: "structure_diagonal",
        near:[
            ["B1"], 
            ["B1"], 
            ["B1"], 
            ["B1"]
        ].map(x => [...x, null])
    }, {
        Tm: "B1", Tw: 8,
        key: "platform_center",
        near:[
            ['B0', "B1", "B2", "B3"], 
            ['B0', "B1", "B2", "B3"], 
            ['B0', "B1", "B2", "B3"], 
            ['B0', "B1", "B2", "B3"]
        ].map(x => [...x, null])
    }, {
        Tm: "B2", Tw: 5,
        key: "platform_side",
        near:[
            ['B1'], 
            ['B2', 'B3', 'B4', null], 
            ['E0', null], 
            ['B2', 'B3', 'B4', null]
        ]
    }, {
        Tm: "B3", Tw: 1,
        key: "platform_cornerDot",
        near:[
            ['B2', 'B4', null], 
            ['B1', null], 
            ['B1'], 
            ['B2', 'B4', null]
        ]
    }, {
        Tm: "B3", Tw: 1,
        key: "platform_cornerDot",
        near:[
            ['B2', 'B4', null], 
            ['B1', null], 
            ['B1'], 
            ['B2', 'B4', null]
        ]
    }, {
        Tm: "B4", Tw: 1,
        key: "platform_cornerOpen",
        near:[
            ['B2', 'B3'], 
            ['E0', null], 
            ['E0', null], 
            ['B2', 'B3', "B4", null]
        ]        
    }, {
        Tm: "B4", Tw: 1,
        key: "platform_cornerOpen",
        near:[
            ['B2', 'B3', "B4", null], 
            ['E0', null], 
            ['E0', null], 
            ['B2', 'B3']
        ]        
    }
])}

    get BUILD_TILE_LIST_CLOSE() { return axeNextTileOfList([

        { 
            Tm: "B1", Tw: .001,
            key: "platform_center",
            near:[
                ['B0', "B1", "B2", "B3"], 
                ['B0', "B1", "B2", "B3"], 
                ['B0', "B1", "B2", "B3"], 
                ['B0', "B1", "B2", "B3"]
            ].map(x => [...x, null])
        }, {
            Tm: "B2", Tw: 2,
            key: "platform_side",
            near:[
                ['B1'], 
                ['B2', 'B3', 'B4', null], 
                ['E0', null], 
                ['B2', 'B3', 'B4', null]
            ]
        }, {
            Tm: "B3", Tw: .001,
            key: "platform_cornerDot",
            near:[
                ['B2', 'B4', null], 
                ['B1', null], 
                ['B1'], 
                ['B2', 'B4', null]
            ]
        }, {
            Tm: "B3", Tw: .001,
            key: "platform_cornerDot",
            near:[
                ['B2', 'B4', null], 
                ['B1', null], 
                ['B1'], 
                ['B2', 'B4', null]
            ]
        }, {
            Tm: "B4", Tw: 1,
            key: "platform_cornerOpen",
            near:[
                ['B2', 'B3'], 
                ['E0', null], 
                ['E0', null], 
                ['B2', 'B3', "B4", null]
            ]        
        }, {
            Tm: "B4", Tw: 1,
            key: "platform_cornerOpen",
            near:[
                ['B2', 'B3', "B4", null], 
                ['E0', null], 
                ['E0', null], 
                ['B2', 'B3']
            ]        
        }

    ])}

}


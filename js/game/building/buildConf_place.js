import { axeNextTileOfList } from "./utils.js"



const _nE1 = ["E1", null]
const __Bx = ["B1", "B2", "B3", "B4"]


export class BuildConf_Place {
    constructor() {
        this.growLoopCount = 100;
        this.endLoopMax = 2000;
        this.buildEmpty = false;

        this.growTileTag = ['B0', "BsR", "BsL", "BcL1", "BcR1", "BcL2", "BcR2", 'BfR', 'BfL']
        this.emptyTileTag = ["E0", "E1"]

    }

    get BUILD_TILE_START() { return { 
        color: [255, 255, 255], 
        key: "structure_diagonal_SE", 
        near:[
            {is:'B0', con:['B0', null]},
            {is:'B0', con:['B0', null]},
            {is:'B0', con:['B0', null]},
            {is:'B0', con:['B0', null]},
        ]
    } }

    get BUILD_TILE_LIST_EMPTY() { return axeNextTileOfList([
        { 
            Tw: 1, 
            color: [255, 255, 255], 
            t: "empty",  
            near:[
                {is:'E1', con:['E1', 'E0', null]},
                {is:'E1', con:['E1', 'E0', null]},
                {is:'E1', con:['E1', 'E0', null]},
                {is:'E1', con:['E1', 'E0', null]},
            ]
        },
    ])}

    get BUILD_TILE_LIST() { return axeNextTileOfList([


    { 
        Tw: .00001, 
        color: [255, 255, 255], 
        t: "empty",  
        near:[
            {is:'E1', con:['E0', 'E1', null]},
            {is:'E1', con:['E0', 'E1', null]},
            {is:'E1', con:['E0', 'E1', null]},
            {is:'E1', con:['E0', 'E1', null]},
        ]
    },        

    { 
        Tw: 2,
        color: [255, 255, 255], 
        key: "platform_center",
        near:[
            {is:'B0', con:['B0', null]},
            {is:'B0', con:['B0', null]},
            {is:'B0', con:['B0', null]},
            {is:'B0', con:['B0', null]},
        ]
    }, {
        Tw: 3, 
        color: [255, 255, 255], 
        key: "platform_side",
        near:[
            {is:'B0', con:['B0']},
            {is:'BsR', con:['BsL', 'BcL1', 'BcL2', 'BfL', null]},
            {is:'E0', con:['E1', null]},
            {is:'BsL', con:['BsR', 'BcR1', 'BcR2', 'BfR', null]},
        ]
    }, {
        Tw: 1,
        color: [255, 255, 255], 
        key: "platform_cornerDot",
        near:[
            {is:'BcL2', con:['BsR', 'BfR', null]},
            {is:'B0', con:['B0', null]},
            {is:'B0', con:['B0', null]},
            {is:'BcR2', con:['BsL', 'BfL']},
        ]
    }, {
        Tw: 1,
        color: [255, 255, 255], 
        key: "platform_cornerDot",
        near:[
            {is:'BcL2', con:['BsR', 'BfR']},
            {is:'B0', con:['B0', null]},
            {is:'B0', con:['B0', null]},
            {is:'BcR2', con:['BsL', 'BfL', null]},
        ]
    }, {
        Tw: 1,
        color: [255, 255, 255], 
        key: "platform_cornerOpen",
        near:[
            {is:'BcR1', con:['BsL', 'BfL']},
            {is:'E0', con:['E1', null]},
            {is:'E0', con:['E1', null]},
            {is:'BcL1', con:['BsR', 'BfR', null]},
        ]        
    }, {
        Tw: 1,
        color: [255, 255, 255], 
        key: "platform_cornerOpen",
        near:[
            {is:'BcR1', con:['BsL', 'BfL', null]},
            {is:'E0', con:['E1', null]},
            {is:'E0', con:['E1', null]},
            {is:'BcL1', con:['BsR', 'BfR']},
        ]        
    }, {
        Tw: .001,
        color: [255, 255, 255], 
        key: "platform_cornerOpen",
        near:[
            {is:'BfR', con:['BsL', 'BcL1', 'BcL2']},
            {is:'E0', con:['E1', null]},
            {is:'E0', con:['E1', null]},
            {is:'BfL', con:['BsR', 'BcR1', 'BcR2']},
        ]        
    }, {
        Tw: .001,
        color: [255, 255, 255], 
        key: "platform_cornerOpen",
        near:[
            {is:'BfR', con:['BsL', 'BcL1', 'BcL2']},
            {is:'E0', con:['E1', null]},
            {is:'E0', con:['E1', null]},
            {is:'BfL', con:['BsR', 'BcR1', 'BcR2']},
        ]        

    }
])}

    get BUILD_TILE_LIST_CLOSE() { return axeNextTileOfList([


        { 
            Tw: .00001, 
            color: [255, 255, 255], 
            t: "empty",  
            near:[
                {is:'E1', con:['E0', 'E1', null]},
                {is:'E1', con:['E0', 'E1', null]},
                {is:'E1', con:['E0', 'E1', null]},
                {is:'E1', con:['E0', 'E1', null]},
            ]
        },        
    
        { 
            Tw: .0002,
            color: [255, 255, 255], 
            key: "platform_center",
            near:[
                {is:'B0', con:['B0', null]},
                {is:'B0', con:['B0', null]},
                {is:'B0', con:['B0', null]},
                {is:'B0', con:['B0', null]},
            ]
        }, {
            Tw: 3, 
            color: [255, 255, 255], 
            key: "platform_side",
            near:[
                {is:'B0', con:['B0']},
                {is:'BsR', con:['BsL', 'BcL1', 'BcL2', 'BfL', null]},
                {is:'E0', con:['E1', null]},
                {is:'BsL', con:['BsR', 'BcR1', 'BcR2', 'BfR', null]},
            ]
        }, {
            Tw: .01,
            color: [255, 255, 255], 
            key: "platform_cornerDot",
            near:[
                {is:'BcL2', con:['BsR', 'BfR', null]},
                {is:'B0', con:['B0', null]},
                {is:'B0', con:['B0', null]},
                {is:'BcR2', con:['BsL', 'BfL']},
            ]
        }, {
            Tw: .01,
            color: [255, 255, 255], 
            key: "platform_cornerDot",
            near:[
                {is:'BcL2', con:['BsR', 'BfR']},
                {is:'B0', con:['B0', null]},
                {is:'B0', con:['B0', null]},
                {is:'BcR2', con:['BsL', 'BfL', null]},
            ]
        }, {
            Tw: 10,
            color: [255, 255, 255], 
            key: "platform_cornerOpen",
            near:[
                {is:'BcR1', con:['BsL', 'BfL']},
                {is:'E0', con:['E1', null]},
                {is:'E0', con:['E1', null]},
                {is:'BcL1', con:['BsR', 'BfR', null]},
            ]        
        }, {
            Tw: 10,
            color: [255, 255, 255], 
            key: "platform_cornerOpen",
            near:[
                {is:'BcR1', con:['BsL', 'BfL', null]},
                {is:'E0', con:['E1', null]},
                {is:'E0', con:['E1', null]},
                {is:'BcL1', con:['BsR', 'BfR']},
            ]        
        }, {
            Tw: .001,
            color: [255, 255, 255], 
            key: "platform_cornerOpen",
            near:[
                {is:'BfR', con:['BsL', 'BcL1', 'BcL2']},
                {is:'E0', con:['E1', null]},
                {is:'E0', con:['E1', null]},
                {is:'BfL', con:['BsR', 'BcR1', 'BcR2']},
            ]        
        }, {
            Tw: .001,
            color: [255, 255, 255], 
            key: "platform_cornerOpen",
            near:[
                {is:'BfR', con:['BsL', 'BcL1', 'BcL2']},
                {is:'E0', con:['E1', null]},
                {is:'E0', con:['E1', null]},
                {is:'BfL', con:['BsR', 'BcR1', 'BcR2']},
            ]        
        }

    ])}

}


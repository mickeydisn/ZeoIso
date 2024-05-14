import { AbstractWcBuildConf } from "./AbstractBuildConf.js";




export class WcBuildConf_House4a extends AbstractWcBuildConf {
    constructor(conf={}) {
        super(conf)

        this.faceLinkWeight = {
            'X' : 1,
            
            'Ci': 4,
            'Cr' : 6,
            'Cl' : 6,
            
            'Wo': 0,
            'WoD': 0,
            'SWoD': 8,

            'Wi': 8,
            'WiD': 8,

            'Wr' : 10,
            'Wl' : 10,
            
            'A' : 10,

        }

        this.faceLinks = [
            ['X', 'X', 1],

            ['X', 'Ci', 1],
            ['Ci', 'X', 1],

            ['Cl', 'Cr', 1],
            ['Cr', 'Cl', 1],

            ['Wo', 'Wi', 1],
            ['Wi', 'Wo', 1],

            ['Wo', 'WiD', 1],
            ['WiD', 'Wo', 1],

            ['SWoD', 'WiD', 1],
            ['WiD', 'SWoD', 1],


            ['Wl', 'Wr', 1],
            ['Wr', 'Wl', 1],

            ['A', 'A', 1],
        ]


    }

    preInit() {
        // this.ROOF_PREFIX = "roofHigh"
        this.ROOF_PREFIX = "roof"
        // this.WALL_PREFIX = "wWllWood"
        this.WALL_PREFIX = "wall"

        // this.ROOF_SUFFIX = '#H0_S100_C100_B100' // '#H190_S75_C75_B125'
        // this.WALL_SUFFIX = '#H0_S100_C100_B100' // '#H200_S20_C135_B105'
        // this.WALL_SUFFIX = '#H0_S120_C70_B115'
        this.ROOF_SUFFIX = '#H0_S100_C100_B100' // '#H190_S75_C75_B125'
        this.WALL_SUFFIX = '#H170_S120_C70_B115' // '#H200_S20_C135_B105'

    }

    get __TILE_START() { return {  
        face: ['SWoD', 'Cl', 'Ci', 'Cr'],
        items: [
            { weight:0, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [/*...actionsEmptyFlat*/], items:[
                // {h:1, key: "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                {h:0, key: "platform_side", keyR:0, sufix:this.WALL_SUFFIX },
            ]},
        ]
    }}

    get __TILE_LIST() { 
        console.log('__TILE_LIST', this.mWinLvl)
        const actionsEmptyFlat = [
            {func:"lvlAvgSquare",size:5},
            {func:"lvlAvgSquare", size:7},
            // {func:"setFrise", isFrise:true},
            // this.tile.isFrise = true
        ]
        const actionsEmpty = [
            {func:"lvlAvgSquare",size:5},
            {func:"lvlAvgSquare", size:7},
        ]


        return [
            
            // X - null
            {
                face: ['X', null, null, null],
                items: [
                    { weight:0, colorT: [0, 20, 0], allowMove:true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, {
                face: ['X', 'X', null, null],
                items: [
                    { weight:0, colorT: [0, 30, 0],  allowMove:true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, {
                face: ['X', null, 'X', null],
                items: [
                    { weight:0, colorT: [0, 30, 0],  allowMove:true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, {
                face: ['X', 'X', 'X', null],
                items: [
                    { weight:0, colorT: [0, 40, 0],  allowMove:true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, 
            // == X ===
            {
                face: ['X', 'X', 'X', 'X'],
                items: [
                    { weight:0, colorT: [0, 50, 0],  allowMove:true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, 

            /// W - C 
            {
                face: ['Wo', 'Cl', 'Ci', 'Cr'],
                items: [
                    { weight:0, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        // {h:1, key: "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                        {h:0, key: "platform_side", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            }, {
                face: ['Wo', 'Wo', 'Cl', 'Cr'],
                items: [
                    { weight:0, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        // {h:1, key: "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                        {h:0, key: "platform_cornerDot", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            }, {
                face: ['Ci', 'Ci', 'Cr', 'Cl'],
                items: [
                    { weight:0, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        // {h:1, key: "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                        {h:0, key: "platform_cornerOpen", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            }, 

            /// A - Wi 
            {
                face: ['A', 'Wi', 'WiD', 'Wi'],
                items: [
                    { weight:0, color: [128, 128, 128],  allowMove:false, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "platform_center", keyR:0, sufix:this.WALL_SUFFIX },
                        {h:0, key: "corridor_end", keyR:2, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            } , {
                face: ['A', 'Wi', 'A', 'Wi'],
                items: [
                    { weight:30, color: [128, 128, 128],  allowMove:false, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight:10, color: [128, 128, 128],  allowMove:false, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_detailed", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight:10, color: [128, 128, 128],  allowMove:false, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_window", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            }, {
                face: ['A', 'A', 'Wi', 'Wi'],
                items: [
                    { weight:10, color: [128, 128, 128],  allowMove:false, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_corner", keyR:3, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight:10, color: [128, 128, 128],  allowMove:false, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "platform_center", keyR:0, sufix:this.WALL_SUFFIX },
                        {h:0, key: "corridor_cornerRound", keyR:3, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            }, {
                face: ['A', 'A', 'A', 'Wi'],
                items: [
                    { weight:20, color: [128, 128, 128],  allowMove:false, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_split", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            }, 
            /// A 
            {
                face: ['A', 'A', 'A', 'A'],
                items: [
                    { weight:20, color: [128, 128, 128],  allowMove:false, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_cross", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            }            

          
    ]


    }

}





/*
wWllWoodCorner

wWllWoodCornerDiagonWl

wWllWood
wWllWoodDetWilCross
wWllWoodDetWilDiagonWl
wWllWoodDetWilHorizontWl


wWllWoodDoor
wWllWoodWindowGlass
wWllWoodWindowShutters

*/

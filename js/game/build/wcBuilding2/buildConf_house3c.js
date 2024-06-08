import { AbstractWcBuildConf, shiftArrayByOne } from "./AbstractBuildConf.js";


export class WcBuildConf_House3b extends AbstractWcBuildConf {
    constructor(conf={}) {
        super(conf)

        this.faceLinkWeight = {
            
            'P1' : 0,
            
            'Sx' : 0,
            'SBl' : 0,
            'SBr' : 0,

            'S0o' : 0,
            'S0i' : 0,
            'WoDs': 0,

            'X' : 1,
            // 'X0': 0,
            // '0X': 2,


            'Bl': 4,
            'Br': 4,

            'Br2': 5,
            'Bl2': 5,

            '0' : 6,
            'Wo': 6,


            'Wi': 12,
            'WiD': 12,
            'WoD': 12,
            'Wr' : 16,
            'Wl' : 16,
            'A' : 20,


        }

        this.faceLinks = [

            ['P1',  'X'],
            ['X',  'P1'],

            ['P1',  'Sx'],
            ['Sx',  'P1'],

            [ 'X', 'X', 1],

            ['Sx', 'Sx', 1],

            // ['Sx', 'X', 1],
            // [ 'X', 'Sx', 1],
            // -----------
            
            ['SBl', 'SBr', 1],
            ['SBr', 'SBl', 1],


            ['S0o', 'S0i', 1],
            ['S0i', 'S0o', 1],

            // -----------

            ['Bl', 'Br', 1],
            ['Br', 'Bl', 1],

            ['Bl2', 'Br2', 1],
            ['Br2', 'Bl2', 1],


            ['0', '0', 1],
            ['Wo', 'Wi', 1],
            ['Wi', 'Wo', 1],

            ['Wo', 'WiD', 1],
            ['WiD', 'Wo', 1],
            
            ['WoD', 'WiD', 1],
            ['WiD', 'WoD', 1],

            ['WiD', 'WoDs', 1],
            ['WoDs', 'WiD', 1],

            ['WoDs', 'WiDs', 1],
            ['WiDs', 'WoDs', 1],


            
            ['Wl', 'Wr', 1],
            ['Wr', 'Wl', 1],

            ['A', 'A', 1],

            // -----

        ]


    }

    preInit() {
        //  this.ROOF_PREFIX = "roofHigh"
        this.ROOF_PREFIX = "roof"
        // this.WALL_PREFIX = "wallWood"
        this.WALL_PREFIX = "wall"

        this.ROOF_SUFFIX = '#H0_S0_C128_B64' // '#H190_S75_C75_B125'
        // this.WALL_SUFFIX = '#H0_S64_C128_B128' // '#H200_S20_C135_B105'
        this.WALL_SUFFIX = '#H210_C115_S35_B120'

    }

    get __TILE_START() { return  {
            face: ['SBr', 'S0o', 'SBl', 'Sx'],
            items: [
                { weight:.1, color: [32, 32, 32], emtpy: true, isFrise: true, allowMove:true},
                // { weight:0, colorT: [255, 255, 255], key: "platform_side", keyR:3,  allowMove:true},
            ]
        }
    }

    get __TILE_LIST() { 

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
 
            // Conect Start to Dor
          // face: ['S1Br', 'S0', 'S1Bl', 'S1x'],
            {
                face: ['WoDs', '0', 'S0i', '0'],
                items: [
                    { weight:0, color: [52, 52, 52], allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        // {h:2, key: "fence_simple", keyR:1, sufix:this.ROOF_SUFFIX },
                    ]},
                ]
            }, 

            {
                face: ['SBr', '0', 'Bl', 'Sx'],
                items: [
                    { weight:0, color: [52, 52, 52],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {h:0, key: "fence_simple", keyR:1, sufix:this.ROOF_SUFFIX },
                    ]},
                ]
            },
            {
                face: ['Br', '0', 'SBl', 'Sx'],
                items: [
                    { weight:0, color: [52, 52, 52],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {h:0, key: "fence_simple", keyR:1, sufix:this.ROOF_SUFFIX },
                    ]},
                ]
            },
            {
                face: ['SBr', 'Bl', 'Sx', 'Sx'],
                items: [
                    { weight:0, color: [52, 52, 52],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {h:0, key: "fence_corner", keyR:2, sufix:this.ROOF_SUFFIX },
                    ]},
                ]
            },
            {
                face: ['Br', 'SBl', 'Sx', 'Sx'],
                items: [
                    { weight:0, color: [52, 52, 52],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {h:0, key: "fence_corner", keyR:2, sufix:this.ROOF_SUFFIX },
                    ]},
                ]
            },

            {
                face: ['Sx', 'X', 'X', 'X'],
                items: [
                    { weight:0, color: [52, 52, 52],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        // {h:0, key: "fence_corner", keyR:2, sufix:this.ROOF_SUFFIX },
                    ]},
                ]
            },


            {
                face: ['Wr', 'Wl', 'WiDs', 'Wi'],
                items: [
                    { weight: 0, color: [128, 128, 128], isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {h:1, key: this.ROOF_PREFIX + "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                        {h:0, key: this.WALL_PREFIX + "WindowGlass", keyR:1, sufix:this.WALL_SUFFIX },
                        {h:0, key: this.WALL_PREFIX + "Door", keyR:2, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            },
            {
                face: ['Wr', 'Wl', 'Wi', 'WiDs'],
                items: [
                    { weight: 0, color: [128, 128, 128], isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {h:1, key: this.ROOF_PREFIX + "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                        {h:0, key: this.WALL_PREFIX + "Door", keyR:3, sufix:this.WALL_SUFFIX },
                        {h:0, key: this.WALL_PREFIX + "WindowGlass", keyR:2, sufix:this.WALL_SUFFIX },
                    ]},                    
                ]
            },


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


            {
                face: ['Br', 'Bl', 'X', 'X'],
                items: [
                    { weight:0, colorT: [128, 128, 128], allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {h:0, key: "fence_corner", keyR:2, sufix:this.ROOF_SUFFIX },
                    ]},
                ]
            }, {
                face: ['Br', '0', 'Bl', 'X'],
                items: [
                    { weight:0, colorT: [128, 128, 128],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {h:0, key: "fence_simple", keyR:1, sufix:this.ROOF_SUFFIX },
                    ]},

                    // { weight:0, colorT: [255, 255, 255], key: "platform_side", keyR:3,  allowMove:true},
                ]
            }, 
            {
                face: ['0', '0', 'Bl', 'Br'],
                items: [
                    { weight:0, colorT: [128, 128, 128],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], empty:true},
                    // { weight:0, colorT: [255, 255, 255], key: "platform_cornerDot", keyR:1,  allowMove:true},
                ]
            }, 
            // == 0 ===
            {
                face: ['0', '0', '0', '0'],
                items: [
                    { weight:0, colorT: [128, 128, 128],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], empty:true},
                ]
            }, 
            /// O - A 
            {
                face: ['Wo', '0', '0', '0'],
                items: [
                    { weight:.1, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], empty:true},
                ]
            }, {
                face: ['Wo', 'Wo', '0', '0'],
                items: [
                    { weight:.1, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], empty:true},
                    // { weight:.1, colorT: [255, 255, 255], key: "platform_cornerOpen", sufix: "#H50", keyR:1,  allowMove:true},
                    // { weight:.1, colorT: [255, 255, 255], key: "platform_cornerDot", sufix: "#H50", keyR:1,  allowMove:true},

                ]
            }, 
            /// A - 0 
            {
                face: ['A', 'A', 'Wl', 'Wr'],
                items: [
                    {weight: 4, color: [0, 0, 0], h:1, allowMove:false, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {h:1, key: this.ROOF_PREFIX + "CornerInner", keyR:3, sufix:this.ROOF_SUFFIX },
                    ]},

                ],
            }, {
                face: ['Wr', 'A', 'Wl', 'WiD'],
                items: [
                    { weight: 0, color: [0, 0, 0], allowMove:false, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {h:1, key: this.ROOF_PREFIX + "", keyR:3, sufix:this.ROOF_SUFFIX },
                        {h:0, key: this.WALL_PREFIX + "Door", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                    
                ]
            }, {
                face: ['Wr', 'A', 'Wl', 'Wi'],
                items: [
                    { weight: .1, color: [0, 0, 0], allowMove:false, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {h:1, key: this.ROOF_PREFIX + "", keyR:3, sufix:this.ROOF_SUFFIX },
                        {h:0, key: this.WALL_PREFIX + "Door", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight: 4, color: [0, 0, 0], allowMove:false, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {h:1, key: this.ROOF_PREFIX + "", keyR:3, sufix:this.ROOF_SUFFIX },
                        {h:0, key: this.WALL_PREFIX + "WindowGlass", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight: 4, color: [0, 0, 0], allowMove:false, isFrise: true,  functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {h:1, key: this.ROOF_PREFIX + "Window", keyR:3, sufix:this.ROOF_SUFFIX },
                        {h:0, key: this.WALL_PREFIX + "WindowGlass", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                    
                ]
            },
            {
                face: ['A', 'A', 'A', 'A'],
                items: [
                    { weight: 2, color: [0, 0, 0], allowMove:false, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {h:2, key: this.ROOF_PREFIX + "Point", keyR:3, sufix:this.ROOF_SUFFIX },
                        {h:1, key: this.WALL_PREFIX + "Block", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},

                    // { weight: .5, colorT: [0, 0, 0], h:2.15, key: this.ROOF_PREFIX + "Flat", keyR:3},
                    // { weight: .5, colorT: [0, 0, 0], h:3, key: this.ROOF_PREFIX + "Point", keyR:3},
                ]
            },

            {
                face: ['Wr', 'Wl', 'Wi', 'Wi'],
                items: [
                    { weight: .1, color: [128, 128, 128], allowMove:false, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {h:1, key: this.ROOF_PREFIX + "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                        {h:0, key: this.WALL_PREFIX + "Corner", keyR:2, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight: .1, color: [128, 128, 128], allowMove:false, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {h:1, key: this.ROOF_PREFIX + "CornerRound", keyR:3, sufix:this.ROOF_SUFFIX },
                        {h:0, key: this.WALL_PREFIX + "CornerDiagonal", keyR:2, sufix:this.WALL_SUFFIX },
                    ]},
                    
                ]
            },


    ]}

}





/*
wallWoodCorner

wallWoodCornerDiagonal

wallWood
wallWoodDetailCross
wallWoodDetailDiagonal
wallWoodDetailHorizontal


wallWoodDoor
wallWoodWindowGlass
wallWoodWindowShutters

*/

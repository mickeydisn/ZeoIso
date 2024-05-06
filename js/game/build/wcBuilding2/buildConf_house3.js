import { AbstractWcBuildConf } from "./AbstractBuildConf.js";




export class WcBuildConf_House3 extends AbstractWcBuildConf {
    constructor(conf={}) {
        super(conf)

        this.faceLinkWeight = {
            'X' : 0,
            'X0': 0,
            '0X': 2,

            '0XL': 4,
            '0XR': 4,

            '0XR2': 5,
            '0XL2': 5,

            '0' : 6,
            '0A': 0,


            'A0': 8,
            'AR' : 10,
            'AL' : 10,
            'A' : 10,

        }

        this.faceLinks = [
            ['X', 'X', 1],
            ['X0', '0X', 1],

            ['0X', 'X0', 1],
            ['0XL', '0XR', 1],
            ['0XR', '0XL', 1],

            ['0XL2', '0XR2', 1],
            ['0XR2', '0XL2', 1],


            ['0', '0', 1],
            ['0A', 'A0', 1],

            ['A0', '0A', 1],

            ['AL', 'AR', 1],
            ['AR', 'AL', 1],

            ['A', 'A', 1],
        ]


    }

    preInit() {
         this.ROOF_PREFIX = "roofHigh"
        // this.ROOF_PREFIX = "roof"
        // this.WALL_PREFIX = "wallWood"
        this.WALL_PREFIX = "wall"

        this.ROOF_SUFFIX = '#H0_S0_C128_B64' // '#H190_S75_C75_B125'
        this.WALL_SUFFIX = '#H0_S64_C128_B128' // '#H200_S20_C135_B105'

    }

    get __TILE_START() { return {    
        face: ['A', 'A', 'A', 'A'],
        items: [
            { weight: .5, color: [0, 0, 0], isFrise: true, functions: [
                //...actionsEmptyFlat
            ], items:[
                {t:'Svg', h:2, key: this.ROOF_PREFIX + "Point", keyR:3, sufix:this.ROOF_SUFFIX },
                {t:'Svg', h:1.5, key: this.WALL_PREFIX + "BlockHalf", keyR:0, sufix:this.WALL_SUFFIX },
            ]},

            // { weight: .5, colorT: [0, 0, 0], h:2.15, key: this.ROOF_PREFIX + "Flat", keyR:3},
            // { weight: .5, colorT: [0, 0, 0], h:3, key: this.ROOF_PREFIX + "Point", keyR:3},
        ]
        /*     
        face: ['AR', 'A', 'AL', 'A0'],
        items: [
            { weight: 1, color: [0, 0, 0], isFrise: true, allowMove:true, functions: [
                // ...actionsEmptyFlat
            ], items:[
                {t:'Svg', h:1, key: this.ROOF_PREFIX + "", keyR:3, sufix:this.ROOF_SUFFIX },
                {t:'Svg', h:0, key: this.WALL_PREFIX + "Door", keyR:1, sufix:this.WALL_SUFFIX },
            ]},
        ]
        */
    }}

    get __TILE_LIST() { 
        console.log('__TILE_LIST', this.mainLvl)

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
            /// O - 0X
            {
                face: ['X0', 'X', 'X', 'X'],
                items: [
                    { weight:0, colorT: [0, 50, 20],  allowMove:true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, {
                face: ['X0', 'X0', 'X', 'X'],
                items: [
                    { weight:0, colorT: [0, 50, 30],  allowMove:true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, 


/*


platform_side
platform_cornerOpen
platform_cornerDot

fence_simple
fence_corner
fence_simpleDiagonal




*/
            /// O - 0X
            {
                face: ['0', '0X', '0X', '0X'],
                items: [
                    { weight:0, colorT: [0, 50, 50],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ]},
                ]
            }, {
                face: ['0XR', '0XL', '0X', '0X'],
                items: [
                    { weight:0, colorT: [255, 255, 255], key: "fence_corner", keyR:2,  allowMove:true},
                    // { weight:0, colorT: [255, 255, 255], key: "platform_cornerOpen", keyR:3,  allowMove:true},
                ]
            }, {
                face: ['0XR', '0', '0XL', '0X'],
                items: [
                    { weight:0, colorT: [255, 255, 255], key: "fence_simple", keyR:1,  allowMove:true},
                    // { weight:0, colorT: [255, 255, 255], key: "platform_side", keyR:3,  allowMove:true},
                ]
            }, 
            {
                face: ['0', '0', '0XL', '0XR'],
                items: [
                    { weight:0, colorT: [255, 0, 50],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ]},
                    // { weight:0, colorT: [255, 255, 255], key: "platform_cornerDot", keyR:1,  allowMove:true},
                ]
            }, 
            // == 0 ===
            {
                face: ['0', '0', '0', '0'],
                items: [
                    { weight:0, color: [192, 192, 192],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ]},
                ]
            }, 
            /// O - A 
            {
                face: ['0A', '0', '0', '0'],
                items: [
                    { weight:.1, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ]},
                ]
            }, {
                face: ['0A', '0A', '0', '0'],
                items: [
                    { weight:.1, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ]},
                    // { weight:.1, colorT: [255, 255, 255], key: "platform_cornerOpen", sufix: "#H50", keyR:1,  allowMove:true},
                    // { weight:.1, colorT: [255, 255, 255], key: "platform_cornerDot", sufix: "#H50", keyR:1,  allowMove:true},

                ]
            }, 
            /// A - 0 
            {
                face: ['A', 'A', 'AL', 'AR'],
                items: [
                    {weight: 4, color: [0, 0, 0], h:1, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], key: this.ROOF_PREFIX + "CornerInner", keyR:3, sufix:this.ROOF_SUFFIX },

                ],
            }, {
                face: ['AR', 'A', 'AL', 'A0'],
                items: [
                    { weight: 1, color: [0, 0, 0], isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {t:'Svg', h:1, key: this.ROOF_PREFIX + "", keyR:3, sufix:this.ROOF_SUFFIX },
                        {t:'Svg', h:0, key: this.WALL_PREFIX + "Door", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight: 1, color: [0, 0, 0], isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {t:'Svg', h:1, key: this.ROOF_PREFIX + "", keyR:3, sufix:this.ROOF_SUFFIX },
                        {t:'Svg', h:0, key: this.WALL_PREFIX + "WindowGlass", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight: 2, color: [0, 0, 0], isFrise: true,  functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {t:'Svg', h:1, key: this.ROOF_PREFIX + "Window", keyR:3, sufix:this.ROOF_SUFFIX },
                        {t:'Svg', h:0, key: this.WALL_PREFIX + "WindowGlass", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                    
                ]
            },
            {
                face: ['A', 'A', 'A', 'A'],
                items: [
                    { weight: .5, color: [0, 0, 0], isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {t:'Svg', h:2, key: this.ROOF_PREFIX + "Point", keyR:3, sufix:this.ROOF_SUFFIX },
                        {t:'Svg', h:1.5, key: this.WALL_PREFIX + "BlockHalf", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},

                    // { weight: .5, colorT: [0, 0, 0], h:2.15, key: this.ROOF_PREFIX + "Flat", keyR:3},
                    // { weight: .5, colorT: [0, 0, 0], h:3, key: this.ROOF_PREFIX + "Point", keyR:3},
                ]
            },

            {
                face: ['AR', 'AL', 'A0', 'A0'],
                items: [
                    { weight: .1, color: [128, 128, 128], isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {t:'Svg', h:1, key: this.ROOF_PREFIX + "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                        {t:'Svg', h:0, key: this.WALL_PREFIX + "Corner", keyR:2, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight: .1, color: [128, 128, 128], isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {t:'Svg', h:1, key: this.ROOF_PREFIX + "CornerRound", keyR:3, sufix:this.ROOF_SUFFIX },
                        {t:'Svg', h:0, key: this.WALL_PREFIX + "CornerDiagonal", keyR:2, sufix:this.WALL_SUFFIX },
                    ]},
                    
                ]
            },


    ]


    }

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

import { AbstractWcBuildConf } from "./AbstractBuildConf.js";




export class WcBuildConf_House5 extends AbstractWcBuildConf {
    constructor(conf={}) {
        super(conf)

        this.faceLinkWeight = {
            'X' : 0,
            'Bo': 0,
            'Bi': 1,

            'Bl': 2,
            'Br': 2,

            '0' : 0,
            // 'Ci': 8,
            
            'Ci': 4,
            'Cr' : 6,
            'Cl' : 6,
            
            'Wo': 0,
            'Wi': 8,
            'Wr' : 10,
            'Wl' : 10,
            'Wrx' : 10,
            'Wlx' : 10,
            
            'A' : 10,
            'Ao' : 10,
            'Ai' : 12,

        }

        this.faceLinks = [
            ['X', 'X', 1],

            ['Bo', 'Bi', 1],
            ['Bi', 'Bo', 1],

            ['Bl', 'Br', 1],
            ['Br', 'Bl', 1],

            ['0', 'Ci', 1],
            ['Ci', '0', 1],

            ['Cl', 'Cr', 1],
            ['Cr', 'Cl', 1],

            ['Wo', 'Wi', 1],
            ['Wi', 'Wo', 1],

            ['Wl', 'Wr', 1],
            ['Wr', 'Wl', 1],

            ['Wlx', 'Wr', 1],
            ['Wrx', 'Wl', 1],
            ['Wl', 'Wrx', 1],
            ['Wr', 'Wlx', 1],


            ['A', 'A', 1],

            ['Ao', 'Ao', 1],

            ['Ao', 'Ai', 1],
            ['Ai', 'Ao', 1],
        ]


    }

    preInit() {
        // this.ROOF_PREFIX = "roofHigh"
        this.ROOF_PREFIX = "roof"
        // this.WALL_PREFIX = "wWllWood"
        this.WALL_PREFIX = "wall"

        this.ROOF_SUFFIX = '#H0_S100_C100_B100' // '#H190_S75_C75_B125'
        this.WALL_SUFFIX = '#H170_S120_C70_B115' // '#H200_S20_C135_B105'
        // this.WALL_SUFFIX = '#H350_S70_C100_B70_I'
    }

    get __TILE_START() { return {    
        face: ['A', 'A', 'A', 'A'],
        items: [
            { weight: .5, color: [0, 0, 0], isFrise: true, functions: [
                //...actionsEmptyFlat
            ], items:[
                {h:2, key: this.ROOF_PREFIX + "Point", keyR:3, sufix:this.ROOF_SUFFIX },
                {h:1.5, key: this.WALL_PREFIX + "BlockHalf", keyR:0, sufix:this.WALL_SUFFIX },
            ]},
            
            // { weight: .5, colorT: [0, 0, 0], h:2.15, key: this.ROOF_PREFIX + "Flat", keyR:3},
            // { weight: .5, colorT: [0, 0, 0], h:3, key: this.ROOF_PREFIX + "Point", keyR:3},
        ]
        /*     
        face: ['Wr', 'A', 'Wl', 'Wi'],
        items: [
            { weight: 1, color: [0, 0, 0], isFrise: true, allowMove:true, functions: [
                // ...actionsEmptyFlat
            ], items:[
                {h:1, key: this.ROOF_PREFIX + "", keyR:3, sufix:this.ROOF_SUFFIX },
                {h:0, key: this.WALL_PREFIX + "Door", keyR:1, sufix:this.WALL_SUFFIX },
            ]},
        ]
        */
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
            /// O - Bi
            {
                face: ['Bo', 'X', 'X', 'X'],
                items: [
                    { weight:0, colorT: [0, 50, 20],  allowMove:true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, {
                face: ['Bo', 'Bo', 'X', 'X'],
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
fence_simpleDiagonWl




*/
            /// O - Bi
            {
                face: ['0', 'Bi', 'Bi', 'Bi'],
                items: [
                    { weight:0, colorT: [0, 50, 50],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ]},
                ]
            }, {
                face: ['Br', 'Bl', 'Bi', 'Bi'],
                items: [
                    { weight:0, color: [128, 128, 128], allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "hedgeCorner", keyR:2, sufix:'#H40'},
                    ]}
                    // { weight:0, colorT: [255, 255, 255], key: "fence_corner", keyR:2,  allowMove:true},
                    // { weight:0, colorT: [255, 255, 255], key: "platform_cornerOpen", keyR:3,  allowMove:true},
                ]
            }, {
                face: ['Br', '0', 'Bl', 'Bi'],
                items: [
                    { weight:0, color: [128, 128, 128], allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "hedge", keyR:1, sufix:'#H40'},
                    ]}
                    // { weight:0, colorT: [255, 255, 255], key: "fence_simple", keyR:1,  allowMove:true},
                    // { weight:0, colorT: [255, 255, 255], key: "platform_side", keyR:3,  allowMove:true},
                ]
            }, 
            {
                face: ['0', '0', 'Bl', 'Br'],
                items: [
                    { weight:0, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        // {h:0, key: "hedge", keyR:1, sufix:'#H40'},
                    ]}
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
            /*
            {
                face: ['Wo', '0', '0', '0'],
                items: [
                    { weight:.1, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ]},
                ]
            }, {
                face: ['Wo', 'Wo', '0', '0'],
                items: [
                    { weight:.1, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ]},
                    // { weight:.1, colorT: [255, 255, 255], key: "platform_cornerOpen", sufix: "#H50", keyR:1,  allowMove:true},
                    // { weight:.1, colorT: [255, 255, 255], key: "platform_cornerDot", sufix: "#H50", keyR:1,  allowMove:true},

                ]
            }, 
            */

            /// O - A 
            // R , L  W W { weight:0, colorT: [255, 255, 255], key: "platform_cornerOpen", keyR:3,  allowMove:true},
            // R O L W { weight:0, colorT: [255, 255, 255], key: "platform_side", keyR:3,  allowMove:true},
            // O O L R { weight:1, colorT: [255, 255, 255], key: "platform_cornerDot", sufix:"#H90", keyR:1,  allowMove:true},
            // { weight:0, colorT: [0, 0, 0], key: "platform_center", keyR:2,  allowMove:true, }

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


            /*

            /// A - Wi 
            {
                face: ['A', 'Wi', 'Wi', 'Wi'],
                items: [
                    { weight:0, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_end", keyR:2, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            } , {
                face: ['A', 'Wi', 'A', 'Wi'],
                items: [
                    { weight:30, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight:10, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_detailed", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight:10, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_window", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            }, {
                face: ['A', 'A', 'Wi', 'Wi'],
                items: [
                    { weight:10, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_corner", keyR:3, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight:10, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_cornerRound", keyR:3, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            }, {
                face: ['A', 'A', 'A', 'Wi'],
                items: [
                    { weight:10, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_split", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            }, 
            /// A 
            {
                face: ['A', 'A', 'A', 'A'],
                items: [
                    { weight:10, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_cross", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            }            
            */
            /// A - 0 
            /*
            {weight: 6, colorT: [0, 0, 0], key: "corridor_"},
            { weight: 1, colorT: [0, 0, 0], key: "corridor_corner", keyR:3,  },
            { weight: 6, colorT: [0, 0, 0], key: "corridor_split", keyR:0},
            { weight: 1, colorT: [0, 0, 0], key: "corridor_cross"},

            // structure_closed_NE
            */
            {
                face: ['Wr', 'Wl', 'Wi', 'Wi'],
                items: [
                    { weight: .2, color: [128, 128, 128], isFrise: true,  functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_corner", keyR:3, sufix:this.WALL_SUFFIX },
                        {h:.8, key: "corridor_corner", keyR:3, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight: .2, color: [128, 128, 128], isFrise: true,  functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "platform_center", keyR:0, sufix:this.WALL_SUFFIX },
                        {h:0, key: "corridor_cornerRound", keyR:3, sufix:this.WALL_SUFFIX },
                        {h:.8, key: "corridor_cornerRound", keyR:3, sufix:this.WALL_SUFFIX },
                    ]},
                    
                ]
            },
            {
                face: ['Wr', 'A', 'Wl', 'Wi'],
                items: [
                    { weight: 2, color: [0, 0, 0], isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "structure_closed", keyR:2, sufix:this.WALL_SUFFIX },
                        {h:.8, key:  "corridor_split", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight: 2, color: [0, 0, 0], isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_wall", keyR:2, sufix:this.WALL_SUFFIX },
                        {h:.8, key:  "corridor_split", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight: 2, color: [0, 0, 0], isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_detailed", keyR:2, sufix:this.WALL_SUFFIX },
                        {h:.8, key:  "corridor_split", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight: 2, color: [0, 0, 0], isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_window", keyR:2, sufix:this.WALL_SUFFIX },
                        {h:.8, key:  "corridor_split", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            },


            {
                face: ['A', 'A', 'Wlx', 'Wrx'],
                items: [
                    {weight: 5, color: [0, 0, 0], isFrise: true, functions: [...actionsEmptyFlat], items:[
                        
                        // {h:0, key: "corridor_wall", keyR:1, sufix:this.WALL_SUFFIX },

                        {h:.8, key: "corridor_cross", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                ],
            }, 
            
            
            /// ----------------

            {
                face: ['Wr', 'Ao', 'Wl', 'Wi'],
                items: [
                    { weight: 10, color: [0, 0, 0], isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_detailed", keyR:2, sufix:this.WALL_SUFFIX },
                        {h:.8, key:  "corridor_detailed", keyR:2, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            },
            /*
            {
                face: ['Wr', 'Wl', 'Ao', 'Wi'],
                items: [
                    { weight: 3, color: [128, 128, 128], isFrise: true,  functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_corner", keyR:3, sufix:this.WALL_SUFFIX },
                        {h:.8, key: "corridor_corner", keyR:3, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            },

            {
                face: ['Wr', 'Wl', 'Wi', 'Ao'],
                items: [
                    { weight: 3, color: [128, 128, 128], isFrise: true,  functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_corner", keyR:3, sufix:this.WALL_SUFFIX },
                        {h:.8, key: "corridor_corner", keyR:3, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            },
            */


            {
                face: ['Ai', 'Ai', 'Ai', 'Ai'],
                items: [
                    { weight: 40, color: [0, 0, 0], isFrise: true, functions: [...actionsEmptyFlat], items:[
                        // {h:0, key: "corridor_detailed", keyR:2, sufix:this.WALL_SUFFIX },
                        {h:.8, key:  "platform_center", keyR:2, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            },
           
            {
                face: ['Wl', 'Wr', 'Ai', 'Ai'],
                items: [
                    { weight: 20, color: [128, 128, 128], isFrise: true,  functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "corridor_corner", keyR:3, sufix:this.WALL_SUFFIX },
                        {h:.8, key: "corridor_corner", keyR:3, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            },


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

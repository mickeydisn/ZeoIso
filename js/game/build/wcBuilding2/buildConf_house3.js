import { AbstractWcBuildConf } from "./AbstractBuildConf.js";


export class WcBuildConf_House3 extends AbstractWcBuildConf {
    constructor(conf={}) {
        super(conf)

        this.faceLinkWeight = {

            'X' : 2,
            // 'X0': 0,
            // '0X': 2,


            'Bl': 4,
            'Br': 4,

            'Br2': 5,
            'Bl2': 5,

            '0' : 6,
            'Wo': 6,


            'Wi': 8,
            'WiD': 8,
            'Wr' : 10,
            'Wl' : 10,
            'A' : 10,

            'P1' : 0,
            'S0' : 0,
            'S1' : 0,

        }

        this.faceLinks = [

            ['X', 'X', 1],

            
            // ['0X', 'X0', 1],
            ['Bl', 'Br', 1],
            ['Br', 'Bl', 1],

            ['Bl2', 'Br2', 1],
            ['Br2', 'Bl2', 1],


            ['0', '0', 1],
            ['Wo', 'Wi', 1],
            ['Wo', 'WiD', 1],
            

            ['Wi', 'Wo', 1],
            ['WiD', 'Wo', 1],

            ['Wl', 'Wr', 1],
            ['Wr', 'Wl', 1],

            ['A', 'A', 1],

            // -----

            // ['S0', 'S0', 1],
            ['S0', 'P1', 1],
            ['S0', 'X', 1],
            ['S0', '0', 1],
            ['S0', 'WiD', 1],
            // ['S0', 'Wi', 1],
            ['X', 'S0', 1],

            // ['0', 'S0', 1],
            /*
            ['Br', 'S0',  1],
            ['Bl', 'S0', 1],
            
            */
            // --
            ['S0', 'S1', 1],
            ['S1', 'S0', 1],

            ['P1', 'S0'],
            ['P1',  'X'],
            [ 'X', 'P1'],
            ['S0', 'P1'],
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


        /*
        face: ['A', 'A', 'A', 'A'],
        items: [
            { weight: .5, color: [0, 0, 0], isFrise: true, functions: [
                //...actionsEmptyFlat
            ], items:[
                {t:'Svg', h:2, key: this.ROOF_PREFIX + "Point", keyR:3, sufix:this.ROOF_SUFFIX },
                {t:'Svg', h:1.5, key: this.WALL_PREFIX + "BlockHalf", keyR:0, sufix:this.WALL_SUFFIX },
            ]},
        ]
        */
        face: ['S1', 'S1', 'S1', 'S1'],
        // face: ['X', 'X', 'X', 'X'],
        items: [
            { weight:0, color: [255, 192, 192],  allowMove:true, isFrise: true, functions: [
                // ...actionsEmptyFlat
            ]},
        ]
        /*
        face: ['Wr', 'A', 'Wl', 'Wi'],
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

            {
                face: ['S1', 'S1', 'S1', 'S1'],
                items: [
                    { weight:0, color: [52, 52, 52],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, 
  
            {
                face: ['S0', 'S0', 'S0', 'S0'],
                items: [
                    { weight:0, color: [52, 52, 52],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
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
                    { weight:.1, colorT: [255, 255, 255], key: "fence_corner", keyR:2,  allowMove:true},
                    // { weight:0, colorT: [255, 255, 255], key: "platform_cornerOpen", keyR:3,  allowMove:true},
                ]
            }, {
                face: ['Br', '0', 'Bl', 'X'],
                items: [
                    { weight:.1, colorT: [255, 255, 255], key: "fence_simple", keyR:1,  allowMove:true},
                    // { weight:0, colorT: [255, 255, 255], key: "platform_side", keyR:3,  allowMove:true},
                ]
            }, 
            {
                face: ['0', '0', 'Bl', 'Br'],
                items: [
                    { weight:.1, colorT: [255, 0, 50],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ]},
                    // { weight:0, colorT: [255, 255, 255], key: "platform_cornerDot", keyR:1,  allowMove:true},
                ]
            }, 
            // == 0 ===
            {
                face: ['0', '0', '0', '0'],
                items: [
                    { weight:.1, colorT: [192, 192, 192],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ]},
                ]
            }, 
            /// O - A 
            {
                face: ['Wo', '0', '0', '0'],
                items: [
                    { weight:1, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ]},
                ]
            }, {
                face: ['Wo', 'Wo', '0', '0'],
                items: [
                    { weight:1, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ]},
                    // { weight:.1, colorT: [255, 255, 255], key: "platform_cornerOpen", sufix: "#H50", keyR:1,  allowMove:true},
                    // { weight:.1, colorT: [255, 255, 255], key: "platform_cornerDot", sufix: "#H50", keyR:1,  allowMove:true},

                ]
            }, 
            /// A - 0 
            {
                face: ['A', 'A', 'Wl', 'Wr'],
                items: [
                    {weight: 4, color: [0, 0, 0], h:1, isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {t:'Svg', h:2, key: this.ROOF_PREFIX + "CornerInner", keyR:3, sufix:this.ROOF_SUFFIX },
                    ]},

                ],
            }, {
                face: ['Wr', 'A', 'Wl', 'WiD'],
                items: [
                    { weight: 100, color: [0, 0, 0], isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {t:'Svg', h:2, key: this.ROOF_PREFIX + "", keyR:3, sufix:this.ROOF_SUFFIX },
                        {t:'Svg', h:1, key: this.WALL_PREFIX + "WindowGlass", keyR:1, sufix:this.WALL_SUFFIX },
                        {t:'Svg', h:0, key: this.WALL_PREFIX + "Door", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                    
                ]
            }, {
                face: ['Wr', 'A', 'Wl', 'Wi'],
                items: [
                    { weight: 1, color: [0, 0, 0], isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {t:'Svg', h:2, key: this.ROOF_PREFIX + "", keyR:3, sufix:this.ROOF_SUFFIX },
                        {t:'Svg', h:1, key: this.WALL_PREFIX + "WindowGlass", keyR:1, sufix:this.WALL_SUFFIX },
                        {t:'Svg', h:0, key: this.WALL_PREFIX + "Door", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight: 10, color: [0, 0, 0], isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {t:'Svg', h:2, key: this.ROOF_PREFIX + "", keyR:3, sufix:this.ROOF_SUFFIX },
                        {t:'Svg', h:1, key: this.WALL_PREFIX + "WindowGlass", keyR:1, sufix:this.WALL_SUFFIX },
                        {t:'Svg', h:0, key: this.WALL_PREFIX + "WindowGlass", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight: 20, color: [0, 0, 0], isFrise: true,  functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {t:'Svg', h:2, key: this.ROOF_PREFIX + "Window", keyR:3, sufix:this.ROOF_SUFFIX },
                        {t:'Svg', h:1, key: this.WALL_PREFIX + "WindowGlass", keyR:1, sufix:this.WALL_SUFFIX },
                        {t:'Svg', h:0, key: this.WALL_PREFIX + "WindowGlass", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                    
                ]
            },
            {
                face: ['A', 'A', 'A', 'A'],
                items: [
                    { weight: 5, color: [0, 0, 0], isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {t:'Svg', h:3, key: this.ROOF_PREFIX + "Point", keyR:3, sufix:this.ROOF_SUFFIX },
                        {t:'Svg', h:2, key: this.WALL_PREFIX + "Block", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},

                    // { weight: .5, colorT: [0, 0, 0], h:2.15, key: this.ROOF_PREFIX + "Flat", keyR:3},
                    // { weight: .5, colorT: [0, 0, 0], h:3, key: this.ROOF_PREFIX + "Point", keyR:3},
                ]
            },

            {
                face: ['Wr', 'Wl', 'Wi', 'Wi'],
                items: [
                    { weight: 1, color: [128, 128, 128], isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {t:'Svg', h:2, key: this.ROOF_PREFIX + "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                        {t:'Svg', h:1, key: this.WALL_PREFIX + "Corner", keyR:2, sufix:this.WALL_SUFFIX },
                        {t:'Svg', h:0, key: this.WALL_PREFIX + "Corner", keyR:2, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight: 1, color: [128, 128, 128], isFrise: true, functions: [
                        ...actionsEmptyFlat
                    ], items:[
                        {t:'Svg', h:2, key: this.ROOF_PREFIX + "CornerRound", keyR:3, sufix:this.ROOF_SUFFIX },
                        {t:'Svg', h:1, key: this.WALL_PREFIX + "CornerDiagonal", keyR:2, sufix:this.WALL_SUFFIX },
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

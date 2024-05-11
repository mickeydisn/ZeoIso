import { AbstractWcBuildConf } from "./AbstractBuildConf.js";




export class WcBuildConf_Path extends AbstractWcBuildConf {
    constructor(conf={}) {
        super(conf)

        this.faceLinkWeight = {
            'X' : 2,
            'P1' : 6,
            'P2' : 8,
            'P3' : 10,


            'Br':0,
            'Bl':0,
            'Bi':0,
            'Bo':0,
            '0':0,

            'S0':0,

            'Wo':0,
            'Wi':0,
        }

        this.faceLinks = [
            // [null, 'X', 1],

            ['X', 'X', 1],
            

            ['S0', 'P1', 1],
            ['P1', 'S0', 1],

            ['X', 'S0', 1],
            ['X', 'Br', 1],
            ['X', 'Bl', 1],
            ['X', 'Bi', 1],
            ['X', 'Bo', 1],
            ['X',  '0', 1],
            ['X', 'Wo', 1],
            ['X', 'Wi', 1],

            ['S0', 'X', 1],
            ['Br', 'X', 1],
            ['Bl', 'X', 1],
            ['Bi', 'X', 1],
            ['Bo', 'X', 1],
            [ '0', 'X', 1],
            ['Wo', 'X', 1],
            ['Wi', 'X', 1],



            /*
            [ 'X', 'X0', 1],
            ['X0', 'X', 1],

            ['X0', '0X', 1],
            ['0X', 'X0', 1],
            

            ['0X', '0', 1],
            ['0', '0X', 1],
            */
            ['X', 'P1', 1],
            ['P1', 'X', 1],
            
            ['P1', 'P1', 1],

            ['P1', 'P2', 1],
            ['P2', 'P1', 1],

            ['P2', 'P2', 1],


            ['P2', 'P3', 1],
            ['P3', 'P2', 1],

            ['P3', 'P3', 1],

        ]

    }

    preInit() {
        // this.ROOF_PREFIX = "roofHigh"
        this.ROOF_PREFIX = "roof"
        // this.WALL_PREFIX = "wallWood"
        this.WALL_PREFIX = "wall"

        this.ROOF_SUFFIX = '#H0_S0_C128_B64' // '#H190_S75_C75_B125'
        this.WALL_SUFFIX = '#H0_S64_C128_B128' // '#H200_S20_C135_B105'

    }

    get __TILE_START() { return { 
        face: ['P1', 'P1', 'P1', 'P1'],
        items: [
            { weight:1, color: [52, 52, 52],  allowMove:true, isFrise: true, functions: [
                // ...actionsEmpty
                ], items: [
                    {key: "mushroom_red", keyR:2, sufix:"#H0_C130_B110_I1" },
            ]},
            { weight:1, color: [62, 62, 68],  allowMove:true, isFrise: true, functions: [
                // ...actionsEmpty
                ], items: [
                    {key: "mushroom_red", keyR:2, sufix:"#H0_C130_B110_I1" },
            ]},
            { weight:1, color: [62, 68, 68],  allowMove:true,  isFrise: true, functions: [
                // ...actionsEmpty
                ], items: [
                    {key: "mushroom_red", keyR:2, sufix:"#H0_C130_B110_I1" },
                    
                ],
            }
        ]
    }}

    get __TILE_LIST() { 
        // console.log('__TILE_LIST', this.mainLvl)

        const actionsEmpty = [
            {func:"lvlAvgSquare",size:5},
            {func:"lvlAvgSquare", size:7},
        ]


        return [
            
            // == X ===
            {
                face: ['X', 'X', 'X', 'X'],
                items: [
                    { weight:0, color: [52, 52, 52],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
                    ]},
                    { weight:1, color: [62, 62, 68],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
                    ]},
                    { weight:1, color: [62, 68, 68],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, 


            // == P1 ===
            {
                face: ['P1', 'P1', 'P1', 'P1'],
                items: [
                    { weight:1, color: [52, 52, 52],  allowMove:true, isFrise: true, functions: [
                        // ...actionsEmpty
                        ], items: [
                            {key: "mushroom_red", keyR:2, sufix:"#H0_C130_B110_I1" },
                    ]},
                    { weight:1, color: [62, 62, 68],  allowMove:true, isFrise: true, functions: [
                        // ...actionsEmpty
                        ], items: [
                            {key: "mushroom_red", keyR:2, sufix:"#H0_C130_B110_I1" },
                    ]},
                    { weight:1, color: [62, 68, 68],  allowMove:true,  isFrise: true, functions: [
                        // ...actionsEmpty
                        ], items: [
                            {key: "mushroom_red", keyR:2, sufix:"#H0_C130_B110_I1" },
                            
                        ],
                    }
                ]
            }, 


            // == P2 ===
            {
                face: ['P2', 'P2', 'P2', 'P2'],
                items: [
                    { weight:1, color: [32, 32, 32],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
                    ]},
                    { weight:1, color: [42, 42, 48],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
                    ]},
                    { weight:1, color: [42, 48, 48],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, 
           
            // == P3 ===
            {
                face: ['P3', 'P3', 'P3', 'P3'],
                items: [
                    { weight:0, color: [0, 0, 0],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
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

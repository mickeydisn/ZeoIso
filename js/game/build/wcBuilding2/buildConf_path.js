import { AbstractWcBuildConf } from "./AbstractBuildConf.js";




export class WcBuildConf_Path extends AbstractWcBuildConf {
    constructor(conf={}) {
        super(conf)

        this.faceLinkWeight = {
            'X' : 2,
            'P1' : 6,
            'P2' : 8,
            'P3' : 10,
        }

        this.faceLinks = [
            // [null, 'X', 1],

            ['X', 'X', 1],
            
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
        face: ['P2', 'P2', 'P2', 'P2'],
        items: [
            { weight:1, color: [52, 52, 52],  allowMove:true,  empty:true, isFrise: true, functions: [
                // ...actionsEmpty
            ]},
            { weight:1, color: [62, 62, 68],  allowMove:true,  empty:true, isFrise: true, functions: [
                // ...actionsEmpty
            ]},
            { weight:1, color: [62, 68, 68],  allowMove:true,  empty:true, isFrise: true, functions: [
                // ...actionsEmpty
            ]},
        ]
    }}

    get __TILE_LIST() { 
        // console.log('__TILE_LIST', this.mainLvl)

        const actionsEmpty = [
            {func:"lvlAvgSquare",size:5},
            {func:"lvlAvgSquare", size:7},
        ]


        return [
            /*
            // X - null
            {
                face: ['X', null, null, null],
                items: [
                    { weight:0, colorT: [255, 96, 96], allowMove:true,  empty:true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, {
                face: ['X', 'X', null, null],
                items: [
                    { weight:0, colorT: [96, 196, 96],  allowMove:true,  empty:true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, {
                face: ['X', null, 'X', null],
                items: [
                    { weight:0, colorT: [96, 96, 196],  allowMove:true,  empty:true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, {
                face: ['X', 'X', 'X', null],
                items: [
                    { weight:0, colorT: [96, 196, 196],  allowMove:true,  empty:true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, 
            */
            // == X ===
            {
                face: ['X', 'X', 'X', 'X'],
                items: [
                    { weight:0, colorT: [64, 64, 64],  allowMove:true,  empty:true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, 

            /*
            // == P1 - X ===
            {
                face: ['P1', 'X', 'X', 'X'],
                items: [
                    { weight:0, color: [32, 32, 32],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, 

            {
                face: ['P1', 'X', 'P1', 'X'],
                items: [
                    { weight:0, color: [32, 32, 32],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, 


            {
                face: ['P1', 'P1', 'X', 'X'],
                items: [
                    { weight:0, color: [32, 32, 32],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, 


            {
                face: ['P1', 'P1', 'P1', 'X'],
                items: [
                    { weight:0, color: [32, 32, 32],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, 

            */

            // == P1 ===
            {
                face: ['P1', 'P1', 'P1', 'P1'],
                items: [
                    { weight:1, color: [52, 52, 52],  allowMove:true,  empty:true, isFrise: true, functions: [
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


            /*
            // == P2 - P1 ===
            {
                face: ['P2', 'P1', 'P1', 'P1'],
                items: [
                    { weight:0, color: [32, 32, 32],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, 

            {
                face: ['P2', 'P1', 'P2', 'P1'],
                items: [
                    { weight:0, color: [32, 32, 32],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, 


            {
                face: ['P2', 'P2', 'P1', 'P1'],
                items: [
                    { weight:0, color: [32, 32, 32],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, 


            {
                face: ['P2', 'P2', 'P2', 'P1'],
                items: [
                    { weight:0, color: [32, 32, 32],  allowMove:true,  empty:true, isFrise: true, functions: [
                        ...actionsEmpty
                    ]},
                ]
            }, 
            */
            
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

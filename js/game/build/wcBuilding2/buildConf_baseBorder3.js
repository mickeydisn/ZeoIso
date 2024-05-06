import { AbstractWcBuildConf } from "./AbstractBuildConf.js";




export class WcBuildConf_BaseBorder3 extends AbstractWcBuildConf {
    constructor(conf={}) {
        super(conf)

        this.faceLinkWeight = {
            'X' : 0,
            'X0': 0,
            '0X': 2,

            '0XL': 4,
            '0XR': 4,
            '0XLd': 4,
            '0XRd': 4,


            '0XR2': 5,
            '0XL2': 5,

            '0' : 6,
            '0A': 0,


            'A0': 8,
            'A' : 10,

        }

        this.faceLinks = [
            ['X', 'X', 1],
            ['X0', '0X', 1],

            ['0X', 'X0', 1],
            ['0XL', '0XR', 1],
            ['0XR', '0XL', 1],

            ['0XLd', '0XR', 1],
            ['0XRd', '0XL', 1],
            ['0XL', '0XRd', 1],
            ['0XR', '0XLd', 1],

            ['0XL2', '0XR2', 1],
            ['0XR2', '0XL2', 1],


            ['0', '0', 1],
            ['0A', 'A0', 1],

            ['A0', '0A', 1],
            ['A', 'A', 1],
        ]
    }


    get __TILE_START() { return { 
        colorT: [0, 0, 0], 
        key: "corridor_end_SE", 
        face: ['A', 'A0', 'A0', 'A0'],
        items: [
            {key: "platform_center_SE", keyR:2,  },
            {key: "corridor_end_SE", keyR:2,  }
        ],
        allowMove:true,
    }}


    get __TILE_LIST() { 
        return [
            
            // X - null
            {
                face: ['X', null, null, null],
                items: [
                    { weight:0, colorT: [0, 20, 0], t: "empty",  allowMove:true},
                ]
            }, {
                face: ['X', 'X', null, null],
                items: [
                    { weight:0, colorT: [0, 30, 0], t: "empty",  allowMove:true},
                ]
            }, {
                face: ['X', null, 'X', null],
                items: [
                    { weight:0, colorT: [0, 30, 0], t: "empty",  allowMove:true},
                ]
            }, {
                face: ['X', 'X', 'X', null],
                items: [
                    { weight:0, colorT: [0, 40, 0], t: "empty",  allowMove:true},
                ]
            }, 
            // == X ===
            {
                face: ['X', 'X', 'X', 'X'],
                items: [
                    { weight:0, colorT: [0, 50, 0], t: "empty",  allowMove:true},
                ]
            }, 
            /// O - 0X
            {
                face: ['X0', 'X', 'X', 'X'],
                items: [
                    { weight:0, colorT: [0, 50, 20], t: "empty",  allowMove:true},
                ]
            }, {
                face: ['X0', 'X0', 'X', 'X'],
                items: [
                    { weight:0, colorT: [0, 50, 30], t: "empty",  allowMove:true},
                ]
            }, 

            /// O - 0X
            {
                face: ['0', '0X', '0X', '0X'],
                items: [
                    { weight:0, colorT: [0, 50, 50], t: "empty",  allowMove:true},
                ]
            }, {
                face: ['0XR', '0XL', '0X', '0X'],
                items: [
                    { weight:0, colorT: [255, 255, 255], key: "platform_cornerOpen", keyR:3,  allowMove:true},
                ]
            }, {
                face: ['0XR', '0', '0XL', '0X'],
                items: [
                    { weight:0, colorT: [255, 255, 255], key: "platform_side", keyR:3,  allowMove:true},
                ]
            }, 
            {
                face: ['0', '0', '0XL', '0XR'],
                items: [
                    { weight:0, colorT: [255, 255, 255], key: "platform_cornerDot", keyR:1,  allowMove:true},
                ]
            }, 
            {
                face: ['0', '0', '0XL2', '0XR2'],
                items: [
                    { weight:1, colorT: [255, 255, 255], key: "platform_cornerDot", sufix:"#H90", keyR:1,  allowMove:true},
                ]
            }, 

            // == 0 ===
            {
                face: ['0', '0', '0', '0'],
                items: [
                    // { weight:0, colorT: [255, 0, 50], t: "empty",  allowMove:true},
                    { weight:0, colorT: [0, 0, 0], key: "platform_center", keyR:2,  allowMove:true, }
                ]
            }, 
            /// O - A 
            {
                face: ['0A', '0', '0', '0'],
                items: [
                    // { weight:.1, colorT: [0, 0, 240], t: "empty",  allowMove:true},
                    { weight:.1, colorT: [0, 0, 0], key: "platform_center", keyR:2,  allowMove:true, }
                ]
            }, {
                face: ['0A', '0A', '0', '0'],
                items: [
                    // { weight:.1, colorT: [0, 0, 240], t: "empty",  allowMove:true},
                    { weight:.1, colorT: [0, 0, 0], key: "platform_center", keyR:2,  allowMove:true, }
                    // { weight:.1, colorT: [255, 255, 255], key: "platform_cornerOpen", sufix: "#H50", keyR:1,  allowMove:true},
                    // { weight:.1, colorT: [255, 255, 255], key: "platform_cornerDot", sufix: "#H50", keyR:1,  allowMove:true},

                ]
            }, 
            /// A - 0 
            {
                face: ['A', 'A0', 'A0', 'A0'],
                items: [
                    { weight:0, colorT: [0, 0, 0], allowMove:true, items: [
                        {key: "platform_center", keyR:2,  },
                        {key: "corridor_end", keyR:2,  }
                    ]}
                ]
            } , {
                face: ['A', 'A0', 'A', 'A0'],
                items: [
                    {weight: 6, colorT: [0, 0, 0], key: "corridor_"},
                ]
            }, {
                face: ['A', 'A', 'A0', 'A0'],
                items: [
                    { weight: 1, colorT: [0, 0, 0], key: "corridor_corner", keyR:3,  },
                ]
            }, {
                face: ['A', 'A', 'A', 'A0'],
                items: [
                    { weight: 6, colorT: [0, 0, 0], key: "corridor_split", keyR:0},

                ]
            }, 
            /// A 
            {
                face: ['A', 'A', 'A', 'A'],
                items: [
                    { weight: 1, colorT: [0, 0, 0], key: "corridor_cross"},

                ]
            }       


    ]


    }

}





import { AbstractWcBuildConf } from "./AbstractBuildConf.js";




export class WcBuildConf_Place3 extends AbstractWcBuildConf {
    constructor(conf={}) {
        super(conf)

        this.faceLinkWeight = {
            'X': 0,
            'X0': 0,
            '0X': 2,
             '0': 4,
             '0L': 3,
             '0R': 3,
            '0A': 0,
            'A0': 6,
             'A': 8,
        }

        this.faceLinks = [
            ['X', 'X', 1],
            ['X0', '0X', 1],
            ['0X', 'X0', 1],
            ['0', '0', 1],
            ['0L', '0R', 1],
            ['0R', '0L', 1],
            ['0A', 'A0', 1],
            ['A0', '0A', 1],
            ['A', 'A', 1],
        ]
    }


    get __TILE_START() { return { 
        colorT: [0, 0, 0], 
        key: "platform_center", 
        face: ['A', 'A', 'A', 'A'],
        allowMove:true,
    }}


    get __TILE_LIST() { 
        return [
            
            // X - null
            {
                face: ['X', null, null, null],
                items: [
                    { weight:1, colorT: [0, 20, 0], t: "empty",  allowMove:true},
                ]
            }, {
                face: ['X', 'X', null, null],
                items: [
                    { weight:.02, colorT: [0, 30, 0], t: "empty",  allowMove:true},
                ]
            }, {
                face: ['X', null, 'X', null],
                items: [
                    { weight:.02, colorT: [0, 30, 0], t: "empty",  allowMove:true},
                ]
            }, {
                face: ['X', 'X', 'X', null],
                items: [
                    { weight:.01, colorT: [0, 40, 0], t: "empty",  allowMove:true},
                ]
            }, 
            // == X ===
            {
                face: ['X', 'X', 'X', 'X'],
                items: [
                    { weight:.01, colorT: [0, 50, 0], t: "empty",  allowMove:true},
                ]
            }, 
            /// O - 0X
            {
                face: ['X0', 'X', 'X', 'X'],
                items: [
                    { weight:1, colorT: [0, 50, 20], t: "empty",  allowMove:true},
                ]
            }, {
                face: ['X0', 'X0', 'X', 'X'],
                items: [
                    { weight:.02, colorT: [0, 50, 30], t: "empty",  allowMove:true},
                ]
            }, 

            /// O - 0X
            {
                face: ['0', '0X', '0X', '0X'],
                items: [
                    { weight:1, colorT: [0, 50, 50], t: "empty",  allowMove:true},
                ]
            }, {
                face: ['0R', '0L', '0X', '0X'],
                items: [
                    { weight:.02, colorT: [255, 255, 255], key: "platform_cornerOpen", keyR:3,  allowMove:true},
                ]
            }, {
                face: ['0', '0X', '0', '0X'],
                items: [
                    { weight:.02, colorT: [0, 30, 50], t: "empty",  allowMove:true},
                ]
            }, {
                face: ['0R', '0', '0L', '0X'],
                items: [
                    { weight:.1, colorT: [255, 255, 255], key: "platform_side", keyR:3,  allowMove:true},

                    // { weight:.01, colorT: [0, 20, 50], t: "empty",  allowMove:true},
                ]
            }, 
            
            // == 0 ===
            {
                face: ['0', '0', '0', '0'],
                items: [
                    { weight:.001, colorT: [0, 0, 50], t: "empty",  allowMove:true},
                ]
            }, 
            /// O - A 
            {
                face: ['0A', '0', '0', '0'],
                items: [
                    { weight:.1, colorT: [0, 0, 40], t: "empty",  allowMove:true},
                ]
            }, {
                face: ['0A', '0A', '0', '0'],
                items: [
                    { weight:.1, colorT: [0, 0, 40], t: "empty",  allowMove:true},
                ]
            }, {
                face: ['0A', '0A', '0L', '0R'],
                items: [
                    { weight:.1, colorT: [255, 255, 255], key: "platform_cornerDot", keyR:1,  allowMove:true},

                    // { weight:1, colorT: [0, 0, 20], t: "empty",  allowMove:true},
                ]
            }, 
            /// A - 0 
            
            {
                face: ['A', 'A0', 'A0', 'A0'],
                items: [
                    { weight:.1, colorT: [20, 0, 0], t: "empty",  allowMove:true},
                ]
            } , {
                face: ['A', 'A0', 'A', 'A0'],
                items: [
                    { weight:4, colorT: [30, 0, 0], t: "empty",  allowMove:true},
                ]
            }, {
                face: ['A', 'A', 'A0', 'A0'],
                items: [
                    { weight:.1, colorT: [50, 0, 0], t: "empty",  allowMove:true},
                ]
            }, {
                face: ['A', 'A', 'A', 'A0'],
                items: [
                    { weight:4, colorT: [60, 0, 0], t: "empty",  allowMove:true},
                ]
            }, 
            /// A 
            {
                face: ['A', 'A', 'A', 'A'],
                items: [
                    { weight:1, colorT: [70, 0, 0], t: "empty",  allowMove:true},
                ]
            }   

            /*
            // == A ===
            
            {
                face: ['A', 'A', 'A', 'A'],
                items: [
                    { weight:1, colorT: [255, 255, 255], key: "platform_center",  allowMove:true},
                ]
            },
    
            {
                face: ['A', 'A0R', 'AX', 'A0L'],
                items: [
                    { weight:10, colorT: [255, 255, 255], key: "platform_side",  allowMove:true},
                ]
            },
    
            {
                face: ['A0R', 'A', 'A', 'A0L'],
                items: [
                    { weight:1, colorT: [255, 255, 255], key: "platform_cornerDot",  allowMove:true},
                ]
            },
    
            {
                face: ['A0R', 'AX', 'AX', 'A0L'],
                items: [
                    { weight:3, colorT: [255, 255, 255], key: "platform_cornerOpen",  allowMove:true},
                ]
            },
            */

        ]


    }

}





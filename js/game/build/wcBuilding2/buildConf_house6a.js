import { AbstractWcBuildConf } from "./AbstractBuildConf.js";




export class WcBuildConf_House6a extends AbstractWcBuildConf {
    constructor(conf={}) {
        super(conf)

        this.faceLinkWeight = {
            'X' : 1,
            

            /**/
            'Bo': 0,
            'Bi': 1,
            'SBi': 1,

            'Bl': 2,
            'Br': 2,

            '0' : 0,
            /**/
            'SCi': 4,
            'S0': 4,
            // --
            'CiG': 4,

            /**/

            'Co': 1,
            'Ci': 4,
            'Cr' : 6,
            'Cl' : 6,

            
            'Wo': 7,
            'WoD': 7,
            'SWoD': 8,

            'Wi': 8,
            'WiD': 8,

            'Wr' : 10,
            'Wl' : 10,
            
            'A' : 10,

        }

        this.faceLinks = [
            ['X', 'X', 1],

            ['Xl', 'Xr', 1],
            ['Xr', 'Xl', 1],
            /* -----------* /
            ['X', 'Ci', 1],
            ['Ci', 'X', 1],
            /**/


            /**/
            ['SBo', 'SBi', 1],
            ['SBi', 'SBo', 1],

            ['S0', 'SCi', 1],
            ['SCi', 'S0', 1],
            /**/

            /* -----------*/
            ['Bo', 'Bi', 1],
            ['Bi', 'Bo', 1],

            ['Bl', 'Br', 1],
            ['Br', 'Bl', 1],


            ['SBl', 'SBr', 1],
            ['SBr', 'SBl', 1],

            /**/
            ['0G', 'CiG', 1],
            ['CiG', '0G', 1],
            /**/
            ['0', 'Ci', 1],
            ['Ci', '0', 1],

            
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


        this.FENCE_SUFFIX = "#H40_C125_S40_B70"
        this.ROOF_SUFFIX = '#H0_S100_C100_B100' // '#H190_S75_C75_B125'
        // this.WALL_SUFFIX = '#H0_S100_C100_B100' // '#H200_S20_C135_B105'
        this.WALL_SUFFIX = '#H0_S120_C70_B115'
    }

    get __TILE_START() { return [

        {
            face: ['SBo', 'Xl', 'X', 'Xr'],
            items: [
                { weight:0, color: [32, 32, 32],  allowMove:true, isFrise: true, functions: [], items:[
                    // {h:0, key: "ironFenceBorder", keyR:2, sufix:this.FENCE_SUFFIX },
                ]},
            ]
            // ironFenceBorder_NW#_
        },

        

    ]
        /*
        face: ['SWoD', 'Cl', 'Ci', 'Cr'],
        items: [
            { weight:0, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [], items:[
                // {h:1, key: "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                {h:0, key: "platform_side", keyR:0, sufix:this.WALL_SUFFIX },
            ]},
        ]
        */
    }

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
        const actionsColor = [
            {func:"lvlAvgSquare",size:5},
            {func:"lvlAvgSquare", size:7},
            {func:"colorSquare",size:5, color:[128, 128, 128]},
        ]


        return [

            // * --------------------------------------------------
            // S Connections 
            {  
                face: ['Br', 'S0', 'Bl', 'SBi'],
                items: [
                    { weight:0, color: [32, 32, 32], allowMove:true, isFrise: true, functions: [...actionsEmpty], items:[
                        // {h:0, key: "altarWood", keyR:0, sufix:"#H180_C120_S35_B80"},
                    ]},
                ]
            }, 
    
            {
                face: ['Wo', 'Cl', 'SCi', 'Cr'],
                items: [
                    { weight:.3, color: [32, 32, 32],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        // {h:1, key: "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                        // {h:0, key: "platform_side", keyR:0, sufix:this.WALL_SUFFIX },
                        {h:0, key: "debris", keyR:0, sufix:"#H350_C105_S50_B85" },
                    ]},
                    // { weight:.05, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                    // ]},
                ]
            },

            {
                face: ['Ci', 'SCi', 'Cr', 'Cl'],
                items: [
                    { weight:.01, color: [32, 32, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        // {h:1, key: "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                        // {h:0, key: "platform_cornerOpen", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            }, 
            {
                face: ['SCi', 'Ci', 'Cr', 'Cl'],
                items: [
                    { weight:.01, color: [32, 128, 32],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        // {h:1, key: "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                        // {h:0, key: "platform_cornerOpen", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            }, 


            // * --------------------------------------------------

            // X - null
            {
                face: ['X', null, null, null],
                items: [
                    { weight:0, colorT: [0, 20, 0], allowMove:true, functions: [...actionsEmpty]},
                ]
            }, {
                face: ['X', 'X', null, null],
                items: [
                    { weight:0, colorT: [0, 30, 0],  allowMove:true, functions: [...actionsEmpty]},
                ]
            }, {
                face: ['X', null, 'X', null],
                items: [
                    { weight:0, colorT: [0, 30, 0],  allowMove:true, functions: [...actionsEmpty]},
                ]
            }, {
                face: ['X', 'X', 'X', null],
                items: [
                    { weight:0, colorT: [0, 40, 0],  allowMove:true, functions: [...actionsEmpty]},
                ]
            }, 
            // == X ===
            {
                face: ['X', 'X', 'X', 'X'],
                items: [
                    { weight:0, colorT: [0, 50, 0],  allowMove:true, functions: [...actionsEmpty]},
                ]
            }, 

            // * --------------------------------------------------

            /// O - Bi
            {
                face: ['Xr', 'Xl', 'X', 'X'],
                items: [
                    { weight:0, color: [92, 92, 92],  allowMove:true, isFrise: true, functions: [...actionsColor]},
                ]
            }, 
            {
                face: ['Bo', 'Xl', 'X', 'Xr'],
                items: [
                    { weight:0, color: [92, 92, 92],  allowMove:true, isFrise: true, functions: [...actionsColor], items:[
                        {h:0, key: "ironFenceBorder", keyR:2, sufix:this.FENCE_SUFFIX },
                    ]},
                ]
                // ironFenceBorder_NW#_
            }, {
                face: ['Bo', 'Bo', 'Xl', 'Xr'],
                items: [
                    { weight:0, color: [92, 92, 92],  allowMove:true, isFrise: true, functions: [...actionsColor], items:[
                        {h:0, key: "ironFenceBorderCurve", keyR:1, sufix:this.FENCE_SUFFIX },
                    ]},
                ]
            }, 

            /// O - Bi
            {
                face: ['0', 'Bi', 'Bi', 'Bi'],
                items: [
                    { weight:.1, color: [104, 104, 104],  allowMove:true, isFrise: true, functions: [...actionsEmpty], items:[
                    ]},
                ]
            }, {
                face: ['Br', 'Bl', 'Bi', 'Bi'],
                items: [
                    { weight:.05, color: [104, 104, 104], allowMove:true, isFrise: true, functions: [...actionsEmpty], items:[
                        {h:0, key: "pillarSquare", keyR:0, sufix:"#H180_C120_S35_B80"},                        
                    ]},
                    { weight:.05, color: [104, 104, 104], allowMove:true, isFrise: true, functions: [...actionsEmpty], items:[
                        {h:0, key: "pillarSquare", keyR:0, sufix:"#H180_C120_S35_B80"},                        
                    ]},
                    // { weight:0, colorT: [255, 255, 255], key: "platform_cornerOpen", keyR:3,  allowMove:true},
                ] 
            }, {
                face: ['Br', '0', 'Bl', 'Bi'],
                items: [
                    { weight:.1, color: [104, 104, 104], allowMove:true, isFrise: true, functions: [...actionsEmpty], items:[
                    ]},
                    // { weight:0, colorT: [255, 255, 255], key: "platform_side", keyR:3,  allowMove:true},
                ]
            }, 
            {
                face: ['0', '0', 'Bl', 'Br'],
                items: [
                    { weight:.1, color: [104, 104, 104],  allowMove:false, isFrise: true, functions: [...actionsEmpty], items:[
                        {h:0, key: "bones", keyR:0, sufix:"#H180_C120_S35_B80"},
                    ]},
                    // { weight:0, colorT: [255, 255, 255], key: "platform_cornerDot", keyR:1,  allowMove:true},
                ]
            }, 
            // == 0 ===
            {
                face: ['0', '0', '0', '0'],
                items: [
                    { weight:.1, color: [104, 104, 104],  allowMove:true, isFrise: true, functions: [...actionsEmpty], items:[
                    ]},
                ]
            }, 

        /* ----------------------------------------------- */
        // Grave Alternative
        {
            face: ['Br', '0G', 'Bl', 'Bi'],
            items: [
                { weight:0, color: [104, 104, 104], allowMove:false, isFrise: true, functions: [...actionsEmpty], items:[
                    {h:0, key: "altarWood", keyR:0, sufix:"#H180_C120_S35_B80"},
                ]},
            ]
        }, 
        {
            face: ['Wo', 'Cl', 'CiG', 'Cr'],
            items: [
                { weight:0, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                    {h:0, key: "gravestoneRound", keyR:0, sufix:"#H180_C120_S35_B80" },
                ]},
            ]
        },
        /* {
            face: ['Ci', 'CiG', 'Cr', 'Cl'],
            items: [
                { weight:.001, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                    // {h:1, key: "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                    {h:0, key: "gravestoneRound", keyR:1, sufix:this.WALL_SUFFIX },
                ]},
            ]
        }, */
            

            /* ----------------------------------------------- */

            /// W - C 
            {
                face: ['Ci', 'Ci', 'Cr', 'Cl'],
                items: [
                    { weight:0, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        // {h:1, key: "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                        // {h:0, key: "platform_cornerOpen", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            }, {
                face: ['Wo', 'Cl', 'Ci', 'Cr'],
                items: [
                    { weight:.25, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        // {h:1, key: "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                        // {h:0, key: "platform_side", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight:.15, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "debris", keyR:0, sufix:"#H350_C105_S50_B85" },
                    ]},
                ]
            }, {
                face: ['Wo', 'Wo', 'Cl', 'Cr'],
                items: [
                    { weight:.2, color: [128, 128, 128],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        // {h:1, key: "Corner", keyR:3, sufix:this.ROOF_SUFFIX },
                        // {h:0, key: "platform_cornerDot", keyR:1, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            }, 



            /// A - Wi 
            {
                face: ['A', 'Wi', 'WiD', 'Wi'],
                items: [
                    { weight:0, color: [104, 104, 104],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        // {h:0, key: "corridor_end", keyR:2, sufix:this.WALL_SUFFIX },
                    ]},
                ]
            } , {
                face: ['A', 'Wi', 'A', 'Wi'],
                items: [
                    { weight:25, color: [104, 104, 104],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        // {h:0, key: "corridor_", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight:25, color: [104, 104, 104],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "debris", keyR:0, sufix:"#H350_C105_S50_B85" },
                    ]},
                ]
            }, {
                face: ['A', 'A', 'Wi', 'Wi'],
                items: [
                    { weight:5, color: [104, 104, 104],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        // {h:0, key: "corridor_corner", keyR:3, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight:5, color: [104, 104, 104],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "debris", keyR:0, sufix:"#H350_C105_S50_B85" },
                    ]},
                ]
            }, {
                face: ['A', 'A', 'A', 'Wi'],
                items: [
                    { weight:15, color: [104, 104, 104],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        // {h:0, key: "corridor_split", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight:25, color: [104, 104, 104],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "debris", keyR:0, sufix:"#H350_C105_S50_B85" },
                    ]},
                ]
            }, 
            /// A 
            {
                face: ['A', 'A', 'A', 'A'],
                items: [
                    { weight:5, color: [104, 104, 104],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        // {h:0, key: "corridor_cross", keyR:0, sufix:this.WALL_SUFFIX },
                    ]},
                    { weight:5, color: [104, 104, 104],  allowMove:true, isFrise: true, functions: [...actionsEmptyFlat], items:[
                        {h:0, key: "debris", keyR:0, sufix:"#H350_C105_S50_B85" },
                    ]},
                ]
            }            

          
    ]


    }

}


import { BuildConf } from "./buildConf_base.js";
import { axeNextTileOfList } from "./utils.js"



export class BuildConf_Donjon1 {
    constructor(conf={}) {
        this.growLoopCount = conf.growLoopCount ? conf.growLoopCount : 200
        this.endLoopMax = conf.endLoopMax ? conf.endLoopMax : 0

        this.buildEmpty = false;
        this.nearAdvance = true;


        this.growTileTag = [
            "A", "B", "CB",  
        ]
        this.emptyTileTag = ["E0", 'E1']
    }

    get BUILD_TILE_START() { return { 
        color: [0, 128, 128], 
        t: "empty",  
        allowMove:true,
        near:[
            {is:'A', con:['B', null]},
            {is:'A', con:['B', null]},
            {is:'A', con:['B', null]},
            {is:'A', con:['B', null]},
        ]
    }}

    get BUILD_TILE_LIST_EMPTY() { return axeNextTileOfList([

    ])}
    
    get BUILD_TILE_LIST() { return axeNextTileOfList([
        { 
            Tw: 1, name: 'Empty',
            color: [256, 128, 128], 
            t: "empty", 
            allowMove:true,
            near:[
                {is:'x', con:['x', 'BC', 'Cx', null]},
                {is:'x', con:['x', null]},
                {is:'x', con:['x', null]},
                {is:'x', con:['x', null]},
            ]
        }, {
            Tw: 1, name: 'A',
            color: [0, 0, 128], 
            t: "empty",  
            allowMove:true,
            near:[
                {is:'A', con:['B']},
                {is:'A', con:['B', null]},
                {is:'A', con:['B', null]},
                {is:'A', con:['B', null]},
            ]
        }, {
            Tw: 2, name: 'B',
            color: [255, 255, 255], 
            t: "empty", 
            allowMove:true,
            near:[
                {is:'B', con:['B', 'A']},
                {is:'BC', con:['CB', null]},
                {is:'B', con:['B', null]},
                {is:'BC', con:['CB', null]},
            ]
        }, {
            Tw: 1, name: 'C1',
            color: [64, 64, 0], 
            t: "empty", 
            allowMove:true,
            near:[
                {is:'CB', con:['BC']},
                {is:'C', con:['C', null]},
                {is:'Cx', con:['x', null]},
                {is:'C', con:['C', null]},
            ]
        }, {
            Tw: .005, name: 'C2',
            color: [64, 64, 0], 
            t: "empty", 
            allowMove:true,
            near:[
                {is:'CB', con:['BC']},
                {is:'CB', con:['BC']},
                {is:'C', con:['C', 'x', null]},
                {is:'C', con:['C', 'x', null]},
            ]
        }, 


    ])}

    get BUILD_TILE_LIST_CLOSE() { return axeNextTileOfList([

    ])}
}





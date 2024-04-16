import { BuildConf_Base } from "../building/buildConf_base.js"
import { BuildConf_Place } from "../building/buildConf_place.js"
import { FactoryBuilding } from "../building/building.js"
import { hslToRgb, rgbToHsl } from "../map/factoryGenerator.js"


export class WorldBiome {
    
    constructor(world) {
        this.world = world
        this.tilesMatrix = world.tilesMatrix
        this.ta = world.tilesActions


		this.biomesConifg = world.factoryBiomes.biomes;


    }

    start() {
 
        let [x, y] = this.tilesMatrix.getPos();


        {

            const actions = []
            actions.push(...this.path(x +  0 , y))
            actions.push(...this.path(x + 15 , y))
            actions.push(...this.path(x + 30 , y))

            console.log(actions)
            actions.forEach(actionConf => {
                this.ta.doAction(actionConf);
            })
            // Name 
        }

        // Loop foreach biome
        {

            const actions = []
            Object.entries(this.biomesConifg).forEach(([_, bConf], idx) => {
                console.log(bConf, idx)
                const xx = x + ((idx - idx % 10) / 10) * 15
                const yy = y + (idx % 10) * 15
                console.log('BIOME ', xx, yy)
                actions.push(...this.biome(xx , yy, bConf))

            })

            console.log(actions)
            actions.forEach((actionConf, idx) => {
                setTimeout(_ => {this.ta.doAction(actionConf)}, 10 * idx);
            })

        }    
          
    }

    path(x, y) {
        return [...Array(10)].map((_, idx )=> 
            [   
                { x:x, y: y+idx*15, func:'colorSquare',     size:15, color:[0, 0, 0, 255]},
                { x:x, y: y+idx*15, func:'clearItemSquare', size:15},
                { x:x, y: y+idx*15, func:'lvlFlatSquare',   size:15},
                { x:x, y: y+idx*15, func:'lvlAvgBorder',    size:17},

            ]
        ).flat()
    }


    biome(x, y, bConf) {
        console.log(bConf, bConf.name, bConf.color)
        let c = new Uint8Array(bConf.color(128))
        const hsl = rgbToHsl(c[0], c[1], c[2]);
        c.set(hslToRgb(hsl[0], hsl[1] * 0.3, hsl[2]));

        return [
            { x:x, y: y, func:'colorSquare',   size:13, color:c},
            { x:x, y: y, func:'lvlUpSquare', size:13, lvl:1},
            { x:x, y: y, func:'lvlFlatSquare', size:13},

            { x:x, y: y, func:'addBoxMD', md: bConf.name, width:'200px', style:'text-align:center'},
            { x:x, y: y, func:'lvlAvgSquare', size:17},
            { x:x, y: y, func:'lvlAvgSquare', size:17},
            { x:x, y: y, func:'lvlAvgSquare', size:17},
            

        ]


    }


}
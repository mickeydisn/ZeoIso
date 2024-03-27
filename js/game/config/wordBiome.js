import { BuildConf_Base } from "../building/buildConf_base.js"
import { BuildConf_Place } from "../building/buildConf_place.js"
import { FactoryBuilding } from "../building/building.js"


export class WorldBiome {
    
    constructor(world) {
        this.world = world
        this.tilesMatrix = world.tilesMatrix
        this.ta = world.tilesActions
    }

    start() {
 
        let [x, y] = this.tilesMatrix.getPos();

        // Name 
        [...Array(20)].map((_, idx )=> {
            this.ta.colorSquare(x, y+idx*2, 3, [0, 0, 0, 255])
            this.ta.colorSquare(x, y+idx*2, 1, [200, 200, 200, 255])
            this.ta.clearItemSquare(x, y+idx*2, 5)
        })
          
    }




}
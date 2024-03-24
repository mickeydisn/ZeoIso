import { BuildConf_Base } from "../building/buildConf_base.js"
import { BuildConf_Place } from "../building/buildConf_place.js"
import { FactoryBuilding } from "../building/building.js"


export class WorldStart {
    
    constructor(world) {
        this.world = world
        this.tilesMatrix = world.tilesMatrix
        this.ta = world.tilesActions
    }

    start() {
 
        const [x, y] = this.tilesMatrix.getPos()
        
        this.ta.lvlUpSquare(x + 25,y, 1, -6)

        {
            const factoryBuilding = new FactoryBuilding(this.world, new BuildConf_Place())
            factoryBuilding.start(x - 25, y);
        }
        {
            const factoryBuilding = new FactoryBuilding(this.world, new BuildConf_Base())
            factoryBuilding.start(x + 25, y);
        }

        this.ta.lvlUpSquare(x, y-10, 3, 2)
        this.ta.colorSquare(x, y-10, 3, [0, 0, 0, 255])

        this.infinitStart(x, y)
        // this.markdown1(x, y)

        // this.markdown2(x, y)

        this.ta.lvlUpSquare(x,y+10, 3, 35)
        this.ta.lvlAvgSquare(x,y+10, 5)
        this.ta.lvlAvgSquare(x,y+10, 5)
        this.ta.lvlAvgSquare(x,y+10, 5)
        this.ta.colorSquare(x, y+10, 5, [0, 0, 0, 255])
        
        /*
        // this.tilesActions.lvlUpSquare(x + 20 ,y + 5, 5, 5)
        {
            const factoryBuilding = new FactoryBuilding(this, new BuildConf_Donjon1())
            factoryBuilding.start(x, y);
        }
        */
    }


    _MD(x, y, md) {
        this.ta.colorSquare(x, y, 1, [0, 0, 0, 255])
        this.ta.lvlUp(x, y, 3)
        this.ta.addBoxMD(x, y, {md:md, width:'140px'})
    }


    infinitStart(x, y) {


        this._MD(x-10, y + 10, `## ⬆️ ➡️ ⬇️ ⬅️`)
        this._MD(x-10, y + 12, `## ↖️ ↗️ ↘️ ↙️`)
        this._MD(x-10, y + 14, `## ▶️ ⏹ ⏺ ⏸`)
        this._MD(x-10, y + 16, `## 🔄 ✅ ⚠️ ⭕️`)



        this._MD(x, y - 5, `### 🌎 Earth`)
        
        this._MD(x, y + 5, `### 🌬️ Wind`)
        
        this._MD(x - 5, y, `### 🔥 Fire`)
        
        this._MD(x + 5, y, `### 💧 Water`)
        



    }



    markdown1(x, y) {
        const md = `
# Hello Word
## Hello Word
### Hello Word
#### Hello Word
##### Hello Word

Comment va ? 

 > Je test 

 > ### Je test 
 > Je test 

 - hello 
 - _hello_
 - __hello__
                `
        this.ta.addBoxMD(x, y-10, {md:md, width:'100px'})
    }


    markdown2(x, y) {
        const md = `
| foo |
| --- |

| foo | bar |
| --- | --- |
| baz | bim |

`
        this.ta.addBoxMD(x, y-5, {md:md, width:'100px'})
    }



}
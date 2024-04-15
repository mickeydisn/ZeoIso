import { BuildConf_Base } from "../building/buildConf_base.js"
import { BuildConf_Place } from "../building/buildConf_place.js"
import { FactoryBuilding } from "../building/building.js"


export class WorldStart {
    
    constructor(world) {
        this.world = world
        this.tilesMatrix = world.tilesMatrix
        this.ta = world.tilesActions2
    }

    start() {
 
        const [x, y] = this.tilesMatrix.getPos()
        
        this.ta.lvlUpSquare({x:x + 25,y:y,size:1, lvl:-6})

        {
            const factoryBuilding = new FactoryBuilding(this.world, new BuildConf_Place({growLoopCount:100}))
            factoryBuilding.start(x - 25, y);
        }
        {
            const factoryBuilding = new FactoryBuilding(this.world, new BuildConf_Base({growLoopCount:100}))
            factoryBuilding.start(x + 25, y);
        }

        this.ta.lvlUpSquare({x:x, y:y-10, size:3, lvl:2})
        this.ta.colorSquare({x:x, y:y-10, size:3, color:[0, 0, 0, 255]})

        this.infinitStart(x, y)
        
        
        this.markdown1(x, y + 15)

        this.ta.lvlFlatSquare({x:x,y:y, size:5})
        this.ta.colorSquare({x:x, y:y, size:5, color:[0, 255, 0]})

        this.ta.lvlUpSquare({x:x,y:y+10, size:3, lvl:35})
        this.ta.lvlAvgSquare({x:x,y:y+10, size:5})
        this.ta.colorSquare({x:x, y:y+10, size:5, color:[0, 0, 0, 255]})
        
        /*
        // this.tilesActions.lvlUpSquare(x + 20 ,y + 5, 5, 5)
        {
            const factoryBuilding = new FactoryBuilding(this, new BuildConf_Donjon1())
            factoryBuilding.start(x, y);
        }
        */
    }


    _MD(x, y, md) {
        this.ta.colorSquare({x:x, y:y, size:1, color:[0, 0, 0, 255]})
        this.ta.lvlUp({x:x, y:y, lvl:3})
        this.ta.addBoxMD({
            x:x,
            y:y,
            md:md, 
            width:'140px', 
            maxDist:3,
            canBeEdit:false,
            style: `    
                text-align: center;
                background-color: #232393;
                color: #FFFFFF;
            `,
        })
    }


    infinitStart(x, y) {


        // this.markdown1(x-20, y-20)


        this._MD(x-10, y + 10, `## ⬆️ ➡️ ⬇️ ⬅️`)
        // this._MD(x-10, y + 12, `## ↖️ ↗️ ↘️ ↙️`)
        // this._MD(x-10, y + 14, `## ▶️ ⏹ ⏺ ⏸`)
        // this._MD(x-10, y + 16, `## 🔄 ✅ ⚠️ ⭕️`)



        this._MD(x, y - 5, `#### 🌎 Earth`)
        
        this._MD(x, y + 5, `#### 🌬️ Wind`)
        
        this._MD(x - 5, y, `#### 🔥 Fire`)
        
        this._MD(x + 5, y, `#### 💧 Water`)
        



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
        this.ta.addBoxMD({x:x, y:y, md:md, width:'300px', canBeEdit:true})
    }


    markdown2(x, y) {
        const md = `
| foo |
| --- |

| foo | bar |
| --- | --- |
| baz | bim |

`
        this.ta.addBoxMD({x:x, y:y-5, md:md, width:'100px'})
    }





    camp(x,y) {
        [
            {"lvl":0,"color":[159,223,223,255],"items":[],"x":0,"y":0},
            {"lvl":7,"color":[159,223,223,255],"items":[],"x":0,"y":1},
            {"lvl":0,"color":[159,223,223,255],"items":[],"x":0,"y":2},
            {"lvl":6,"color":[159,223,223,255],"items":[],"x":0,"y":3},
            {"lvl":0,"color":[159,223,223,255],"items":[],"x":0,"y":4},
            {"lvl":7,"color":[159,223,223,255],"items":[],"x":1,"y":0},
            {"lvl":7,"color":[159,223,223,255],"items":[],"x":1,"y":1},
            {"lvl":0,"color":[159,223,223,255],"items":[],"x":1,"y":2},
            {"lvl":6,"color":[159,223,223,255],"items":[],"x":1,"y":3},
            {"lvl":6,"color":[159,223,223,255],"items":[],"x":1,"y":4},
            {"lvl":0,"color":[159,223,223,255],"items":[],"x":2,"y":0},
            {"lvl":0,"color":[159,223,223,255],"items":[],"x":2,"y":1},
            {"lvl":0,"color":[159,223,223,255],"items":[{"t":"Asset","key":"gate_complex_NW","lvl":0}],"x":2,"y":2},
            {"lvl":0,"color":[159,223,223,255],"items":[],"x":2,"y":3},
            {"lvl":0,"color":[159,223,223,255],"items":[],"x":2,"y":4},
            {"lvl":6,"color":[159,223,223,255],"items":[],"x":3,"y":0},
            {"lvl":6,"color":[159,223,223,255],"items":[],"x":3,"y":1},
            {"lvl":0,"color":[159,223,223,255],"items":[],"x":3,"y":2},
            {"lvl":6,"color":[159,223,223,255],"items":[],"x":3,"y":3},
            {"lvl":6,"color":[159,223,223,255],"items":[],"x":3,"y":4},
            {"lvl":0,"color":[159,223,223,255],"items":[],"x":4,"y":0},
            {"lvl":6,"color":[159,223,223,255],"items":[],"x":4,"y":1},
            {"lvl":0,"color":[159,223,223,255],"items":[],"x":4,"y":2},
            {"lvl":6,"color":[159,223,223,255],"items":[],"x":4,"y":3},
            {"lvl":0,"color":[159,223,223,255],"items":[],"x":4,"y":4}
        ]
    }




}
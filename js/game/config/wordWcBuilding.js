import { CustomBuilding } from "../build/customBuilding/mainCitySpawn.js"
import { Maze } from "../build/maze/maze.js"
import { PathFactory } from "../build/path.js"
import { CityFactory } from "../build/wcCity/cityFactory.js"
import { CityTileNode } from "../build/wcCity/cityTileNode.js"


export class WorldWcBuilding {
    
    constructor(world) {
        this.world = world
        this.tilesMatrix = world.tilesMatrix
        this.ta = world.tilesActions
        this.fm = this.world.factoryMap

    }

    start() {
 
        let [x, y] = this.tilesMatrix.getPos();

        /*
        // Name 
        [...Array(20)].map((_, idx )=> {
            this.ta.colorSquare(x, y+idx*2, 3, [0, 0, 0, 255])
            this.ta.colorSquare(x, y+idx*2, 1, [200, 200, 200, 255])
            this.ta.clearItemSquare(x, y+idx*2, 5)
        })
        */
        this.name(x, y);


        // this.ta.colorSquare({x:x, y:y, size:3, color:[0, 0, 0, 255]})
        // this.ta.colorSquare({x:x, y:y, size:1, color:[128, 128, 0, 255]})
        // this.ta.clearItemSquare({x:x, y:y, size:5})



        new CityFactory(this.world, {}).start(x-2, y-2)

        /*
        const centreCity = new CustomBuilding(this.world, {})
        centreCity.start(x-20, y-20)

        this.world.player.setCenter(x+5, y+5)

        {
            const tile = this.fm.getTile(x, y)
            new CityTileNode(this.world, tile, {})
        }
        */



        /*
        const pathFactory = new PathFactory(this.world, {})
        pathFactory.createWcPath({x:x, y:y}, {x:x + 8, y:y + 8}).start(0).then(_ => {
            this.ta.doAction({func:'clearAllSquare', x:x + 8, y:y + 8, size:3})
            this.ta.doAction({func:'colorSquare', x:x + 8, y:y + 8, size:3, color:[64, 0, 0]})
        })

        pathFactory.createWcPath({x:x, y:y}, {x:x + 8, y:y - 8}).start(0).then(_ => {
            this.ta.doAction({func:'clearAllSquare', x:x + 8, y:y - 8, size:3})
            this.ta.doAction({func:'colorSquare', x:x + 8, y:y - 8, size:3, color:[64, 0, 0]})
        })

        pathFactory.createWcPath({x:x, y:y}, {x:x + 8, y:y}).start(0).then(_ => {
            this.ta.doAction({func:'clearAllSquare', x:x + 8, y:y, size:3})
            this.ta.doAction({func:'colorSquare', x:x + 8, y:y, size:3, color:[64, 0, 0]})
                
        })
        */

        // console.log("wcPath", wcPath)
        
        
        /*
        const startCity = new City(this.world, x, y, {})
        // console.log('======= StartCity', startCity)
        const path = new PathFactory(this.world, {})
        startCity.roads.forEach(road => {
            // console.log(road)
            road.path  = path.start({x:road.n1.x, y:road.n1.y}, {x:road.n2.x, y:road.n2.y})
    
        });
        */

        // const buildConf = new WcBuildConf_House3();
        // const buildConf = new WcBuildConf_Base3();
        // const buildConf = new WcBuildConf_Place3();
        
        // const building = new WcBuilding(this.world, buildConf);
        // building.start(x, y)


        /*
        const maze = new Maze(this.world,{
            xstart: x + 5 , 
            ystart: y,
            xend: x + 55,
            yend: y + 50,            
        })        
        */
    }



    name (x, y) {
        {
            const md = `
<div style="display:flex">
   ## Bonjour
    <div style="display: flex;flex-direction: column;justify-content: center;align-items: flex-end;">

## Hello 



</div>
</div>
    `
            this.ta.addBoxMD({x:x, y:y, md:md, width:'300px'})
        }
    }


}
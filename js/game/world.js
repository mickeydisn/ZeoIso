
import { BuildConf_Base } from './building/buildConf_base.js';
import { BuildConf_Place } from './building/buildConf_place.js';
import { FactoryBuilding } from './building/building.js';
import {FactoryBiomes} from './map/factoryBiomes.js'
import {FactoryGenerator} from './map/factoryGenerator.js'
import {FactoryMap} from './map/factoryMap.js'
import { TilesAction } from './map/tilesAction.js';
import { TilesMatrix } from './map/tilesMatrix.js'
import { Player } from './player.js';

export class World {

    constructor() {
        this.size = Math.pow(2, 10);
        this.width = this.size;
        this.height = this.size;
       
        // this.items = GAME_ITEMS;
        // this.biomes = new BiomesFactory();
        // this.biomes.biomes =  GAME_BIOMES
        // this.biomeSelectMatrix = GAME_BIOMES_MATRIS;
    
    
        this.zoom = 1;
        this.grain = 16;
        // this.seed = "mickey";

        // this.interfaceMenu = null;
        // this.interfaceMap = null;
      
        this.factoryGenerator = null;
        // this.factoryUser = null;
        // this.factoryBuilding = null;
      
      
        // this.simplex =null;
        // this.waterLvl = 64;
        // this.creatures = [];

        // this.simplex = new SimplexNoise(this.seed);

        this.seed = "mickey";

        this.factoryBiomes = new FactoryBiomes(this);
        this.factoryGenerator = new FactoryGenerator(this);
        this.factoryMap = new FactoryMap(this)
        this.tilesMatrix = new TilesMatrix(this)


        this.tilesActions = new TilesAction(this)
        // this.tilesActions.index.lvlFlatSquare(x, y, 3)
        // this.actions.index.colorSquare(x, y, 5, [0, 0, 0, 255])

        this.player = new Player(this)
        this.player.setCenter(2000, 400)


        const [x, y] = this.tilesMatrix.getPos()

        this.tilesActions.lvlUpSquare(x + 25,y, 1, -6)

        {
            const factoryBuilding = new FactoryBuilding(this, new BuildConf_Base())
            factoryBuilding.start(x + 25, y);
        }
        {
            const factoryBuilding = new FactoryBuilding(this, new BuildConf_Place())
            factoryBuilding.start(x - 25, y);
        }

        this.tilesActions.lvlUpSquare(x, y, 3, 5)
        this.tilesActions.colorSquare(x, y, 3, [0, 0, 0, 255])


        this.tilesActions.lvlUpSquare(x,y+10, 3, 35)
        this.tilesActions.lvlAvgSquare(x,y+10, 5)
        this.tilesActions.lvlAvgSquare(x,y+10, 5)
        this.tilesActions.lvlAvgSquare(x,y+10, 5)
        this.tilesActions.colorSquare(x, y+10, 5, [0, 0, 0, 255])

        // this.tilesActions.lvlUpSquare(x + 20 ,y + 5, 5, 5)


    }


    getColor(x, y, zoom, grain) {
        return this.factoryGenerator.getColor(x, y, zoom, grain);
    }
    
    getCellInfo(cx, cy) {
        var info = this.factoryGenerator.getCellInfo(cx, cy);

        var cityCenterItem = null;
        this.factoryCity.openList.forEach(e => {
            if (e.x == cx && e.y == cy) {
            cityCenterItem = e
            }
        })
        info['cityCenterItem'] = cityCenterItem; // ? buildingItem.getInfo() : null;

        return info;
    }
    



}
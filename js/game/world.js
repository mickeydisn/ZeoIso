
import { FactoryBuilding } from './building/building.js';
import {FactoryBiomes} from './factoryBiomes.js'
import {FactoryGenerator} from './factoryGenerator.js'
import {FactoryMap} from './factoryMap.js'
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
        // this.tilesActions.index.flateSquareLvl(x, y, 3)
        // this.actions.index.colorSquare(x, y, 5, [0, 0, 0, 255])

        this.player = new Player(this)
        this.player.setCenter(2000, 400)

        this.factoryBuilding = new FactoryBuilding(this)

        const [x, y] = this.tilesMatrix.getPos()

        this.tilesActions.index.lvl(x,y, .5)

        this.factoryBuilding.start(x, y);

        this.tilesMatrix.move(0, 4)

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
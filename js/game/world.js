

import { WorldWcBuilding } from './config/wordWcBuilding.js';
// import { WorldCv} from './config/wordCv.js';
import {FactoryBiomes} from './map/factoryBiomes.js'
import {FactoryGenerator} from './map/factoryGenerator.js'
import {FactoryMap} from './map/factoryMap.js'
import { FactoryTileGenerator } from './map/factoryTileGenerator.js';
import { FactoryTileRawGenerator } from './map/factoryTileRawGenerator.js';
import { GenTile, RawTile } from './map/tile.js';
import { TilesActions } from './build/tilesActions.js';
import { TilesMatrix } from './map/tilesMatrix.js'
import { SIZE20 } from './mapIso/interfaceIso.js';
import { Player } from './player.js';
import { CustomBuilding } from './build/customBuilding/mainCitySpawn.js';
import { CityFactory } from './build/wcCity/cityFactory.js';

export class World {

    constructor(assetLoader, globalState) {

        this.assetLoader = assetLoader;
        this.globalState = globalState;

        this.size = Math.pow(2, 10);
        this.width = this.size;
        this.height = this.size;
       
    
        this.zoom = 1;
        this.grain = 16;
      
        this.factoryGenerator = null;

        this.seed = "mickey";

        this.factoryBiomes = new FactoryBiomes(this);
        this.factoryGenerator = new FactoryGenerator(this);
        this.factoryTileRawGenerator = new FactoryTileRawGenerator(this);
        this.factoryTileGenerator = new FactoryTileGenerator(this);


        this.factoryMap = new FactoryMap(this)

        // Make the gameMap Globale . 
        window.gameMap = this.factoryMap;

        this.tilesMatrix = new TilesMatrix(this, SIZE20)

        this.tilesActions = new TilesActions(this)

        this.player = new Player(this)

        // ========================
        // ========================

        this.player.setCenter(1036, 341)
        // new WorldCv(this).start()


        this.player.setCenter(0, 0)
        const centreCity = new CustomBuilding(this, {})
        centreCity.start(10, 0)
        const centreCity2 = new CustomBuilding(this, {})
        centreCity2.start(-10, 0)

        // new WorldWcBuilding(this).start()

        this.player.setCenter(2000, 400)

        this.myCityFactory = new CityFactory(this, {})
        this.myCityFactory.start(2000-2, 400-2)

        // new WorldStart(this).start()

        // new WorldWcBuilding(this).start()
        // new WorldBiome(this).start()

    }

    clickTile(x, y) {
        // tile.getLog()
        const tileClickFunction = this.globalState.get("TileClickFunction")
        const curentButt = this.globalState.get("WidjetActions.currentButt")
        const curentSize = this.globalState.get("WidjetActions.currentSize")

        if (tileClickFunction) {
            const conf = {...tileClickFunction, x:x, y:y}
            this.doAction(conf)
        } else {
            const tileJson = this.factoryMap.getTile(x,y).toJson()
            this.globalState.set("TileInfo.position", [x, y])         

            // const chunk = this.factoryMap.chunkPoint(x,y)
        }
        
        // this.GS.set('InterfaceIso.ClickTile', {x: xx - (this.size/2), y: yy - (this.size/2)})

    }


    doAction(actionConf) {
        this.tilesActions.doAction(actionConf)
    }


}
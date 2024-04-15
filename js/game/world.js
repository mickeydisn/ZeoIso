

import { WorldBiome } from './config/wordBiome.js';
import { WorldCv } from './config/wordCv.js';
import { WorldStart } from './config/wordStart.js';
import {FactoryBiomes} from './map/factoryBiomes.js'
import {FactoryGenerator} from './map/factoryGenerator.js'
import {FactoryMap} from './map/factoryMap.js'
import { FactoryTileGenerator } from './map/factoryTileGenerator.js';
import { FactoryTileRawGenerator } from './map/factoryTileRawGenerator.js';
import { GenTile, RawTile } from './map/tile.js';
import { TilesAction } from './map/tilesAction.js';
import { TilesAction2 } from './map/tilesAction2.js';
import { TilesMatrix } from './map/tilesMatrix.js'
import { SIZE20 } from './mapIso/interfaceIso.js';
import { Player } from './player.js';

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

        console.log('RawTile', new GenTile(this, 110, 110))


        this.factoryMap = new FactoryMap(this)
        this.tilesMatrix = new TilesMatrix(this, SIZE20)


        this.tilesActions = new TilesAction(this)
        this.tilesActions2 = new TilesAction2(this)

        this.player = new Player(this)

        // ========================
        // ========================

        this.player.setCenter(1036, 341)
        new WorldCv(this).start()

        this.player.setCenter(2000, 400)
        new WorldStart(this).start()

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
            console.log(tileJson)
        }
        
        // this.GS.set('InterfaceIso.ClickTile', {x: xx - (this.size/2), y: yy - (this.size/2)})

    }


    doAction(actionConf) {
        this.tilesActions2.doAction(actionConf)
    }


}
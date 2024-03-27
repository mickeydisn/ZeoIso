

import { WorldCv } from './config/wordCv.js';
import { WorldStart } from './config/wordStart.js';
import {FactoryBiomes} from './map/factoryBiomes.js'
import {FactoryGenerator} from './map/factoryGenerator.js'
import {FactoryMap} from './map/factoryMap.js'
import { TilesAction } from './map/tilesAction.js';
import { TilesAction2 } from './map/tilesAction2.js';
import { TilesMatrix } from './map/tilesMatrix.js'
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
        this.factoryMap = new FactoryMap(this)
        this.tilesMatrix = new TilesMatrix(this)


        this.tilesActions = new TilesAction(this)
        this.tilesActions2 = new TilesAction2(this)

        this.player = new Player(this)

        // ========================
        // ========================
         
        this.player.setCenter(2000, 400)
        
        // this.player.setCenter(1500, 400)
        // this.player.setCenter(2000, 1000)
        new WorldStart(this).start()
        // new WorldCv(this).start()

        // = beach hill
        //this.player.setCenter(492, -376)
        
        // == Near Cliff
        // this.player.setCenter(1056, 147)
        // ========================
        // ========================


    }

    clickTile(x, y) {
        // tile.getLog()
        const curentButt = this.globalState.get("WidjetActions.currentButt")
        const curentSize = this.globalState.get("WidjetActions.currentSize")
        const conf = {...curentButt.funcConf , size : curentSize}
        console.log(curentButt.funcConf)
        this.doAction(x, y, conf )
        // this.GS.set('InterfaceIso.ClickTile', {x: xx - (this.size/2), y: yy - (this.size/2)})

    }


    doAction(x, y, actionConf) {
        this.tilesActions2.doAction(x, y, actionConf)
    }


}
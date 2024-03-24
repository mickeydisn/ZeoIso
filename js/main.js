// import {GoogleApi} from './googleApi.js'
// import {Dashboard} from './dashboard.js'
import {World} from './game/world.js'

// import {InterfaceMap} from './game/_interfaceMap.js'
import { InterfaceIso } from "./game/mapIso/interfaceIso.js";
import { AssetLoader } from './game/asset/assetLoader.js';
import { WidjetAssetList } from './game/menu/widjetAssetList.js';
import { WidjetMiniMap } from './game/menu/widjetMiniMap.js';
import { GlabalState } from './game/globalState.js';
import { WidjetActions } from './game/menu/widjetActions.js';


export class Main {
    constructor() {
        this.body = d3.select('body');
        this.body.style('background-color', '#333')
    }

    initMapDiv() {

        var mainCenter = this.body
            .append("div")
                .attr('id', "mainCenter")
                .html(`
        <div id="mainMenuHead">
            <div>XFLR6_LANDING</div>
        </div>
        <div id="mainMapContent">
            <div id="mainMap">
            </div>
        </div>
        `)
        return mainCenter.select('#mainMap')
    }

    start() {
        console.log('== Init World ==');
        this.assetLoader = new AssetLoader(_ => this.start2())
    }
    start2() {
        this.globalState = new GlabalState()

        this.world = new World();
        this.world.assetLoader = this.assetLoader;
        this.world.globalState = this.globalState;

        {
            const div = this.initMapDiv()
            this.interfaceIso = new InterfaceIso(this.world, div);
        }

        {
            const div = this.body.append('div')
            this.widjetActions = new WidjetActions(this.world, div)
        }
        {
            const div = this.body.append('div')
            this.widjetAssetList = new WidjetAssetList(this.world, div)
        }
        {
            const div = this.body.append('div')
            this.widjetMiniMap = new WidjetMiniMap(this.world, div);
        }


        this.bindKeyboard();
        this.startGameLoop();

    }

    loop() {
        this.interfaceIso.drawUpdate();
        this.widjetMiniMap.drawUpdate();

    }

    // Fonction principale de la boucle de jeu
    startGameLoop() {

        // Définir le FPS fixe
        const fixedFPS = 160;
        const fixedFrameTime = 1000 / fixedFPS;

        // Variables pour le calcul du FPS réel
        let frameCount = 0;
        let frameTime = 0;
        let lastTime = performance.now();

        const bindThis = this
        const gameLoop = function () {

            const currentTime = performance.now();
            const elapsedTime = currentTime - lastTime;
            frameTime = frameTime * .99 + elapsedTime * .01
            lastTime = currentTime;

            bindThis.loop();

            frameCount++;
            if (frameCount >= 100) {
                frameCount = 0;
                const realFPS = (1000 / frameTime).toFixed(2);
                // console.log("Real FPS:", realFPS);
            }

        }
        d3.interval(gameLoop, fixedFrameTime);
    }


    


    bindKeyboard() {

        const BindThis = this;
        // -----------------------------------
        //  Body Keybord . 
        // -----------------------------------
        var keyPressed = {};
        d3.select('body')  
        .on('keypress', function() {
            // BindInterfaceIso.keyControle(d3.event.key);
        })
        .on('keydown', function() {
            keyPressed[d3.event.key] = true;
        })
        .on('keyup', function() {
            keyPressed[d3.event.key] = false;
        });

        // add pressed key loop. 
        const keyControle = function() {
            BindThis.world.player.keyLoopControle(keyPressed);
        };
        d3.interval(keyControle, 20);
        // d3.timer(keyControle);  

    }

       

}
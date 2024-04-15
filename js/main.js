// import {GoogleApi} from './googleApi.js'
// import {Dashboard} from './dashboard.js'
import {World} from './game/world.js'

// import {InterfaceMap} from './game/_interfaceMap.js'
import { InterfaceIso } from "./game/mapIso/interfaceIso.js";
import { AssetLoader } from './game/asset/assetLoader.js';
import { WidjetAssetList } from './game/menu/widjetAssetList.js';
import { WidjetMiniMap } from './game/menu/widjetMiniMap.js';
import { GlabalState } from './game/globalState.js';
import { WidjetActionsTiles } from './game/menu/widjetActionsTiles.js';
import { WidjetActionsPlayer } from './game/menu/widjetActionsPlayer.js';
import { WidjetActionsBuilding } from './game/menu/widjetActionsBuilding.js';
import { WidjetActionsSetting } from './game/menu/widjetActionsSetting.js';
import { WidjetActionsAchivement } from './game/menu/widjetActionAchivement.js';
import { WidjetActionsTileInfo } from './game/menu/widjetTileInfo.js';


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

        this.world = new World(this.assetLoader, this.globalState);


        // World Main map 
        {
            const div = this.initMapDiv()
            this.interfaceIso = new InterfaceIso(this.world, div);
        }

        const divMenu = this.body.append('div')
        // Menu
        {
            const div = divMenu.append('div')
            new WidjetActionsTiles(this.world, div)
        }
        {
            const div = divMenu.append('div')
            new WidjetAssetList(this.world, div)
        }
        {
            const div = divMenu.append('div')
            new WidjetActionsPlayer(this.world, div)
        } 
        {
            const div = divMenu.append('div')
            new WidjetActionsBuilding(this.world, div)
        }
        {
            const div = divMenu.append('div')
            new WidjetActionsSetting(this.world, div)
            
        }
        {
            const div = divMenu.append('div')
            new WidjetActionsAchivement(this.world, div)
            
        }
        {
            const div = divMenu.append('div')
            new WidjetActionsTileInfo(this.world, div)
            
        }
        {
            this.divFPS = divMenu.append('div')
                .attr("id", "FPS")
                .text("100 FPS")
        }
        

        // MiniMap
        {
            const div = this.body.append('div')
            this.widjetMiniMap = new WidjetMiniMap(this.world, div);
        }

        // Keyboard not affect radio butt
        var radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(function (radioButton) {
          radioButton.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault();
            }
          });
        });
    

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
        const fixedFPS = 300;
        const fixedFrameTime = 1000 / fixedFPS;

        // Variables pour le calcul du FPS réel
        let frameCount = 0;
        let frameTime = 0;
        let lastTime = performance.now();

        const bindThis = this
        const gameLoop = function () {
            const currentTime = performance.now();
            const elapsedTime = currentTime - lastTime;
            lastTime = currentTime;
            frameTime += elapsedTime
            bindThis.loop();
            frameCount++;
            if (frameCount >= 100) {
                frameTime /= frameCount;
                const realFPS = (1000 / frameTime).toFixed(2);
                bindThis.divFPS.text("FPS:" + realFPS)

                frameCount = 0;
                frameTime = 0;
            }
        }
        setInterval(gameLoop, fixedFrameTime);
        // d3.interval(gameLoop, fixedFrameTime);
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
            this.world.player.keyLoopControle(keyPressed);
        };
        d3.interval(keyControle.bind(this), 20);
        // d3.timer(keyControle);  

    }

       

}
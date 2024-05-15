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
import { WidjetInterfaceMap } from './game/menu/widjetInterfaceMap.js';
import { WidjetActionsPlayerAct } from './game/menu/widjetActionsPlayerAct.js';
import { InterfaceIso2 } from './game/mapIso/interfaceIso2.js';
import { WidjetMiniWorld } from './game/menu/widjetMiniWorld.js';
import { AssetLoaderOpti } from './game/asset/assetLoaderOpti.js';


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
        console.info('== Init World ==');
        this.assetLoader = new AssetLoaderOpti(_ => this.start2())
    }
    start2() {
        this.globalState = new GlabalState()

        this.world = new World(this.assetLoader, this.globalState);


        // World Main map 
        {
            const div = this.initMapDiv()
            this.interfaceIso = new InterfaceIso(this.world, div);
        }
        
        /*
        // MiniWorld 
        {
            const div = this.body.append('div')
            this.interfaceIso2 = new InterfaceIso2(this.world, div);
            this.interfaceIso2.drawUpdate()
        }
        */
        
        const divMenu = this.body.append('div')
        // Menu
        {
            const div = divMenu.append('div')
            new WidjetActionsTiles(this.world, div)
        }
        /*
        {
            const div = divMenu.append('div')
            new WidjetAssetList(this.world, div)
        }
        */
        {
            const div = divMenu.append('div')
            new WidjetActionsPlayer(this.world, div)
        } 
        {
            const div = divMenu.append('div')
            new WidjetActionsPlayerAct(this.world, div)
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
        
        // Move 
        {

            this.clickPress = {
                ArrowUp: false, ArrowRight: false, ArrowDown: false, ArrowLeft: false, 
            }
            this.divClickMove = divMenu.append('div').classed('clickMove', true)
                .html(`
                    <div id="ArrowUp"></div>
                    <div id="ArrowRight"></div>
                    <div id="ArrowDown"></div>
                    <div id="ArrowLeft"></div>
                `);
                
            ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].forEach(axe => {
                this.divClickMove.select('#' + axe)
                .on('touchstart' , _ => { this.clickPress[axe] = true })
                .on('touchend' , _ => { this.clickPress[axe] = false })
                
            })
        }

        // MiniMap
        {
            const div = this.body.append('div')
            // this.widjetMiniMap = new WidjetMiniMap(this.world, div);
            this.widjetMiniMap = new WidjetInterfaceMap(this.world, div);
        }
        {
            const div = this.body.append('div')
            // this.widjetMiniMap = new WidjetMiniMap(this.world, div);
            this.widjetMiniMap = new WidjetMiniWorld(this.world, div);
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
        // this.interfaceIso2.drawUpdate();
        // this.widjetMiniMap.drawUpdate();

    }

    // Fonction principale de la boucle de jeu
    startGameLoop() {

        // Définir le FPS fixe
        const fixedFPS = 20;
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

        // setInterval(gameLoop, fixedFrameTime);
        let loopInterval = d3.interval(gameLoop, 1000 / 40);
        this.world.globalState.sub("TabVisiblity", "MainDisplayLoop", isVisibel => {
            if (isVisibel) {
                console.info("MainDisplayLoop: Start");
                loopInterval.stop()
                loopInterval = d3.interval(gameLoop, 1000/ 40);
            } else {
                console.info("MainDisplayLoop: Stop");
                loopInterval.stop()
            }
        })
        
        window.addEventListener('focus', _ => {
            console.info("focus-processing");
            this.world.globalState.set("TabVisiblity", true)
        }, false);
        window.addEventListener('blur', _ => {
            console.info("blur-processing");
            this.world.globalState.set("TabVisiblity", false)
        }, false);

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
            this.world.player.keyLoopControle({...this.clickPress , ...keyPressed});
        }.bind(this);
        let keyInterval = d3.interval(keyControle, 20);

        // d3.timer(keyControle);  
        this.world.globalState.sub("TabVisiblity", "MainKeabordLoop", isVisibel => {
            if (isVisibel) {
                console.info("MainKeabordLoop: Start");
                keyInterval.stop()
                keyInterval = d3.interval(keyControle, 20);
            } else {
                console.info("MainKeabordLoop: Stop");
                keyInterval.stop()
            }
        })
    }

       

}
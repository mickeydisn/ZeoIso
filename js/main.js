// import {GoogleApi} from './googleApi.js'
// import {Dashboard} from './dashboard.js'
import {World} from './game/world.js'

// import {InterfaceMap} from './game/_interfaceMap.js'
import { InterfaceIso } from "./game/interfaceIso.js";
import {InterfaceMiniMap} from './game/interfaceMiniMap.js'
import { AssetLoader } from './game/asset/assetLoader.js';


export class Main {
    constructor() {

    }


    start() {
        this.initBody()

        console.log('== Init World ==');
        this.assetLoader = new AssetLoader(_ => this.start2())
        
    }
    start2() {
        this.world = new World();
        this.world.assetLoader = this.assetLoader;

        this.initInterfaceIso()

        var divMiniMap = d3.select('#mainMiniMap');
        this.interfaceMiniMap = new InterfaceMiniMap(this.world, divMiniMap);

        //this.initInterfaceMap()

        // this.interfaceMap.moveTo(74,-95);

        this.bindKeyboard();
        this.startGameLoop();
    }

    loop() {
        this.interfaceIso.drawUpdate();
        this.interfaceMiniMap.drawUpdate();

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


    

    initWord() {
        // console.log(this.myGApi.biomeMatrix)
        // this.world = new World( this.myGApi );
    }
    
    initInterfaceIso() {
        var mainDiv = d3.select('#mainMap');
        this.interfaceIso = new InterfaceIso(this.world, mainDiv);

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


    initInterfaceMap() {

        console.log('== Init Interface ==');

        var mainDiv = d3.select('#mainMap');
        this.interfaceMap = new InterfaceMap(
            mainDiv,
            this.world,
        );
        this.interfaceMap.init();

    }


    initBody() {

        var body = d3.select('body');

        body
            .style('background-color', '#DEDEDE')

        var mainCenter = body.append("div")
            .attr('id', "mainCenter")
            .style('display', "inline-flex")
            .style('justify-content', "start")
            .style('flex-direction', "column")
            .style('align-items', "center")
            .style('height', "100vh")
            .style('width', "80vw")
            .style('border', "1px solid #F009")
            .style('text-align', "center")

        var centerHead = mainCenter.append('div')
            .attr('id', "mainMenuHead")
            .style('display', "flex")
            .style('flex-direction', "row")
            .style('justify-content', "space-between")
            .style('align-items', "stretch")
            .style('height', "2.5em")
            .style('width', "80vw")
            .style('border', "1px solid #F009")


        var mainMiniMap = body.append("div")
            .attr('id', "mainMiniMap")

        var centerCadre = mainCenter.append('div')
            .style('display', "flex")
            .style('justify-content', "center")
            .style('align-items', "center")
            .style('height', "100vh")
            .style('width', "80vw")
            .style('overflow', "hidden")
            .style('border', "1px solid #F009")

        var mainMap = centerCadre.append("div")
            .attr('id', "mainMap")

        /*
        var mainMenuRight = body.append("div")
            .attr('id', "mainMenuRight")
            .style('display', "inline-flex")
            .style('justify-content', "start")
            .style('flex-direction', "column")
            .style('align-items', "stretch")
            .style('height', "100vh")
            .style('width', "20vw")
            .style('overflow', "scroll")
            .style('border', "1px solid #F009")
        */


        centerHead.append('div')
            .style('display', "inline-flex")
            .style('align-items', "center")
            .style('color', "#FFF")
            .style('text-align', "center")
            .style('font-size', "1.2em")
            .style('font-weight', "bold")
            .style('text-shadow', "2px 2px #999")
            .style('padding', "1vw")
            .text('XFLR6_87SD')

        }

}
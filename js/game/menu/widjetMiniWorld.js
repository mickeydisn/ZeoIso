import { InterfaceIso2 } from "../mapIso/interfaceIso2.js";

const MAP_DEFINITION = 3
const CHUNK_SIZE = 5 ;

export class WidjetMiniWorld {

    constructor(world, mainDiv) {
        this.world = world;
        this.fg = this.world.factoryGenerator;
        this.fm = this.world.factoryMap;

        this.mainDiv = mainDiv;
        this.size = 800;
        this.init();
        this.refreshRate = 0;
    }

    init() {
        console.log('=== MiniWorld - Init')
        this.drawInit();

        // this.drawUpdate();
    }

    drawInit() {
        this.mainDiv
            // .append('div')
            

        this.mainDiv.html( `
            <div class="buttMenuBox  switch" id="miniWorld">
                <input type="checkbox" id="checkbox_menuBox_miniWorld", name="MenuBox">
                <label for="checkbox_menuBox_miniWorld">✈️</label>
                <div class="widjetMenuBox slider" id="mainMiniWorld" >
    
                <div id="menu"> 
                    <span><div>⚾️</div></span>
                    <span><div>⚽️</div></span>
                    <span><div>🌎</div></span>
                    <span><div>🪐</div></span>
                    <span><div>💫</div></span>
                </div>

              </div>
            </div>
        `)
        
        this.contentDiv = this.mainDiv.select('.widjetMenuBox#mainMiniWorld')
            
            
        const div = this.contentDiv.append('div')
        this.interfaceIso2 = new InterfaceIso2(this.world, div);
        this.interfaceIso2.drawUpdate()
    

        this.mainDiv.select('input').on('click', _ => {
            console.log('CLICK')
            this.interfaceIso2.drawUpdate()
        })
    }


    drawUpdate() {
        this.interfaceIso2.drawUpdate()
    }



}
const MAP_DEFINITION = 3
const CHUNK_SIZE = 5 ;

export class WidjetMiniMap {

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
        console.log('=== MiniMap - Init')
        this.drawInit();

        this.drawUpdate();
    }

    drawInit() {
        this.mainDiv
            // .append('div')
            

        this.mainDiv.html( `
            <div class="buttMenuBox  switch" id="miniMap">
                <input type="checkbox" id="checkbox_menuBox_miniMap", name="MenuBox">
                <label for="checkbox_menuBox_miniMap">🌎</label>
                <div class="widjetMenuBox slider" id="mainMiniMap" ></div>
            </div>
        `)
        
        this.contentDiv = this.mainDiv.select('.widjetMenuBox#mainMiniMap')
            .style('width', this.size + 'px')
            .style('height', this.size + 'px')

        this.canvas = this.contentDiv.append('canvas')
            .attr('id', "MiniMapCanvas")
            .attr('width', this.size)
            .attr('height', this.size)
            .style('width', this.size + 'px')
            .style('height', this.size + 'px')

        this.ctx = this.canvas.node().getContext('2d')
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;

        document.getElementById('MiniMapCanvas').addEventListener('click', function(event) { 
            console.log("========MiniMap Click", event)
            this.onClick(event.offsetX, event.offsetY)
        }.bind(this), false);

    }

    onClick(clickX, clickY) {
        console.log('Click:', clickX, clickY)
        console.log('ClickCenter:', clickX - this.size / 2, clickY - this.size / 2)
        
        const xx = Math.floor(( clickX - this.size / 2 ) / MAP_DEFINITION)
        const yy = Math.floor(( clickY - this.size / 2 ) / MAP_DEFINITION)
        console.log('XX,YY', xx, yy)

        let [x, y] = this.world.tilesMatrix.getPos();
        console.log(x, y, xx, yy)

        this.world.player.setCenter(x + yy * CHUNK_SIZE, y + xx * CHUNK_SIZE);
    }

    drawUpdate() {
        if (this.contentDiv.style('opacity') != '1') {
            return;
        }

        if (this.refreshRate < 100 ) {
            this.refreshRate += 1;
            return;
        }
        console.log("UpdateMiniMap")
        this.refreshRate = 0;
        // this.tilesMatrix.update();
        const ctx = this.ctx;
        // Définir la taille d'une case

        let [x, y] = this.world.tilesMatrix.getPos();
		const modx = x % CHUNK_SIZE
		const mody = y % CHUNK_SIZE
        x = x - modx;
        y = y - mody;

        const matrixSize = Math.floor(this.size / MAP_DEFINITION)

        // Dessiner le damier
        for (let row = 0; row < matrixSize; row++) {
            for (let col = 0; col < matrixSize; col++) {

                if (Math.abs(row - matrixSize / 2) <= 1 && Math.abs(col - matrixSize / 2) <= 1) {
                    ctx.fillStyle = `rgb(255, 0, 0)`;
                    ctx.fillRect(col * MAP_DEFINITION, row * MAP_DEFINITION, MAP_DEFINITION, MAP_DEFINITION);
    
                } else {

                    const xx = CHUNK_SIZE * (row - Math.floor(matrixSize / 2)) + x 
                    const yy = CHUNK_SIZE * (col - Math.floor(matrixSize / 2)) + y 
                    
                    const tile = this.fm.getTileNoGen(xx, yy)
                    const c = tile.genColor
                    ctx.fillStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
                    ctx.fillRect(col * MAP_DEFINITION, row * MAP_DEFINITION, MAP_DEFINITION, MAP_DEFINITION);

                    const lvl = tile.gen2Lvl
                    let alpha = (lvl % 8) / 8 
                    alpha = alpha - alpha % .05
                    alpha *= .5

                    ctx.fillStyle = `rgba(0, 0, 0, ${alpha})`;
                    ctx.fillRect(col * MAP_DEFINITION, row * MAP_DEFINITION, MAP_DEFINITION, MAP_DEFINITION);

                }

            }
        }

    }



}
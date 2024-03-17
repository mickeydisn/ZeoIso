import { TILE_GEN_ZOOM } from "./map/tile.js";

export class InterfaceMiniMap {

    constructor(world, mainDiv) {
        this.world = world;
        this.fg = this.world.factoryGenerator;
        this.fm = this.world.factoryMap;

        this.mainDiv = mainDiv;
        this.size = 400;
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
            .style('display', 'flex')
            .style('flex-direction', 'column')
            .style('position', 'absolute')
            .style('top', '-100px')
            .style('left', '0px')
            .style('width', this.size + "px")
            .style('height', this.size + "px")
            .style('transform', "rotateX(57deg) rotateY(0deg) rotateZ(-133deg)")

        const div = this.mainDiv.append('div')
            .style('border', '2px solid')
            .style('content', "''")
            .style('min-height', '14px')
            .style('min-width', '14px')
            .style('position', 'absolute')
            .style('top', '193px')
            .style('left', '193px')
            
        this.canvas = this.mainDiv.append('canvas')
            .attr('id', "canvas")
            .attr('width', this.size)
            .attr('height', this.size)
            // .style('position','absolute')
            .style('width', this.size + "px")
            .style('height', this.size + "px")
            .style('box-shadow', '-14px -14px 10px 7px')
            // .style('transform', "rotateX(55deg) rotateY(0deg) rotateZ(-135deg)")

        this.ctx = this.canvas.node().getContext('2d')
        this.ctx.webkitImageSmoothingEnabled = false;
        this.ctx.mozImageSmoothingEnabled = false;
        this.ctx.imageSmoothingEnabled = false;

    }

    drawUpdate() {
        if (this.refreshRate < 100) {
            this.refreshRate += 1;
            return;
        }
        this.refreshRate = 0;
        // this.tilesMatrix.update();
        const ctx = this.ctx;
        // Définir la taille d'une case
        let squareSize = 5;

        let [x, y] = this.world.tilesMatrix.getPos();
        const CHUNK_SIZE = 20;
		const modx = x % CHUNK_SIZE
		const mody = y % CHUNK_SIZE
        x = x - modx;
        y = y - mody;

        const matrixSize = Math.floor(this.size / squareSize)

        // Dessiner le damier
        for (let row = 0; row < matrixSize; row++) {
            for (let col = 0; col < matrixSize; col++) {
                const xx = CHUNK_SIZE * (row - Math.floor(matrixSize / 2)) + x 
                const yy = CHUNK_SIZE * (col - Math.floor(matrixSize / 2)) + y 
                
                const c = this.fm.getTileColor(xx, yy)
                ctx.fillStyle = `rgb(${c[0]}, ${c[1]}, ${c[2]})`;
                ctx.fillRect(col * squareSize, row * squareSize, squareSize, squareSize);
            }
        }

    }



}
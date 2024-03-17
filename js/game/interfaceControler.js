import { TILE_GEN_ZOOM } from "./map/tile.js";

export class InterfaceMiniMap {

    constructor(world, mainDiv) {
        this.world = world;
        this.fm = this.world.factoryMap;

        this.mainDiv = mainDiv;
    }

    init() {
        console.log('=== MiniMap - Init')
        this.drawInit();

        // this.drawUpdate();
    }

    drawInit() {
        this.mainDiv
            .style('display', 'flex')
            .style('flex-direction', 'column')
            .style('position', 'absolute')
            .style('top', '100px')
            .style('left', '40px')
            .style('width', this.width + "px")
            .style('height', this.height + "px")
            // .style('transform', "rotateX(57deg) rotateY(0deg) rotateZ(-133deg)")

        
        const div = this.mainDiv.append('div')
            .style('border', '2px solid')
            .style('content', "''")
            .style('min-height', '14px')
            .style('min-width', '14px')
            .style('position', 'absolute')
            .style('top', '193px')
            .style('left', '193px')
            
        /*
        this.canvas = this.mainDiv.append('canvas')
            .attr('id', "MiniMapCanvas")
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

        document.getElementById('MiniMapCanvas').addEventListener('click', function(event) { 
            console.log("========MiniMap Click", event)
            this.onClick(event.offsetX, event.offsetY)
        }.bind(this), false);
        */
    }

    drawUpdate() {
        
    }



}
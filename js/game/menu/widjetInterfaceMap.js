import { GenTile } from "../map/tile.js";


const MAP_DEFINITION = 3
const CHUNK_SIZE = 5 ;

export class WidjetInterfaceMap {


    // Center of interface
    x = 0
    y = 0
    focalX = 0
    focalY = 0
    // Building select
    selectX = 0
    selectY = 0

    _translate_speed = 15
    _scale_speed = 0.1

    constructor(world, mainDiv) {
        this.world = world;
        this.GS = this.world.globalState;
        this.fg = this.world.factoryGenerator;
        this.fm = this.world.factoryMap;

        this.mainDiv = mainDiv;
        this.size = 600;
        this.zoomOut = 2;

        this.init();
        this.refreshRate = 0;

        // this.GS.sub("TileInfo.position", "WidjetInterfaceMap", this.moveP.bind(this)) 


    }


    init() {
        console.log('=== MiniMap - Init')
        this.drawInit();

        // this.drawUpdate();
    }

    drawInit() {
        this.mainDiv
            // .append('div')
            

        this.mainDiv.html( `
            <div class="buttMenuBox  switch" id="miniMap">
                <input type="checkbox" id="checkbox_menuBox_miniMap", name="MenuBox">
                <label for="checkbox_menuBox_miniMap">🌎</label>
                <div class="widjetMenuBox slider" id="mainInterfaceMap" >
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
        
       const menuInteface = this.mainDiv.select('.widjetMenuBox#mainInterfaceMap')
            .style('width', this.size + 'px')

        this.contentDiv = menuInteface.append("div")
                .attr('id', 'content')

        this.contentDiv.append('div').classed('centerDot', true)


        const butts = menuInteface.selectAll('span')
        const zoomLvl = [.5, 1, 3, 9, 16]

        const thisRef = this;
        butts.each( function(d, i) {
          const butt = d3.select(this)

          butt.on('click', _ => {
            const zoom = zoomLvl[i]
            thisRef.updateZoom(zoom)
          })
        })


        this.mainDiv.select('input').on('click', _ => {
          console.log('CLICK')
          const centreX = this.world.tilesMatrix.x;
          const centreY = this.world.tilesMatrix.y;
          this.moveP([centreX, centreY])
      })
    }

    onClick(clickX, clickY) {
        console.log('Click:', clickX, clickY)
        console.log('ClickCenter:', clickX - this.size / 2, clickY - this.size / 2)
        /*
        const xx = Math.floor(( clickX - this.size / 2 ) / MAP_DEFINITION)
        const yy = Math.floor(( clickY - this.size / 2 ) / MAP_DEFINITION)
        console.log('XX,YY', xx, yy)

        let [x, y] = this.world.tilesMatrix.getPos();
        console.log(x, y, xx, yy)

        this.world.player.setCenter(x + yy * CHUNK_SIZE, y + xx * CHUNK_SIZE);
        */
    }


    createEmptyCanvas(width, height, name) {
      console.log('==DrawEmpty Canva ', name)
      var canvas = this.contentDiv.append('canvas')
        .style('background', 'transparent')
        .style('image-rendering', 'pixelated')
        .style('position', 'absolute')
        .attr('id', name)
        .attr('height', height)
        .attr('width', width)
        // .style('top', (- height / 2) + 'px')
        .style('left', (- width / 2) + 'px');
      return canvas;
    }

  init() {
    this.drawInit();

    this.initTiles();

    var rect = this.contentDiv.node().parentNode.getBoundingClientRect();
    this.contentDiv

    this.move(0, 0);

  }


  initTiles() {
    var size =  this.size;
    var canvas = this.createEmptyCanvas(size, size, "canvasFlore");

    this.tiledFlore = new TiledCanvas(canvas.node(), {
        chunkSize: 128,       //The amount of pixels each chunk is wide and high
        fadeTime: 1000,         //The time images fade when loading from external source
        maxLoadedChunks: 20 * 20 * 4 ,  // We'll try never loading more than this amount of chunks if possible
        blurOnZoom: false,
        zoomLevelToPixelate: 0,
      });
    this.tiledFlore.requestUserChunk = this.requestFloreChunk.bind(this);
    
  }

  moveP(p){
    this.move(p[0], p[1])
  }


  move(x, y) { 
    this.x = x; 
    this.y = y;  
    this.update()
  }

  update() {
    // this.drawSelectedCase();
    var half = (this.size / 2) ;

    const xx = Math.round(this.x  / this.zoomOut) - half; 
    const yy = Math.round(this.y  / this.zoomOut) - half;
    this.tiledFlore.goto(xx, yy);
  }

  updateZoom(zoom) {
    this.zoomOut = zoom
    this.tiledFlore.clearAll();
    this.update()
  }

  clearFlore () {
    this.tiledFlore.clearAll();
    this.update();
  }

  drawSelectedCase (){

    var boxSize = 16 / this.zoomOut;
    // center aling
    var top = (- this.size / 2) - this.y ;
    var left = (- this.size / 2) - this.x;
    // box aling
    top += this.selectY * boxSize;
    left += this.selectX * boxSize;
    // negatif aling
    top += top >= 0 ? -1 : 1;
    left += left >= 0 ? 0 : 1;

    this.selectedObject
      .style('z-index', '100')
      .style('height', boxSize + 'px')
      .style('width', boxSize + 'px')
      .style('top', - 1 + top + 'px')
      .style('left', - 1  + left + 'px')

  }


  requestFloreChunk (cx, cy, callback){
    var size = this.tiledFlore.settings.chunkSize;
    var imgData = new ImageData(size, size);

    var x, y, xi, yi, i;
    for (x = 0; x < size; x += 1) {
      for (y = 0; y < size; y += 1) {
          i = 4 * (y * size + x)
          xi = x + cx * size;
          yi = y + cy * size;

          xi *= this.zoomOut;
          yi *= this.zoomOut;

          xi = Math.round(xi)
          yi = Math.round(yi)

          const tile = this.fm.getTileNoGen(xi, yi) // new GenTile(this.world, xi, yi)
          const c = tile.color
          imgData.data.set(c, i);
          /* = Border
          if (this.world.zoom <= 1 || this.world.zoom <= 1) {
            if (xi % (16 / this.world.zoom) == 0 ) {
              imgData.data.set([255, 255, 255, 128], i);
            }           
          } */
          // = Dote
          if (this.zoom <= 1) {
            if (xi % (16 / this.zoom) == 0 && yi % (16 / this.zoom )== 0) {
              imgData.data.set([0, 0, 0, 255], i);
            }           
          } 
      }
    }

    var canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    canvas.getContext("2d").putImageData(imgData, 0, 0);
    callback(canvas);
  }


}
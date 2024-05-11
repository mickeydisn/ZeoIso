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

        this.GS.sub("TileInfo.position", "WidjetInterfaceMap", this.moveP.bind(this)) 


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
            // .style('height', this.size + 'px')
            // .style('justify-content', 'center')
            // .style('align-items', 'center')
        // this.contentDiv = menuInteface.insert("div",":first-child")
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
        /*
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
        */

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
      // .style('top', (rect.height / 2) + 'px')
      // .style('left', (rect.width / 2) + 'px')
    
    /*
    this.selectedObject = this.contentDiv.append('div')
      .style('position', 'absolute')
      .style('z-index', '100')
      .style('border', '.5px solid #FFF')
      .style('height', '17px')
      .style('width', '17px')
    */
    /*
    var clickSurface = this.createEmptyCanvas(this.world.size, this.world.size, "canvasClickInterface");
    clickSurface.style('z-index', '200');
    */
    /*
    var funcClickControle = this.clickControle.bind(this);
    // var funcZoomControle = this.zoomControle.bind(this);
    clickSurface
      .on('click', function () {
        funcClickControle(d3.mouse(this));
      })
      // .on("wheel", function(d){
      //   funcZoomControle(d3.event.wheelDelta > 0);
      // });

    */
    // this.center();
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

  /*

  clearBuilding() {
    this.tiledBuilding.clearAll();
  }

  drawCity (city) {
    city.draw(this.tiledBuilding.context, this.world.zoom);
  }

  drawBuilding (build) {
    if (build.imageData != null) {
      var z = 16 / this.world.zoom;
      var xDisplay = build.x * z;
      var yDisplay = build.y * z;
      this.tiledBuilding.context.drawImage(build.imageData, xDisplay, yDisplay, z, z);
    }
  }

  drawAllBuilding () {
    console.log("drawAllBuilding")
    this.clearBuilding();
    var world = this.world;
    if (world.factoryBuilding)
      world.factoryBuilding.openList.forEach(function (build) {
        world.interfaceMap.drawBuilding(build);
      })
    if (world.factoryCity)
      world.factoryCity.openList.forEach(function (build) {
        world.interfaceMap.drawCity(build);
      })

    this.reDrawBuilding();
  }

  reDrawBuilding() {
    this.focalX = this.x;
    this.focalY = this.y;
    var x = Math.round(this.x / (this.world.zoom));
    var y = Math.round(this.y / (this.world.zoom));
    this.tiledBuilding.drawingRegion(
      -512 * 2 + this.x + 512, // + thix.x / (this.world.zoom * 128), 
      -512 * 2 + this.y + 512, 
      512 * 2 + this.x + 512,
      512 * 2 + this.y + 512, 
    );
    
    this.tiledBuilding.execute();
  }

  
 appliedZoomLvl(n, grain=null) {
        var size = this.world.size;
        var half = size / 2;
        var x = (this.x + half) * this.world.zoom; 
        var y = (this.y + half) * this.world.zoom;

        // this.world.appliedZoomLvl(n);
        // if (grain)
        //   this.world.appliedGrainLvl(grain);
  
        // this.world.interfaceMenu.ButtomZoomLvl.value.text(1 / this.world.zoom);

        this.x = x / this.world.zoom - half; 
        this.y = y / this.world.zoom - half;

        this.clearFlore();
        this.clearBuilding();
        this.drawAllBuilding();
  }



  appliedZoom(n) {
        var size = this.world.size;
        var half = size / 2;
        var x = (this.x + half) * this.world.zoom; 
        var y = (this.y + half) * this.world.zoom;

        this.zoom = n

        // this.world.appliedZoom(n)
        // this.world.interfaceMenu.ButtomZoomLvl.value.text(1 / this.world.zoom);

        this.x = x / this.world.zoom - half; 
        this.y = y / this.world.zoom - half;

        this.clearFlore();
        /*
        this.clearBuilding();
        this.drawAllBuilding();
        * /
  }
  appliedGrain(n) {
      this.grain = n
      // this.world.appliedGrain(n)
      // this.world.interfaceMenu.ButtomZoomGrain.value.text(this.world.grain);

      this.clearFlore()
      /*
      this.clearBuilding();
      this.drawAllBuilding();
      * /
  }
*/

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

  /*
  clickControle(cord) {
    var boxSize = 16 / this.world.zoom;
    var x = Math.round(cord[0] / this.zoom) + this.x;
    var y = Math.round(cord[1] / this.zoom) + this.y;
    x -= x >= 0 ? x % boxSize : x % boxSize + boxSize;
    y -= y >= 0 ? y % boxSize : y % boxSize + boxSize;
    this.selectX = x / boxSize;
    this.selectY = y / boxSize;

    this.world.interfaceMenu.onClickTile(this.selectX, this.selectY);
    this.drawSelectedCase();

  }

  zoomControle(uup) {
    if (uup && this.zoom < 4) {
      this.zoom *= 1 + this._scale_speed;
    }  
    if (!uup && this.zoom > 0.5) {
      this.zoom /= 1 + this._scale_speed;
    }  
    this.move();
  }

  */

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

/*
  requestBuildingChunk(cx, cy, callback){
    var size = this.tiledBuilding.settings.chunkSize;
    var imgData = new ImageData(size, size);

    var canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    canvas.getContext("2d").putImageData(imgData, 0, 0);
    callback(canvas);
  }


*/

}
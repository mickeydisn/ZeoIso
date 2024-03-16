
import {} from '../../scripts/tiledCanvas.js'



export class InterfaceMap {

  constructor(mainDiv, world) {
    this.mainDiv = mainDiv;
    this.world = world;
    this.world.interfaceMap = this;

    // Center of interface
    this.x= 0;
    this.y= 0;
    // ??
    this.focalX= 0;
    this.focalY= 0;
    // Building select
    this.selectX= 0;
    this.selectY= 0;

    this.zoom= 1;
    this._translate_speed= 15;
    this._scale_speed= 0.1;

}

  center() {
    this.x = -this.world.size / 2;
    this.y = -this.world.size / 2;
  }

  createEmptyCanvas(width, height, name) {
    var canvas = this.mainDiv.append('canvas')
      .style('background', 'transparent')
      .style('image-rendering', 'pixelated')
      .style('position', 'absolute')
      .attr('id', name)
      .attr('height', height)
      .attr('width', width)
      .style('top', (- height / 2) + 'px')
      .style('left', (- width / 2) + 'px');
    return canvas;
  }

  init() {

    this.initTiles();

    var rect = this.mainDiv.node().parentNode.getBoundingClientRect();
    this.mainDiv
      .style('border', '10px solid #FFF')
      .style('height', '1px')
      .style('width', '1px')
      .style('top', (rect.height / 2) + 'px')
      .style('left', (rect.width / 2) + 'px')
    

    this.selectedObject = this.mainDiv.append('div')
      .style('position', 'absolute')
      .style('z-index', '100')
      .style('border', '.5px solid #FFF')
      .style('height', '17px')
      .style('width', '17px')

    var clickSurface = this.createEmptyCanvas(this.world.size, this.world.size, "canvasClickInterface");

    clickSurface.style('z-index', '200');
    
    var funcClickControle = this.clickControle.bind(this);
    // var funcZoomControle = this.zoomControle.bind(this);

    clickSurface
      .on('click', function () {
        funcClickControle(d3.mouse(this));
      })
      // .on("wheel", function(d){
      //   funcZoomControle(d3.event.wheelDelta > 0);
      // });

    this.center();
    this.move();

    this.dotColor = {}

    var image = new Image();
    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==';
    this.dotColor.red = image

    var image = new Image();
    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    this.dotColor.reda = image


    var image = new Image();
    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
    this.dotColor.b = image

    var image = new Image();
    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';
    this.dotColor.ba = image


    var image = new Image();
    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII=';
    this.dotColor.w = image

    var image = new Image();
    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII=';
    this.dotColor.wa = image

  }


  initTiles() {

    var size =  this.world.size;
    var canvas = this.createEmptyCanvas(size, size, "canvasFlore");
    this.tiledFlore = new TiledCanvas(canvas.node(), {
        chunkSize: 128,       //The amount of pixels each chunk is wide and high
        fadeTime: 1000,         //The time images fade when loading from external source
        maxLoadedChunks: 20 * 20 * 4 ,  // We'll try never loading more than this amount of chunks if possible
        blurOnZoom: false,
        zoomLevelToPixelate: 0,
      });
    this.tiledFlore.requestUserChunk = this.requestFloreChunk.bind(this);
    
    /*$
    for (var x = -5; x < 5; x +=1){
      console.log('loading Flore', x)
      for (var y = -5; y < 5; y +=1)
        this.tiledFlore.requestChunk(x,y)
    }
    
    this.tiledFlore.execute();
    /*$*/

    var canvas = this.createEmptyCanvas(size, size, "canvasBuilding");
    this.tiledBuilding = new TiledCanvas(canvas.node(), {
        chunkSize: 128,       //The amount of pixels each chunk is wide and high
        fadeTime: 1000 ,         //The time images fade when loading from external source
        maxLoadedChunks: 20 * 20 * 4    // We'll try never loading more than this amount of chunks if possible
    });
    this.tiledBuilding.requestUserChunk = this.requestBuildingChunk.bind(this);
    this.reDrawBuilding();
    this.tiledBuilding.execute();

  }

  moveTo(x, y) {  
    var size = this.world.size;
    var half = size / 2;
    this.x = x * 16 / this.world.zoom - half; 
    this.y = y * 16 / this.world.zoom - half;

     this.move();
  }


  move() {  
    this.mainDiv.style("transform", "translate(0px, 0px) scale(" + this.zoom + ")");
    this.drawSelectedCase();

    this.tiledFlore.goto(this.x, this.y);
    // this.tiledBuilding.goto(this.x, this.y);

    /*
    var size = this.world.size;
    if (this.focalX - this.x < - size || this.focalX - this.x > size 
      || this.focalY - this.y < - size || this.focalY - this.y > size)
      this.drawAllBuilding();
      */
    //if (this.focalX - this.x > 512)
    // this.reDrawBuilding();
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

          imgData.data.set(this.world.getColor(xi, yi, this.world.zoom, 1), i);
          /* = Border
          if (this.world.zoom <= 1 || this.world.zoom <= 1) {
            if (xi % (16 / this.world.zoom) == 0 ) {
              imgData.data.set([255, 255, 255, 128], i);
            }           
          } */
          // = Dote
          if (this.world.zoom <= 1) {
            if (xi % (16 / this.world.zoom) == 0 && yi % (16 / this.world.zoom )== 0) {
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


  requestBuildingChunk (cx, cy, callback){
    var size = this.tiledBuilding.settings.chunkSize;
    var imgData = new ImageData(size, size);

    var canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    canvas.getContext("2d").putImageData(imgData, 0, 0);
    callback(canvas);
  }


  clearFlore () {
    this.tiledFlore.clearAll();
    this.move();
  }

  clearBuilding () {
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

  reDrawBuilding () {
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

  
 appliedZoomLvl (n, grain) {
        var size = this.world.size;
        var half = size / 2;
        var x = (this.x + half) * this.world.zoom; 
        var y = (this.y + half) * this.world.zoom;

        this.world.appliedZoomLvl(n);
        if (grain)
          this.world.appliedGrainLvl(grain);
  
        // this.world.interfaceMenu.ButtomZoomLvl.value.text(1 / this.world.zoom);

        this.x = x / this.world.zoom - half; 
        this.y = y / this.world.zoom - half;

        this.clearFlore();
        this.clearBuilding();
        this.drawAllBuilding();
  }



  appliedZoom (n) {
        var size = this.world.size;
        var half = size / 2;
        var x = (this.x + half) * this.world.zoom; 
        var y = (this.y + half) * this.world.zoom;

        this.world.appliedZoom(n)
        this.world.interfaceMenu.ButtomZoomLvl.value.text(1 / this.world.zoom);

        this.x = x / this.world.zoom - half; 
        this.y = y / this.world.zoom - half;

        this.clearFlore();
        this.clearBuilding();
        this.drawAllBuilding();
  }
  appliedGrain (n) {
      this.world.appliedGrain(n)
      this.world.interfaceMenu.ButtomZoomGrain.value.text(this.world.grain);

      this.clearFlore()
      this.clearBuilding();
      this.drawAllBuilding();
  }

  drawSelectedCase (){

    var boxSize = 16 / this.world.zoom;
    // center aling
    var top = (- this.world.size / 2) - this.y ;
    var left = (- this.world.size / 2) - this.x;
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

  clickControle (cord) {
    var boxSize = 16 / this.world.zoom;
    var x = Math.round(cord[0] / this.zoom) + this.x;
    var y = Math.round(cord[1] / this.zoom) + this.y;
    x -= x >= 0 ? x % boxSize : x % boxSize + boxSize;
    y -= y >= 0 ? y % boxSize : y % boxSize + boxSize;
    this.selectX = x / boxSize;
    this.selectY = y / boxSize;

    // this.world.interfaceMenu.onClickTile(this.selectX, this.selectY);
    this.drawSelectedCase();

  }

  zoomControle(up) {
    if (up && this.zoom < 4) {
      this.zoom *= 1 + this._scale_speed;
    }  
    if (!up && this.zoom > 0.5) {
      this.zoom /= 1 + this._scale_speed;
    }  
    this.move();
  }

  keyControle (keyPressed) {
    var move = false;
    if (keyPressed == '3') {
      if (this.zoom > 0.2) {
        move = true;
        this.center();
      }
    }
    if (move) {
      this.move();
    };
  }

  keyLoopControle (keyPressed) {
    var move = false;
    if (keyPressed['d']) {
      move = true;
      this.x = this.x + this._translate_speed;
    }
    if (keyPressed['q']) {
      move = true;
      this.x = this.x - this._translate_speed;
    }
    if (keyPressed['s']) {
      move = true;
      this.y = this.y + this._translate_speed;
    }
    if (keyPressed['z']) {
      move = true;
      this.y = this.y - this._translate_speed;
    }
    if (move) {
      console.log('KeyMove')
      this.move();
    };
  }


}
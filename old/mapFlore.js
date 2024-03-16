
function MapFlore(matris, world, zoom=1) {
  this.matris = matris;
  this.world = world;
  this.zoom = zoom;

  this.size = this.matris.size;

  this.width = this.size * this.zoom;
  this.height = this.size * this.zoom;

}

MapFlore.prototype = {

  // -----------------------

  waterLvl : 64,

  getXY(x, y) {
    var ival = this.matris.get256( i % this.size, (i - (i % this.size)) / this.size);
  },

  getI(i) {
    var ival = this.matris.get256( i % this.size, (i - (i % this.size)) / this.size);
    return ival
  },

  draw : function(ctx) {

    var imgData = ctx.createImageData(this.width, this.height);

    var i, lvl;
    for (i = 0; i < imgData.data.length; i += 4) {
        lvl = this.getI(i / 4);
        // lvl = lvl % 8 == 0 ? lvl : 255 - lvl ;
        lvl -= lvl % 4;
        
        imgData.data[i+3] = 256;

        if (lvl < this.waterLvl) {
          // imgData.data[i+0] = 0; 
          // imgData.data[i+1] = 0;
          imgData.data[i+2] = (lvl * 3);
        } else if (lvl > this.waterLvl * 3) {
          imgData.data[i+0] = (lvl - this.waterLvl * 3) * 3;
          imgData.data[i+1] = (lvl - this.waterLvl * 3) * 3;
          imgData.data[i+2] = (lvl - this.waterLvl * 3) * 3;
        } else {
          // imgData.data[i+0] = 0; 
          imgData.data[i+1] =  255 - lvl;
          // imgData.data[i+2] = lvl;
        }

        if (lvl % this.waterLvl == 0) {
          imgData.data[i+0] = 256 - lvl; 
          imgData.data[i+1] = 256 - lvl;
          imgData.data[i+2] = 0;
        }
    }

    var size = Math.sqrt(imgData.data.length / 4);
      var i, lvl0, lvla, lvlb, lvlc, lvld ;
      for (var x = 0; x < size; x += 1) {
        for (var y = 0; y < size; y += 1) {
          i  = 4 * (x * size + y) ; 
          lvl0 = this.getI(i / 4) ;  
          lvla = this.getI((x + 1) * size + (y + 1)) ;           
          lvlb = this.getI((x + 1) * size + (y - 1)) ;           
          lvlc = this.getI((x - 1) * size + (y + 1)) ;           
          lvld = this.getI((x - 1) * size + (y - 1)) ;           
          lvl0 -= lvl0 % 8;
          lvla -= lvla % 8;
          lvlb -= lvlb % 8;
          lvlc -= lvlc % 8;
          lvld -= lvld % 8;
          if ( lvl0 > lvla || lvl0 > lvlb || lvl0 > lvlc || lvl0 > lvld ) {
            imgData.data[i+0] = 32 + imgData.data[i+0]; 
            imgData.data[i+1] = 32 + imgData.data[i+1];
            imgData.data[i+2] = 32 + imgData.data[i+2];
          } 
        }
      }

    ctx.putImageData(imgData, 0, 0);

  },

  drawLine : function(ctx) {

    var imgData = ctx.getImageData(0, 0, this.width, this.height);


    var size = Math.sqrt(imgData.data.length / 4);
    var i, lvl0, lvla, lvlb, lvlc, lvld ;
    for (var x = 0; x < size; x += 1) {
      for (var y = 0; y < size; y += 1) {
        i  = 4 * (x * size + y) ; 
        lvl0 = this.getI(i / 4) ;  
        lvla = this.getI((x + 1) * size + (y + 1)) ;           
        lvlb = this.getI((x + 1) * size + (y - 1)) ;           
        lvlc = this.getI((x - 1) * size + (y + 1)) ;           
        lvld = this.getI((x - 1) * size + (y - 1)) ;           
        lvl0 -= lvl0 % 8;
        lvla -= lvla % 8;
        lvlb -= lvlb % 8;
        lvlc -= lvlc % 8;
        lvld -= lvld % 8;
        if ( lvl0 > lvla || lvl0 > lvlb || lvl0 > lvlc || lvl0 > lvld ) {
          imgData.data[i+0] = 255; 
          imgData.data[i+1] = 255;
          imgData.data[i+2] = 255;
          imgData.data[i+3] = 32 && 0xFF;

        } 
      }
    }

    ctx.putImageData(imgData, 0, 0);

  },




}


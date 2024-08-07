import {} from '../../../scripts/simplex-noise.js'

import {GAME_BIOMES_MATRIS} from './data/biomes.js'


export class FactoryGenerator {

  constructor(world) {
    console.log( '== Init Factory Generator ==');

    this.world = world; 

    this.factoryBiomes = world.factoryBiomes;
    this.biomes = this.factoryBiomes.biomes;

    this.biomeMatrix = GAME_BIOMES_MATRIS;

    this.seed = world.seed;
    this.waterLvl = 64;
    this.mountLvl = 196;

    this.simplex = new SimplexNoise(this.seed);

  }

    // prety configured noise fonction. 
  _noise(x, y) {
      var f0 = 1 / 4 / 16;
      return (this.simplex.noise2D(f0 * x, f0 * y) + 1) / 2;
  }

  _zoom_and_grain(x, y, zoom, grain){
    x = zoom * x ;
    y = zoom * y ;
    x -= x > 0 ? x % grain - grain / 2: x % grain + grain / 2;
    y -= y > 0 ? y % grain - grain / 2: y % grain + grain / 2;
    return [x, y]
  }

  getRawLvl(x, y, zoom=1, grain=1) {    
    var fw = 1/ 200;
    var fa = 1/ 20;
    var f0 = 1/ 8;
    var f1 = 2/ 3;
    var lvl = 0;

    [x, y] = this._zoom_and_grain(x, y, zoom, grain);

    lvl += this._noise(fw * x, fw * y) * 8;
    lvl += this._noise(fa * x, fa * y) * 4;

    lvl += this._noise(f0 * x, f0 * y) * 1;
    lvl += this._noise(f1 * x, f1 * y) * 1/4;
    // lvl += this._noise(f2 * x, f2 * y) * 1/8;


    lvl /= 8 + 4 + 1 + 1/4 // + 1/8

    return lvl;
  }
  
  getRawPeak(x, y, zoom=1, grain=1) {    
    var f0 = 1/17;
    var f1 = f0 * 2;
    var f2 = f0 * 3;
  
    var lvl = 0;

    [x, y] = this._zoom_and_grain(x, y, zoom, grain);


    lvl += this._noise(f0 * x, f0 * y) * 1;
    lvl += this._noise(f1 * x, f1 * y) / 2;
    lvl += this._noise(f2 * x, f2 * y) / 4;
    // lvl += this._noise(f3 * x, f3 * y) / 8;
    lvl /= 1  + 1/2 + 1/4 // + 1/8

    // Change Orientation
    lvl = (lvl - .5) * 2
    lvl = lvl > 0 ? lvl : - lvl
    return lvl;
  }
  
  getRawErosion(x, y, zoom=1, grain=1) {    
    var f0 = 1/100;
    var f1 = f0 * 2;
    var f2 = f0 * 4;
    var f3 = f0 * 8;
    var t = 0;
    var lvl = 0;

    [x, y] = this._zoom_and_grain(x, y, zoom, grain);


    lvl += this._noise(f0 * x + t, f0 * y + t) * 1;
    lvl += this._noise(f1 * x + t, f1 * y + t) * 1/8;
    lvl += this._noise(f2 * x + t, f2 * y + t) * 1/16;
    // lvl += this._noise(f3 * x, f3 * y) / 8;
    lvl /= 1  +  1/8 + 1/16

    return lvl;
  }



  getLvl(x, y, zoom=1, grain=1) {    
    const lvl = this.getRawLvl(x, y, zoom, grain)    
    return lvl * 256 & 0xFF;
  }


  getPeak(x, y, zoom=1) {

    const eroLvl = this.getRawErosion(x, y, zoom)
    const peakLvl = this.getRawPeak(x, y, zoom)
    let peakLocal = (1-eroLvl) * peakLvl
   
    // RIVER
    if (peakLocal < .003  && eroLvl > .55) { // river
      const factor = 1 - peakLocal * (1/.003)
      return [- ( 3 * factor + 1 ), 'river']

    }
    // TALUS
    else if (peakLocal < .04  && eroLvl < .55) {      
      let factor = 1 - peakLocal * (1/.04)
      // sfactor = peakLocal > .01 ? factor : 1
      return [( 10 * factor  ), 'talus']
  
    // HILL   
    } else if (peakLocal > .4) {
      let factor = (peakLocal - .4) * (1/(1 - .4))
      factor = 1 - Math.pow(1 - factor, 6)
      return [( 40 * factor + 2 ), 'hill']
    }
    return [0, null]
  }

  getLvlGen(x, y, zoom=1, grain=1) {
  	let rawLvl = this.getRawLvl(x, y, zoom) * 256

    const rawLvlMod = rawLvl & 0xFF


    // Ajuste Lvl to be more natural ( less liear )
    let lvl = 0
		if (rawLvlMod < 80) {
			lvl =  0.0008 * Math.pow(rawLvl - 80, 3) + 70 // 0.001 => Deep Sea, 0.0001 => Flat Sea
		} else {
			lvl = 0.03 * Math.pow(rawLvl - 80, 2) + 70 // 0.01 => Flat Montagne , 0.05 => Hight montagne
		}
	
		// Creta a gap on the water lvl
		if (rawLvlMod < this.waterLvl) {
			lvl -= 1/3
      return [lvl, this.waterLvl]      
		}

    // Apply Erotion & PeakValet
    if (rawLvlMod > this.waterLvl) {
      const [lvlPeak, peakType] = this.getPeak(x, y, zoom) 
      if (peakType == 'river') {
        return [lvl - 1/3 + lvlPeak, lvl - 1/3]        
      } 

      lvl += lvlPeak
      return [lvl, lvl]
    }

    return [lvl, lvl]

  }



  getTemperature(x, y, zoom=1, grain=1) {
    var f = 0.5 / 2 
    var t = 42 
    var f0 = f * 1/ 20 / 2
    var f1 = f * 1/ 10 / 2
    var f2 = f * 2/3 / 2
    var f3 = f * 100
    var lvl = 0;

    [x, y] = this._zoom_and_grain(x, y, zoom, grain);
  
    lvl += this._noise(f0 * x + t, f0 * y + t) ;
    lvl += this._noise(f1 * x + t, f1 * y + t) * 2/3;
    lvl += this._noise(f2 * x, f2 * y) / 8;
    lvl += this._noise(f3 * x, f3 * y) / 16;
    lvl /= 1 + 2/3 + 1/8 + 1/16;
    return lvl * 256 & 0xFF;
  }

  getHydro(x, y, zoom=1, grain=1) {
    var f = 0.5 / 2
    var t = 0 
    var f0 = 1/ 20 / 2
    var f1 = 1/ 10 / 2
    var f2 = 2/3 / 2
    var f3 = f * 100
    var lvl = 0;

    [x, y] = this._zoom_and_grain(x, y, zoom, grain);

    lvl += this._noise(f0 * x + t, f0 * y + t);
    lvl += this._noise(f1 * x + t, f1 * y + t) * 2/3;
    lvl += this._noise(f2 * x + t, f2 * y + t) / 8;
    lvl += this._noise(f3 * x, f3 * y) / 16;
    lvl /= 1 + 2/3 + 1/8 + 1/16;
    return lvl * 256 & 0xFF;
  }


  getRandBuilding(x, y, t=0, zoom=1, grain=1) {
    var f0 = 42;
    // var f1 = 0.1;
    var f2 = 0.75;
    // var f3 = 300;
    var lvl = 0;

    [x, y] = this._zoom_and_grain(x, y, zoom, grain);
    
    lvl += this._noise(f0 * x + t, f0 * y + t) * 5;
    // lvl += this._noise(f1 * x + t, f1 * y + t) / 2;
    // lvl += this._noise(f2 * x + t, f2 * y + t) ;
    // lvl += this._noise(f3 * x + t, f3 * y + t) / 4 ;
    lvl /= 4 + 1 ; //  + 1/4;
    return lvl
  }


  getRawFlore(x, y, t=0, zoom=1, grain=1) {
    grain = grain * 2;
    var f0 = 1/15;
    // var f1 = 0.1;
    var f2 = 0.75;
    // var f3 = 300;
    var lvl = 0;

    [x, y] = this._zoom_and_grain(x, y, zoom, grain);
    
    lvl += this._noise(f0 * x + t, f0 * y + t) * 4;
    // lvl += this._noise(f1 * x + t, f1 * y + t) / 2;
    lvl += this._noise(f2 * x + t, f2 * y + t) ;
    // lvl += this._noise(f3 * x + t, f3 * y + t) / 4 ;
    lvl /= 4 + 1 ; //  + 1/4;
    return lvl
  }

  getFlore(x, y, t=0, zoom=1, grain=1) {
    const lvl = this.getRawFlore(x, y, t, zoom, grain)
    return lvl * 255 ;
  }

  getRawDensity (x, y, zoom=1, grain=1) {
    var f0 = 1/40;
    var f1 = 1/10;
    var f2 = 1/2;
    var t = 0;
    let dencity = 0;

    [x, y] = this._zoom_and_grain(x, y, zoom, grain);
    
    dencity += this._noise(f0 * x + t, f0 * y + t) * 16;
    dencity += this._noise(f0 * x + t, f0 * y + t) * 8;
    dencity += this._noise(f2 * x + t, f2 * y + t);
    dencity /= 16 + 8 + 1  
    if ( dencity < 0.5) {
      dencity = 1 - dencity
    }
    return dencity ;
  }


  getDensity (x, y, zoom=1, grain=1) {
    let dencity = this.getRawDensity(x, y, zoom, grain) 
    dencity = dencity * 255;
    dencity = dencity - dencity % 1
    return dencity;
  }
  /* ----------- */

  getBiome (x, y, zoom=1, grain=1) {
    var lvl = Math.floor(this.getLvl(x , y, zoom));

    if (lvl < this.waterLvl) {
      return this.biomes['ocean'];
    }
    if (lvl > this.mountLvl) {
      return this.biomes['mont1'];
    }    

    if (lvl == this.waterLvl || lvl == this.waterLvl + 1) {
      return this.biomes['beach'];
    }
    if (lvl == this.mountLvl) {
      return this.biomes['mountL'];
    }

    const [lvlPeak, peakType] = this.getPeak(x , y, zoom)
    if (lvlPeak < 0) {
      return this.biomes['river'];
    }

    var temp = this.getTemperature(x, y, zoom); 
    var hydro = this.getHydro(x, y, zoom) ; 
    var mod = 32;
    temp = (temp - temp % mod) / mod;
    hydro = (hydro - hydro % mod) / mod;
    return this.biomes[this.biomeMatrix[temp * 8 + hydro]];
  }


  getItem(x, y, zoom=1, grain=1) {

    var biome = this.getBiome(x, y, zoom, 16);
    var f = this.getFlore(x, y, 0, zoom, grain);
    var lvl = this.getLvl(x, y, zoom, grain); 

    var floreItem = null;
    floreItem = biome.flore(lvl ,f);

    if (floreItem == null)
      return null;
    return floreItem;
  }

  /* ----------- */

  getBiomeColor(x, y, lvl=0, zoom=1, grain=1) {
    return this.getBiome(x, y, zoom, grain).color(lvl); 
  }

  getLvlColor (x, y, zoom=1, grain=1) {

    // var c = new Uint8Array(4);
    var lvl = this.getLvl(x, y, zoom, grain); 
    lvl -= lvl % 4;

    var c = new Uint8Array(this.getBiomeColor(x, y, lvl, zoom, 1));
    const hsl = rgbToHsl(c[0], c[1], c[2]);
    c.set(hslToRgb(hsl[0], hsl[1] * 0.3, hsl[2]));

    return c
  }

 
  /* ----------- */

 getCellInfo (cx, cy) {
    var xi = cx * 16 + 8;
    var yi = cy * 16 + 8;

    var lvl = Math.floor(this.getLvl(xi , yi, 1, 16));
    var hydro = Math.floor(this.getHydro(xi , yi, 1, 16));
    var temperature = Math.floor(this.getTemperature(xi , yi, 1, 16));
    var dencity = this.getDensity(xi , yi , 1, 16);
    var biomeItem = this.getBiome(xi , yi , 1, 16);
    return {
      lvl: lvl, 
      hydro: hydro,
      temperature: temperature,
      dencity: dencity,
      biomeItem: biomeItem,
    }
  }

}



/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
export function hslToRgb (h, s, l) {
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
export function  rgbToHsl (r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}
import {} from '../../../scripts/simplex-noise.js'

import {GAME_BIOMES_MATRIS} from './data/biomes.js'


export class FactoryTileRawGenerator {

  constructor(world) {
    console.log( '== Init Factory Tile Raw Generator ==');
    this.world = world; 

    this.seed = world.seed;
    this.simplex = new SimplexNoise(this.seed);

  }

    // prety configured noise fonction. 
  _noise(x, y) {
      const f0 = 1 / 4 / 16;
      return (this.simplex.noise2D(f0 * x, f0 * y) + 1) / 2;
  }

  _zoom_and_grain(x, y, zoom){
    x = zoom * x ;
    y = zoom * y ;
    return [x, y]
  }


  getRawTile(x, y, zoom=1) {
    return {
      rLvl: this.getRawLvl(x, y, zoom),
      rPeak: this.getRawPeak(x, y, zoom),
      rErosion: this.getRawErosion(x, y, zoom),
      rFlore: this.getRawFlore(x, y, zoom),
    }
  }

  getFuncTile(x, y, zoom=1) {
    return {
      fHydro: this.getFuncHydro(x, y, zoom),
      fTemp: this.getFuncTemperature(x, y, zoom),
      fLvl: this.getFuncLvl(x, y, zoom),
      fDensity: this.getFuncDensity(x, y, zoom),
    }
  }


  /* --- */

  getRawTemperature(x, y, zoom=1) {
    const f = 0.5 / 2 
    const t = 42 
    const f0 = f * 1/ 20 / 2
    const f1 = f * 1/ 10 / 2
    const f2 = f * 2/3 / 2
    const f3 = f * 100
    let lvl = 0;

    [x, y] = this._zoom_and_grain(x, y, zoom);
  
    lvl += this._noise(f0 * x + t, f0 * y + t) ;
    lvl += this._noise(f1 * x + t, f1 * y + t) * 2/3;
    lvl += this._noise(f2 * x, f2 * y) / 8;
    lvl += this._noise(f3 * x, f3 * y) / 32;
    lvl /= 1 + 2/3 + 1/8 + 1/32;
    return lvl;
  }

  getRawHydro(x, y, zoom=1) {
    const f = 0.5 / 2
    const t = 0 
    const f0 = 1/ 20 / 2
    const f1 = 1/ 10 / 2
    const f2 = 2/3 / 2
    const f3 = f * 100
    let lvl = 0;

    [x, y] = this._zoom_and_grain(x, y, zoom);

    lvl += this._noise(f0 * x + t, f0 * y + t);
    lvl += this._noise(f1 * x + t, f1 * y + t) * 2/3;
    lvl += this._noise(f2 * x + t, f2 * y + t) / 8;
    lvl += this._noise(f3 * x, f3 * y) / 32;
    lvl /= 1 + 2/3 + 1/8 + 1/32;
    return lvl;
  }

  /* --- */


  getRawLvl(x, y, zoom=1) {    
    const fw = 1/ 200;
    const fa = 1/ 20;
    const f0 = 1/ 8;
    const f1 = 2/ 3;
    let lvl = 0;

    [x, y] = this._zoom_and_grain(x, y, zoom);

    lvl += this._noise(fw * x, fw * y) * 8;
    lvl += this._noise(fa * x, fa * y) * 4;
    lvl += this._noise(f0 * x, f0 * y) * 1;
    lvl += this._noise(f1 * x, f1 * y) * 1/4;

    lvl /= 8 + 4 + 1 + 1/4 // + 1/8
    return lvl;
  }
  
  getRawPeak(x, y, zoom=1) {    
    const f0 = 1/17;
    const f1 = f0 * 2;
    const f2 = f0 * 3;
  
    let lvl = 0;

    [x, y] = this._zoom_and_grain(x, y, zoom);

    lvl += this._noise(f0 * x, f0 * y) * 1;
    lvl += this._noise(f1 * x, f1 * y) / 2;
    lvl += this._noise(f2 * x, f2 * y) / 4;
    lvl /= 1  + 1/2 + 1/4 // + 1/8

    // Change Orientation
    lvl = (lvl - .5) * 2
    lvl = lvl > 0 ? lvl : - lvl
    return lvl;
  }
  
  getRawErosion(x, y, zoom=1) {    
    const f0 = 1/100;
    const f1 = f0 * 2;
    const f2 = f0 * 4;
    //const f3 = f0 * 8;
    const t = 0;
    let lvl = 0;

    [x, y] = this._zoom_and_grain(x, y, zoom);

    lvl += this._noise(f0 * x + t, f0 * y + t) * 1;
    lvl += this._noise(f1 * x + t, f1 * y + t) * 1/8;
    lvl += this._noise(f2 * x + t, f2 * y + t) * 1/16;
    // lvl += this._noise(f3 * x, f3 * y) / 8;
    lvl /= 1  +  1/8 + 1/16

    return lvl;
  }

  /* --- */

  getRawFlore(x, y, zoom=1, t=0) {
    const f0 = 1/15;
    // const f1 = 0.1;
    const f2 = 0.75;
    // const f3 = 300;
    let lvl = 0;

    [x, y] = this._zoom_and_grain(x, y, zoom);
    
    lvl += this._noise(f0 * x + t, f0 * y + t) * 4;
    // lvl += this._noise(f1 * x + t, f1 * y + t) / 2;
    lvl += this._noise(f2 * x + t, f2 * y + t) ;
    // lvl += this._noise(f3 * x + t, f3 * y + t) / 4 ;
    lvl /= 4 + 1 ; //  + 1/4;
    return lvl
  }

  getRawDensity (x, y, zoom=1) {
    const f0 = 1/40;
    const f1 = 1/10;
    const f2 = 1/2;
    const t = 0;
    let dencity = 0;

    [x, y] = this._zoom_and_grain(x, y, zoom);
    
    dencity += this._noise(f0 * x + t, f0 * y + t) * 16;
    dencity += this._noise(f0 * x + t, f0 * y + t) * 8;
    dencity += this._noise(f2 * x + t, f2 * y + t);
    dencity /= 16 + 8 + 1  
    if ( dencity < 0.5) {
      dencity = 1 - dencity
    }
    return dencity ;
  }


  /* */

  getFuncLvl(x, y, zoom=1) {    
    const lvl = this.getRawLvl(x, y, zoom)    
    return lvl * 256 & 0xFF;
  }

  getFuncTemperature(x, y, zoom=1) {    
    const lvl = this.getRawTemperature(x, y, zoom)    
    return lvl * 256 & 0xFF;
  }
  getFuncHydro(x, y, zoom=1) {    
    const lvl = this.getRawHydro(x, y, zoom)    
    return lvl * 256 & 0xFF;
  }

  getFuncDensity (x, y, zoom=1) {
    const dencity = this.getRawDensity(x, y, zoom) 
    return dencity * 255 & 0xFF;
  }
}


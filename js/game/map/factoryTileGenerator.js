import {} from '../../../scripts/simplex-noise.js'

import {GAME_BIOMES_MATRIS} from './data/biomes.js'
import { FactoryTileRawGenerator } from './factoryTileRawGenerator.js';


export class FactoryTileGenerator extends FactoryTileRawGenerator{

  constructor(world) {
    super(world)
    console.log( '== Init Factory Tile Generator ==');

    this.factoryBiomes = world.factoryBiomes;
    this.biomes = this.factoryBiomes.biomes;

    this.biomeMatrix = GAME_BIOMES_MATRIS;

    this.waterLvl = 64;
    this.mountLvl = 196;
    this.init();

  }

  init() {

    this.LvlX = {
      Z:0, W1:32, W2:64, 
      P0:64, P1:96, P2:160, 
      M1:192, M2:224, T:256
    }
    this.Lvl2 = {
      Z:-144, W1:-32, W2:79, 
      P0:80, P1:96, P2:128, 
      M1:192, M2:256 + 128, T: 512// 288 + 64 
    }
    const LvlX = this.LvlX;
    const Lvl2 = this.Lvl2;

    //  .w. -- . -- . -- .m. 

    const scale_Base = {
      Z_W1:  d3.scalePow([ LvlX.Z, LvlX.W1], [Lvl2.Z, Lvl2.W1]).exponent(4),
      W1_W2: d3.scalePow([LvlX.W1, LvlX.W2], [Lvl2.W1, Lvl2.W2]).exponent(-.2),

      P0_P1: d3.scaleLinear([LvlX.P0, LvlX.P1], [Lvl2.P0, Lvl2.P1]),
      P1_P2: d3.scaleLinear([LvlX.P1, LvlX.P2], [Lvl2.P1, Lvl2.P2]),
      P2_M1: d3.scaleLinear([LvlX.P2, LvlX.M1], [Lvl2.P2, Lvl2.M1]),

      M1_M2: d3.scalePow([LvlX.M1, LvlX.M2], [Lvl2.M1, Lvl2.M2]).exponent(3),
      M2_T:  d3.scalePow([LvlX.M2, LvlX.T ], [Lvl2.M2, Lvl2.T]).exponent(3),

    }

    const fRiverScale =  d3.scalePow([LvlX.P0, LvlX.M1], [Lvl2.P0, Lvl2.M1]).exponent(10)

    this.scale = {
      //  .w. /¯¯ . *¯¯ . *¯¯ .m.   ==> Hill
      Hill : {
        ...scale_Base,
        P0_P1: d3.scalePow([LvlX.P0, LvlX.M1], [Lvl2.P0, Lvl2.M1]).exponent(-.2),
        P1_P2: d3.scalePow([LvlX.P0, LvlX.M1], [Lvl2.P0, Lvl2.M1]).exponent(-.2),
        P2_M1: d3.scalePow([LvlX.P0, LvlX.M1], [Lvl2.P0, Lvl2.M1]).exponent(-.2),
      },

      //  .w. /¯¯ . *¯¯ . _/ .m.  ===> Plateau
      Plat : {
        ...scale_Base,
        P0_P1: d3.scalePow([LvlX.P0, LvlX.P2], [Lvl2.P0, Lvl2.P2]).exponent(-.2),
        P1_P2: d3.scalePow([LvlX.P0, LvlX.P2], [Lvl2.P0, Lvl2.P2]).exponent(-.2),
        P2_M1: d3.scalePow([LvlX.P2, LvlX.M1], [Lvl2.P2, Lvl2.M1]).exponent(3),
      },

      //  .w. -- . __/ . /¯¯ .m. ===> Coline
      Coli : {
        ...scale_Base,
        P0_P1: d3.scaleLinear([LvlX.P0, LvlX.P1], [Lvl2.P0, Lvl2.P1]),
        P1_P2: d3.scalePow([LvlX.P1, LvlX.P2], [Lvl2.P1, Lvl2.P2]).exponent(3),
        P2_M1: d3.scalePow([LvlX.P2, LvlX.M1], [Lvl2.P2, Lvl2.M1]).exponent(-.2),
      },

      //  .w. __/ . *__/ . *__/ .m. ===> Plane
      Plan : {
        ...scale_Base,
        P0_P1: d3.scalePow([LvlX.P0, LvlX.M1], [Lvl2.P0, Lvl2.M1]).exponent(3),
        P1_P2: d3.scalePow([LvlX.P0, LvlX.M1], [Lvl2.P0, Lvl2.M1]).exponent(3),
        P2_M1: d3.scalePow([LvlX.P0, LvlX.M1], [Lvl2.P0, Lvl2.M1]).exponent(3),
      },

      //  .w. __/ . *__/ . *__/ .m. ===> Plane
      River : {
        ...scale_Base,
        P0_P1: lvl =>  fRiverScale(lvl) - 5,
        P1_P2: lvl =>  fRiverScale(lvl) - 5,
        P2_M1: lvl =>  fRiverScale(lvl) - 5,

      },
    }
  }

  getGenTile(rawTile=null) {

    Object.assign(rawTile, this._getPeak(rawTile))

    Object.assign(rawTile, this._genRawBiome(rawTile))

    Object.assign(rawTile, this._getGenLvl(rawTile))

    Object.assign(rawTile, this._getGenLvl2(rawTile))

    Object.assign(rawTile, this._getGenColor(rawTile))

    Object.assign(rawTile, this._genItems(rawTile))
    

    return rawTile
  }


  _genRawBiome(tile) {

    const lvl = Math.floor(tile.fLvl);

    const mod = 32;
    const temp = (tile.fTemp - tile.fTemp % mod) / mod;
    const hydro = (tile.fHydro - tile.fHydro % mod) / mod;
    let biome = this.biomes[this.biomeMatrix[temp * 8 + hydro]]

    if (lvl < this.waterLvl) {
      biome = this.biomes['ocean'];
    }
    else if (lvl > this.mountLvl) {
      biome = this.biomes['mont1'];
    }    
    else if (lvl == this.waterLvl || lvl == this.waterLvl + 1) {
      biome = this.biomes['beach'];
    }
    else if (lvl == this.mountLvl) {
      biome = this.biomes['mountL'];
    }
    else if (tile.peakValue < 0) {
      biome = this.biomes['river'];
    }

    return {
      rawBiome: biome
    }
  }


  _getPeak(tile) {
    const eroLvl = tile.rErosion
    const peakLvl =  tile.rPeak

    let peakLocal = (1-eroLvl) * peakLvl
   
    // RIVER
    if (peakLocal < .003  && eroLvl > .55) { // river
      const factor = 1 - peakLocal * (1/.003)
      return {
        peakValue: - ( 3 * factor + 1 ), 
        peakType: 'river'
      }

    }
    // TALUS
    else if (peakLocal < .04  && eroLvl < .55) {      
      let factor = 1 - peakLocal * (1/.04)
      // sfactor = peakLocal > .01 ? factor : 1
      return {
        peakValue: ( 10 * factor  ), 
        peakType: 'talus'
      }
  
    // HILL   
    } else if (peakLocal > .4) {
      let factor = (peakLocal - .4) * (1/(1 - .4))
      factor = 1 - Math.pow(1 - factor, 6)
      return {
        peakValue: ( 40 * factor + 2 ),
        peakType:  'hill'
      }
    }
    return {
      peakValue: 0, 
      peakType: ''
    }

  }


  _getGenLvl2(tile) {

    const rawLvl = tile.rLvl * 255
    const fLvl = tile.fLvl
    const scale = this.scale[tile.rawBiome.lvlType]
    // const scale = this.scale["Plan"]
    
    let lvl = 0;

    const LvlX = this.LvlX;
    const Lvl2 = this.Lvl2;

    if (fLvl < LvlX.W1) {
      lvl = scale.Z_W1(rawLvl)
    } else  if (fLvl < LvlX.W2) {
      lvl = scale.W1_W2(rawLvl)

    } else if (fLvl == LvlX.W2) {
      lvl = Lvl2.P0
    } else  if (fLvl < LvlX.P1) {
      lvl = scale.P0_P1(rawLvl)
    } else  if (fLvl < LvlX.P2) {
      lvl = scale.P1_P2(rawLvl)
    } else  if (fLvl < LvlX.M1) {
      lvl = scale.P2_M1(rawLvl)

    } else  if (fLvl == LvlX.M1) {
      lvl = Lvl2.M1
    } else  if (fLvl < LvlX.M2) {
      lvl = scale.M1_M2(rawLvl)
    } else  {
      lvl = scale.M2_T(rawLvl)
    }
    return { 
      gen2Lvl : lvl
    }
  }

  _getGenLvl(tile) {

    const rawLvl = tile.rLvl * 256
    const rawLvlMod = tile.fLvl

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
      return {
        genLvl: lvl, 
        waterLvl: this.waterLvl
      }      
		}

    // Apply Erotion & PeakValet
    if (rawLvlMod > this.waterLvl) {
      const lvlPeak = tile.peakValue
      if (tile.peakType == 'river') {
        return {
          genLvl: lvl - 1/3 + lvlPeak, 
          waterLvl: lvl - 1/3
        }        
      } 

      lvl += lvlPeak
      return {
        genLvl: lvl, 
        waterLvl: lvl
      }
    }

    return {
      genLvl: lvl, 
      waterLvl: lvl
    }
  }



  /* ----------- */

  _getGenColor(tile) {
    const lvl = tile.fLvl - tile.fLvl % 4;
    const c = new Uint8Array(tile.rawBiome.color(tile.fLvl));
    const hsl = rgbToHsl(c[0], c[1], c[2]);
    c.set(hslToRgb(hsl[0], hsl[1] * 0.3, hsl[2]));
    return {
      genColor: c
    }
  }

  _genItems(tile) {

    const biome = tile.rawBiome;
    const lvl = tile.fLvl; 
    const f = tile.rFlore * 255;
    const itemskey = biome.flore(lvl ,f);
    if (itemskey == null)
      return  { genItems : []};
    return {
      genItems : [{t: 'Svg', key: itemskey, lvl:0}]
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
    let r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        const hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
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
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        const d = max - min;
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
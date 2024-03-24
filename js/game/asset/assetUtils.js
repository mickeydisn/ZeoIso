
// ------------------------------------------------------------
// COLOR FILTER FUNCTION 
// ------------------------------------------------------------


export const RANGE_HEIGHT = [...Array(8)].map((_, x) =>  x * .5)
export const RANGE_HUE = [...Array(24)].map((_, x) =>   x * 15)
export const RANGE_SATURATION = [...Array(25)].map((_, x) =>  x * 10 + 10)
export const RANGE_BRIGHTNESS = [...Array(25)].map((_, x) =>  x * 10 + 10)
export const RANGE_CONTRAST = [...Array(25)].map((_, x) =>  x * 10 + 10)
export const RANGE_INVERT = [0, 1]
export const RANGE_SHADOW = [
    "", 
    "0px 0px 10px #F00",
    "10px 10px 10px #0F0",
    "10px 10px #009",
    "10px 10px #0009",
]


export const CANVAS_FILTER_DEFAULT_IDX =  {
    hue:0, 
    saturation:9, 
    brightness:9, 
    contrast:9,
    invert:0,
    shadow:0,
}

export const canvasFilterIdxToValue = (conf) => {

    return {
        hue : RANGE_HUE[conf.hue],
        contrast : RANGE_CONTRAST[conf.contrast],
        saturation : RANGE_SATURATION[conf.saturation],
        brightness : RANGE_BRIGHTNESS[conf.brightness],
        invert: RANGE_INVERT[conf.invert],
        shadow: RANGE_SHADOW[conf.shadow]
    }
}
export const CANVAS_FILTER_DEFAULT_VALUE =  canvasFilterIdxToValue(CANVAS_FILTER_DEFAULT_IDX)


export const canvasFilterValueToStr = (conf) => {
    return '' + 
        (conf.hue != 0 ? `_H${conf.hue}` : '') +
        (conf.contrast != 100 ? `_C${conf.contrast}` : '') +
        (conf.saturation != 100 ? `_S${conf.saturation}` : '') +
        (conf.brightness != 100 ? `_B${conf.brightness}` : '') +
        (conf.invert != 0 ? `_I1` : '')
}

export const canvasFilterStrToValue = (str) => {
    const conf = {...CANVAS_FILTER_DEFAULT_VALUE}
    const tokens = str.split('_')
    tokens.forEach(token => {
        const key = 
            token[0] == 'H' ? "hue" :
            token[0] == 'C' ? "contrast" :
            token[0] == 'S' ? "saturation" :
            token[0] == 'B' ? "brightness" :
            token[0] == 'I' ? "invert" :
            null

        const value = new Number(token.substring(1))

        if (key && value ) {
            conf[key] = value;
        }
    })

    console.log('canvasFilterStrToValue' , conf)
    return conf
}



// ------------------------



export const colorVariation = (source, cFilter) => {
    const hue = cFilter.hue ? cFilter.hue : 0
    const saturation = cFilter.saturation ? cFilter.saturation : 100
    const contrast = cFilter.contrast ? cFilter.contrast : 100
    const brightness = cFilter.brightness ? cFilter.brightness : 100
    

    console.log("----", cFilter)

    const dest = document.createElement("canvas");
    dest.width = 256; // image.naturalWidth;
    dest.height = 256; // image.naturalHeight;
    dest.ctx = dest.getContext("2d"); // attach context to the canvas for easy reference
    let filter = "hue-rotate("+(hue | 0)+"deg)" + 
        " saturate(" + saturation + "%)" + 
        " contrast(" + contrast + "%)" + 
        " brightness("+ brightness+ "%)";

    if (cFilter.invert) {
        console.log("---- INVERST", )

        filter +=" invert(1)";
    }
    if (cFilter.shadow) {
        console.log("---- shadow", cFilter.shadow)

        filter +=" drop-shadow("+ cFilter.shadow + ")";
    }

    dest.ctx.filter = filter


    dest.ctx.drawImage(source,0, 0, dest.width, dest.height);
    return dest        
}
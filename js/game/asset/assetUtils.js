
// ------------------------------------------------------------
// COLOR FILTER FUNCTION 
// ------------------------------------------------------------


export const RANGE_HEIGHT = [...Array(8)].map((_, x) =>  x * .5)
export const RANGE_HUE = [...Array(36)].map((_, x) =>   x * 10)
export const RANGE_SATURATION = [...Array(50)].map((_, x) =>  x * 5 + 5)
export const RANGE_BRIGHTNESS = [...Array(50)].map((_, x) =>  x * 5 + 5)
export const RANGE_CONTRAST = [...Array(50)].map((_, x) =>  x * 5 + 5)
export const RANGE_INVERT = [0, 1]
export const RANGE_SHADOW = [
    "", 
    " drop-shadow(-3px -3px 3px #FFF) drop-shadow(3px -3px 3px #FFF)",
    " drop-shadow(-3px -3px 5px #FFF) drop-shadow(3px -3px 5px #FFF)",
    " drop-shadow(-3px -3px 8px #FFF) drop-shadow(3px -3px 8px #FFF)",

]


export const CANVAS_FILTER_DEFAULT_IDX =  {
    hue:0, 
    saturation:19, 
    brightness:19, 
    contrast:19,
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
            token[0] == 'R' ? "shadow" :
            null

        const value = new Number(token.substring(1))

        if (key && value ) {
            conf[key] = value;
        }
    })

    return conf
}



// ------------------------



export const colorVariation = (source, cFilter) => {
    if (!source) return null;
    const hue = cFilter.hue ? cFilter.hue : 0
    const saturation = cFilter.saturation ? cFilter.saturation : 100
    const contrast = cFilter.contrast ? cFilter.contrast : 100
    const brightness = cFilter.brightness ? cFilter.brightness : 100
    

    const canvas = document.createElement("canvas");
    canvas.width = 256; // image.naturalWidth;
    canvas.height = 256; // image.naturalHeight;
    canvas.ctx = canvas.getContext("2d"); // attach context to the canvas for easy reference

    if (hue || saturation != 100 || contrast != 100 || brightness != 100) {

        let imageData = source.ctx.getImageData(0, 0, canvas.width, canvas.height);

        if (hue) {
            imageData = __applyHueRotation(imageData, hue)
        }
        if (saturation) {
            imageData = __applySaturationAdjustment(imageData, saturation / 100)
        }
        if ( contrast != 100 ) {
            imageData = __applyBrightness(imageData, contrast / 100)
        }
        if ( brightness != 100 ) {
            imageData = __applyContrast(imageData, brightness / 100)
        }
        if ( cFilter.invert ) {
            imageData = __applyInvertColors(imageData)
        }
    
        if (cFilter.shadow) {
            console.log('shadow')
            imageData = __applyDropShadow(imageData, -3,  -3, Number(cFilter.shadow), [255, 255, 255])
            imageData = __applyDropShadow(imageData, 3,  -3,  Number(cFilter.shadow), [255, 255, 255])
        }
        

        const canvasN = document.createElement("canvas");
        canvasN.width = 256; // image.naturalWidth;
        canvasN.height = 256; // image.naturalHeight;
        canvasN.ctx = canvasN.getContext("2d"); // attach context to the canvas for easy reference
        canvasN.ctx.putImageData(imageData, 0, 0);
        source = canvasN
    }

    // canvas.ctx.filter = filter
    try {
        canvas.ctx.drawImage(source,0, 0, canvas.width, canvas.height);
        return canvas        
    } catch(e) {
        return null
    }
}

function __applyHueRotation(imageData, hueAngle) {
    const width = imageData.width;
    const height = imageData.height;
    const pixels = imageData.data;


    const h = hueAngle / 360; // Convert hue angle to range [0, 1]

    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        const [hPrime, s, l] = rgbToHsl(r, g, b);

        // Adjust hue
        const newHue = (hPrime + h) % 1;
        const [newR, newG, newB] = hslToRgb(newHue, s, l);

        pixels[i] = newR;
        pixels[i + 1] = newG;
        pixels[i + 2] = newB;
    }

    return imageData;
}


function __applySaturationAdjustment(imageData, saturationFactor) {
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];

        const [h, s, l] = rgbToHsl(r, g, b);

        // Adjust saturation
        const newS = s * saturationFactor;

        // Convert back to RGB
        const [newR, newG, newB] = hslToRgb(h, newS, l);

        // Update pixel values
        pixels[i] = newR;
        pixels[i + 1] = newG;
        pixels[i + 2] = newB;
    }
    return imageData;
}


function __applyBrightness(imageData, brightnessFactor) {
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
        pixels[i] = pixels[i] * brightnessFactor + (1 - brightnessFactor) * 255; // Red channel
        pixels[i + 1] = pixels[i + 1] * brightnessFactor + (1 - brightnessFactor) * 255; // Green channel
        pixels[i + 2] = pixels[i + 2] * brightnessFactor + (1 - brightnessFactor) * 255; // Blue channel
    }

    return imageData;
}

function __applyContrast(imageData, contrastFactor) {
    const pixels = imageData.data;
    const mid = 0.5;

    for (let i = 0; i < pixels.length; i += 4) {
        pixels[i] = mid + contrastFactor * (pixels[i] - mid); // Red channel
        pixels[i + 1] = mid + contrastFactor * (pixels[i + 1] - mid); // Green channel
        pixels[i + 2] = mid + contrastFactor * (pixels[i + 2] - mid); // Blue channel
    }

    return imageData;
}

function __applyInvertColors(imageData) {
    const pixels = imageData.data;

    for (let i = 0; i < pixels.length; i += 4) {
        pixels[i] = 255 - pixels[i]; // Red
        pixels[i + 1] = 255 - pixels[i + 1]; // Green
        pixels[i + 2] = 255 - pixels[i + 2]; // Blue
        // Keep alpha channel unchanged
    }

    return imageData;
}


function __applyDropShadow(imageData, shadowOffsetX, shadowOffsetY, shadowBlur, shadowColor) {
    const { width, height, data } = imageData;
    const shadowData = new Uint8ClampedArray(data);

    // Function to blend two colors
    function blendColors(topColor, bottomColor) {
        const alpha = topColor / 255;
        return Math.round(topColor + (bottomColor - topColor) * alpha);
    }

    // Apply drop shadow
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            const alpha = data[index + 3];

            // Calculate shadow position
            const shadowX = x + shadowOffsetX;
            const shadowY = y + shadowOffsetY;

            // Check if shadow pixel is within bounds
            if (shadowX >= 0 && shadowX < width && shadowY >= 0 && shadowY < height) {
                const shadowIndex = (shadowY * width + shadowX) * 4;

                // Blend shadow color with existing pixel color
                for (let i = 0; i < 3; i++) {
                    shadowData[shadowIndex + i] = shadowColor[i];
                }
                shadowData[shadowIndex + 3] = alpha; // Preserve original alpha
            }
        }
    }

    // Apply blur to the shadow
    const blurredImageData = __applyBlur({ data: shadowData, width, height }, shadowBlur);
    // const blurredImageData = { data: shadowData, width, height }
    // Merge blurred shadow with original image
    for (let i = 0; i < data.length; i += 4) {
        const shadowAlpha = blurredImageData.data[i + 3];
        const alpha = data[i+3];
        if (alpha == 0 && shadowAlpha != 0) {
            for (let j = 0; j < 4; j++) {
                data[i + j] = blurredImageData.data[i + j];
            } 
        } 
    }

    return imageData;
}

function __applyBlur(imageData, blurRadius) {
    const { width, height, data } = imageData;

    // Gaussian kernel generation function
    function generateGaussianKernel(sigma) {
        const size = Math.ceil(sigma * 3) * 2 + 1;
        const kernel = new Array(size);
        const sigma22 = 2 * sigma * sigma;
        const sqrtPiSigma2 = Math.sqrt(Math.PI * sigma22);

        let sum = 0;
        for (let y = -Math.floor(size / 2), i = 0; y <= Math.floor(size / 2); y++, i++) {
            kernel[i] = Math.exp(-y * y / sigma22) / sqrtPiSigma2;
            sum += kernel[i];
        }

        // Normalize the kernel
        for (let i = 0; i < size; i++) {
            kernel[i] /= sum;
        }

        return kernel;
    }

    // Convolution function to apply kernel
    function convolve(kernel, src, dst, width, height) {
        const half = Math.floor(kernel.length / 2);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let r = 0, g = 0, b = 0, a = 0;

                for (let i = -half; i <= half; i++) {
                    const index = (y * width + Math.min(Math.max(x + i, 0), width - 1)) * 4;
                    const weight = kernel[i + half];

                    r += src[index] * weight;
                    g += src[index + 1] * weight;
                    b += src[index + 2] * weight;
                    a += src[index + 3] * weight;
                }

                const pixelIndex = (y * width + x) * 4;
                dst[pixelIndex] = Math.round(r);
                dst[pixelIndex + 1] = Math.round(g);
                dst[pixelIndex + 2] = Math.round(b);
                dst[pixelIndex + 3] = Math.round(a);
            }
        }
    }

    // Generate Gaussian kernel
    const kernel = generateGaussianKernel(blurRadius);

    // Clone the original image data
    const blurredData = new Uint8ClampedArray(data);

    // Apply horizontal blur
    convolve(kernel, data, blurredData, width, height);

    // Apply vertical blur
    convolve(kernel, blurredData, data, height, width);

    return imageData;
}


// -------------------------

// Function to convert RGB to HSL
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [h, s, l];
}

// Function to convert HSL to RGB
function hslToRgb(h, s, l) {
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

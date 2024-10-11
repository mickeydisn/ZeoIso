
from typing import Tuple, Union
from typing_extensions import Self 

import PIL.Image
import PIL.ImageDraw
import PIL.ImageFont
import typing
import math
import io

SRCALPHA = 65536
color = Union[Tuple[int,int,int] , Tuple[int,int,int,int]]
number = Union[int, float]

class error(RuntimeError): ...


class Surface:

    def __init__(self,size:Tuple[number,number],flags:int=0,*,_fromImage:Union[PIL.Image.Image, None]=None) -> None:
        size = (round(size[0]),round(size[1]))
        if flags == 0:
            defaultColor = (0,0,0,255)
        elif flags == SRCALPHA:
            defaultColor = (0,0,0,0)
        else:
            raise NotImplementedError("Surface creation flags not supported")
        if _fromImage is None:
            self._image = PIL.Image.new("RGBA",size,defaultColor)
        else:
            self._image = _fromImage

    def get_width(self) -> int:
        return self._image.width

    def get_height(self) -> int:
        return self._image.height

    def get_size(self) -> Tuple[int,int]:
        return self._image.size

    def get_at(self,x_y:Tuple[int,int]) -> Tuple[int,int,int,int]:
        return self._image.getpixel(x_y)

    def blit(self,source:Self,dest:Tuple[number,number]):
        dest = (round(dest[0]),round(dest[1]))
        self._image.alpha_composite(source._image,dest)

    def fill(self,color:color) -> None:
        self._image.paste(color,(0,0)+self._image.size)

    def copy(self) -> Self:
        return _imgToSurf(self._image.copy())



class Rect:

    def __init__(self,left:number,top:number,width:number,height:number) -> None:
        self.left = left
        self.top = top
        self.width = width
        self.height = height

    def _toBBox(self) -> Tuple[number,number,number,number]:
        return (self.left,self.top,self.left+self.width-1,self.top+self.height-1)



def _imgToSurf(img:PIL.Image.Image) -> Surface:
    return Surface((0,0),_fromImage=img)

def _invalidBBoxCheck(bbox:Tuple[number,number,number,number]) -> bool:
    return (bbox[2] < bbox[0]) or (bbox[3] < bbox[1])



def image_load(filename:Union[str, io.BytesIO]) -> Surface:
    try:
        image = PIL.Image.open(filename)
    except PIL.UnidentifiedImageError:
        raise error
    return _imgToSurf(image.convert("RGBA"))

def image_save(surface:Surface,filename:Union[str, io.BytesIO],namehint:str="") -> None:
    surface._image.save(filename,None if namehint == "" else namehint)



def draw_rect(surface:Surface,color:color,rect:Rect,width:int=0,border_radius:int=-1) -> None:
    curBBox = rect._toBBox()
    if _invalidBBoxCheck(curBBox):
        return
    fillColor = color if width == 0 else None
    outlineColor = None if width == 0 else color
    draw = PIL.ImageDraw.Draw(surface._image)
    if border_radius < 0:
        draw.rectangle(curBBox,fillColor,outlineColor,width)
    else:
        draw.rounded_rectangle(curBBox,border_radius,fillColor,outlineColor,width)

def draw_line(surface:Surface,color:color,start_pos:Tuple[number,number],end_pos:Tuple[number,number],width:int=1) -> None:
    PIL.ImageDraw.Draw(surface._image).line([start_pos,end_pos],color,width)

def draw_circle(
    surface:Surface,color:color,center:Tuple[number,number],radius:float,width:int=0,
    draw_top_right:bool=False,draw_top_left:bool=False,draw_bottom_left:bool=False,draw_bottom_right:bool=False
) -> None:

    bbox = (center[0]-radius,center[1]-radius,center[0]+radius-1,center[1]+radius-1)
    if _invalidBBoxCheck(bbox):
        return
    draw = PIL.ImageDraw.Draw(surface._image)

    if draw_top_right or draw_top_left or draw_bottom_left or draw_bottom_right:

        for quadrant,startAngle,stopAngle in [
            (draw_bottom_right,0,90),
            (draw_bottom_left,90,180),
            (draw_top_left,180,270),
            (draw_top_right,270,360)
        ]:
            if quadrant:
                draw.arc(bbox,startAngle,stopAngle,color,round(radius) if width == 0 else width)

    else:

        fillColor = color if width == 0 else None
        outlineColor = None if width == 0 else color
        draw.ellipse(bbox,fillColor,outlineColor,width)

def draw_arc(surface:Surface,color:color,rect:Rect,start_angle:float,stop_angle:float,width:int=1) -> None:
    curBBox = rect._toBBox()
    if _invalidBBoxCheck(curBBox):
        return
    PIL.ImageDraw.Draw(surface._image).arc(
        curBBox,
        360 - math.degrees(stop_angle),
        360 - math.degrees(start_angle),
        color,
        width
    )

def draw_polygon(surface:Surface,color:color,points:list[Tuple[number,number]],width:int=0):
    draw = PIL.ImageDraw.Draw(surface._image)
    if width == 0:
        draw.polygon(points,color)
    else:
        for i,point in enumerate(points):
            draw.line([point,points[(i+1)%len(points)]],color,width)



def font_init() -> None:
    pass

class font_Font:

    def __init__(self,name:str,size:int) -> None:
        self._font = PIL.ImageFont.truetype(name,size)

    def render(self,text:str,antialias:Union[bool, typing.Literal[0,1]],color:color,background:Union[color,  None]=None) -> Surface:

        if not antialias:
            raise NotImplementedError("Text rendering without antialias not supported")

        bbox = self._font.getbbox(text)

        kwargs = {}
        if background is not None:
            kwargs["color"] = color

        image = PIL.Image.new("RGBA",(bbox[2]+1,bbox[3]+1),**kwargs)
        PIL.ImageDraw.Draw(image).text((0,0),text,color,self._font)
        return _imgToSurf(image)



def transform_smoothscale(surface:Surface,size:Tuple[int,int]) -> Surface:
    return _imgToSurf(surface._image.resize(size))

def transform_rotate(surface:Surface,angle:float) -> Surface:
    return _imgToSurf(surface._image.rotate(angle,expand=True))



class mask_Mask:

    def __init__(self,_image:PIL.Image.Image) -> None:
        self._image = _image

    def to_surface(self,surface:Surface,setsurface:Surface,unsetcolor:None) -> None:
        surface._image.paste(setsurface._image,(0,0),self._image)

def mask_from_surface(surface:Surface,treshold:int=127) -> mask_Mask:
    return mask_Mask(surface._image.getchannel("A").point(lambda x: 1 if x > treshold else 0,"1"))


# ------------------------------------------- 


import math
import typing

# hack for ease of copying this file into other projects
INITIAL_SHAPE_SIZE = 500
SHAPE_NOTHING_CHAR = "-"
SHAPE_LAYER_SEPARATOR = ":"
SHAPE_CONFIG_QUAD = "quad"
SHAPE_CONFIG_HEX = "hex"

SHAPE_BORDER_COLOR = (35,25,35)
BG_CIRCLE_COLOR = (31,41,61,25)
SHADOW_COLOR = (50,50,50,127)
EMPTY_COLOR = (0,0,0,0)
PIN_COLOR = (71,69,75)
COLORBLIND_PATTERN_COLOR = (0,0,0)

BASE_COLORS:dict[str,Tuple[int,int,int]] = {
    "u" : (164,158,165),
    "r" : (255,0,0),
    "g" : (0,255,0),
    "b" : (0,0,255),
    "c" : (0,255,255),
    "m" : (255,0,255),
    "y" : (255,255,0),
    "w" : (255,255,255),
    "k" : (86,77,78),
    "p" : (167,41,207),
    "o" : (213,133,13)
}

INTERNAL_COLOR_SKINS = ["RGB","RYB","CMYK"]
INTERNAL_COLOR_SKINS_ANNOTATION = typing.Literal["RGB","RYB","CMYK"]
EXTERNAL_COLOR_SKINS = ["RGB","RYB","CMYK","RGB-cb"]
EXTERNAL_COLOR_SKINS_ANNOTATION = typing.Literal["RGB","RYB","CMYK","RGB-cb"]

INTERNAL_COLOR_SKINS_COLORS:dict[INTERNAL_COLOR_SKINS_ANNOTATION,dict[str,Tuple[int,int,int]]] = {
    "RGB" : {
        "u" : BASE_COLORS["u"],
        "r" : BASE_COLORS["r"],
        "g" : BASE_COLORS["g"],
        "b" : BASE_COLORS["b"],
        "c" : BASE_COLORS["c"],
        "m" : BASE_COLORS["m"],
        "y" : BASE_COLORS["y"],
        "w" : BASE_COLORS["w"]
    },
    "RYB" : {
        "u" : BASE_COLORS["u"],
        "r" : BASE_COLORS["r"],
        "g" : BASE_COLORS["y"],
        "b" : BASE_COLORS["b"],
        "c" : BASE_COLORS["g"],
        "m" : BASE_COLORS["p"],
        "y" : BASE_COLORS["o"],
        "w" : BASE_COLORS["k"]
    },
    "CMYK" : {
        "u" : BASE_COLORS["u"],
        "r" : BASE_COLORS["c"],
        "g" : BASE_COLORS["m"],
        "b" : BASE_COLORS["y"],
        "c" : BASE_COLORS["r"],
        "m" : BASE_COLORS["g"],
        "y" : BASE_COLORS["b"],
        "w" : BASE_COLORS["k"]
    }
}

# according to 'dnSpy > ShapeMeshGenerator > GenerateShapeMesh()', this value should be 0.85
# according to ingame screenshots, it should be 0.77
# according to me, the closest to ingame is 0.8
# but, to me, the best for this context is 0.75
LAYER_SIZE_REDUCTION = 0.75

# below are sizes in pixels taken from a screenshot of the ingame shape viewer
DEFAULT_IMAGE_SIZE = 602
DEFAULT_BG_CIRCLE_DIAMETER = 520
DEFAULT_SHAPE_DIAMETER = 407
DEFAULT_BORDER_SIZE = 15

FAKE_SURFACE_SIZE = INITIAL_SHAPE_SIZE
SIZE_CHANGE_RATIO = FAKE_SURFACE_SIZE / DEFAULT_IMAGE_SIZE
SHAPE_SIZE = DEFAULT_SHAPE_DIAMETER * SIZE_CHANGE_RATIO
SHAPE_BORDER_SIZE = round(DEFAULT_BORDER_SIZE*SIZE_CHANGE_RATIO)
BG_CIRCLE_DIAMETER = DEFAULT_BG_CIRCLE_DIAMETER * SIZE_CHANGE_RATIO

COLORBLIND_NUM_PATTERNS = 13
COLORBLIND_PATTERN_SPACING = (FAKE_SURFACE_SIZE) / (COLORBLIND_NUM_PATTERNS-1)
COLORBLIND_PATTERN_WIDTH = COLORBLIND_PATTERN_SPACING * 0.25

SQRT_2 = math.sqrt(2)
SQRT_3 = math.sqrt(3)
SQRT_6 = math.sqrt(6)

def _preRenderColorblindPatterns() -> None:

    global _colorblindPatterns
    surfaceSize = FAKE_SURFACE_SIZE
    redSurface = Surface((surfaceSize,surfaceSize),SRCALPHA)
    greenSurface = redSurface.copy()
    blueSurface = redSurface.copy()

    for i in range(COLORBLIND_NUM_PATTERNS):
        draw_line(
            redSurface,
            COLORBLIND_PATTERN_COLOR,
            (i*COLORBLIND_PATTERN_SPACING,0),
            (i*COLORBLIND_PATTERN_SPACING,surfaceSize),
            round(COLORBLIND_PATTERN_WIDTH)
        )

    for x in range(COLORBLIND_NUM_PATTERNS-1):
        for y in range(COLORBLIND_NUM_PATTERNS):
            draw_rect(
                greenSurface,
                COLORBLIND_PATTERN_COLOR,
                Rect(
                    (x*COLORBLIND_PATTERN_SPACING) + (COLORBLIND_PATTERN_SPACING/2) - (COLORBLIND_PATTERN_WIDTH/2),
                    (y*COLORBLIND_PATTERN_SPACING) - (COLORBLIND_PATTERN_WIDTH/2),
                    COLORBLIND_PATTERN_WIDTH,
                    COLORBLIND_PATTERN_WIDTH
                )
            )

    for i in range((COLORBLIND_NUM_PATTERNS*2)-1):
        draw_line(
            blueSurface,
            COLORBLIND_PATTERN_COLOR,
            ((i-COLORBLIND_NUM_PATTERNS+1)*COLORBLIND_PATTERN_SPACING,0),
            (i*COLORBLIND_PATTERN_SPACING,surfaceSize),
            round(COLORBLIND_PATTERN_WIDTH)
        )

    _colorblindPatterns = {
        "r" : redSurface,
        "g" : greenSurface,
        "b" : blueSurface
    }


_colorblindPatterns:dict[str,Surface]
_preRenderColorblindPatterns()

def _getScaledShapeSize(shapeSize:float,layerIndex:int) -> float:
    return shapeSize * (LAYER_SIZE_REDUCTION**layerIndex)

def _drawQuadrant(
    quadShape:str,
    quadColor:str,
    shapeSize:float,
    quadIndex:int,
    layerIndex:int,
    layers:list[list[str]],
    colorSkin:INTERNAL_COLOR_SKINS_ANNOTATION,
    shapeConfig:str
    ) -> Tuple[Union[Surface , None], Union[Surface,None]]:
    # returns quadrant with shadow, border

    borderSize = SHAPE_BORDER_SIZE
    halfBorderSize = borderSize / 2
    curShapeSize = _getScaledShapeSize(shapeSize,layerIndex)
    curQuadSize = curShapeSize / 2

    withBorderQuadSize = round(curQuadSize+borderSize)
    quadSurface = Surface(
        (withBorderQuadSize,withBorderQuadSize),
        SRCALPHA
    )
    quadSurfaceForBorder = quadSurface.copy()

    drawShadow = layerIndex != 0
    color = INTERNAL_COLOR_SKINS_COLORS[colorSkin].get(quadColor)
    borderColor = SHAPE_BORDER_COLOR

    if quadShape == SHAPE_NOTHING_CHAR:
        return None, None

    if quadShape == "C":

        draw_circle(quadSurface,color, # main circle
            (halfBorderSize,withBorderQuadSize-halfBorderSize),
            curQuadSize,
            draw_top_right=True
        )

        draw_circle(quadSurfaceForBorder,borderColor, # circle border
            (halfBorderSize,withBorderQuadSize-halfBorderSize),
            curQuadSize+halfBorderSize,
            borderSize,
            draw_top_right=True
        )
        draw_line(quadSurfaceForBorder,borderColor, # left border
            (halfBorderSize,0),
            (halfBorderSize,withBorderQuadSize),
            borderSize
        )
        draw_line(quadSurfaceForBorder,borderColor, # down border
            (0,withBorderQuadSize-halfBorderSize),
            (withBorderQuadSize,withBorderQuadSize-halfBorderSize),
            borderSize
        )

        return quadSurface, quadSurfaceForBorder

    if quadShape == "R":

        draw_rect(quadSurface,color, # main rect
            Rect(halfBorderSize,halfBorderSize,curQuadSize,curQuadSize)
        )

        draw_rect(quadSurfaceForBorder,borderColor, # rect border
            Rect(0,0,withBorderQuadSize,withBorderQuadSize),
            borderSize
        )

        return quadSurface, quadSurfaceForBorder

    if quadShape == "S":

        points = [(curQuadSize,0),(curQuadSize/2,curQuadSize),(0,curQuadSize),(0,curQuadSize/2)]
        points = [(halfBorderSize+x,halfBorderSize+y) for x,y in points]

        draw_polygon(quadSurface,color,points) # main polygon

        draw_polygon(quadSurfaceForBorder,borderColor,points,borderSize) # border polygon
        for point in points:
            draw_circle(quadSurfaceForBorder,borderColor,point,halfBorderSize-1) # fill in the missing vertices

        return quadSurface, quadSurfaceForBorder

    if quadShape == "W":

        arcCenter = (halfBorderSize+(curQuadSize*1.4),halfBorderSize+(curQuadSize*-0.4))
        arcRadius = curQuadSize * 1.18
        sideLength = curQuadSize / 3.75

        draw_rect(quadSurface,color, # first fill in the whole quadrant
            Rect(halfBorderSize,halfBorderSize,curQuadSize,curQuadSize)
        )
        draw_circle(quadSurface,EMPTY_COLOR,arcCenter,arcRadius) # then carve out a circle

        draw_circle(quadSurfaceForBorder,borderColor,arcCenter,arcRadius+halfBorderSize,borderSize) # arc border
        draw_line(quadSurfaceForBorder,borderColor, # left border
            (halfBorderSize,0),
            (halfBorderSize,withBorderQuadSize),
            borderSize
        )
        draw_line(quadSurfaceForBorder,borderColor, # down border
            (0,withBorderQuadSize-halfBorderSize),
            (withBorderQuadSize,withBorderQuadSize-halfBorderSize),
            borderSize
        )
        draw_line(quadSurfaceForBorder,borderColor, # top edge border
            (halfBorderSize,halfBorderSize),
            (halfBorderSize+sideLength,halfBorderSize),
            borderSize
        )
        draw_line(quadSurfaceForBorder,borderColor, # right edge border
            (withBorderQuadSize-halfBorderSize,withBorderQuadSize-halfBorderSize-sideLength),
            (withBorderQuadSize-halfBorderSize,withBorderQuadSize-halfBorderSize),
            borderSize
        )

        return quadSurface, quadSurfaceForBorder

    if quadShape == "H":

        points = [(0,0),((SQRT_3/2)*curQuadSize,curQuadSize/2),(0,curQuadSize)]
        points = [(halfBorderSize+x,halfBorderSize+y) for x,y in points]

        draw_polygon(quadSurface,color,points) # main polygon

        draw_polygon(quadSurfaceForBorder,borderColor,points,borderSize) # border polygon
        for point in points:
            draw_circle(quadSurfaceForBorder,borderColor,point,halfBorderSize-1) # fill in the missing vertices

        return quadSurface, quadSurfaceForBorder

    if quadShape == "F":

        semicircleRadius = ((3-SQRT_3)/4) * curQuadSize
        triangleSideLength = 2 * semicircleRadius
        semicircleCenterX = (triangleSideLength*(SQRT_3/2)) / 2
        semicircleCenterY = (
            curQuadSize
            - triangleSideLength
            + math.sqrt((semicircleRadius*semicircleRadius)-(semicircleCenterX*semicircleCenterX))
        )
        trianglePoints = [
            (0,curQuadSize-triangleSideLength),
            ((SQRT_3/2)*triangleSideLength,curQuadSize-semicircleRadius),
            (0,curQuadSize)
        ]
        semicircleStartAngle = math.radians(360-30)
        semicircleStopAngle = math.radians(360-30-180)

        semicircleCenterX += halfBorderSize
        semicircleCenterY += halfBorderSize
        trianglePoints = [(halfBorderSize+x,halfBorderSize+y) for x,y in trianglePoints]

        draw_polygon(quadSurface,color,trianglePoints) # triangle part

        draw_arc(quadSurface,color,Rect( # semicircle part
            semicircleCenterX-semicircleRadius,semicircleCenterY-semicircleRadius,triangleSideLength,triangleSideLength
        ),semicircleStartAngle,semicircleStopAngle,math.ceil(semicircleRadius))

        draw_line(quadSurfaceForBorder,borderColor,trianglePoints[0],trianglePoints[2],borderSize) # left border

        draw_line(quadSurfaceForBorder,borderColor,trianglePoints[1],trianglePoints[2],borderSize) # bottom border

        draw_arc(quadSurfaceForBorder,borderColor,Rect( # semicircle border
            semicircleCenterX - semicircleRadius - halfBorderSize,
            semicircleCenterY - semicircleRadius - halfBorderSize,
            triangleSideLength + borderSize,
            triangleSideLength + borderSize
        ),semicircleStartAngle,semicircleStopAngle,borderSize)

        for point in trianglePoints:
            draw_circle(quadSurfaceForBorder,borderColor,point,halfBorderSize-1) # fill in the missing vertices

        return quadSurface, quadSurfaceForBorder

    if quadShape == "G":

        points = [(0,0),((SQRT_3/6)*curQuadSize,curQuadSize/2),((SQRT_3/2)*curQuadSize,curQuadSize/2),(0,curQuadSize)]
        points = [(halfBorderSize+x,halfBorderSize+y) for x,y in points]

        draw_polygon(quadSurface,color,points) # main polygon

        draw_polygon(quadSurfaceForBorder,borderColor,points,borderSize) # border polygon
        for point in points:
            draw_circle(quadSurfaceForBorder,borderColor,point,halfBorderSize-1) # fill in the missing vertices

        return quadSurface, quadSurfaceForBorder

    if quadShape == "P":

        if shapeConfig == SHAPE_CONFIG_QUAD:
            pinCenter = (halfBorderSize+(curQuadSize/3),halfBorderSize+(2*(curQuadSize/3)))
        elif shapeConfig == SHAPE_CONFIG_HEX:
            pinCenter = (halfBorderSize+((SQRT_2/6)*curQuadSize),halfBorderSize+((1-(SQRT_6/6))*curQuadSize))
        pinRadius = curQuadSize/6

        if drawShadow:
            draw_circle(quadSurface,SHADOW_COLOR,pinCenter,pinRadius+halfBorderSize) # shadow

        draw_circle(quadSurface,PIN_COLOR,pinCenter,pinRadius) # main circle

        return quadSurface, None

    if quadShape == "c":

        darkenedColor = tuple(round(c/2) for c in color)

        if shapeConfig == SHAPE_CONFIG_QUAD:

            darkenedAreasOffset = 0 if layerIndex%2 == 0 else 22.5
            startAngle1 = math.radians(67.5-darkenedAreasOffset)
            stopAngle1 = math.radians(90-darkenedAreasOffset)
            startAngle2 = math.radians(22.5-darkenedAreasOffset)
            stopAngle2 = math.radians(45-darkenedAreasOffset)
            darkenedAreasRect = Rect(
                halfBorderSize - curQuadSize,
                halfBorderSize,
                2 * curQuadSize,
                2 * curQuadSize
            )

            if drawShadow:
                draw_circle(quadSurface,SHADOW_COLOR, # shadow
                    (halfBorderSize,withBorderQuadSize-halfBorderSize),
                    curQuadSize+halfBorderSize,
                    borderSize,
                    draw_top_right=True
                )

            draw_circle(quadSurface,color, # main circle
                (halfBorderSize,withBorderQuadSize-halfBorderSize),
                curQuadSize,
                draw_top_right=True
            )
            draw_arc(quadSurface,darkenedColor, # 1st darkened area
                darkenedAreasRect,
                startAngle1,
                stopAngle1,
                math.ceil(curQuadSize)
            )
            draw_arc(quadSurface,darkenedColor, # 2nd darkened area
                darkenedAreasRect,
                startAngle2,
                stopAngle2,
                math.ceil(curQuadSize)
            )

            return quadSurface, None

        elif shapeConfig == SHAPE_CONFIG_HEX:

            points = [(0,0),((SQRT_3/2)*curQuadSize,curQuadSize/2),(0,curQuadSize)]
            points = [(halfBorderSize+x,halfBorderSize+y) for x,y in points]

            shadowPoints = [
                (points[0][0],points[0][1]-halfBorderSize),
                (points[1][0]+((SQRT_3/2)*halfBorderSize),points[1][1]-(halfBorderSize/2)),
                (points[2][0],points[2][1])
            ]

            sideMiddlePoint = ((points[0][0]+points[1][0])/2,(points[0][1]+points[1][1])/2)
            if layerIndex%2 == 0:
                darkenedArea = [points[0],sideMiddlePoint,points[2]]
            else:
                darkenedArea = [sideMiddlePoint,points[1],points[2]]

            if drawShadow:
                draw_polygon(quadSurface,SHADOW_COLOR,shadowPoints) # shadow

            draw_polygon(quadSurface,color,points) # main polygon

            draw_polygon(quadSurface,darkenedColor,darkenedArea) # darkened area

            return quadSurface, None

    raise ValueError(f"Unknown shape type : {quadShape}")

def _drawColorblindPatterns(layerSurface:Surface,color:str) -> None:

    curMask = mask_from_surface(layerSurface,200)

    for colors,pattern in zip(
        (["r","m","y","w"],["g","y","c","w"],["b","c","m","w"]),
        _colorblindPatterns.values()
    ):
        if color not in colors:
            continue

        curPattern = Surface(layerSurface.get_size(),SRCALPHA)
        _blitCentered(pattern,curPattern)

        curPatternMasked = Surface(curPattern.get_size(),SRCALPHA)
        curMask.to_surface(curPatternMasked,curPattern,unsetcolor=None)

        layerSurface.blit(curPatternMasked,(0,0))

def _blitCentered(blitFrom:Surface,blitTo:Surface) -> None:
    blitTo.blit(
        blitFrom,
        (
            (blitTo.get_width()/2) - (blitFrom.get_width()/2),
            (blitTo.get_height()/2) - (blitFrom.get_height()/2)
        )
    )

def _rotateSurf(toRotate:Surface,numQuads:int,quadIndex:int,layerIndex:int,shapeSize:float) -> Surface:
    curShapeSize = _getScaledShapeSize(shapeSize,layerIndex)
    tempSurf = Surface(
        (curShapeSize+SHAPE_BORDER_SIZE,)*2,
        SRCALPHA
    )
    tempSurf.blit(toRotate,(curShapeSize/2,0))
    tempSurf = transform_rotate(tempSurf,-((360/numQuads)*quadIndex))
    return tempSurf

def _externalToInternalColorSkin(external:EXTERNAL_COLOR_SKINS_ANNOTATION) -> Tuple[INTERNAL_COLOR_SKINS_ANNOTATION,bool]:
    return external.removesuffix("-cb"), external.endswith("-cb")

def getShapeColor(colorCode:str,colorSkin:EXTERNAL_COLOR_SKINS_ANNOTATION) -> Tuple[int,int,int]:
    return INTERNAL_COLOR_SKINS_COLORS[_externalToInternalColorSkin(colorSkin)[0]][colorCode]

def renderShape(
    shapeCode:str,
    surfaceSize:int,
    colorSkin:EXTERNAL_COLOR_SKINS_ANNOTATION=EXTERNAL_COLOR_SKINS[0],
    shapeConfig:str=SHAPE_CONFIG_QUAD
) -> Surface:

    decomposedShapeCode = shapeCode.split(SHAPE_LAYER_SEPARATOR)
    numQuads = int(len(decomposedShapeCode[0])/2)
    decomposedShapeCode = [[layer[i*2:(i*2)+2] for i in range(numQuads)] for layer in decomposedShapeCode]

    curInternalColorSkin, colorblindPatterns = _externalToInternalColorSkin(colorSkin)

    returnSurface = Surface((FAKE_SURFACE_SIZE,FAKE_SURFACE_SIZE),SRCALPHA)
    draw_circle(returnSurface,BG_CIRCLE_COLOR,(FAKE_SURFACE_SIZE/2,FAKE_SURFACE_SIZE/2),BG_CIRCLE_DIAMETER/2)

    for layerIndex, layer in enumerate(decomposedShapeCode):

        quadBorders = []

        for quadIndex, quad in enumerate(layer):

            quadSurface, quadBorder = _drawQuadrant(
                quad[0],
                quad[1],
                SHAPE_SIZE,
                quadIndex,
                layerIndex,
                decomposedShapeCode,
                curInternalColorSkin,
                shapeConfig
            )
            quadBorders.append(quadBorder)

            if quadSurface is None:
                continue

            rotatedLayer = _rotateSurf(quadSurface,numQuads,quadIndex,layerIndex,SHAPE_SIZE)
            if colorblindPatterns:
                _drawColorblindPatterns(rotatedLayer,quad[1])
            _blitCentered(rotatedLayer,returnSurface)

        for quadIndex, border in enumerate(quadBorders):

            if border is None:
                continue

            _blitCentered(_rotateSurf(border,numQuads,quadIndex,layerIndex,SHAPE_SIZE),returnSurface)

    # pygame doesn't work well at low resolution so render at size 500 then downscale to the desired size
    return transform_smoothscale(returnSurface,(surfaceSize,surfaceSize))
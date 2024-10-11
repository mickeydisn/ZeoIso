import shapez2_render as Render 
import shapez2_gameinfo as GlobalInfos 
import shapez2_operation as ref

class RefShape:
    def __init__(self, shapeCode:str) -> None:
        self.shape = ref.Shape.fromShapeCode(shapeCode)
  
    def toCode(self) -> str:
        return self.shape.toShapeCode()

    def __repr__(self) -> str:
        
        layers = self.shape.toListOfLayers()
        layers = [    [s[i:i+2] for i in range(0, len(s), 2)] for s in layers]
        h1, h2 = "", ""
        s1 = ""
        s2 = ""
        for l in range(0, len(layers)):
            h1 += "_____    "
            s1 += layers[l][3] + " " + layers[l][0] + "    "
            s2 += layers[l][2] + " " + layers[l][1] + "    "
            h2 += "⎺⎺⎺⎺⎺    "
        return ('\n'.join([h1, s1, s2, h2]))
        # for layer
        # print(layers)
        # layers.reverse()
        # print ("________\n" + '\n'.join(layers) + "\n⎺⎺⎺⎺⎺⎺⎺⎺")

              
def refrot90(s:RefShape) -> RefShape:
    shape2 = ref.rotate90CW(s.shape)[0]
    return RefShape(shape2.toShapeCode())

def refrot270(s:RefShape) -> RefShape:
    shape2 = ref.rotate90CCW(s.shape)[0]
    return RefShape(shape2.toShapeCode())

def refrot180(s:RefShape) -> RefShape:
    shape2 = ref.rotate180(s.shape)[0]
    return RefShape(shape2.toShapeCode())

def refpushpin(s:RefShape) -> RefShape:
    shape2 = ref.pushPin(s.shape)[0]
    return RefShape(shape2.toShapeCode())

def refgenCrystal(s:RefShape) -> RefShape:
    shape2 = ref.genCrystal(s.shape, "u")[0]
    return RefShape(shape2.toShapeCode())


def refcut(s:RefShape) -> list[RefShape]:
    shape = ref.coreCut(s.shape)
    return RefShape(shape[0].toShapeCode()), RefShape(shape[1].toShapeCode())

def refswap(s:RefShape, shapeB:RefShape) -> list[RefShape]:
    shape = ref.swapHalves(s.shape, shapeB.shape)
    return RefShape(shape[0].toShapeCode()), RefShape(shape[1].toShapeCode())

def refstack(s:RefShape, topShape:RefShape) -> RefShape:
    shape = ref.coreStack(s.shape, topShape.shape)
    return RefShape(shape[0].toShapeCode())


class KmFactory {

    research = []
    unlockedBuildings = []
    nodeList = []

    constructor() {
    }

}


class KmNode {
    name = ''
    maxBTools = 10
    maxInventory = 1000
    inventory = {}
    btools = {}
    x = 0
    y = 0

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

}
import { META_Building } from "./kmBuilding.js"

class KmFactory {

    research = []
    unlockedBuildings = []
    nodeList = []

    constructor() {}
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

export class KmProduction {
    _inventory = null;

    buildingMax = 10;
    _productionBuilding = [
        {bId:'rbBiome', count:1},
        {bId:'rbTime', count:1},
    ];

    constructor(inventory) {
        this.inventory = inventory
    }

    get buildings() {
        return this._productionBuilding
            .map(x => {
                const bMeta = META_Building[x.bId] || {} 
                return {...x, ...bMeta}
            })
            .sort((a, b) => a.order - b.order)
    }

    canBuildProd() {
        return this.buildingMax < this._productionBuilding.length
    }
    canBuyProd(bId) {
        if (!META_Building[bId]) {
            return false
        }
        const bMeta = META_Building[bId]
        const rest = this._inventory.costTest(bMeta.cost)
        return rest.length == 0
    }

    addBuilding(bId) {
        if (!this.canBuildProd()) {
            return false
        }
        if (!this.canBuildProd(bId)) {
            return false
        }
        this._inventory.costRemove(META_Building[bId].cost)

        const bFilterList = this._productionBuilding.filter(x => x.bId == bId)
        if (bFilterList.length > 0) {
            bFilterList[0].count += 1
        } else {
            bFilterList.push({bId: bId, count: 1})
        }
        return true
    }

    removeBuilding(bId) {
        const bFilterList = this._productionBuilding.filter(x => x.bId == bId)
        if (bFilterList.length == 0) {
            return false
        } 
        if (bFilterList[0].count <= 1) {
            this._productionBuilding = this._productionBuilding.filter(x => x.bId != bId)
            bFilterList.push({bId: bId, count: 1})
        } else {
            bFilterList[0].count -= 1
        }
        return true
    }


}

export class KmInventory {
    size = 20
    items = null
    _inventoryIndex = {}
    _intentorySlots = []

    constructor(size) {
        this.size = size || 20
        this.removeAll()
    }

    get inventory() {
        return Object.values(this._inventoryIndex)
    }

    get index() {
        return this._inventoryIndex
    } 

    get slots() {
       // const slotFilled = Object.fromEntries(this.inventory.map(x => [x.slot , x]))
       // const slots =  [...Array(20).keys()].map(idx => [idx, slotFilled[idx]])
       return this._intentorySlots
    }
    slotSwap(slotIdA, slotIdB) {
        if (slotIdA < 0 || slotIdA >= this.size || slotIdB < 0 || slotIdB >= this.size ) {
            return            
        }
        const temp = this._intentorySlots[slotIdA]
        this._intentorySlots[slotIdA] = this._intentorySlots[slotIdB]
        this._intentorySlots[slotIdB] = temp 

        if (this._intentorySlots[slotIdA]) {
            this._intentorySlots[slotIdA].slotId = slotIdA
        }
        if (this._intentorySlots[slotIdB]) {
            this._intentorySlots[slotIdB].slotId = slotIdB
        }
    }

    slotSwapInventory(slotIdA, slotIdB, inventoryB) {
        if (slotIdA < 0 || slotIdA >= this.size || slotIdB < 0 || slotIdB >= inventoryB.size ) {
            return            
        }
        const itemA = this._intentorySlots[slotIdA]
        console.log('---- slotSwapInventory', itemA)
        inventoryB.addItem(itemA.itemId, itemA.count)
        this.removeItem(itemA.itemId, itemA.count)
    }

    addItem(itemId, count) {
        if (!itemId) return false
        const icount = count ? count : 1

        if (this._inventoryIndex[itemId]) {
            this._inventoryIndex[itemId].count += icount
        } else {
            // find empty slot : 
            const empySlotIndex = this._intentorySlots
                .map((x, idx) => [x, idx])
                .filter(([x, idx]) => x == null)
                .map(([x, idx]) => idx)

            if (empySlotIndex.length > 0) {
                const slotId = empySlotIndex[0]
                const newSlot = {slotId:slotId, itemId:itemId, count:icount}
                this._inventoryIndex[itemId] = newSlot
                this._intentorySlots[slotId] = newSlot
            } 
        }
    }
    haveItem(itemId, count) {
        return itemId
            && this._inventoryIndex[itemId]
            && this._inventoryIndex[itemId].count >= count
    }
    
    removeItem(itemId, count) {
        if (!itemId) return
        if (!this._inventoryIndex[itemId]) return 

        const icount = count ? count : 1
        this._inventoryIndex[itemId].count -= icount
        if (this._inventoryIndex[itemId].count <= 0) {
            const slotId = this._inventoryIndex[itemId].slotId;
            delete this._inventoryIndex[itemId]
            this._intentorySlots[slotId] = null
        }
        console.log("remove", this)
    }

    removeAll() {
      this._inventoryIndex = {}
      this._intentorySlots = [...Array(this.size)].map(_ => null)
      // this.GS.set("Player.inventory.update", 1) 
    }

    costTest(costItems) {
      return costItems.map(cItem => {
          return {
              ...cItem,
              count: cItem.count - (this._inventoryIndex[cItem.itemId] ? this._inventoryIndex[cItem.itemId].count : 0)
          }
      }).filter(item => item.count > 0)
    }
  
    costRemove(cost) {
      cost.forEach(cItem => {
          this.removeItem(cItem.itemId, cItem.count)
      });
    }


}
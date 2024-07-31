import { activeToolmodal } from "./Box/toolTips.js"
import { META_Building, META_BuildingList } from "./kmBuilding.js"

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
        this._inventory = inventory
    }

    get buildings() {
        console.log("building")
        return this._productionBuilding
            .map(x => {
                const bMeta = META_Building[x.bId] || {} 
                return {...x, ...bMeta}
            })
            .sort((a, b) => a.order - b.order)
    }
    get buildingCount() {
        return this._productionBuilding.map(x => x.count).reduce((acc, value) => acc + value, 0)
    }
    buildingPossible() {
        return META_BuildingList.map( x => {
            const pB = this._productionBuilding.filter(pb => x.bId == pb.bId) 
            const pBuilding = pB.length ? pB[0] : {count:0}
            return {...pBuilding, ...x}
        })
    }

    canBuildProd() {
        return this.buildingMax > this.buildingCount
    }
    canBuyProd(bId) {
        if (!META_Building[bId]) {
            return false
        }
        const bMeta = META_Building[bId]
        const rest = this._inventory.costTest(bMeta.cost)
        console.log('rest', bMeta.cost, rest)
        return rest.length == 0
    }

    buyBuilding(bId) {
        if (!this.canBuildProd()) {
            activeToolmodal('Max Production For this Building')
            return false
        }
        if (!this.canBuyProd(bId)) {
            activeToolmodal('Not enough resources for this ')
            return false
        }
        this._inventory.costRemove(META_Building[bId].cost)

        const bFilterList = this._productionBuilding.filter(x => x.bId == bId)
        if (bFilterList.length > 0) {
            bFilterList[0].count += 1
        } else {
            this._productionBuilding.push({bId: bId, count: 1})
        }
        return true
    }

    sellBuilding(bId) {
        const bFilterList = this._productionBuilding.filter(x => x.bId == bId)
        if (bFilterList.length == 0) {
            return false
        } 
        const bToRemove = bFilterList[0]
        if (bToRemove.count <= 1) {
            this._productionBuilding = this._productionBuilding.filter(x => x.bId != bId)
        } else {
            bToRemove.count -= 1
        }
        console.log(bToRemove)
        this._inventory.costAdd(META_Building[bToRemove.bId].cost)
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
    }

    removeAll() {
      this._inventoryIndex = {}
      this._intentorySlots = [...Array(this.size)].map(_ => null)
      // this.GS.set("Player.inventory.update", 1) 
    }

    costTest(costItems) {
      const rest = costItems.map(cItem => {
            const invCount = this._inventoryIndex[cItem.itemId] ? this._inventoryIndex[cItem.itemId].count : 0
            console.log(cItem, invCount)
            return {
                ...cItem,
                count: cItem.count - invCount
            }
      })
      console.log(costItems, rest)
      return rest.filter(item => item.count > 0)
    }
  
    costAdd(cost) {
        cost.forEach(cItem => {
            this.addItem(cItem.itemId, cItem.count)
        });
      }
    costRemove(cost) {
      cost.forEach(cItem => {
          this.removeItem(cItem.itemId, cItem.count)
      });
    }


}
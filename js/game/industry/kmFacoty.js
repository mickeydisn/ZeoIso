
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

export class KmBuilding {
    
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
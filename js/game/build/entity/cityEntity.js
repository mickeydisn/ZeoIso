import { PathFactory } from "../path.js";
import { CITIZEN_NAME } from "./CitizenTrais.js";


export class CityEntity {

    constructor(world, cityFactory, conf={}) {
        this.world = world
        this.cityFactory = cityFactory
        this.cityFactory.addEntity(this)

        this.fm = world.factoryMap;
        this.ta = world.tilesActions;
        this.GS = world.globalState
        
        this.tile = null;

        this.lvl = 0;
        this.assetkey = `ghost`; 
        const randomHue = (Math.floor(Math.random() * 16)) * 16
        this.assetFilter = `#_H${randomHue}_C165_S225`
        this.offset = {x: 0, y: 0};
        this.displayTile = null;

        this.speed = .04
        this.directionCooldown = 0
        this.direction = 'S'

        // ---
        this.name = CITIZEN_NAME.rand()
        // object that stor the current step data
        this.sData = null;

        this.cityLink = {
            grave:null,
            house:null,
            lab:null,
        }
        this.waitingTickCount = 0,
        this.mainGoal = null
        this.goalList = [
            {id:'randomMove', waitCount:20 * 4, count:null},
        ]
    }

    get items() { 
        return {
            t:'Svg', 
            key:this.assetkey + "_" + this.direction + this.assetFilter, 
            lvl:this.lvl, 
            off:{x:this.offset.x, y:this.offset.y}, 
            z:1000
        }
    } 
    // --------------------------------
    summon (tile) {
        this.tile = tile;
        this.tile.addEntity(this)        
    }
    kill () {
        if (this.tile) { 
            this.tile.removeEntity(this) 
            this.tile = null
        }
        if (this.cityFactory) { 
            this.cityFactory.removeEntity(this)
            this.cityFactory = null
        }        
        this.removeCityNodeLink('grave')
        this.removeCityNodeLink('house')
        this.removeCityNodeLink('lab')
    }
    updateLinkedNode() {
        Object.values(this.cityLink).forEach(cityNode => {
            if(!cityNode) return
            cityNode.updateIsoDivBox()            
        })
    }
    clearGoal() {
        this.sData = null
        this.waitingTickCount = 0
        this.mainGoal = null
        this.updateLinkedNode()
    }

    defineCityNodeLink (name, cityNode) {
        if (this.cityLink[name]) {
            this.removeCityNodeLink(name)
        }
        this.cityLink[name] = cityNode;
        this.cityLink[name].addEntity(this)        
    }
    removeCityNodeLink (name) {
        if (this.cityLink[name]) {
            this.cityLink[name].removeEntity(this) 
            this.cityLink[name] = null
        }
    }


    // --------------------------------

    _moveAjustement (dx, dy) {
        return  dx ==  0 && dy ==  1 ? [ 0,  1]:  
            dx ==  1 && dy ==  1 ? [ 1.25,  1.25]:  
            dx ==  1 && dy ==  0 ? [ 1,  0]:  

            dx ==  1 && dy == -1 ? [.75, -.75]: 
            dx ==  0 && dy == -1 ? [ 0, -1]:  
            dx == -1 && dy == -1 ? [-1.25, -1.25]: 
            dx == -1 && dy ==  0 ? [-1,  0]: 
            dx == -1 && dy ==  1 ? [-.75,  .75]: 
            [0, 0]
    }

    _directionOfMove(dx, dy) {
        const direction = 
            dx == 0 && dy  > 0 ? 'NW' :
            dx  > 0 && dy  > 0 ? 'N' :
            dx  > 0 && dy == 0 ? 'NE' :
            dx  > 0 && dy  < 0 ? 'E' :
            dx == 0 && dy  < 0 ? 'SE' :
            dx  < 0 && dy  < 0 ? 'S' :
            dx  < 0 && dy == 0 ? 'SW' :
            dx  < 0 && dy  > 0 ? 'W' :
            this.direction
        
  
          this.direction = direction
      }

    moveOffet(dx, dy) {
        // Tile not Change .
        
        const dox = dx != 0 ? dx : - (this.offset.x > 0 ? 1 : this.offset.x < 0 ? -1 : 0)
        const doy = dy != 0 ? dy : - (this.offset.y > 0 ? 1 : this.offset.y < 0 ? -1 : 0)

        this._directionOfMove(dox , doy)
        const [ox, oy] = this._moveAjustement(dox, doy)

        this.offset.x += ox * this.speed
        this.offset.y += oy * this.speed

        this.offset.x = Math.abs(this.offset.x) < this.speed / 2 ? 0 : this.offset.x
        this.offset.y = Math.abs(this.offset.y) < this.speed / 2 ? 0 : this.offset.y

        let xx = 0
        let yy = 0
        if (this.offset.x > .5) {
            this.offset.x -= 1
            xx += 1        
        } else if (this.offset.x < -.5) {
            this.offset.x += 1
            xx -= 1        
        }
        if (this.offset.y > .5) {
            this.offset.y -= 1
            yy += 1        
        } else if (this.offset.y < -.5) {
            this.offset.y += 1
            yy -= 1        
        }

        if (xx != 0 || yy != 0) {
            this.tile.removeEntity(this)
            this.tile = this.fm.getTile(this.tile.x + xx, this.tile.y + yy)
            this.tile.addEntity(this)
            return true
        }
        return false
    }

    doTick() {
        if (this.waitingTickCount > 0) {
            this.waitingTickCount -= 1;
            return
        }
        this.waitingTickCount = 0
        const chain = [
            behavior_start,
            behaviorMove_start,

            behaviorMove_nodeCall,
            behaviorMove_inventoryAdd,
            behaviorMove_getRandomGoal,
            behaviorMove_getGraveGoal,
            behaviorMove_getHouseGoal,
            behaviorMove_getLabGoal,

            behaviorMove_GoalIN,
            behaviorMove_getPath,
            behaviorMove_nextPossition,
        ]
        for (const step of chain) {
            if (step.isValidate(this)) {
                step.do(this)
                break
            }

        }
        // chain.forEach(step => {
        // });
    }
}

const behavior_start = {
    name: 'behavior_start',
    isValidate: (entity) => {
        return entity.mainGoal == null 
    },
    do: (entity, param={},) => {
        const newGoal = entity.goalList.shift()
        entity.mainGoal = newGoal.id
        // console.log('NEW GOAL : ' , entity.mainGoal, entity.goalList)
        if(newGoal.waitCount) {
            entity.waitingTickCount = newGoal.waitCount
        }
        if(newGoal.sData) {
            entity.sData = {...newGoal.sData}
        }
        if (newGoal.count == null) {
            entity.goalList.push(newGoal)
        } else {
            const count = newGoal.count -1
            if (count > 0) {
                newGoal.count = count
                entity.goalList.push(newGoal)
            }
        }
    }
}


const behaviorMove_start = {
    name: 'start',
    isValidate: (entity) => {
        return !entity.sData 
    },

    do: (entity, param={},) => {
        entity.sData = {
            moveGoal: null,
            moveTilesPath: null,
        }
    }
}

const behaviorMove_nodeCall = {
    name: 'nodeCall',
    isValidate: (entity) => entity.sData 
            && entity.mainGoal.localeCompare('nodeCall') == 0,
    do: (entity, param={},) => {
        const cityLinkId = entity.sData.cityLink 
        entity.sData.nodeCall(entity.cityLink[cityLinkId])
        entity.clearGoal()
    }
}


const behaviorMove_inventoryAdd = {
    name: 'behaviorMove_inventoryAdd',
    isValidate: (entity) => entity.sData 
            && entity.mainGoal.localeCompare('inventoryAdd') == 0,
    do: (entity, param={},) => {
        const cityLinkId = entity.sData.cityLink 
        entity.cityLink[cityLinkId].inventoryAdd(entity.sData.itemId, entity.sData.count)
        entity.clearGoal()
    }
}


const behaviorMove_getRandomGoal = {
    name: 'behaviorMove_getRandomGoal',
    isValidate: (entity) => entity.sData 
            && entity.mainGoal.localeCompare('randomMove') == 0
            && !entity.sData.moveGoal,
    do: (entity, param={},) => {
        const randomX = Math.round(Math.random() * 20 - 10)
        const randomY = Math.round(Math.random() * 20 - 10)
        entity.sData.moveGoal = {x:entity.tile.x + randomX, y:entity.tile.y + randomY}
    }
}



const behaviorMove_getGraveGoal = {
    name: 'behaviorMove_getGraveGoal',
    isValidate: (entity) => entity.sData 
            && entity.mainGoal.localeCompare('goGrave') == 0
            && entity.cityLink.grave
            && !entity.sData.moveGoal,    
    
    do: (entity, param={},) => {
        entity.sData.moveGoal = {x:entity.cityLink.grave.x, y:entity.cityLink.grave.y}
    }
}

const behaviorMove_getHouseGoal = {
    name: 'behaviorMove_getHouseGoal',
    isValidate: (entity) => entity.sData 
            && entity.mainGoal.localeCompare('goHouse') == 0
            && entity.cityLink.house
            && !entity.sData.moveGoal,    
    
    do: (entity, param={},) => {
        entity.sData.moveGoal = {x:entity.cityLink.house.x, y:entity.cityLink.house.y}
    }
}

const behaviorMove_getLabGoal = {
    name: 'behaviorMove_getLabGoal',
    isValidate: (entity) => entity.sData 
            && entity.mainGoal.localeCompare('goLab') == 0
            && entity.cityLink.lab
            && !entity.sData.moveGoal,    
    
    do: (entity, param={},) => {
        entity.sData.moveGoal = {x:entity.cityLink.lab.x, y:entity.cityLink.lab.y}
    }
}


const behaviorMove_GoalIN = {
    name: 'behaviorMove_GoalIN',
    isValidate: (entity) => entity.sData 
            && entity.sData.moveGoal
            && (entity.sData.moveGoal.x == entity.tile.x && entity.sData.moveGoal.y == entity.tile.y),    
    
    do: (entity, param={},) => {
        entity.offset.x = 0
        entity.offset.y = 0
        entity.direction = 'S'
        entity.clearGoal()
    }
}


// -------------



const behaviorMove_getPath = {
    name: 'getPath',
    isValidate: (entity) => {
        return entity.sData 
            && entity.sData.moveGoal 
            && (entity.sData.moveGoal.x != entity.tile.x || entity.sData.moveGoal.y != entity.tile.y) 
            && (!entity.sData.moveTilesPath || entity.sData.moveTilesPath.length == 0)
    },

    do: (entity, param={},) => {
        const pathFactory = new PathFactory(entity.world, {axeCount:4})
        pathFactory.isValideTile = (tile)  => true
        const moveTilesPath = pathFactory.createPath(
            {x:entity.tile.x, y:entity.tile.y},
            {x:entity.sData.moveGoal.x, y:entity.sData.moveGoal.y}
        )
        if (!moveTilesPath) {
            entity.sData.moveGoal = null
        }
        entity.sData.moveTilesPath = moveTilesPath
    }
}


const behaviorMove_nextPossition = {
    name: 'nextPossition',
    isValidate: (entity) => {
        return entity.sData
            && entity.sData.moveGoal
            && (entity.sData.moveGoal.x != entity.tile.x || entity.sData.moveGoal.y != entity.tile.y)
            && entity.sData.moveTilesPath && entity.sData.moveTilesPath.length > 0
    },

    do: (entity, param={},) => {
        const nextPos = entity.sData.moveTilesPath[0]
        const dx = (nextPos.x - entity.tile.x)
        const dy = (nextPos.y - entity.tile.y)

        
        entity.moveOffet(dx, dy)
        if (nextPos.x == entity.tile.x && nextPos.y == entity.tile.y) {
            entity.sData.moveTilesPath.shift()
        }
    }
}
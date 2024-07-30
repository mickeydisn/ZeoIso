import { KmInventory } from "./industry/kmFacoty.js";


export class Player {


    constructor (world) {
        this.world = world;
        this.GS = this.world.globalState 
        this.fm = world.factoryMap;

        this.speed = .2;
        this.lvlJump = 4;

        // Real Position (float)
        this.x;
        this.y;

        // Possition on Iso Tiles
        this.tileX;
        this.tileY;
        this.offx = 0;
        this.offy = 0;
        this.direction = 'S'

        // Possition on the map 
        this.mapX;
        this.mapY;
        this.keyMoveX = 0;
        this.keyMoveY = 0;

        this.GS.sub('Setting.PlayerMove', 'Player', this.updateSettingPlayerMove.bind(this))
        this.updateSettingPlayerMove(this.GS.get('Setting.PlayerMove'))
        
        this.GS.sub('Setting.KeboardType', 'Player', this.updateSettingKeboardType.bind(this))
        this.updateSettingKeboardType(this.GS.get('Setting.KeboardType'))

        // -----------
        this.spaceActionNow = 0;


        // -----
        // Place where the progression of the story is store. 
        this.storyProgress = {
          INTRO: { START:true, END:false },
        }

        this.inventory = new KmInventory()
        this.inventory.addItem("rsMemoryNote", 10)
        this.inventory.addItem("rsBiome", 10)
        this.inventory.addItem("rsHydro", 5)
        this.inventory.addItem("rsTemp", 10)

        /*
        this._inventory = {
          RS_BIOME: {slot:0, itemId:'RS_BIOME', count:10},
          RS_TEMP: {slot:2, itemId:'RS_TEMP', count:10},
          RS_ENV: {slot:3, itemId:'RS_ENV', count:10},
        }
        */
    }

    /*/ ----- 

    get inventory() {
        return Object.values(this._inventory)
    }

    get inventoryIndex() {
        return this._inventory
    } 

    get inventorySlot() {
       const slotFilled = Object.fromEntries(this.inventory.map(x => [x.slot , x]))
       const slots =  [...Array(20).keys()].map(idx => [idx, slotFilled[idx]])
       return slots
    }

    inventoryAdd(itemId, count) {
        if (!itemId) return
        const icount = count ? count : 1

        if (this._inventory[itemId]) {
            this._inventory[itemId].count += icount
            this.GS.set("Player.inventory.update", 1) 
          } else {
            // find empty slot : 
            const filedSlotIndex = this._inventory.map(x => x.slot).sort((a , b) => a - b)
            const empySlotIndex = [...Array(20).keys()].filter(idx => ! filedSlotIndex.include(idx))
            if (empySlotIndex.length > 0) {
              this._inventory[itemId] = {slot:empySlotIndex[0], itemId:itemId, count:icount}
              this.GS.set("Player.inventory.update", 1) 
            }
        }
    }
    inventoryHave(itemId, count) {
        return itemId
            && this._inventory[itemId]
            && this._inventory[itemId].count >= count
    }
    
    inventoryRemove(itemId, count) {
        if (!itemId) return
        if (!this._inventory[itemId]) return 

        const icount = count ? count : 1
        this._inventory[itemId].count -= icount
        if (this._inventory[itemId].count <= 0) {
            delete this._inventory[itemId]
        }
        this.GS.set("Player.inventory.update", 1) 
    }
    inventoryEmpty() {
      this._inventory = {}
      this.GS.set("Player.inventory.update", 1) 
    }


    inventoryCostRest(costItems) {
      return costItems.map(cItem => {
          return {
              ...cItem,
              count: cItem.count - (this._inventory[cItem.itemId] ? this._inventory[cItem.itemId].count : 0)
          }
      }).filter(item => item.count > 0)
    }
  
    inventoryCostRemove(cost) {
      cost.forEach(cItem => {
          this.inventoryRemove(cItem.itemId, cItem.count)
      });
    }
    */
    // --------------------------------
    // --------------------------------
    // --------------------------------
    // --------------------------------

    updateSettingKeboardType(keyType) {
      this.keyboardAzert = keyType.localeCompare("azerty") == 0 
    }    
    updateSettingPlayerMove(key) {
      this.settingPlayerMove = key
    }    

    get currentAsset() {

        const x = Math.floor((Math.abs(this.offx) + Math.abs(this.offy)) * 3)
        const s = x % 3 + 1;

        const baseName = 'astronautA'
        return `${baseName}-${s}_${this.direction}`
    }

    setCenter(xx, yy) {
      this.x = xx; 
      this.y = yy;
      this.updateTilePos()
      this.updateMapPos()
    }

    get tileIsoPos() {
        const space = .1
        const tileFloorX = Math.round(this.x - space)
        const tileFloorY = Math.round(this.y - space)

        this.offx = this.x - tileFloorX;
        this.offy = this.y - tileFloorY;

        return {
            x : 0,
            y : 0,
            off : {
                x : this.offx + space,
                y : this.offy + space,
            }
        }
    }
    
    updateTilePos() {
        const space = .1

        const tileFloorX = Math.round(this.x - space)
        const tileFloorY = Math.round(this.y - space)
            
        if (this.tileX != tileFloorX || this.tileY != tileFloorY) {
            this.tileX = tileFloorX            
            this.tileY = tileFloorY   
            this.GS.set("TileInfo.position", [tileFloorX, tileFloorY])         
            this.world.tilesMatrix.setCenter(this.tileX, this.tileY);
        }
    }
    
    updateMapPos() {
      const mapX = Math.round(this.x)
      const mapY = Math.round(this.y)
      if (this.mapX != mapX || this.mapY != mapY ) {
          this.mapX = mapX            
          this.mapY = mapY            
      }
    }

    updatePos() {
      const DX = this.wantedX - this.x;
      const DY = this.wantedY - this.y;
      /*
      const XX = this.x + ( (DX > 0) ? .5 : -.5 )
      const YY = this.y + ( (DY > 0) ? .5 : -.5 )
      */
      const wantX = Math.round(this.wantedX + DX)
      const wantY = Math.round(this.wantedY + DY)

      if (this.mapX != wantX || this.mapY != wantY ) {

        const currentTile = this.fm.getTile(this.mapX, this.mapY)
        const wantTile = this.fm.getTile(wantX, wantY)
        const lvlDiff = currentTile.lvl - wantTile.lvl
        
        if (wantTile.isBlock || Math.abs(lvlDiff) > this.lvlJump) {
          this.wantedX = this.x
          this.wantedY = this.y
          return
        }
        
      }

      this.x = this.wantedX;
      this.y = this.wantedY;

      this.updateTilePos();
      this.updateMapPos();
    }

    move (keyMoveX, keyMoveY) {

      // === Slice to Center of Tile X
      if (keyMoveX == 0 ) {
        const offx = this.x - this.mapX;
        if (Math.abs(offx) > 0.01) {
          // is start to move in
          if (offx > 0 && this.keyMoveX < 0) {
            this.wantedX = this.x - this.speed
          // is start to move in
          } else if (offx < 0 && this.keyMoveX > 0) {
            this.wantedX = this.x + this.speed
          // is finish to move in
          } else if (Math.abs(offx) <= this.speed) {
            this.wantedX = this.x - offx;
          // is Continu to move in
          } else {
            this.wantedX = this.x - (offx > 0 ? - this.speed : + this.speed) ;
          }
          this.updatePos()
      } else {
        // this.keyMoveX = 0;
      }    
    } else {
      this.keyMoveX = keyMoveX;
    }
    // === Slice to Center of Tile Y
    if (keyMoveY == 0 ) {
      const offy = this.y - this.mapY;
      if (Math.abs(offy) > 0.01) {
          // is start to move in
          if (offy > 0 && this.keyMoveY < 0) {
            this.wantedY = this.y - this.speed
          // is start to move in
          } else if (offy < 0 && this.keyMoveY > 0) {
            this.wantedY = this.y + this.speed
          // is finish to move in
          } else if (Math.abs(offy) <= this.speed) {
            this.wantedY = this.y - offy;
          // is Continu to move in
          } else {
            this.wantedY = this.y - (offy > 0 ? - this.speed : + this.speed) ;
          }
          this.updatePos()
      } else {
        // this.keyMoveY = 0;
      }    
    } else {
      this.keyMoveY = keyMoveY;
    }

    if (keyMoveX == 0 && keyMoveY == 0 ) {
      return
    }

    // === If Key Press

    this.direction = this._directionOfMove(keyMoveX, keyMoveY);
    
    if (keyMoveX == 0 || keyMoveY == 0) {
      this.wantedX = this.x + this.speed * keyMoveX;
      this.wantedY = this.y + this.speed * keyMoveY;
    } else {
      this.wantedX = this.x + this.speed * keyMoveX * .7;
      this.wantedY = this.y + this.speed * keyMoveY * .7;
    }

    // == Update Position
    this.updatePos()

    }

    _directionOfMove(mx, my) {
      /*
        const direction = 
            mx == 0 && my  > 0 ? 'NW' :
              mx  > 0 && my  > 0 ? 'N' :
            mx  > 0 && my == 0 ? 'NE' :
              mx  > 0 && my  < 0 ? 'E' :
            mx == 0 && my  < 0 ? 'SE' :
              mx  < 0 && my  < 0 ? 'S' :
            mx  < 0 && my == 0 ? 'SW' :
              mx  < 0 && my  > 0 ? 'W' :
            null
      */
            const direction = 
            mx == 0 && my  > 0 ? 'NW' :
              mx  > 0 && my  > 0 ? 'N' :
            mx  > 0 && my == 0 ? 'NE' :
              mx  > 0 && my  < 0 ? 'E' :
            mx == 0 && my  < 0 ? 'SE' :
              mx  < 0 && my  < 0 ? 'S' :
            mx  < 0 && my == 0 ? 'SW' :
              mx  < 0 && my  > 0 ? 'W' :
            null
      

        return direction
    }

    keyLoopControle (keyPressed) {
        const kP = keyPressed
        const aze = this.keyboardAzert

        let move = false;
        let x = 0;
        let y = 0;
        if (kP['ArrowUp'] || (aze && kP['z']) || (!aze && kP['w'])) {
          move = true;
          y = + 1;
        }
        if (kP['ArrowRight'] || kP['d']) {
          move = true;
          x = + 1;
        }
        if (kP['ArrowDown'] || kP['s']) {
          move = true;
          y = - 1;
        }
        if (kP['ArrowLeft'] || (aze && kP['q']) || (!aze && kP['a'])) {
          move = true;
          x = - 1;
        } 
        if (kP['Space'] || kP[' ']) {
          this.sapceAction()
        }

        let [xx, yy] = 
        x ==  0 && y ==  1 ?  [ 1,  0]:  
        x ==  1 && y ==  1 ? [.75, -.75]: 
        x ==  1 && y ==  0 ? [ 0, -1]:  
        x ==  1 && y == -1 ? [-1.25, -1.25]: 
        x ==  0 && y == -1 ? [-1,  0]: 
        x == -1 && y == -1 ? [-.75,  .75]:
        x == -1 && y ==  0 ? [ 0,  1]: 
        x == -1 && y ==  1 ? [ 1.25,  1.25]:  
        [0, 0]
      
        
        if (this.settingPlayerMove == 1) {
          // Move Rotation , ajuste the movement off the screen oriantation , not on Iso orientation
          [xx, yy] = 
            x ==  0 && y ==  1 ? [ 1.25,  1.25]: // z = zd 
            x ==  1 && y ==  1 ? [ 1,  0]: // zd = d 
            x ==  1 && y ==  0 ? [ .75, -.75]: // d = ds 

            x ==  1 && y == -1 ? [ 0, -1]: // ds = s
            x ==  0 && y == -1 ? [-1.25, -1.25]: // s = sq 
            x == -1 && y == -1 ? [-1,  0]: // sq = q
            x == -1 && y ==  0 ? [-.75,  .75]: // q = qz
            x == -1 && y ==  1 ? [ 0,  1]: // qz = z
            [0, 0]
        }


                /*
        // Normal ( Off )
        const [xx, yy] = 
          x ==  0 && y ==  1 ? [ 0,  1]:  
          x ==  1 && y ==  1 ? [ 1.25,  1.25]:  
          x ==  1 && y ==  0 ? [ 1,  0]:  

          x ==  1 && y == -1 ? [.75, -.75]: 
          x ==  0 && y == -1 ? [ 0, -1]:  
          x == -1 && y == -1 ? [-1.25, -1.25]: 
          x == -1 && y ==  0 ? [-1,  0]: 
          x == -1 && y ==  1 ? [-.75,  .75]: 
          [0, 0]
        */

        this.move(xx, yy) 

        
      }


      sapceAction() {
        const now = Date.now();
        console.log(now)
        if (now - this.spaceActionNow > 200) {
          this.spaceActionNow = now
          // const synth = new window.Tone.PolySynth(window.Tone.Synth).toDestination();
          const synth = new window.Tone.MonoSynth().toDestination();
          synth.set({
            "volume": -4,
          });
          console.log("Play Note")
          //play a middle 'C' for the duration of an 8th note
          synth.triggerAttackRelease("B2", "16n");
  
        }
      }


      clickAction() {
        /*
        this.GS.set("TileClickFunction", { 
            func:'doFunction', do: this.doSelecetNearNodeFunction, callback:callback
        })
        */

      }

}




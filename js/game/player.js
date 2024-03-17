
export class Player {


    constructor (world) {
        this.world = world;

        this.speed = .3;

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
    }


    get currentAsset() {

        const x = Math.floor((Math.abs(this.offx) + Math.abs(this.offy)) * 3)
        const s = x % 3 + 1;

        const baseName = 'astronautA'
        return `${baseName}_${this.direction}-${s}`
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
            this.world.tilesMatrix.setCenter(this.tileX, this.tileY);
        }
    }
    
    updateMapPos() {
      const mapFloorX = Math.round(this.x)
      const mapFloorY = Math.round(this.y)
          
      if (this.mapX != mapFloorX || this.mapY != mapFloorY ) {
          this.mapX = mapFloorX            
          this.mapY = mapFloorY            
          console.log('Change Position')
          // this.world.tilesMatrix.setCenter(this.tileX, this.tileY);
      }
    }

    updatePos() {
      this.x = this.wantedX;
      this.y = this.wantedY;


      this.updateTilePos();
      this.updateMapPos();
    }

    move (keyMoveX, keyMoveY) {

      if (keyMoveX == 0 ) {
        const offx = this.x - this.mapX;
        if (Math.abs(offx) > 0.01) {
          // is start to move in
          if (offx > 0 && this.keyMoveX < 0) {
            console.log('A', offx,  this.keyMoveX )
            this.wantedX = this.x - this.speed
          // is start to move in
          } else if (offx < 0 && this.keyMoveX > 0) {
            console.log('B', offx,  this.keyMoveX )
            this.wantedX = this.x + this.speed
          // is finish to move in
          } else if (Math.abs(offx) <= this.speed) {
            console.log('C', offx,  this.keyMoveX )
            this.wantedX = this.x - offx;
          // is Continu to move in
          } else {
            console.log('D', offx,  this.keyMoveX )
            this.wantedX = this.x - (offx > 0 ? - this.speed : + this.speed) ;
          }
          this.updatePos()
      } else {
        // this.keyMoveX = 0;
      }    
    } else {
      this.keyMoveX = keyMoveX;
    }
    if (keyMoveY == 0 ) {
      const offy = this.y - this.mapY;
      if (Math.abs(offy) > 0.01) {
          // is start to move in
          if (offy > 0 && this.keyMoveY < 0) {
            console.log('YA', offy,  this.keyMoveY )
            this.wantedY = this.y - this.speed
          // is start to move in
          } else if (offy < 0 && this.keyMoveY > 0) {
            console.log('YB', offy,  this.keyMoveY )
            this.wantedY = this.y + this.speed
          // is finish to move in
          } else if (Math.abs(offy) <= this.speed) {
            console.log('YC', offy,  this.keyMoveY)
            this.wantedY = this.y - offy;
          // is Continu to move in
          } else {
            console.log('YD', offy,  this.keyMoveY)
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
    this.direction = this._directionOfMove(keyMoveX, keyMoveY);
     
    
    if (keyMoveX == 0 || keyMoveY == 0) {
      this.wantedX = this.x + this.speed * keyMoveX;
      this.wantedY = this.y + this.speed * keyMoveY;
    } else {
      this.wantedX = this.x + this.speed * keyMoveX * .7;
      this.wantedY = this.y + this.speed * keyMoveY * .7;
    }

    // console.log("move", mx, my, this.x, this.y)
    this.updatePos()

    }

    _directionOfMove(mx, my) {

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
    
        let move = false;
        let x = 0;
        let y = 0;
        if (keyPressed['d']) {
          move = true;
          x = + 1;
        }
        if (keyPressed['q']) {
          move = true;
          x = - 1;
        }
        if (keyPressed['s']) {
          move = true;
          y = - 1;
        }
        if (keyPressed['z']) {
          move = true;
          y = + 1;
        }
        this.move(x, y) 
      }

}

export class Player {


    constructor (world) {
        this.world = world;

        this.x;
        this.y;
        this.tileX;
        this.tileY;
        this.offx = 0;
        this.offy = 0;
        this.direction = 'S'
    }


    get currentAsset() {

        const x = Math.floor((Math.abs(this.offx) + Math.abs(this.offy)) * 3)
        const s = x % 3 + 1;

        const baseName = 'astronautA'
        return `${baseName}_${this.direction}-${s}`
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



    tilePos() {
        const space = .1

        const tileFloorX = Math.round(this.x - space)
        const tileFloorY = Math.round(this.y - space)

        let offx = this.x - tileFloorX;
        let offy = this.y - tileFloorY;

            
        let haveChange = false;
        if (this.tileX != tileFloorX) {
            this.tileX = tileFloorX            
            haveChange = true;
        }
        if (this.tileY != tileFloorY) {
            this.tileY = tileFloorY            
            haveChange = true;
        }
        if (haveChange) {
            this.world.tilesMatrix.setCenter(this.tileX, this.tileY);
        }
    }


    setCenter(xx, yy) {
        this.x = xx; 
        this.y = yy;
        this.tileX = xx; 
        this.tileY = yy;
        this.world.tilesMatrix.setCenter(this.x, this.y)
    }

    move (mx, my) {

        this.direction = this._directionOfMove(mx, my);

        if (mx == 0 || my == 0) {
          this.x += mx;
          this.y += my;
        } else {
          this.x += mx * .7;
          this.y += my * .7;

        }


        // console.log("move", mx, my, this.x, this.y)

        this.tilePos()
        // this.world.tilesMatrix.move(mx, my);

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
        const _translate_speed = .2;
    
        let move = false;
        let x = 0;
        let y = 0;
        if (keyPressed['d']) {
          move = true;
          x = + _translate_speed;
        }
        if (keyPressed['q']) {
          move = true;
          x = - _translate_speed;
        }
        if (keyPressed['s']) {
          move = true;
          y = - _translate_speed;
        }
        if (keyPressed['z']) {
          move = true;
          y = + _translate_speed;
        }
        if (move) {
          //console.log('KeyMove')
            this.move(x, y) 
        };
      }

}
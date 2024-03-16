


export class TilesMatrix {

	constructor(world, size=20, x=0, y=0) {
		this.world = world;
		this.fm = this.world.factoryMap;
		this.size = size;
		this.tiles =  [...Array(this.size)].map(
            x => [...Array(this.size)].map(
                y => {return {lvl:0, x:0, y:0, color:[255, 0, 255]}}
            )
        );

		// Def the center of the tile matrix		
		this.avgLvl = 0; 
		this.setCenter(x, y)
        this.update()
	}

	getPos() {
		return [this.x, this.y]
	}

	setCenter(x, y) {
		this.x = x; 
		this.y = y;
	}

	move(diffx, diffy) {
		this.setCenter(this.x + diffx, this.y + diffy);
	}
	

	update() {
		this.rangeX = Array.from({ length: this.size }, (_, index) => index - Math.floor(this.size / 2) + this.x );
		this.rangeY = Array.from({ length: this.size }, (_, index) => index - Math.floor(this.size / 2) + this.y );

        this.avgLvl = 0
		this.rangeX.map((x, idx) => {
			this.rangeY.map((y, idy) => {
				const tile = this.fm.getTile(x, y)
				this.tiles[idx][idy] = tile
				this.avgLvl += tile.lvl
			})
		})
		this.avgLvl /= this.size * this.size
	}

}
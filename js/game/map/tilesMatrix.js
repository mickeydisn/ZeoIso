

export class TilesMatrixSelected  {
	constructor(world, x1=0, y1=0, x2=0, y2=0) {
		this.world = world;
		this.fm = this.world.factoryMap;
		const p1 = {
			x: x1 <= x2 ? x1 : x2,
			y: y1 <= y2 ? y1 : y2
		};
		const p2 = {
			x: x1  > x2 ? x1 : x2, 
			y: y1  > y2 ? y1 : y2
		};
		
		this.sizeX = p2.x - p1.x + 1
		this.sizeY = p2.y - p1.y + 1
		this.rangeX = Array.from({ length: this.sizeX }, (_, index) => index + p1.x );
		this.rangeY = Array.from({ length: this.sizeY }, (_, index) => index + p1.y );

		this.tiles =  [...Array(this.sizeX)].map(
            x => [...Array(this.sizeY)].map(
                y => {return {lvl:0, x:0, y:0, color:[255, 0, 255]}}
            )
        );

        this.avgLvl = 0
		this.rangeX.map((x, idx) => {
			this.rangeY.map((y, idy) => {
				const tile = this.fm.getTile(x, y)
				this.tiles[idx][idy] = tile
				this.avgLvl += tile.waterLvl
			})
		})
		this.avgLvl /= this.sizeX * this.sizeY
	}

	toJson(){
		const baseLvl = this.tiles[0][0].lvl
		return this.rangeX.map((x, idx) => {
			return this.rangeY.map((y, idy) => {
				const tile = this.tiles[idx][idy]
				return {
					...tile.toJson(),
					x: idx,
					y: idy,
					lvl: tile.lvl - baseLvl

				}
			})
		}).flat()

	}

}



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
				this.avgLvl += tile.waterLvl
			})
		})
		this.avgLvl /= this.size * this.size
	}

}
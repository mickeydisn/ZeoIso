import { Tile } from "./tile.js";

export const CHUNK_SIZE = 16


export class Chunk {
	constructor(world, cx, cy) {
		this.world = world;
		this.fm = this.world.factoryMap;

		this.size = CHUNK_SIZE;
		this.cx = cx; 
		this.cy = cy;
		this.x = cx * this.size; 
		this.y = cy * this.size;


		// Generat a bigger chunk to have a clean smooth edge ( we store only the matrix after copy it ) 
		this.sizeBorder = 2
		this.sizeFull = this.size + 2 * this.sizeBorder
		this.matrixGen = [...Array(this.sizeFull)].map(
            x => [...Array(this.sizeFull)].map(
                y => null
            )
        );
		this.matrix = [...Array(this.size)].map(
            x => [...Array(this.size)].map(
                y => null
            )
        );

	
		// Init a matrix ( generate each tiles )
		this.initGenMatrix()
		// Smmoth the matrix 
		this.smoothMatrix()
		this.smoothMatrix()
		// Copy and store only the center of the matix 
		this.copyMatrix()
		// Delete the original matrix with border . 
		this.matrixGen = null;
	}

	get(x, y) {return this.matrix[x][y]}

	async initGenMatrix() {
		for (let i = 0; i < this.sizeFull; i++) {
			for (let j = 0; j < this.sizeFull; j++) {
				this.matrixGen[i][j] = new Tile(
					this.world, 
					this.x + i - this.sizeBorder, 
					this.y + j - this.sizeBorder, 
					this.cx, this.cy 
				)
			}
		}

		(async () => {
			const isLoaded = await this.load();
			if (!isLoaded) {
				await this.save();
			}
		})();

	}

	copyMatrix() {
		const k = this.sizeBorder
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				this.matrix[i][j] = this.matrixGen[i + k][j + k]
			}
		}
	}

	smoothMatrix() {
		// Smoth 
		for (let i = 1; i < this.sizeFull - 1; i++) {
			for (let j = 1; j < this.sizeFull - 1; j++) {
				const sum = this.matrixGen[i][j].gen3Lvl + 
					this.matrixGen[i + 1][j].gen3Lvl +
					this.matrixGen[i - 1][j].gen3Lvl +
					this.matrixGen[i][j + 1].gen3Lvl +
					this.matrixGen[i][j - 1].gen3Lvl +
					this.matrixGen[i + 1][j + 1].gen3Lvl +
					this.matrixGen[i - 1][j - 1].gen3Lvl +
					this.matrixGen[i - 1][j + 1].gen3Lvl +
					this.matrixGen[i + 1][j - 1].gen3Lvl
				this.matrixGen[i][j].gen3Lvl = sum / 9;
			}
		}
		// this.smoothSide()
	}

	smoothSide() {
		const sm = this.size - 1
		// Smoth 
		for (let i = 1; i < this.sizeFull - 1; i++) {
			{
				// Top
				const j = 0;
				const sum = this.matrixGen[i][j].gen3Lvl + 
					this.matrixGen[i + 1][j].gen3Lvl +
					this.matrixGen[i - 1][j].gen3Lvl +
					this.matrixGen[i][j + 1].gen3Lvl +
					// this.matrix[i][j - 1].gen3Lvl +
					this.matrixGen[i + 1][j + 1].gen3Lvl +
					// this.matrix[i - 1][j - 1].gen3Lvl +
					this.matrixGen[i - 1][j + 1].gen3Lvl 
					// this.matrix[i + 1][j - 1].gen3Lvl
				this.matrixGen[i][j].gen3Lvl = sum / 6;
			}
			{
				// Left
				const j = this.sizeFull - 1;
				const sum = this.matrixGen[i][j].gen3Lvl + 
					this.matrixGen[i + 1][j].gen3Lvl +
					this.matrixGen[i - 1][j].gen3Lvl +
					// this.matrix[i][j + 1].gen3Lvl +
					this.matrixGen[i][j - 1].gen3Lvl +
					// this.matrix[i + 1][j + 1].gen3Lvl +
					this.matrixGen[i - 1][j - 1].gen3Lvl +
					// this.matrix[i - 1][j + 1].gen3Lvl +
					this.matrixGen[i + 1][j - 1].gen3Lvl
				this.matrixGen[i][j].gen3Lvl = sum / 6;
			}
		}
		// Smoth 
		for (let j = 1; j < this.sizeFull - 1; j++) {
			{
				// Top
				const i = 0;
				const sum = this.matrixGen[i][j].gen3Lvl + 
					this.matrixGen[i + 1][j].gen3Lvl +
					// this.matrix[i - 1][j].gen3Lvl +
					this.matrixGen[i][j + 1].gen3Lvl +
					this.matrixGen[i][j - 1].gen3Lvl +
					this.matrixGen[i + 1][j + 1].gen3Lvl +
					// this.matrix[i - 1][j - 1].gen3Lvl +
					// this.matrix[i - 1][j + 1].gen3Lvl 
					this.matrixGen[i + 1][j - 1].gen3Lvl
				this.matrixGen[i][j].gen3Lvl = sum / 6;
			}
			{
				// Left
				const i = this.sizeFull - 1;
				const sum = this.matrixGen[i][j].gen3Lvl + 
					// this.matrix[i + 1][j].gen3Lvl +
					this.matrixGen[i - 1][j].gen3Lvl +
					this.matrixGen[i][j + 1].gen3Lvl +
					this.matrixGen[i][j - 1].gen3Lvl +
					// this.matrix[i + 1][j + 1].gen3Lvl +
					this.matrixGen[i - 1][j - 1].gen3Lvl +
					this.matrixGen[i - 1][j + 1].gen3Lvl
					// this.matrix[i + 1][j - 1].gen3Lvl
				this.matrixGen[i][j].gen3Lvl = sum / 6;
			}
		}
		

	}


	async load() {

		const chunkId = `${this.cx}_${this.cy}`

		const loadDataTiles = await db.MapTiles.where({chunkId:chunkId}).toArray();
		if (loadDataTiles.length == this.size * this.size) {
			loadDataTiles.forEach(tileData => {
				const xx = tileData.x > 0 ? tileData.x % this.size : this.size + tileData.x % this.size - 1
				const yy = tileData.y > 0 ? tileData.y % this.size : this.size + tileData.y % this.size - 1 

				if (!this.matrix[xx] || !this.matrix[xx][yy]) {
					console.log( tileData.x % this.size, xx,  tileData.y % this.size, yy)
					// console.log(this.matrix)
					return;
				}
				this.matrix[xx][yy].fromJsonSave(tileData)			
			});	
			return true;	
		}
		return false
	}

	async save() {

		const chunkId = `${this.cx}_${this.cy}`
				
		const tileSaveList = []
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				const x = this.x + i
				const y = this.y + j
				const tileSave = this.matrix[i][j].toJsonSave()
				tileSaveList.push(tileSave)
			}
		}

		await window.db.MapTiles.bulkPut(tileSaveList).then(function(lastKey) {
			// console.log("Put OK : " + lastKey);
		}).catch(Dexie.BulkError, function (e) {
			console.error ("DB Put Not OK, ");
		});

		const chunkData = {
			id: chunkId, 
			cx:this.cx, 
			cy:this.cy
		}
		await window.db.MapChunks.bulkPut([chunkData]).then(function(lastKey) {
			// console.log("Put OK : " + lastKey);
		}).catch(Dexie.BulkError, function (e) {
			console.error ("DB Put Not OK, ");
		});
	}

}
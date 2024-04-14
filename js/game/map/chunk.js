import { Tile } from "./tile.js";

export const CHUNK_SIZE = 40


export class Chunk {
	constructor(world, cx, cy) {
		this.world = world;
		this.fm = this.world.factoryMap;

		this.size = CHUNK_SIZE;
		this.cx = cx; 
		this.cy = cy;
		this.x = cx * this.size; 
		this.y = cy * this.size;

		this.GS = 4;
		this.matrixGen = [...Array(this.size + this.GS)].map(
            x => [...Array(this.size)].map(
                y => null
            )
        );

		this.matrix = [...Array(this.size)].map(
            x => [...Array(this.size)].map(
                y => null
            )
        );

		// this.matrix = Array.from({ length: 16 }, () => Array.from({ length: 16 }, () => null));

		this.initGenMatrix()
		this.smoothMatrix()
		this.smoothMatrix()
		this.copyMatrix()
	}

	get(x, y) {return this.matrix[x][y]}

	initGenMatrix() {
		for (let i = 0; i < this.size + this.GS; i++) {
			for (let j = 0; j < this.size + this.GS; j++) {
				this.matrixGen[i][j] = new Tile(this.world, this.x + i, this.y + j )
			}
		}
	}

	copyMatrix() {
		const k = this.GS / 2
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				this.matrix[i][j] = this.matrixGen[i + k][j + k]
			}
		}
	}

	smoothMatrix() {
		// Smoth 
		for (let i = 1; i < this.size + this.GS - 1; i++) {
			for (let j = 1; j < this.size + this.GS - 1; j++) {
				const sum = this.matrixGen[i][j].lvl + 
					this.matrixGen[i + 1][j].lvl +
					this.matrixGen[i - 1][j].lvl +
					this.matrixGen[i][j + 1].lvl +
					this.matrixGen[i][j - 1].lvl +
					this.matrixGen[i + 1][j + 1].lvl +
					this.matrixGen[i - 1][j - 1].lvl +
					this.matrixGen[i - 1][j + 1].lvl +
					this.matrixGen[i + 1][j - 1].lvl
				this.matrixGen[i][j].lvl = sum / 9;
			}
		}
		// this.smoothSide()
	}




	smoothSide() {
		const sm = this.size - 1
		// Smoth 
		for (let i = 1; i < this.size + this.GS - 1; i++) {
			{
				// Top
				const j = 0;
				const sum = this.matrixGen[i][j].lvl + 
					this.matrixGen[i + 1][j].lvl +
					this.matrixGen[i - 1][j].lvl +
					this.matrixGen[i][j + 1].lvl +
					// this.matrix[i][j - 1].lvl +
					this.matrixGen[i + 1][j + 1].lvl +
					// this.matrix[i - 1][j - 1].lvl +
					this.matrixGen[i - 1][j + 1].lvl 
					// this.matrix[i + 1][j - 1].lvl
				this.matrixGen[i][j].lvl = sum / 6;
			}
			{
				// Left
				const j = this.size + this.GS - 1;
				const sum = this.matrixGen[i][j].lvl + 
					this.matrixGen[i + 1][j].lvl +
					this.matrixGen[i - 1][j].lvl +
					// this.matrix[i][j + 1].lvl +
					this.matrixGen[i][j - 1].lvl +
					// this.matrix[i + 1][j + 1].lvl +
					this.matrixGen[i - 1][j - 1].lvl +
					// this.matrix[i - 1][j + 1].lvl +
					this.matrixGen[i + 1][j - 1].lvl
				this.matrixGen[i][j].lvl = sum / 6;
			}
		}
		// Smoth 
		for (let j = 1; j < this.size + this.GS - 1; j++) {
			{
				// Top
				const i = 0;
				const sum = this.matrixGen[i][j].lvl + 
					this.matrixGen[i + 1][j].lvl +
					// this.matrix[i - 1][j].lvl +
					this.matrixGen[i][j + 1].lvl +
					this.matrixGen[i][j - 1].lvl +
					this.matrixGen[i + 1][j + 1].lvl +
					// this.matrix[i - 1][j - 1].lvl +
					// this.matrix[i - 1][j + 1].lvl 
					this.matrixGen[i + 1][j - 1].lvl
				this.matrixGen[i][j].lvl = sum / 6;
			}
			{
				// Left
				const i = this.size + this.GS - 1;
				const sum = this.matrixGen[i][j].lvl + 
					// this.matrix[i + 1][j].lvl +
					this.matrixGen[i - 1][j].lvl +
					this.matrixGen[i][j + 1].lvl +
					this.matrixGen[i][j - 1].lvl +
					// this.matrix[i + 1][j + 1].lvl +
					this.matrixGen[i - 1][j - 1].lvl +
					this.matrixGen[i - 1][j + 1].lvl
					// this.matrix[i + 1][j - 1].lvl
				this.matrixGen[i][j].lvl = sum / 6;
			}
		}
		

	}

}
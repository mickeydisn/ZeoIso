import { Tile } from "./tile.js";

export const CHUNK_SIZE = 32


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

	initGenMatrix() {
		for (let i = 0; i < this.sizeFull; i++) {
			for (let j = 0; j < this.sizeFull; j++) {
				this.matrixGen[i][j] = new Tile(
					this.world, 
					this.x + i - this.sizeBorder, 
					this.y + j - this.sizeBorder 
				)
			}
		}
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

}
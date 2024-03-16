import { Tile } from "./tile.js";

export const CHUNK_SIZE = 40


export class Chunk {
	constructor(world, cx, cy) {
		this.world = world;
		this.size = CHUNK_SIZE;
		this.cx = cx; 
		this.cy = cy;
		this.x = cx * this.size; 
		this.y = cy * this.size;

		this.matrix = [...Array(this.size)].map(
            x => [...Array(this.size)].map(
                y => null
            )
        );

		// this.matrix = Array.from({ length: 16 }, () => Array.from({ length: 16 }, () => null));

		this.initMatrix()
	}

	get(x, y) {return this.matrix[x][y]}

	initMatrix() {
		for (let i = 0; i < this.size; i++) {
			for (let j = 0; j < this.size; j++) {
				this.matrix[i][j] = new Tile(this.world, this.x + i, this.y + j )
			}
		}
	}

}
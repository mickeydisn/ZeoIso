import { Chunk, CHUNK_SIZE } from "./chunk.js";
import { TILE_GEN_ZOOM } from "./tile.js";


export class FactoryMap {
	constructor(world) {
		this.world = world;
		this.fg = this.world.factoryGenerator;
		this.chunkIndex = new Map();
		this.getChunk(0, 0);
	}

	getExistingChunk(cx, cy) {
		let chunkRow = this.chunkIndex.get(cx);
		if (chunkRow === undefined) {
			return null;
		}
		let newChunk = chunkRow.get(cy);
		if (newChunk === undefined) {
			return null;
		}
		return newChunk;
	}

	getChunk(cx, cy) {
		let chunkRow = this.chunkIndex.get(cx);
		if (chunkRow === undefined) {
			chunkRow = new Map();
			this.chunkIndex.set(cx, chunkRow);
		}

		let newChunk = chunkRow.get(cy);
		if (newChunk === undefined) {
			console.log('newChunk')
			newChunk = new Chunk(this.world, cx, cy);
			chunkRow.set(cy, newChunk);
		}
		return newChunk;
	}

	chunkPoint(x, y) { 
		const modx = x >= 0 ? x % CHUNK_SIZE : CHUNK_SIZE -1 + x % CHUNK_SIZE
		const mody = y >= 0 ? y % CHUNK_SIZE : CHUNK_SIZE -1 + y % CHUNK_SIZE

		const xx = x - modx
		const yy = y - mody

		return [
			Math.floor(xx / CHUNK_SIZE),
			Math.floor(yy / CHUNK_SIZE),
			modx,
			mody,
		] }

	getTile(x, y) {
		const [cx, cy, modx, mody] = this.chunkPoint(x, y);
		const chunk = this.getChunk(cx, cy);
		return chunk.get(modx, mody);	
	}

	getTileColor(x, y) {
		const [cx, cy, modx, mody] = this.chunkPoint(x, y);
		const chunk = this.getExistingChunk(cx, cy);
		if (chunk === null) {
			return this.fg.getLvlColor(x, y, TILE_GEN_ZOOM)
		}
		return chunk.get(modx, mody).color;	
	}
	getTileLvl(x, y) {
		const [cx, cy, modx, mody] = this.chunkPoint(x, y);
		const chunk = this.getExistingChunk(cx, cy);
		if (chunk === null) {
			const [lvl , _waterLvl] = this.fg.getLvlGen(x, y, TILE_GEN_ZOOM)
			return lvl
		}
		return chunk.get(modx, mody).lvl;	
	}

}



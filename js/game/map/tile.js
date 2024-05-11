import { AXE_DIRECTION, AXE_DIRECTION2 } from "../build/utils.js";

export const TILE_GEN_ZOOM = 2



export class RawTile {

	constructor(world, x, y) {
		this.world = world;
		this.fm = world.factoryMap;
		this.x = x; 
		this.y = y;

		const ftrg = this.world.factoryTileRawGenerator;
		Object.assign(this, ftrg.getRawTile(x, y, TILE_GEN_ZOOM));
		Object.assign(this, ftrg.getFuncTile(x, y, TILE_GEN_ZOOM));
	}

}


export class GenTile extends RawTile {
	constructor(world, x, y) {
		super(world, x, y);
		const frg = this.world.factoryTileGenerator;
		Object.assign(this, frg.getGenTile(this))

		this._lvl = 0;
		this._waterLvl = 0;

		this._color = [0, 0, 0, 1]
		this.items = []

		this._isBlock = false;
		this._isFrise = false;

		this.colorGen();
		this.itemsGen();

	}


	get isBlock() {
		return (
			this._isBlock || (
				this.wcBuild != null && 
				this.wcBuild.conf != null &&
				!this.wcBuild.conf.allowMove
			)			 
		) // || ( this.items.length > 0 )
	}
	set isBlock(v) {
		this._isBlock = v
	}

	get isFrise() {
		return this._isFrise
	}
	set isFrise(v) {
		this._isFrise = v
	} 

	get waterLvl() {
		if (this.isWater) {
			return this._waterLvl
		}
		return this._lvl
	}
	set waterLvl(lvl) {
		this._waterLvl = lvl
	}

	get lvl () { 
		return this._lvl
	}

	set lvl(lvl) {
		if (this.isFrise) return ;
		this._lvl = lvl // - lvl % .25
	}


	set color(color) {
		if (this.isFrise) return ;
		this._color = color
	}

	get color() {
		return this._color
	}
	

	colorGen() {
		if (this.isFrise) return ;
		this._color = this.genColor
	}

	itemsGen() {
		if (this.isFrise) return ;
		this.items = this.genItems
		// this.items.push({t: 'Pyramid', lvl:0})
	}


}


export class Tile extends GenTile {
	constructor(world, x, y) {
		super(world, x, y);

		/*
		this._lvl = 0;
		this._waterLvl = 0;

		this._color = [0, 0, 0, 1]
		this.items = []

		this._isBlock = false;
		this._isFrise = false;

		*/
		this.wcBuild = null;
		this.temporatyItems = []

		this.lvlGen();

	}


	get gen3Lvl() {
		return this._gen3Lvl ? this._gen3Lvl : this._lvl
	}
	set gen3Lvl(v) {
		this._gen3Lvl = v
		this.lvlGen()
	}


	updateColor([r, g, b, a]) {
		if (this.wcBuild != null || this.isWater) return ;
        this.color = new Uint8Array([r, g, b, a]);
    }


	clearItem() {
		if (this.isFrise) return 
		this.items.splice(0, this.items.length);
	}
	clearTemporatyItem() {
		this.temporatyItems.splice(0, this.temporatyItems.length);
	}


	lvlGen() {
		if (this.isFrise) return ;
		this._lvl = this._gen3Lvl ? this._gen3Lvl : this.gen2Lvl
		this._waterLvl = this._lvl 
		if (this._lvl != this._waterLvl) {
			this.isWater = true;
		}
	}

	

	toJson() {
		return {
			x: this.x,
			y: this.y,
			lvl: this._lvl,
			isBlock: this.isBlock,
			isFrise: this.isFrise,
			biome: {name: this.rawBiome.name, lvlType: this.rawBiome.lvlType},
			buildTile: this.wcBuild ? this.wcBuild.toJson() : null,
			cityNode: this.cityNode ? this.cityNode.toJson() : null,
			
			// FLvl: this.flvl,
			// waterLvl: this._waterLvl,
			items: this.items,
			color : [...this.color],
			genColor: this.genColor,

		}
	}


    get nearTiles() {
        if (!this._nearTiles) {
            this._nearTiles = [0, 1, 2, 3].map(axe => {
                const [dx, dy] = AXE_DIRECTION[axe]
                return  this.fm.getTile(this.x + dx, this.y + dy);
            })
        }
        return this._nearTiles
    }
	nearTilesAxe(size=1) {
    	return  [0, 1, 2, 3].map(axe => {
			const [dx, dy] = AXE_DIRECTION[axe]
			return  this.fm.getTile(this.x + (dx * size), this.y + (dy * size));
		})
	}

	get nearCrossTiles() {
        if (!this._nearTilesCross) {
            this._nearTilesCross = [0, 1, 2, 3].map(axe => {
                const [dx, dy] = AXE_DIRECTION2[axe]
                return  this.fm.getTile(this.x + dx, this.y + dy);
            })
        }
        return this._nearTilesCross	
	}

	get nearTiles3() {
		return [...this.nearTiles, ...this.nearCrossTiles]
	}
}

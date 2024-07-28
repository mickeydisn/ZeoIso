
import { TilesMatrix, TilesMatrixSelected } from "../map/tilesMatrix.js";
import { WcBuildConf_Base3 } from "./wcBuilding2/buildConf_base3.js";
import { WcBuildConf_BaseBorder3 } from "./wcBuilding2/buildConf_baseBorder3.js";
import { WcBuildConf_House3 } from "./wcBuilding2/buildConf_house3.js";
import { WcBuildConf_House3a } from "./wcBuilding2/buildConf_house3a.js";
import { WcBuildConf_House3b } from "./wcBuilding2/buildConf_house3b.js";
import { WcBuildConf_House4D } from "./wcBuilding2/buildConf_house4D.js";
import { WcBuildConf_House4a } from "./wcBuilding2/buildConf_house4a.js";
import { WcBuildConf_House4b } from "./wcBuilding2/buildConf_house4b.js";
import { WcBuildConf_House4c } from "./wcBuilding2/buildConf_house4c.js";
import { WcBuildConf_House5 } from "./wcBuilding2/buildConf_house5.js";
import { WcBuildConf_House6a } from "./wcBuilding2/buildConf_house6a.js";
import { WcBuildConf_Place3 } from "./wcBuilding2/buildConf_place3.js";
import { WcBuildingFactory } from "./wcBuilding2/wcBuildingFactory.js";

export class TilesActions {
	constructor(world) {
		this.world = world;
		this.fm = this.world.factoryMap;

		// List to store pointer on Tiles containe temporaty display item (like for selection / preview .. )
		this.listTilesWithTempItems = []

		this.listTilesUpdated = new Set()

		this.init();

	}

	init() {
		this.index = {
			doFunction : this.doFunction.bind(this),
			setBlocked: this.setBlocked.bind(this),
			setBlockedSquare: this.setBlockedSquare.bind(this),

			setFrise: this.setFrise.bind(this),
			setFriseSquare: this.setFriseSquare.bind(this),

			itemForceKey: this.itemForceKey.bind(this),
			itemAddKey: this.itemAddKey.bind(this),

			clearItem: this.clearItem.bind(this),
			clearItemSquare: this.clearItemSquare.bind(this),
			clearColor: this.clearColor.bind(this),
			clearColorSquare: this.clearColorSquare.bind(this),
			clearLvl: this.clearLvl.bind(this),
			clearLvlSquare: this.clearLvlSquare.bind(this),

			clearAll: this.clearAll.bind(this),
			clearAllSquare: this.clearAllSquare.bind(this),


			lvlSet: this.lvlSet.bind(this),
			lvlUp: this.lvlUp.bind(this),
			lvlUpSquare: this.lvlUpSquare.bind(this),
			lvlFlatSquare: this.lvlFlatSquare.bind(this),
			lvlAvgSquare: this.lvlAvgSquare.bind(this),
			lvlAvgBorder: this.lvlAvgBorder.bind(this),

			colorSquare: this.colorSquare.bind(this),

			addBoxMD : this.addBoxMD.bind(this),

			wcBuild: this.wcBuild.bind(this),
			setBuildTile: this.wcBuild.bind(this),

			selectedCopy : this.selectedCopy.bind(this),
			temporatyItemsForceKey: this.temporatyItemsForceKey.bind(this),
			clearAllTemporatyItems: this.clearAllTemporatyItems.bind(this),
		}
	}
	//--------------------

	doAction(conf) {
		this.index[conf.func](conf)
	}
	// ---------------------

	doFunction(conf) {
		conf.do(conf.x, conf.y);
		if (conf.callback) conf.callback();
	}

	// ---------------------
	// Add item to a Tiles 
	// ---------------------

	setBlocked(conf) {
		const tile = this.fm.getTile(conf.x, conf.y);
		tile.isBlock = conf.isBlock
		this.listTilesUpdated.add(tile)
	}
	setBlockedSquare(conf) {
		conf.size = conf.size ? conf.size : 1		
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.isBlock = conf.isBlock;
				this.listTilesUpdated.add(cellTile)
			})
		})
	}


	setFrise(conf) {
		const tile = this.fm.getTile(conf.x, conf.y);
		tile.isFrise = conf.isFrise
		this.listTilesUpdated.add(tile)
	}

	setFriseSquare(conf) {
		conf.size = conf.size ? conf.size : 1		
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.isFrise = conf.isFrise;
				this.listTilesUpdated.add(cellTile)
			})
		})
	}


	clearAllTile(tile) {
		tile.isBlock = false
		tile.isFrise = false
		tile.wcBuild = null
		tile.colorGen();
		tile.clearItem();
		this.listTilesUpdated.add(tile)
	}
	clearAll(conf) {
		const tile = this.fm.getTile(conf.x, conf.y);
		this.clearAllTile(tile)
	}
	clearAllSquare(conf) {
		conf.size = conf.size ? conf.size : 1		
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				this.clearAllTile(cellTile)
			})
		})
		
	}


	// ---------------------
	// Add item to a Tiles 
	// ---------------------

	itemAddKey(conf) {
		if (!conf.assetKey) return;
		const tile = this.fm.getTile(conf.x, conf.y);
		const h = conf.h ? conf.h : 0
		tile.items.push({t: 'Asset', key: conf.assetKey, lvl:h})
		this.listTilesUpdated.add(tile)
	}

	itemForceKey(conf) {
		if (!conf.assetKey) return;
		const tile = this.fm.getTile(conf.x, conf.y);
		const h = conf.h ? conf.h : 0
		tile.clearItem();
		tile.items.push({t: 'Asset', key: conf.assetKey, lvl:h})
		this.listTilesUpdated.add(tile)
	}

	clearItem(conf) {
		const tile = this.fm.getTile(conf.x, conf.y)
		tile.clearItem();
		this.listTilesUpdated.add(tile)
	}

	// Temporaty
	_tileTemporatyItemsForceKey(tile, conf) {
		tile.temporatyItems.splice(0, tile.temporatyItems.length)
		tile.temporatyItems.push(conf)
		// Cause is a temps we want to store a link to the tile. 
		this.listTilesWithTempItems.push(tile)
	}

	//assetKey
	temporatyItemsForceKey(conf) {
		if (!conf.assetKey) return;
		const tile = this.fm.getTile(conf.x, conf.y);
		const h = conf.h ? conf.h : 0
		this._tileTemporatyItemsForceKey(tile, {t:'Asset', key:conf.assetKey, lvl:h})
	}

	clearAllTemporatyItems(conf=null) {
		this.listTilesWithTempItems.forEach(tile => {
			tile.clearTemporatyItem()
		})
		this.listTilesWithTempItems = []
	}


	clearItemSquare(conf) {
		conf.size = conf.size ? conf.size : 1		
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.clearItem();
				this.listTilesUpdated.add(cellTile)
			})
		})
	}


	// ---------------------
	// Lvl of Tiles
	// ---------------------


	clearLvl(conf) {
		this.fm.getTile(conf.x, conf.y).lvlGen();
		this.listTilesUpdated.add(tile)
	}

	clearLvlSquare(conf) {
		conf.size = conf.size ? conf.size : 1		
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.lvlGen();
				this.listTilesUpdated.add(cellTile)
			})
		})
	}

	// -------------------

	lvlSet(conf) {
		const tile = this.fm.getTile(conf.x, conf.y);
		tile.lvl = conf.lvl;
		this.listTilesUpdated.add(tile)
	}

	lvlUp(conf) {
		const tile = this.fm.getTile(conf.x, conf.y);
		tile.lvl += conf.lvl;
		this.listTilesUpdated.add(tile)
	}

	lvlUpSquare(conf) {
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.lvl += conf.lvl
				this.listTilesUpdated.add(cellTile)
			})
		})
	}

	lvlFlatSquare(conf) {
		const tile = this.fm.getTile(conf.x, conf.y);
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.lvl = tile.lvl
				this.listTilesUpdated.add(cellTile)
			})
		})
	}

	lvlAvg(conf) {
		const tile = this.fm.getTile(conf.x, conf.y);
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		let sumLvl = 0;
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				sumLvl += cellTile.lvl
				this.listTilesUpdated.add(cellTile)
			})
		})
		const avgLvl = sumLvl / (conf.size * conf.size)
		tile.lvl = avgLvl
	}

	lvlAvgSquare(conf) {
		conf.size = conf.size ? conf.size : 1		
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				this.lvlAvg({x:cellTile.x, y:cellTile.y, size:3})
			})
		})
		
	}

	lvlAvgBorder(conf) {
		const x = conf.x
		const y = conf.y
		const fCenter = Math.floor(conf.size / 2)
		const rangeX = Array.from({ length: conf.size }, (_, index) => index - fCenter + x );
		const rangeY = Array.from({ length: conf.size }, (_, index) => index - fCenter + y );

		rangeX.forEach(xx => {
			this.lvlAvg({x:xx, y:y - fCenter- 1, size:3});
			this.lvlAvg({x:xx, y:y + (conf.size - fCenter), size:3});
		})
		rangeY.forEach(yy => {
			this.lvlAvg({x:x - fCenter - 1, y:yy, size:3});
			this.lvlAvg({x:x + (conf.size - fCenter), y:yy, size:3});
		})

	}

	// ---------------------
	// Color of Tiles
	// ---------------------

	clearColor(conf) {
		const tile = this.fm.getTile(conf.x, conf.y)
		tile.colorGen();
		this.listTilesUpdated.add(tile)
	}

	clearColorSquare(conf) {
		conf.size = conf.size ? conf.size : 1		
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.colorGen();
				this.listTilesUpdated.add(cellTile)
			})
		})
	}

	color(conf) {
		const c = [...conf.color]
		// add alpha is not exist 
		if (c.length == 3) c.push(255);

		const color = new Uint8Array(c);
		const tile = this.fm.getTile(conf.x, conf.y);

		tile.color = color
		this.listTilesUpdated.add(tile)
	}


	colorSquare(conf) {
		const c = [...conf.color]
		// add alpha is not exist 
		if (c.length == 3) c.push(255);

		const color = new Uint8Array(c);
		const box = new TilesMatrix(this.world, conf.size, conf.x, conf.y);
		box.tiles.forEach(row => {
			row.forEach(cellTile => {
				cellTile.color = color
				this.listTilesUpdated.add(cellTile)
			})
		})

	}

	addBoxMD(conf) {
		const tile = this.fm.getTile(conf.x, conf.y);
		tile.items.push({t:'Box', ...conf})
		this.listTilesUpdated.add(tile)
	}




	// ---------------------
	// Select And Copy
	// ---------------------

	selectedCopy(conf) {
		if (conf.state == 0) {
			this.tileSelected1 = conf;
			// Display Selected Start
			this.clearAllTemporatyItems()
			this.temporatyItemsForceKey({...conf, t:'Selected'})
		} else {
			this.tileSelected2 = conf;
			if (this.tileSelected1 && this.tileSelected2) {
				const tilesMatris = new TilesMatrixSelected(this.world, this.tileSelected1.x, this.tileSelected1.y, this.tileSelected2.x, this.tileSelected2.y)
			// Display Selected Arrea
				this.clearAllTemporatyItems()
				tilesMatris.tiles.flat().forEach(tile => {
					this._tileTemporatyItemsForceKey(tile, {t:'Selected'})
				})
				const saveTiles = tilesMatris.toJson()
				const stringSave =  '[\n  ' + saveTiles.map(x =>  JSON.stringify(x)).join(',\n  ') + '\n]'
			}
		}
	}

	// ---------------------
	// Select And Copy
	// ---------------------

	wcBuild(conf) {
		const growLoopCount = conf.growLoopCount ? conf.growLoopCount : 10

		const buildConf = conf.buildType == null ? null :
			conf.buildType.localeCompare("place3") == 0 ?  new WcBuildConf_Place3({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("base3") == 0 ?  new WcBuildConf_Base3({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("baseBorder3") == 0 ?  new WcBuildConf_BaseBorder3({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house3") == 0 ?  new WcBuildConf_House3({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house3a") == 0 ?  new WcBuildConf_House3a({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house3b") == 0 ?  new WcBuildConf_House3b({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house4a") == 0 ?  new WcBuildConf_House4a({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house4b") == 0 ?  new WcBuildConf_House4b({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house4c") == 0 ?  new WcBuildConf_House4c({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house4D") == 0 ?  new WcBuildConf_House4D({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house5") == 0 ?  new WcBuildConf_House5({growLoopCount:growLoopCount}) :
			conf.buildType.localeCompare("house6a") == 0 ?  new WcBuildConf_House6a({growLoopCount:growLoopCount}) :
			null

		if (buildConf) {
			const factoryBuilding = new WcBuildingFactory(this.world, buildConf)
			factoryBuilding.start(conf.x, conf.y).then(_ => {
				if(conf.callback) {
					conf.callback();
				}
			});
		}
	}

	setBuildTile(conf) {
		const tile = this.fm.getTile(conf.x, conf.y);

	}


	/* ------------------------- */
	/* ------------------------- */

	async save() {
		if (this.listTilesUpdated.size) {

			console.log('TileAction.save' , this.listTilesUpdated.size)

			const arrayTile = [...this.listTilesUpdated].map(tile => tile.toJsonSave());

			await window.db.MapTiles.bulkPut(arrayTile).then(function(lastKey) {
				// console.log("Put OK : " + lastKey);
			}).catch(Dexie.BulkError, function (e) {
				console.error ("DB Put Not OK, ");
			});

			this.listTilesUpdated.clear();
	
		}
	}


}



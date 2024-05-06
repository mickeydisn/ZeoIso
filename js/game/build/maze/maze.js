import { AXE_DIRECTION } from "../utils.js";
import { BuildTile } from "../wcBuilding2/wcBuildTile.js";


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
  

export class Maze {

	constructor(world, _conf) {
		this.world = world;
        this.fm = this.world.factoryMap
        this.ta = this.world.tilesActions

        this.hieght = 5

        const conf = {
            xstart: 0, 
            ystart: 0,
            xend: 0,
            yend: 0,            
            ..._conf
        }
        Object.assign(this, conf);
        console.log('MAZE', this)
        this.init()  

        this.centerList = []
        this.pathList = []
        this.crossList= []

        this.loop()
        this.end()

        this.finalErosion()
        this.finalErosion()

	}

    init () {
		this.p1 = {
			x: this.xstart <= this.xend ? this.xstart : this.xend,
			y: this.ystart <= this.yend ? this.ystart : this.yend
		};
		this.p2 = {
			x: this.xstart  > this.xend ? this.xstart : this.xend, 
			y: this.ystart  > this.yend ? this.ystart : this.yend
		};
		
		this.sizeX = this.p2.x - this.p1.x + 1
		this.sizeY = this.p2.y - this.p1.y + 1

    }


    loop() {

        this.tileStart = this.fm.getTile(this.xstart, this.ystart)
        this.mainLvl = this.tileStart.lvl
        // this.tileEnd = this.fm.getTile(this.xend, this.yend)

        const openList = [[0, 0, this.tileStart]]


        let i = 0
        while(i++ < 5000 && openList.length > 0) {
            const [dx, dy, currentTile] = openList.pop()

            const fromTile = this.fm.getTile(currentTile.x - dx * 2, currentTile.y - dy * 2)
            if (currentTile.buildTile && currentTile.buildTile.isConfigured) {
                continue
            }

            this.updateTile(currentTile)

            this.pathTileAllow(currentTile.x - dx, currentTile.y - dy)

            const nextList = this.propagate(currentTile)
            shuffleArray(nextList)
            nextList.forEach(tile => {
                if (!openList.map(x => x[2]).includes(tile[2])) {
                    openList.push(tile)
                }
            })
    
        }
    }

    propagate(tile) {
        const nextTiles = AXE_DIRECTION.map(d => {
            const x = d[0] * 2 + tile.x
            const y = d[1] * 2 + tile.y
            return [d[0], d[1], this.fm.getTile(x, y)]
        }).filter(([x, y, t]) => {
            return !(t.x < this.p1.x || t.x > this.p2.x ||   t.y < this.p1.y ||  t.y > this.p2.y) 
        })

        return nextTiles
    }

    updateTile(tile) {
        const x = tile.x;
        const y = tile.y;
        console.log(x, y, tile)
        tile.clearItem()
        tile.lvl = this.mainLvl
        tile.colorGen() // color = [255, 0, 0]
        const build = new BuildTile(this.world, this, x, y);
        build.isConfigured = true;
        tile.isFrise = true;

        this.ta.lvlAvgSquare({x:x, y:y, size:5})
        this.ta.lvlAvgSquare({x:x, y:y, size:7})


        this.crossTile(x + 1, y + 1)
        this.crossTile(x + 1, y - 1)
        this.crossTile(x - 1, y + 1)
        this.crossTile(x - 1, y - 1)

        this.pathTile(x+1, y)
        this.pathTile(x-1, y)
        this.pathTile(x, y+1)
        this.pathTile(x, y-1)
    }

    crossTile(x, y) {
        const tile = this.fm.getTile(x, y)

        if (tile.isFrise == false && tile.build == null) {
    
            this.crossList.push(tile)
            const build = new BuildTile(this.world, this, x, y);
            tile.clearItem()
            tile.color = [0, 0, 0],
            tile.lvl = this.mainLvl + this.hieght
            build.isConfigured = true;
            tile.isBlock = true
            tile.isFrise = true;


        }
    }
    
    pathTile(x, y) {
        const tile = this.fm.getTile(x, y)

        if (tile.isFrise == false && tile.build == null) {
            this.pathList.push(tile)
            const build = new BuildTile(this.world, this, x, y);
            tile.clearItem()
            tile.color = [22, 22, 22],
            tile.lvl = this.mainLvl + this.hieght
            tile.isBlock = true
            // build.isConfigured = true;
            tile.isFrise = true;


        }
    }

    pathTileAllow(x, y) {
        const tile = this.fm.getTile(x, y)
        return this.pathTileObjAllow(tile)
    }
    pathTileObjAllow(tile) {
    
        tile.isFrise = false;
        tile.clearItem()
        tile.colorGen() // color = [255, 0, 0],
        tile.lvl = this.mainLvl
        tile.isBlock = false
        // build.isConfigured = true;
        tile.isFrise = true;

        this.ta.lvlAvgSquare({x:tile.x, y:tile.y, size:5})
        this.ta.lvlAvgSquare({x:tile.x, y:tile.y, size:7})

    }

    end() {
        {
            const [x , y] = [this.xstart, this.ystart]
            this.pathTileAllow(x+1, y)
            this.pathTileAllow(x-1, y)
            this.pathTileAllow(x, y+1)
            this.pathTileAllow(x, y-1)
        }
        {
            const [x , y] = [this.xend, this.yend]
            this.pathTileAllow(x+1, y)
            this.pathTileAllow(x-1, y)
            this.pathTileAllow(x, y+1)
            this.pathTileAllow(x, y-1)
        }
    }

    finalErosion() {
        this.crossList.forEach(t => {
            if (t.nearTiles.filter(t => t.isBlock).length <= 1) {
                this.pathTileObjAllow(t)
            }
        })
        this.pathList.forEach(t => {
            if (t.nearTiles.filter(t => t.isBlock).length <= 1) {
                this.pathTileObjAllow(t)
            }
        })

    }

}
function World(ctx) {
	this.ctx = ctx
	this.xsize = 60;
	this.ysize = 60;

	this.caseSize = 10;

	this.width = this.xsize * this.caseSize;
	this.height = this.ysize * this.caseSize; 

	this.map = Array(this.xsize).fill(Array(this.ysize).fill(0));
	console.log(this.map);
}


World.prototype = {

	draw: function()
	{
		for (let i = 0; i < this.ysize; i++){
			for (let j = 0; j < this.xsize; j++) {
				this.ctx.globalAlpha=1;
				this.ctx.fillStyle= (i%2 == 0) ? '#00FF00' : '#FF0000' ;
				this.ctx.fillRect(i * this.caseSize, j * this.caseSize, this.caseSize, this.caseSize);
				this.ctx.globalAlpha=1;
			}
		}


	 	for (var x = 0; x <= this.width; x += this.caseSize) {
	        this.ctx.moveTo(- 0.5 + x, 0);
	        this.ctx.lineTo(- 0.5 + x, this.width);
	    }
	    for (var x = 0; x <= this.height; x += this.caseSize) {
	        this.ctx.moveTo(0, - 0.5 + x);
	        this.ctx.lineTo(this.height, - 0.5 + x);
	    }
	    this.ctx.lineWidth = 0.3;
	    this.ctx.strokeStyle = "black";
	    this.ctx.stroke();
	    this.ctx.lineWidth = 1;

	},

	update: function()
	{

	}
}
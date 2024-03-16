

var IN_FOOD = 0
var IN_F1 = 1
var IN_F2 = 2
var IN_F3 = 3
var IN_F4 = 4


var OUT_X = 0
var OUT_Y = 1

function Creature(world, x, y)
{
	this.HALF_PI = Math.PI * .5;
	this.TWO_PI = Math.PI * 2;

	this.world = world;
	this.color = "#44FFFF";

	this.network = new Architect.Perceptron(5, 6, 2);

	this.maxspeed = 0.3;
	this.maxforce = 4;
    this.minMag = 0.05; // /.4;



	this.output = [];
    this.target = new Vector(0, 0);

	this.location = new Vector(x, y);
	this.velocity = new Vector(0, 0);
	this.acceleration = new Vector(0, 0);


    // this.seekLimit = .9; // .9;

	this.life = 0;
}

Creature.prototype = {

    // ----------------------------

    applyForce: function(force)
	{
		this.acceleration.add(force);
	},

	boundaries: function()
	{

		if (this.location.x < 0)
			this.applyForce(new Vector(this.maxforce, 0));

		if (this.location.x > this.world.size * 4)
			this.applyForce(new Vector(-this.maxforce, 0));

		if (this.location.y < 0)
			this.applyForce(new Vector(0, this.maxforce));

		if (this.location.y > this.world.size * 4)
			this.applyForce(new Vector(0, -this.maxforce));

	},

    update: function()
	{
		this.boundaries();
		this.velocity.add(this.acceleration);
	    this.velocity.limit(this.maxspeed);
	    if(this.velocity.mag() < this.minMag)
	    	this.velocity.setMag(this.minMag);
	    this.location.add(this.velocity);
	    this.acceleration.mul(0);
	},

    // ----------------------------


	align: function()
	{
		var sum = new Vector(0,0);
		sum.mul(this.maxspeed);
		sum.sub(this.velocity).limit(this.maxspeed);
		return sum.limit(.4);
	},


	seek: function(target)
	{
		var seek = target.copy().sub(this.location)
		seek.normalize();
		seek.mul(this.maxspeed);
		seek.sub(this.velocity).limit(this.seekLimit);
		return seek;
	},


	moveTo: function(p) {

		var force = new Vector(0,0);
        this.target = new Vector(p[0] * 2 - 1, p[1] * 2 - 1);
		force.add(this.target);

		// var cohesion = this.seek(target);
        // var separation = this.separate(this.world.creatures);

		// force.add(separation);
		// force.add(cohesion);

		this.applyForce(force);
        this.update();

		m = this.life;

		this.lifeTo();
		return m -= this.life;
	},


    // ----------------------------

    lifeTo: function() {

        // this.life -= this.acceleration.mag() * .5;

        var x = ~~(this.location.x / 4) ;
        var y = ~~(this.location.y / 4) ;
        var food = this.world.get(x, y);
        this.world.set(x, y, (food - 0.5 < 0 ) ? 0 : food - 0.5);

        this.life += 1.5 * (food > 0.5 ? 0.5 : food);
        
    },

    // ----------------------------


	draw: function()
	{

		var ctx = this.world.ctxCreature;
		ctx.lineWidth = 1;

		ctx.lineWidth = 1;
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.location.x, this.location.y, 1, 0, 1 * Math.PI, false);
       	ctx.stroke();
		ctx.fill();
	},


    // ----------------------------


    outTarget: function(p) {

        x = p[IN_FOOD] < p[IN_F1] ? .5 * Math.random() : 0
        y = p[IN_FOOD] < p[IN_F2] ? .5 * Math.random() : 0

        x -= p[IN_FOOD] < p[IN_F3] ? .5 * Math.random() : 0
        y -= p[IN_FOOD] < p[IN_F4] ? .5 * Math.random() : 0

        return [(x + 1) / 2, (y + 1 )/ 2];
    },

    setColor: function(value) {
        function rgb(r, g, b){
          r = Math.floor(r * 256);
          g = Math.floor(g * 256);
          b = Math.floor(b * 256);
          return ["rgb(",r,",",g,",",b,")"].join("");
        }
        this.color = rgb(p[2], p[3], p[4]);
    },

    // ----------------------------


    mutation:function(count, factor) {
        network = this.network.toJSON()
        sign = 1
        if (Math.random() < .5) {
            sign = -1
        }

        while ( count > 0) {
            count--;
            if (Math.random() < .5) {
                selected_gen = Math.floor((Math.random() * network.connections.length))
                network.connections[selected_gen].weight += sign * factor * Math.random()
                if (network.connections[selected_gen].weight > 1) {
                    network.connections[selected_gen].weight = 1
                }
                if (network.connections[selected_gen].weight < -1) {
                    network.connections[selected_gen].weight = -1
                }
            }
            else {
                selected_gen = Math.floor((Math.random() * network.neurons.length))
                network.connections[selected_gen].bias += sign * factor * Math.random()
                if (network.connections[selected_gen].bias > 1) {
                    network.connections[selected_gen].bias = 1
                }
                if (network.connections[selected_gen].bias < -1) {
                    network.connections[selected_gen].bias = -1
                }
            }
        }
    },


    clone:function(other) {
        this.world = other.world;
        this.color = other.color;

        this.network = other.network.clone();

        this.maxspeed = other.maxspeed;
        this.maxforce = other.maxforce;

        this.output = other.output;


        this.location = other.location.copy();
        this.velocity = other.velocity.copy();
        this.acceleration = other.acceleration.copy();


        this.updateMag = other.updateMag; // /.4;
        this.seekLimit = other.seekLimit; // .9;

        this.life = other.life;
    }

}
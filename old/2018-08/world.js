function blastoff()
{

	const width = 512 * 2;
	const height = 512 * 2; 

	var canvas = d3.select("#canvas");
	canvas
		.attr("width", width)
		.attr("height", height)
		.style("border", "1px solid #FFF");

	var ctx = canvas.node().getContext('2d');

	var num = 10;
	var fps = 50;

	//canvas.width = canvas.width();
	//$(window).resize(function(){
	//	var width =  canvas.width();;
	//	canvas.width = width;
	//	world.width = width;
	// })

	var world = {
		creatures: [],
		width: width,
		height: height,
		context: ctx
	}

	// popullate
	for (var i = 0; i < num; i++)
	{
		var x = Math.random() * world.width;
		var y = Math.random() * world.height;

		world.creatures[i] = new Creature(world, x, y);
		world.creatures[i].velocity.random();
	}

	var targetX = function(creature){
		var cohesion = creature.cohesion(world.creatures);
		return cohesion.x / world.width;
	}

	var targetY = function(creature){
		var cohesion = creature.cohesion(world.creatures);
		return cohesion.y / world.height;
	}

	var targetAngle = function(creature){
		var alignment = creature.align(world.creatures);
		return (alignment.angle() + Math.PI) / (Math.PI*2);
	}

	var loop = function()
	{
		// console.log('loop');

		// fade effect
		// ctx.globalAlpha=0.2;
		// ctx.fillStyle='rgba(255, 255, 255, 0.1)';
		// ctx.fillRect(0,0,world.width, world.height);
		// ctx.globalAlpha=1;

		ctx.save();
		ctx.globalAlpha = 0.2;
		ctx.globalCompositeOperation='destination-out';
		ctx.fillStyle= '#FFF';
		ctx.fillRect(0,0,world.width, world.height);    
		ctx.restore();   



		// update each creature
		var creatures = world.creatures;
		creatures.forEach(function(creature)
		{
			// move
			var input = [];
			for (var i in creatures)
			{
				input.push(creatures[i].location.x);
				input.push(creatures[i].location.y);
				input.push(creatures[i].velocity.x);
				input.push(creatures[i].velocity.y);
			}
			var output = creature.network.activate(input);
			creature.moveTo(output);

			// learn
			var learningRate = .5;
			var target = [targetX(creature), targetY(creature), targetAngle(creature)];
			creature.network.propagate(learningRate, target);

			// draw
			creature.draw();
		});
		// if (location.hash == "#/")
		setTimeout(loop, 1000/fps);
	}

	// blastoff
	loop();
};


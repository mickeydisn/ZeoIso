
import { Canvas } from "./canvas.js";
import { Color } from "./color.js";

import { Path } from "./path.js";
import { Point } from "./point.js";

import { Shape } from "./shape.js";
import { Vector } from "./vector.js";

/**
 * The Isomer class : https://github.com/jdan/isomer
 *
 * This file contains the Isomer base definition
 */
export function Isomer(canvasId, options) {
  options = options || {};

  this.canvas = new Canvas(canvasId);
  // this.angle = .46155 ; // Math.PI / 6.75;
  this.angle = 0.44721359 ; // Math.PI / 6.75;
  
  this.scale = options.scale || 39;

  this._calculateTransformation();

  this.originX = options.originX || this.canvas.width / 2;
  this.originY = 660 ;// this.canvas.height * 0.80; // options.originY || this.canvas.height * 0.9;

  /**
   * Light source as defined as the angle from
   * the object to the source.
   *
   * We'll define somewhat arbitrarily for now.
   */
  this.lightPosition = options.lightPosition || new Vector(2, -1, 3);
  this.lightAngle = this.lightPosition.normalize();

  /**
   * The maximum color difference from shading
   */
  this.colorDifference = 0.20;
  this.lightColor = options.lightColor || new Color(255, 255, 255);
}

/**
 * Sets the light position for drawing.
 */
Isomer.prototype.setLightPosition = function(x, y, z) {
  this.lightPosition = new Vector(x, y, z);
  this.lightAngle = this.lightPosition.normalize();
};

Isomer.prototype._translatePoint = function(point) {
  /**
   * X rides along the angle extended from the origin
   * Y rides perpendicular to this angle (in isometric view: PI - angle)
   * Z affects the y coordinate of the drawn point
   */
  var xMap = new Point(point.x * this.transformation[0][0],
                       point.x * this.transformation[0][1]);

  var yMap = new Point(point.y * this.transformation[1][0],
                       point.y * this.transformation[1][1]);

  var x = this.originX + xMap.x + yMap.x;
  var y = this.originY - xMap.y - yMap.y - (point.z * this.scale);
  return new Point(x, y);
};


/**
 * Adds a shape or path to the scene
 *
 * This method also accepts arrays
 */
Isomer.prototype.add = function(item, baseColor) {
  if (Object.prototype.toString.call(item) == '[object Array]') {
    for (var i = 0; i < item.length; i++) {
      this.add(item[i], baseColor);
    }
  } else if (item instanceof Path) {
    this._addPath(item, baseColor);
  } else if (item instanceof Shape) {
    /* Fetch paths ordered by distance to prevent overlaps */
    var paths = item.orderedPaths();

    for (var j = 0; j < paths.length; j++) {
      this._addPath(paths[j], baseColor);
    }
  }
};


Isomer.prototype.addImage = function(img, point) {
  // Create an image object. This is not attached to the DOM and is not part of the page.
  var image = new Image();
  // When the image has loaded, draw it to the canvas
  console.log("IMAGE")
  image.onload = function()
    {
      console.log("DRAW IMAGE")
      const p = this._translatePoint(Point(10, 10, 0))
      this.canvas.ctx.drawImage(image, p.x - 105, p.y - 142, 210, 210);
        // draw image...
    }.bind(this)

  // Now set the source of the image that we want to load
  // image.src = "./img/asset/spacekit_2/Isometric/platform_corner_SW.png";
}
/**
 * Adds a path to the scene
 */
Isomer.prototype._addPath = function(path, baseColor) {
  /* Default baseColor */
  baseColor = baseColor || new Color(120, 120, 120);

  /* Compute color */
  var v1 = Vector.fromTwoPoints(path.points[1], path.points[0]);
  var v2 = Vector.fromTwoPoints(path.points[2], path.points[1]);

  var normal = Vector.crossProduct(v1, v2).normalize();

  /**
   * Brightness is between -1 and 1 and is computed based
   * on the dot product between the light source vector and normal.
   */
  var brightness = Vector.dotProduct(normal, this.lightAngle);
  var color = baseColor.lighten(brightness * this.colorDifference, this.lightColor);

  this.canvas.path(path.points.map(this._translatePoint.bind(this)), color);
};

/**
 * Precalculates transformation values based on the current angle and scale
 * which in theory reduces costly cos and sin calls
 */
Isomer.prototype._calculateTransformation = function() {
  this.transformation = [
    [
      32, // this.scale * Math.cos(this.angle),
      16, // this.scale * Math.sin(this.angle)
    ],
    [
      -32, // this.scale * Math.cos(Math.PI - this.angle),
      16, // this.scale * Math.sin(Math.PI - this.angle)
    ]
  ];
};

/* Namespace our primitives */
Isomer.Canvas = Canvas;
Isomer.Color = Color;
Isomer.Path = Path;
Isomer.Point = Point;
Isomer.Shape = Shape;
Isomer.Vector = Vector;

/* Expose Isomer API */
// module.exports = Isomer;
/*
    itemStairs(origin) {
        var STEP_COUNT = 5;

        // Create a zig-zag /
        var zigzag = new Path(origin);
        var steps = [], i;

        // Shape to return /
        var stairs = new Shape();

        for (i = 0; i < STEP_COUNT; i++) {
            var stepCorner = origin.translate(0, i / STEP_COUNT, (i + 1) / STEP_COUNT);
            // Draw two planes /
            steps.push(new Path([
            stepCorner,
            stepCorner.translate(0, 0, -1 / STEP_COUNT),
            stepCorner.translate(1, 0, -1 / STEP_COUNT),
            stepCorner.translate(1, 0, 0)
            ]));

            steps.push(new Path([
            stepCorner,
            stepCorner.translate(1, 0, 0),
            stepCorner.translate(1, 1 / STEP_COUNT, 0),
            stepCorner.translate(0, 1 / STEP_COUNT, 0)
            ]));

            zigzag.push(stepCorner);
            zigzag.push(stepCorner.translate(0, 1 / STEP_COUNT, 0));
        }

        zigzag.push(origin.translate(0, 1, 0));


        for (i = 0; i < steps.length; i++) {
            stairs.push(steps[i]);
        }
        stairs.push(zigzag);
        stairs.push(zigzag.reverse().translate(1, 0, 0));

        return stairs;
        }



    itemPrismeEnter(origin, dx, dy, dz) {
        dx = (typeof dx === 'number') ? dx : 1;
        dy = (typeof dy === 'number') ? dy : 1;
        dz = (typeof dz === 'number') ? dz : 1;
      
        /* The shape we will return /
        var prism = new Shape();
      
        /* Squares parallel to the x-axis /
        const stepx = dx / 10;
        const stepy = dy / 10;
        const stepz = dz / 10;

        var face1 = new Path([
          origin,
 
          new Point(origin.x + stepx * 2, origin.y, origin.z + stepz * 0),
          new Point(origin.x + stepx * 3, origin.y, origin.z + stepz * 7),
          new Point(origin.x + stepx * 4, origin.y, origin.z + stepz * 9),
          new Point(origin.x + stepx * 6, origin.y, origin.z + stepz * 9),
          new Point(origin.x + stepx * 7, origin.y, origin.z + stepz * 7),
          new Point(origin.x + stepx * 8, origin.y, origin.z + stepz * 0),
 
 
          new Point(origin.x + dx, origin.y, origin.z),
          new Point(origin.x + dx, origin.y, origin.z + dz),
          new Point(origin.x, origin.y, origin.z + dz)
        ]);
      
        /* Push this face and its opposite /
        prism.push(face1);
        // prism.push(face1.reverse().translate(0, dy, 0));
      
        /* Square parallel to the y-axis /
        var face2 = new Path([
          origin,
          new Point(origin.x, origin.y, origin.z + dz),
          new Point(origin.x, origin.y + dy, origin.z + dz),
          new Point(origin.x, origin.y + dy, origin.z)
        ]);
        prism.push(face2);
        prism.push(face2.reverse().translate(dx, 0, 0));
      
        /* Square parallel to the xy-plane /
        var face3 = new Path([
          origin,
          new Point(origin.x + dx, origin.y, origin.z),
          new Point(origin.x + dx, origin.y + dy, origin.z),
          new Point(origin.x, origin.y + dy, origin.z)
        ]);
        /* This surface is oriented backwards, so we need to reverse the points /
        prism.push(face3.reverse());
        prism.push(face3.translate(0, 0, dz));
      
        return prism;
    }



    objectIndustry(iso, p, color) {
        iso.add(Shape.Prism(Point(p.x + 2, p.y + 1, 0), 1, 2, 3), color);
        iso.add(Shape.Prism(Point(p.x + 0, p.y + 1, 0), 2, 2, 2), color);
        iso.add(Shape.Prism(Point(p.x + 1, p.y    , 0), 2, 1, 1), color);
        iso.add(this.itemPrismeEnter(Point(p.x, p.y, p.z), 1, 1, 1.5), color);
        iso.add(Shape.Prism(Point(p.x - 1, p.y   , 0), 1, 3, 1), color);

    }

    objectHome(iso, p, color) {
        // iso.add(Shape.Prism(Point(p.x - .25, p.y - .25, 0), 1.5, 1.5, 1.5), color);
        iso.add(this.itemPrismeEnter(Point(p.x, p.y, p.z), 1, 1, 1.5), color);
        iso.add(Shape.Pyramid(Point(p.x - .25, p.y - .25, p.z + 1.5), 1.5, 1.5, 1), color);

        // iso.add(Shape.Prism(Point(p.x - 1, p.y   , 0), 1, 3, 1), color);
    }


    itemUser(origin) {
        var user = new Shape();

        // knot.paths = knot.paths.concat(Shape.Prism(Point.ORIGIN, 5, 1, 1).paths);
        // knot.paths = knot.paths.concat(Shape.Prism(new Point(4, 1, 0), 1, 4, 1).paths);
        user.paths = user.paths.concat(Shape.Prism(new Point(-1, 0, 0), .5, .5, 3.2).paths);
        user.paths = user.paths.concat(Shape.Prism(new Point(1, 0, 0), .5, .5, 3.2).paths);

        // user.paths = user.paths.concat(Shape.Prism(new Point(-2.2, 0, 6), .3, .3, 2.5).paths);
        // user.paths = user.paths.concat(Shape.Prism(new Point(2.2, 0, 6), .3, .3, 2.5).paths);

        user.paths = user.paths.concat(Shape.Cylinder(Point(0, 0, 3.4), 1.6, 6, 5).paths);
        user.paths = user.paths.concat(Shape.Prism(new Point(-.5, -.5, 10), 1, 1, 2).paths);
       return user.scale(Point.ORIGIN, 1/10).translate(origin.x + .5, origin.y + .5, origin.z);
      }

      
*/
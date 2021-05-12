const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Render = Matter.Render;

var hit = 0;

var engine, world;
var gameState = "onSling";

function preload(){
  bg = loadImage("Images/space.jpg");
}
function setup() {
  createCanvas(1200,600);

  engine = Engine.create();
  world = engine.world;

  asteroid1 = new Asteroid(700, 100, 30);
  asteroid2 = new Asteroid(900, 300, 30);
  asteroid3 = new Asteroid(500, 350, 30);
  asteroid4 = new Asteroid(330, 100, 30);
  asteroid5 = new Asteroid(800, 500, 30);

  earth = new Earth(100, 350, 80);

  plane = new Plane(1000, 100, 30);

  slingshot = new Slingshot(plane.body, {x: 1000, y: 100})


  //Render
  var render = Render.create({
	  element: document.body,
	  engine: engine,
	  options: {
	    width: 1200,
	    height: 600,
	    wireframes: false
	  }
	});

	Render.run(render);
}

function draw() {
  background(bg);
  Engine.update(engine);

  textSize(20);
  fill("white");
  text("Targets Hit: "+hit, 75, 50);

  asteroid1.display();
  asteroid2.display();
  asteroid3.display();
  asteroid4.display();
  asteroid5.display();

  asteroid1.hits();
  asteroid2.hits();
  asteroid3.hits();
  asteroid4.hits();
  asteroid5.hits();

  earth.display();

  plane.display();

  //slingshot.display();

  detectCollision(plane, asteroid1);
  detectCollision(plane, asteroid2);
  detectCollision(plane, asteroid3);
  detectCollision(plane, asteroid4);
  detectCollision(plane, asteroid5);
}

function detectCollision(lplane, lasteroid){
	planeBodyPosition = lplane.body.position
	asteroidBodyPosition = lasteroid.body.position

	var distance = dist(planeBodyPosition.x, planeBodyPosition.y, asteroidBodyPosition.x, asteroidBodyPosition.y)
	if(distance<=lasteroid.r+lplane.r){
		Matter.Body.setStatic(lasteroid.body, false)
	}
}

function mouseDragged(){
 // if(gameState === "onSling"){
      Matter.Body.setPosition(plane.body, {x: mouseX , y: mouseY});
 // }
}

function mouseReleased(){
  slingshot.fly();
  //gameState = "launched";
}

function keyPressed(){
  if(keyCode===32){
    Matter.Body.setPosition(plane.body, {x: 1000, y:100})
    slingshot.attach(plane.body)
  }
}



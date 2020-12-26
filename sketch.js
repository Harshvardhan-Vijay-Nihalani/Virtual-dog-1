var canvas;
var dog1Image;
var dog2Image;
var dog;
var count, foodS;
var life;
var database;
function preload() {
	dog1Image = loadImage("images/dogImg.png");
	dog2Image = loadImage("images/dogImg1.png");
}

function setup() {
	canvas = createCanvas(800, 700);
	dog = createSprite(400, 350, 20, 30);
	dog.addImage("dog1Image", dog1Image);
	dog.addImage("dog2Image", dog2Image);
	dog.scale = 0.3;
	count = 20;
	life = 20;
	database = firebase.database();
	foodstock = database.ref('Food');
	foodstock.on("value", readstock);
}


function draw() {
	background(46, 139, 87);
	if(keyWentDown(UP_ARROW)){
		writeStock(foodS);
		dog.changeImage("dog2Image", dog2Image);
	}
	if(foodS === 0){
		dog.changeImage("dog1Image", dog1Image);
	}
	drawSprites();
	textSize(20);
	stroke('green');
	fill("blue");
	text("Food left = " + foodS, 20, 20);
}
function readstock(data){

	foodS = data.val();
}

function writeStock(x){
	if(x<=0){
		x=0;
	}else{
		x-=1;
	}
	database.ref('/').update({
		'Food':x
	})
}
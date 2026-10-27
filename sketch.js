const spriteFrameCount = 8;
const spriteScale = 2;
const moveSpeed = 4;
const animationInterval = 110;

let spriteSheet;
let characterX;
let facing = 1;
let animationFrame = 0;
let lastFrameTime = 0;

function preload() {
  spriteSheet = loadImage('111/all.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  characterX = width / 2;
  imageMode(CORNER);
}

function draw() {
  background('#dad7cd');

  const movingLeft = keyIsDown(LEFT_ARROW);
  const movingRight = keyIsDown(RIGHT_ARROW);
  const direction = Number(movingRight) - Number(movingLeft);

  if (direction !== 0) {
    characterX += direction * moveSpeed;
    facing = direction;

    if (millis() - lastFrameTime >= animationInterval) {
      animationFrame = (animationFrame + 1) % spriteFrameCount;
      lastFrameTime = millis();
    }
  } else {
    animationFrame = 0;
  }

  const frameWidth = spriteSheet.width / spriteFrameCount;
  const frameHeight = spriteSheet.height;
  const drawWidth = frameWidth * spriteScale;
  const drawHeight = frameHeight * spriteScale;

  characterX = constrain(characterX, drawWidth / 2, width - drawWidth / 2);

  push();
  translate(characterX, height / 2);
  scale(facing, 1);
  image(
    spriteSheet,
    -drawWidth / 2,
    -drawHeight / 2,
    drawWidth,
    drawHeight,
    animationFrame * frameWidth,
    0,
    frameWidth,
    frameHeight
  );
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  characterX = constrain(characterX, 0, width);
}

function keyPressed() {
  if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
    return false;
  }
}

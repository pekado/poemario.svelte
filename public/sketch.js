



  let r;

  // Angle and angular velocity, accleration
  let theta;
  let theta_vel;
  let theta_acc;

function setup() {
  // canvas.parent('app');
  cnv = createCanvas(1200, 600, WEBGL);
  cnv.parent('app')
  r = height * 0.4;
  theta = 0;
  theta_vel = 0.5;
  theta_acc = 0.0007;
  colorMode(RGB, height);
  a = 100;
  b = width;
  direction = true;
  frameRate(1000);

}

function draw() {
  background(0, 0, 0, 0.3);
  fill(255, 90, 135)

  

  translate(100, 0, 0);
  push(1000);
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  sphere(50);
  pop(100);
  // Convert polar to cartesian
  let x = r * cos(theta);
  let y = r * sin(theta);

  // Draw the ellipse at the cartesian coordinate
  ellipseMode(CENTER);



  ellipse(x, y, 5, 20);
  ellipse(x, y, 5, 32);
  ellipse(x, y, 20, 5);

  // Apply acceleration and velocity to angle
  // (r remains static in this example)
  theta_vel += theta_acc;
  theta += theta_vel;
  translate(-226, 0, 0);
  push(100);
  rotateZ(frameCount * 0.02);
  rotateX(frameCount * 0.05);
  rotateY(frameCount * 0.09);
  sphere(30);
  pop(150);



  translate(-80, 0, 100);
  push(1000);
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.02);
  sphere(45);
  pop(100);

  translate(190, 0, 50);
  push(1000);
  rotateZ(frameCount * 0.02);
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.05);
  sphere(50);
  pop(100);

  translate(200, 0, 0);
  push(100);
  rotateZ(frameCount * 0.01);
  rotateX(frameCount * 0.02);
  rotateY(frameCount * 0.03);
  sphere(70);
  pop(100);
  


  // translate(200, 0, 0);
  // push(100);
  // rotateZ(frameCount * 0.01);
  // rotateX(frameCount * 0.02);
  // rotateY(frameCount * 0.03);
  // sphere(1000);
  // pop(100);
  // Translate the origin point to the center of the screen

  a++;
  if (a > width) {
    a = 0;
    direction = !direction;
  }
  if (direction === true) {
    stroke(a);
  } else {
    stroke(width - a);
  }
  line(a, 0, a, height / 2);

  b--;
  if (b < 0) {
    b = width;
  }
  if (direction == true) {
    stroke(width - b);
  } else {
    stroke(b);
  }
  line(b, height / 2 + 1, b, height);
}
  
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}




let stage = 1;
let numSegments = 10;
let direction = 'right';

const xStart = 0; //X 시작 좌표
const yStart = 250; //Snake 시작 좌표
const diff = 10;

let xCor = [];
let yCor = [];
let corColor = 'red';

let xFruit = 0;
let yFruit = 0;
let xFruitLoc = [];
let yFruitLoc = [];

let scoreElem;//점수를 나타내주는 변수
let fruitElem = [];
let cnt = 0;

function setup() {//설정 초기값
  //점수 속성값 설정
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');


  createCanvas(500, 500);//Canvas크기 설정
  frameRate(15);//1초당 15프레임
  stroke(255);
  strokeWeight(10);
  updateFruitCoordinates();

  for (let i = 0; i < numSegments; i++) {//Snake 길이
    xCor.push(xStart + i * diff);
    yCor.push(yStart);
  }
}

function draw() {//프레임마다 캔버스에 그려준다
  background(0);
  for (let i = 0; i < numSegments - 1; i++) {//Snake를 그린다
    stroke(corColor);
    line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
  }
  updateSnakeCoordinates();
  checkGameStatus();
  checkForFruit();
}

function updateSnakeCoordinates() {//각각의 꼬리배열이 머리의  따라 움직이게끔 만드는 함수
  for (let i = 0; i < numSegments - 1; i++) {
    xCor[i] = xCor[i + 1];
    yCor[i] = yCor[i + 1];
  }
  switch (direction) {
    case 'right':
      xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'up':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
      break;
    case 'left':
      xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'down':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
      break;
  }
}


function checkGameStatus() {
  if (//게임오버되는 조건
    xCor[xCor.length - 1] > width ||
    xCor[xCor.length - 1] < 0 ||
    yCor[yCor.length - 1] > height ||
    yCor[yCor.length - 1] < 0 ||
    checkSnakeCollision()
  ) {
    //게임 오버됐을 경우 게임을 멈추고 게임이 끝났다는 메시지를 출력한다.
    noLoop();
    const scoreVal = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Game ended! Your score was : ' + scoreVal);
  }
}


function checkSnakeCollision() {//Snake의 머리가 꼬리에 충돌했는지 체크
  const snakeHeadX = xCor[xCor.length - 1];
  const snakeHeadY = yCor[yCor.length - 1];
  for (let i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
      return true;//충돌했을 경우 true를 반환함
    }
  }
}
function checkForFruit() {
  for(let i=0; i<xFruitLoc.length;i++){
    if(frameCount/15<10){// 6초 뒤 사라지는 코드
      if(fruitElem[i] == 'red')
        stroke('red');
      else
        stroke('blue');
      point(xFruitLoc[i],yFruitLoc[i]);

    }
    if (xCor[xCor.length - 1] === xFruitLoc[i] && yCor[yCor.length - 1] === yFruitLoc[i]) {//과일을 먹었을 경우

      if(corColor == fruitElem[i]){//먹은 과일과 Snake가 같은 색깔일 경우
        const prevScore = parseInt(scoreElem.html().substring(8));//해당 과일을 먹기 이전의 스코어값을 저장
        scoreElem.html('Score = ' + (prevScore + 1));

        xCor.unshift(xCor[0]);
        yCor.unshift(yCor[0]);
        //먹은 과일의 위치값은 Canvas 바깥으로 날려버린다
        xFruitLoc[i]=-4;
        yFruitLoc[i]=-4;

        cnt++;
        numSegments++;//Snake의 꼬리 추가

      }else{//다른 색깔일 경우
        //게임 종료
        noLoop();
        const scoreVal = parseInt(scoreElem.html().substring(8));
        scoreElem.html('Game ended! Your score was : ' + scoreVal);
      }
      if(cnt==stage){//스테이지 내에 있는 과일을 절반이상 먹었을경우 색깔을 바꿔준다.
                      //stage =
        if(corColor == 'red')
          corColor = 'blue'
        else
          corColor = 'red'
      }

    }
  }
  if(cnt == stage*2){//스테이지 내에 있는 과일을 전부 먹었을 경우 다음 스테이지로 넘어간다.
    frameCount = 0;
    cnt=0;
    stage++;
    updateFruitCoordinates();
  }
}

function updateFruitCoordinates() {
  for (let i = 0; i < stage*2; i++) {//스테이지당 스테이지 Count * 2배수씩 과일을 생성한다.
    xFruit = floor(random(10, (width - 100) / 10)) * 10;
    yFruit = floor(random(10, (height - 100) / 10)) * 10;
    xFruitLoc[i] = xFruit;
    yFruitLoc[i] = yFruit;
    //랜덤하게 과일을 생성할때마다 색깔을 부여해준다
    if(i<stage)
      fruitElem[i] = 'red';
    else
      fruitElem[i] = 'blue';
  }

}

function keyPressed() {//키 입력을 받는
  switch (keyCode) {
    case 65:
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 68:
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 87:
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 83:
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
}

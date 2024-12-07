const canvas = document.getElementById("canvas");

const scale = [40, 100];
const moveRange = [10, 30];
const blur = [30, 70];
const keys = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
];
const heightNum = 3;
const widthNum = 10;

const bokehs = new Set();
const pressedKeys = new Set(); // 현재 눌린 키를 추적

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Bokeh {
  constructor(key, x, y, r, color) {
    this.key = key;

    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.jitter = 1.5;
  }

  move() {
    this.x += Math.random() * this.jitter * 2 - this.jitter; // -jitter ~ +jitter
    this.y += Math.random() * this.jitter * 2 - this.jitter; // -jitter ~ +jitter
  }
}

const getRand = function (min, max) {
  return Math.random() * (max - min) + min;
};

// Key Down (press)
window.onkeydown = (e) => {
  if (!pressedKeys.has(e.key)) { // 키가 이미 눌린 상태가 아니라면
    pressedKeys.add(e.key); // 현재 키 추가
    createBokeh(e.key.toString());
  }
};

// Key Up
addEventListener("keyup", (e) => {
  pressedKeys.delete(e.key); // 키 떼면 Set에서 제거
  deleteBokeh(e.key.toString());
});

const createBokeh = (key) => {
  const posSize = [window.innerWidth / widthNum, window.innerHeight / heightNum];

  // set Index
  const rowIndex = keys.findIndex(row => row.indexOf(key) !== -1);

  if (rowIndex === -1) { // 유효하지 않은 키는 무시
    return;
  }

  const colIndex = keys[rowIndex].indexOf(key);

  // set centerPos
  const centerPos = [
    posSize[0] * colIndex + posSize[0] / 2, // 열의 중앙
    posSize[1] * rowIndex + posSize[1] / 2  // 행의 중앙
  ];

  const ctx = canvas.getContext("2d");

  let w = getRand(scale[0], scale[1]);
  let h = getRand(scale[0], scale[1]);

  let x = centerPos[0] - w / 2;
  let y = centerPos[1] - h / 2;

  const bokeh = new Bokeh(key, x, y, w, h);
  bokehs.add(bokeh);
};

const deleteBokeh = (key) => {
  bokehs.forEach((item) => {
    if (item.key === key) {
      bokehs.delete(item);
    }
  });
};

function setup(){
  createCanvas(window.innerWidth, window.innerHeight);
}
function draw() {
  const ctx = canvas.getContext("2d");

  // 캔버스 지우기
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  

  // Set에 있는 Bokeh들을 그리기
  bokehs.forEach((bokeh) => {
    ctx.fillStyle = "red"; // 색상 설정
    rect(bokeh.x, bokeh.y, bokeh.r, bokeh.r);
    fill(255,255,0);

    console.log(bokeh.x, bokeh.y)
    bokeh.move();
  }); 
}


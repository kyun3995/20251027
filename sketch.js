let objs = [];
let colors = ['#f71735', '#f7d002', '#1A53C0', '#232323'];
let menuVisible = false;
let menuWidth = 200;
let menuItems = ['第一單元作品', '第一單元講義', '測驗系統', '回到首頁'];
let menuButton;

// 新增全域變數
let showIframe = false;
let iframeElement;

// 修改全域變數區域，新增一個變數來追蹤第一單元作品的 iframe
let showWorkIframe = false;
let workIframeElement;

// 修改全域變數
let menuX = 0;  // 新增：選單 X 座標
let menuY = 0;  // 新增：選單 Y 座標

function setup() {
  let canvasSize = min(windowWidth, windowHeight);
  createCanvas(canvasSize, canvasSize);
  rectMode(CENTER);
  objs.push(new DynamicShape());
  
  // 創建選單按鈕
  menuButton = {
    x: 30,
    y: 30,
    size: 40
  };
  
  // 創建 iframe 元素
  iframeElement = createDiv('');
  iframeElement.id('lectureFrame');
  iframeElement.style('display', 'none');
  iframeElement.style('position', 'fixed');
  iframeElement.style('top', '50%');
  iframeElement.style('left', '50%');
  iframeElement.style('transform', 'translate(-50%, -50%)');
  iframeElement.style('width', '80%');
  iframeElement.style('height', '80%');
  iframeElement.style('z-index', '1000');
  iframeElement.html('<iframe src="https://hackmd.io/@Kyun/Sk7_DmAixl" width="100%" height="100%" frameborder="0"></iframe>');
  
  // 在原有的 iframe 之後新增第一單元作品的 iframe
  workIframeElement = createDiv('');
  workIframeElement.id('workFrame');
  workIframeElement.style('display', 'none');
  workIframeElement.style('position', 'fixed');
  workIframeElement.style('top', '50%');
  workIframeElement.style('left', '50%');
  workIframeElement.style('transform', 'translate(-50%, -50%)');
  workIframeElement.style('width', '80%');
  workIframeElement.style('height', '80%');
  workIframeElement.style('z-index', '1000');
  workIframeElement.html('<iframe src="https://kyun3995.github.io/20251020/" width="100%" height="100%" frameborder="0"></iframe>');
  
  // 設定選單初始位置在畫面中央
  menuX = width/2;
  menuY = height/2;
}

function draw() {
  background(255);
  for (let i of objs) {
    i.run();
  }
  
  // 繪製選單按鈕
  drawMenuButton();
  
  // 繪製選單
  if(menuVisible) {
    drawMenu();
  }

  if (frameCount % int(random([15, 30])) == 0) {
    let addNum = int(random(1, 30));
    for (let i = 0; i < addNum; i++) {
      objs.push(new DynamicShape());
    }
  }
  for (let i = 0; i < objs.length; i++) {
    if (objs[i].isDead) {
      objs.splice(i, 1);
    }
  }
}

function drawMenuButton() {
  push();
  fill(40);
  noStroke();
  rect(menuButton.x, menuButton.y, menuButton.size, menuButton.size);
  
  // 繪製三條選單線
  stroke(255);
  strokeWeight(2);
  let spacing = 8;
  line(menuButton.x - 12, menuButton.y - spacing, 
       menuButton.x + 12, menuButton.y - spacing);
  line(menuButton.x - 12, menuButton.y, 
       menuButton.x + 12, menuButton.y);
  line(menuButton.x - 12, menuButton.y + spacing, 
       menuButton.x + 12, menuButton.y + spacing);
  pop();
}

function drawMenu() {
  if(menuVisible) {
    push();
    // 繪製半透明背景遮罩
    fill(0, 0, 0, 100);
    rect(0, 0, width, height);
    
    // 繪製選單背景
    fill(40);
    noStroke();
    rectMode(CENTER);
    rect(menuX, menuY, menuWidth, 250);  // 固定選單高度為 250
    
    // 繪製選單項目
    fill(255);
    textSize(16);
    textAlign(CENTER, CENTER);
    for(let i = 0; i < menuItems.length; i++) {
      let itemY = menuY - 75 + (i * 50);  // 調整項目間距
      
      // 滑鼠懸停效果
      if(mouseX > menuX - menuWidth/2 && 
         mouseX < menuX + menuWidth/2 && 
         mouseY > itemY - 20 && 
         mouseY < itemY + 20) {
        fill(200);
      } else {
        fill(255);
      }
      
      text(menuItems[i], menuX, itemY);
    }
    pop();
  }
}

function mousePressed() {
  // 檢查是否點擊選單按鈕
  if (dist(mouseX, mouseY, menuButton.x, menuButton.y) < menuButton.size/2) {
    menuVisible = !menuVisible;
    return;
  }
  
  // 檢查選單項目點擊
  if(menuVisible) {
    for(let i = 0; i < menuItems.length; i++) {
      let itemY = menuY - 75 + (i * 50);
      if(mouseX > menuX - menuWidth/2 && 
         mouseX < menuX + menuWidth/2 && 
         mouseY > itemY - 20 && 
         mouseY < itemY + 20) {
        
        // 處理第一單元作品的點擊
        if(menuItems[i] === '第一單元作品') {
          showWorkIframe = !showWorkIframe;
          if(showWorkIframe) {
            workIframeElement.style('display', 'block');
            showIframe = false;
            iframeElement.style('display', 'none');
          } else {
            workIframeElement.style('display', 'none');
          }
        }
        // 處理第一單元講義的點擊
        else if(menuItems[i] === '第一單元講義') {
          showIframe = !showIframe;
          if(showIframe) {
            iframeElement.style('display', 'block');
            showWorkIframe = false;
            workIframeElement.style('display', 'none');
          } else {
            iframeElement.style('display', 'none');
          }
        }
        menuVisible = false;
        return;
      }
    }
    
    // 點擊選單外部區域
    if(mouseX < menuX - menuWidth/2 || 
       mouseX > menuX + menuWidth/2 || 
       mouseY < menuY - 125 || 
       mouseY > menuY + 125) {
      menuVisible = false;
      showIframe = false;
      showWorkIframe = false;
      iframeElement.style('display', 'none');
      workIframeElement.style('display', 'none');
    }
  }
}

function easeInOutExpo(x) {
	return x === 0 ? 0 :
		x === 1 ? 1 :
		x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 :
		(2 - Math.pow(2, -20 * x + 10)) / 2;
}

class DynamicShape {
	constructor() {
		this.x = random(0.3, 0.7) * width;
		this.y = random(0.3, 0.7) * height;
		this.reductionRatio = 1;
		this.shapeType = int(random(4));
		this.animationType = 0;
		this.maxActionPoints = int(random(2, 5));
		this.actionPoints = this.maxActionPoints;
		this.elapsedT = 0;
		this.size = 0;
		this.sizeMax = width * random(0.01, 0.05);
		this.fromSize = 0;
		this.init();
		this.isDead = false;
		this.clr = random(colors);
		this.changeShape = true;
		this.ang = int(random(2)) * PI * 0.25;
		this.lineSW = 0;
	}

	show() {
		push();
		translate(this.x, this.y);
		if (this.animationType == 1) scale(1, this.reductionRatio);
		if (this.animationType == 2) scale(this.reductionRatio, 1);
		fill(this.clr);
		stroke(this.clr);
		strokeWeight(this.size * 0.05);
		if (this.shapeType == 0) {
			noStroke();
			circle(0, 0, this.size);
		} else if (this.shapeType == 1) {
			noFill();
			circle(0, 0, this.size);
		} else if (this.shapeType == 2) {
			noStroke();
			rect(0, 0, this.size, this.size);
		} else if (this.shapeType == 3) {
			noFill();
			rect(0, 0, this.size * 0.9, this.size * 0.9);
		} else if (this.shapeType == 4) {
			line(0, -this.size * 0.45, 0, this.size * 0.45);
			line(-this.size * 0.45, 0, this.size * 0.45, 0);
		}
		pop();
		strokeWeight(this.lineSW);
		stroke(this.clr);
		line(this.x, this.y, this.fromX, this.fromY);
	}

	move() {
		let n = easeInOutExpo(norm(this.elapsedT, 0, this.duration));
		if (0 < this.elapsedT && this.elapsedT < this.duration) {
			if (this.actionPoints == this.maxActionPoints) {
				this.size = lerp(0, this.sizeMax, n);
			} else if (this.actionPoints > 0) {
				if (this.animationType == 0) {
					this.size = lerp(this.fromSize, this.toSize, n);
				} else if (this.animationType == 1) {
					this.x = lerp(this.fromX, this.toX, n);
					this.lineSW = lerp(0, this.size / 5, sin(n * PI));
				} else if (this.animationType == 2) {
					this.y = lerp(this.fromY, this.toY, n);
					this.lineSW = lerp(0, this.size / 5, sin(n * PI));
				} else if (this.animationType == 3) {
					if (this.changeShape == true) {
						this.shapeType = int(random(5));
						this.changeShape = false;
					}
				}
				this.reductionRatio = lerp(1, 0.3, sin(n * PI));
			} else {
				this.size = lerp(this.fromSize, 0, n);
			}
		}

		this.elapsedT++;
		if (this.elapsedT > this.duration) {
			this.actionPoints--;
			this.init();
		}
		if (this.actionPoints < 0) {
			this.isDead = true;
		}
	}

	run() {
		this.show();
		this.move();
	}

	init() {
		this.elapsedT = 0;
		this.fromSize = this.size;
		this.toSize = this.sizeMax * random(0.5, 1.5);
		this.fromX = this.x;
		this.toX = this.fromX + (width / 10) * random([-1, 1]) * int(random(1, 4));
		this.fromY = this.y;
		this.toY = this.fromY + (height / 10) * random([-1, 1]) * int(random(1, 4));
		this.animationType = int(random(3));
		this.duration = random(20, 50);
	}
}
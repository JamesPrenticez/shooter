class Canvas {
  constructor(element, width, height) {
    this.canvas = element;
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = true;

    // Frame Rate
    this.currentFrameTime = Date.now()
    this.lastFrameTime = 0;
    this.frameCount = 0;
    this.currentSecond = 0;
  }

  clear = () => {
    this.ctx.fillStyle = this.bgColor
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
  }

  drawFrameRate(){
    this.updateFrameRate()
    this.ctx.font = "500 10px Montserrat";
    this.ctx.fillStyle = "#dadada";
    this.ctx.fillText(this.framesLastSecond, this.canvas.width - 20, 10);
  }

  updateFrameRate(){
    let sec = Math.floor(Date.now()/1000)

    if(sec != this.currentSecond){
      this.currentSecond = sec;
      this.framesLastSecond = this.frameCount;
      this.frameCount = 1;
    } else {
      this.frameCount ++;
    }
  }
}

export function createCanvas({element, width, height}) {
  return new Canvas(
    element,
    width,
    height
  );
}

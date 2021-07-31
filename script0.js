function init(){
  
    let canvas = document.getElementById('canvas');
    canvas.width = 800;
    canvas.height = 800;
    var c = canvas.getContext("2d");
    var WIDTH = canvas.width;
    var HEIGHT = canvas.height;
    var keys = [];
    var SPEED = 2;
    
    //keeping track of mouse location and buttons
    function Mouse(){
      this.x;
      this.y;
      this.Left;
      this.right;
      this.middle;
    }
    var mouse = new Mouse();
    
    //class for player
    function Player(){
      this.x = 395;
      this.y = 295;
      this.w = 10;
      this.h = 10;
    }
    
    //initializing player1
    var player1 = new Player();
    
    //main draw logic
    function mainDraw(){
      c.clearRect(0, 0, WIDTH, HEIGHT);
      c.fillStyle="red";
      c.strokeStyle="blue";
      c.beginPath();
      c.rect(player1.x, player1.y, player1.w, player1.h);
      c.lineWidth=1;
      c.stroke();
      c.fill();
      
      playerMove();
      // console.log(mouse);
    }
    
    //handles player movement
    function playerMove(e){
      if(keys[87] && player1.y > 2){
        player1.y -= SPEED;
      }
      if(keys[83] && player1.y < (HEIGHT - player1.h - 2)){
        player1.y += SPEED;
      }
      if(keys[65] && player1.x > 2){
        player1.x -= SPEED;
      }
      if(keys[68] && player1.x < (WIDTH - player1.w - 2)){
        player1.x += SPEED;
      } 
      return false;
    }
    
    function playerRotate(e){
      
      
    }
    
  
    //detect keyboard buttons being pressed
    
    const keyDown = (event) => {
        keys[event.keyCode] = true;
    }

    const keyUp = (event) => {     
        keys[event.keyCode] = false;
    };

    const mouseDown = (event) => {
      keys[event.keyCode] = false;
    }

    
    canvas.addEventListener('keydown', keyDown)
    canvas.addEventListener('keyup', keyUp)
 

    //detect mouse moving
    //grab mouse position and update mouse object
    // canvas.on('mousemove', function(e){
    //   var rect = canvas.getBoundingClientRect();
    //   mouse.x = e.clientX - rect.left;
    //   mouse.y = e.clientY - rect.top;
    // });

    // canvas.addEventListener('mousemouse', mouseMouse)
      
    //game loop
    //TODO: replace with frames
    setInterval(mainDraw, 20);
  }
  
  
  
  document.body.style.backgroundColor = "yellow";
//   document.body.ready( function(){ init();} );
  window.onload = function() {init()}
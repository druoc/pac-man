const width = 28;
const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
let squares = [];
let score = 0;

//28 * 28 = 784
  // 0 - pac-dots
  // 1 - wall
  // 2 - ghost-lair
  // 3 - power-pellet
  // 4 - empty

  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1 
]

//create the game board
function createBoard() {
  for (let i = 0; i < layout.length; i++) {
    //create squares
    const square = document.createElement('div');
    //render squares in grid
    grid.appendChild(square);
    //put square in squares array
    squares.push(square);

    if (layout[i] === 0) {
      squares[i].classList.add('pac-dot');
    } else if (layout[i] === 1) {
      squares[i].classList.add('wall');
    } else if (layout[i] === 2) {
      squares[i].classList.add('ghost-lair');
    } else if (layout[i] === 3) {
      squares[i].classList.add('power-pellet');
    } 
  }
}

createBoard();

//starting position of pacman
let pacManCurrentIndex = 490;
squares[pacManCurrentIndex].classList.add('pacman');

//keystroke event listeners
function control(e) {
  squares[pacManCurrentIndex].classList.remove('pacman');
    switch(e.keyCode) {
      case 40:
      console.log('pressed down')
      if (!squares[pacManCurrentIndex + width].classList.contains('ghost-lair') &&
          !squares[pacManCurrentIndex + width].classList.contains('wall') &&
          pacManCurrentIndex + width < width * width) pacManCurrentIndex += width;
      break

      case 38:
      console.log('pressed up')
      if (!squares[pacManCurrentIndex - width].classList.contains('ghost-lair') &&
          !squares[pacManCurrentIndex - width].classList.contains('wall') &&
          pacManCurrentIndex - width >= 0) pacManCurrentIndex -= width;
      break

      case 37: 
      console.log('pressed left')
      if (!squares[pacManCurrentIndex -1].classList.contains('ghost-lair') &&
          !squares[pacManCurrentIndex -1].classList.contains('wall') &&
          pacManCurrentIndex % width !== 0) pacManCurrentIndex -=1;
          if (pacManCurrentIndex === 364) {
            pacManCurrentIndex =391;
          }
      break

      case 39:
      console.log('pressed right')
      if (!squares[pacManCurrentIndex +1].classList.contains('ghost-lair') &&
          !squares[pacManCurrentIndex +1].classList.contains('wall') &&
          pacManCurrentIndex % width < width -1) pacManCurrentIndex +=1;
          if (pacManCurrentIndex === 391) {
            pacManCurrentIndex = 364;
          }
      break
  }
  squares[pacManCurrentIndex].classList.add('pacman');
  pacDotEaten();
  powerPelletEaten();
} 

document.addEventListener('keyup', control);

//function for 'eating' power pellets and incrementing score
function pacDotEaten() {
  if (squares[pacManCurrentIndex].classList.contains('pac-dot')) {
    score++;
    scoreDisplay.innerHTML = score;
    squares[pacManCurrentIndex].classList.remove('pac-dot');
  }
}

//power pellet function
function powerPelletEaten() {
  if (squares[pacManCurrentIndex].classList.contains('power-pellet')) {
    squares[pacManCurrentIndex].classList.remove('power-pellet');
    score += 10;
    ghosts.forEach(ghost => ghost.isScared = true);
    setTimeout(unScareGhosts, 10000);
  }
}

function unScareGhosts() {
  ghosts.forEach(ghost => ghost.isScared = false);
}

//enemy ghost class constructor
class Ghost {
  constructor(className, startIndex, speed) {
    this.className = className;
    this.startIndex = startIndex;
    this.speed = speed;
    this.currentIndex = startIndex;
    this.isScared = false;
    this.timerId = NaN;
  }
}

const ghosts = [
  new Ghost('blinky', 348, 250),
  new Ghost('pinky', 376, 400),
  new Ghost('inky', 351, 300),
  new Ghost('clyde', 379, 500)
]

//draw ghosts onto grid
ghosts.forEach(ghost => {
  squares[ghost.startIndex].classList.add(ghost.className);
  squares[ghost.startIndex].classList.add('ghost');
});

//move ghosts
ghosts.forEach(ghost => moveGhost(ghost));

function moveGhost(ghost) {
  console.log('Moved ghost');
  const directions = [-1, +1, -width, +width];
  let direction = directions[Math.floor(Math.random() * directions.length)];

  ghost.timerId = setInterval(function() {
    if (
      !squares[ghost.currentIndex + direction].classList.contains('wall') &&
      !squares[ghost.currentIndex + direction].classList.contains('ghost')
    ) {
        squares[ghost.currentIndex].classList.remove(ghost.className);
        squares[ghost.currentIndex].classList.remove('ghost', 'scared-ghost');

        ghost.currentIndex += direction;

        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add('ghost');
    } else direction = directions[Math.floor(Math.random() * directions.length)];
    
    //if ghost if currently scared
    if (ghost.isScared) {
      squares[ghost.currentIndex].classList.add('scared-ghost');
    }

    //if ghost is scared and pacman is on it, remove classnames
    if (ghost.isScared && squares[ghost.currentIndex].classList.contains('pacman')) {
      squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
      ghost.currentIndex = ghost.startIndex;
      score += 100;
      squares[ghost.currentIndex].classList.add(ghost.className, 'ghost');

    }
    checkForGameOver();

  }, ghost.speed)
}

//check for game over
function checkForGameOver() {
  //if the square pacman is in contains a ghost AND the square does NOT contain a scared ghost 
  if (
      squares[pacmanCurrentIndex].classList.contains('ghost') && 
      !squares[pacmanCurrentIndex].classList.contains('scared-ghost') 
   ) {
   //for each ghost - we need to stop it moving
  ghosts.forEach(ghost => clearInterval(ghost.timerId))
  //remove eventlistener from our control function
  document.removeEventListener('keyup', control)
  //tell user the game is over   
  scoreDisplay.innerHTML = 'You LOSE'
   }
}
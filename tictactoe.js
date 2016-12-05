// Make a command line tic-tac-toe game from scratch for two players. 
// Expected features
// ===============
// * Minimal UI that redraws the board and makes clear whose turn it is, each turn.
// * Players can submit moves (assume, admittedly unrealistically, that both players are sitting at the same keyboard).
// * Win detection - detect and display who won

// Bonus / stretch goals (any or all of the following)
// =======================================
// * Structure your code such that the UI can be turned easily into a native mobile app (iOS say) without having to rewrite the core game logic.
// * Implement win detection with a functional rather than iterative style.
// * Between moves, rotate the board 90 degrees counter-clockwise. The moves "fall" due to "gravity", post-rotation.

// Implementation instructions
// =======================
// * Create the project from scratch. Don't just clone an existing project.
// * This includes writing configuration files for any dependencies and test framework setup.
// * You should have a reasonably thorough suite of unit tests using a real unit test framework.
// * Use the editor of your choice.
// * Init a git repo for this project.
// * Push the repo up to github.
// * Make small commits as you go to illustrate your thought process and be able to back out changes easily.
// * Don't forget to push your final solution up to Github.
// * Add a professional-looking README file with installation and usage instructions.

// Try your best to work on this challenge without referring to outside resources. However, if you have to look things up online, go ahead. 

var prompt = require('prompt');

var Board = function() {
    this.board = [
    ['   ', '   ', '   '],
    ['   ', '   ', '   '],
    ['   ', '   ', '   ']
  ];
};

Board.prototype.print = function() {
  console.log('');
  console.log('Current Board Status');
  for (var i = 0; i < this.board.length - 1; i++) {
    console.log(this.board[i].join('|'));
    console.log('-----------');
  }
  console.log(this.board[this.board.length - 1].join('|'));
  console.log('');
};

Board.prototype.move = function(symbol, row, col, player) {
  var moves = ['0', '1', '2'];
  if (moves.indexOf(row) === -1 || moves.indexOf(col) === -1) {
    console.log('you have entered a strange location! please try again');
    this.runGame(player);
  } else if (this.board[row][col] !== '   ') {
    console.log('this position is taken! please try again');
    this.runGame(player);
  } else if (symbol === 'cross') {
    this.board[row][col] = ' X ';
    this.runGame(!player);
  } else if (symbol === 'circle') {
    this.board[row][col] = ' O ';
    this.runGame(!player);
  }
};

Board.prototype.rowWin = function() {
  var checkSymbol;
  var checkSame;
  for (var row = 0; row < this.board.length; row++) {
    checkSame = true;
    checkSymbol = this.board[row][0];
    for (var col = 0; col < this.board.length; col++) {
      if (checkSymbol !== this.board[row][col]) {
        checkSame = false;
      }
    }
    if (checkSame && checkSymbol !== '   ') {
      return checkSymbol;
    }
  }
  return false;
};

Board.prototype.colWin = function() {
  var checkSymbol;
  var checkSame;
  for (var col = 0; col < this.board.length; col++) {
    checkSame = true;
    checkSymbol = this.board[0][col];
    for (var row = 0; row < this.board.length; row++) {
      if (checkSymbol !== this.board[row][col]) {
        checkSame = false;
      }
    }
    if (checkSame && checkSymbol !== '   ') {
      return checkSymbol;
    }
  }
  return false;
};

Board.prototype.diagWin = function() {
  if (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2]) {
    if (this.board[0][0] !== '   ') {
      return this.board[0][0];
    }
  } else if (this.board[0][2] === this.board[1][1] && this.board[1][1] === this.board[2][0]) {
    if (this.board[0][2] !== '   ') {
      return this.board[0][2];
    }
  } else {
    return false;
  }
};

Board.prototype.winner = function() {
  if (this.rowWin()) {
    return this.rowWin();
  } else if (this.colWin()) {
    return this.colWin();
  } else if (this.diagWin()) {
    return this.diagWin();
  } else {
    return false;
  }
};

Board.prototype.runGame = function(player) {
  if (player === undefined) {
    player = true;
  }
  this.print();

  if (this.winner()) {
    console.log(this.winner(), 'is the winner!');
  } else {
    this.promptMove(player);
  }
};

Board.prototype.promptMove = function(player) {
  var promptQ = [
    `player ${player ? 1 : 2}, please enter the row of your move (0, 1, or 2)`, 
    `player ${player ? 1 : 2}, please enter the col of your move (0, 1, or 2)`
  ];
  var row;
  var col;
  var board = this;
  prompt.get(promptQ, function(err, results) {
    if (err) {
      throw err;
    }
    row = results[promptQ[0]];
    col = results[promptQ[1]];
    board.move(player ? 'circle' : 'cross', row, col, player);
  });
};

Board.prototype.init = function() {
  console.log('welcome to a wonderful game of tic tac toe!');
  this.runGame();
};

/* TEST */
var board = new Board();
board.init();
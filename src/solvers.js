/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  var solution = [];

  var addRow = function(board, row) {
    if (row === n && !board.hasAnyRooksConflicts()) {
      solution = board.rows();
      return board;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (board.hasAnyRooksConflicts()) {
        board.togglePiece(row, i);
      } else {
        return addRow(board, row + 1);  
      }
    }
  }

  addRow(board, 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined;

  if (n === 0) {
    solution = []; 
    return solution;
  }

  if (n === 1) {
    solution = [[1]];
    return solution;
  }

  if (n <= 3) {
    var board = new Board({n: n});
    solution = board.rows();
    return solution;
  }

  var addRow = function(board, row) {
    if (row === n) {
      solution = board.rows();
      console.table(solution);
      return board;
    }
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(row, i);
      } else {
        return addRow(board, row + 1);  
      }
    }
  }

  var backRow = function(board, row) {
    if (row === n) {
      solution = board.rows();
      console.table(solution);
      return board;
    }
    for (var i = n - 1; i > 0; i--) {
      board.togglePiece(row, i);
      if (board.hasAnyQueensConflicts()) {
        board.togglePiece(row, i);
      } else {
        return addRow(board, row + 1);  
      }
    }
  }

  var i = 0;

  while (!solution && i < n) {
    var board = new Board({n: n});
    board.togglePiece(0, i);
    backRow(board, 1);
    i++;
  }

  var j = 0;

  while (!solution && j < n) {
    var board = new Board({n: n});
    board.togglePiece(0, j);
    addRow(board, 1);
    j++;
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

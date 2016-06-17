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
      if (board.hasColConflictAt(i)) {
        board.togglePiece(row, i);
      } else {
        return addRow(board, row + 1);
      }
    }
  };
  addRow(board, 0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;

  var board = new Board({n: n});

  var addRow = function(board, rowIndex) {
    if (rowIndex === n) { // don't need to test, this is gonna work!
      solutionCount++;
      return;
    }
    var row = board.get(rowIndex);
    for (var i = 0; i < n; i++) {
      row[i] = 1;
      if (board.hasColConflictAt(i)) {
        row[i] = 0;
      } else {
        addRow(board, rowIndex + 1);
        row[i] = 0;
      }
    }
  };

  addRow(board, 0);

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


  var board = new Board({n: n});

  var addRow = function(board, rowIndex) {
    if (rowIndex === n && !board.hasAnyQueensConflicts()) {
      solution = board.rows();
      return board.rows();
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(rowIndex, i);
        if (board.hasAnyOptimizedConflictsOn(rowIndex, i)) {
          board.togglePiece(rowIndex, i);
        } else {
          // recursively call with board, rowIndx++
          return addRow(board, rowIndex + 1);
        }
      }
      //for loop has ended, all conflicts, so go up a row.
      return upRow(board, rowIndex - 1);
    }
    
  };

  var upRow = function(board, rowIndex) {
    var row = board.get(rowIndex);
    var queenIndex = row.indexOf(1);

    for (var i = queenIndex; i < n; i++) {
      if (i === n - 1) { //test for last colIndex, special case, have to decide whether to go up or not
        if (row[i] === 1) {
          board.togglePiece(rowIndex, i);
          return upRow(board, rowIndex - 1);
        } else {
          board.togglePiece(rowIndex, i);
          if (board.hasAnyOptimizedConflictsOn(rowIndex, i)) {
            board.togglePiece(rowIndex, i);
            return upRow(board, rowIndex - 1);
          } else {
            return addRow(board, rowIndex + 1);
          }
        } 
      } // untoggle current if toggled. if not toggled, toggle it & test, if pass, add next Row. 
      if (row[i] === 1) {
        board.togglePiece(rowIndex, i);
      } else {
        board.togglePiece(rowIndex, i);
        if (board.hasAnyOptimizedConflictsOn(rowIndex, i)) {
          board.togglePiece(rowIndex, i);
        } else {
          return addRow(board, rowIndex + 1);
        }
      }
    }
  };

  addRow(board, 0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  if (n === 0) {
    solutionCount++; 
  }

  if (n === 1) {
    solutionCount++;
  }

  var addRow = function(board, rowIndex) {
    if (rowIndex === n) { // don't need to test, it'll pass
      solutionCount++;
      upRow(board, rowIndex - 1);
    } else {
      for (var i = 0; i < n; i++) {
        board.togglePiece(rowIndex, i);
        if (board.hasAnyOptimizedConflictsOn(rowIndex, i)) {
          board.togglePiece(rowIndex, i);
        } else {
          // recursively call with board, rowIndx++
          return addRow(board, rowIndex + 1);
        }
      }
      //for loop has ended, all conflicts, so go up a row.
      return upRow(board, rowIndex - 1);
    }
    
  };

  var upRow = function(board, rowIndex) {
    if (rowIndex < 0) {
      return; // no solution, for n = 2, n = 3;
    }
    var row = board.get(rowIndex);
    var queenIndex = row.indexOf(1);


    for (var i = queenIndex; i < n; i++) {
      if (i === n - 1) { //test for last colIndex, special case, have to decide whether to go up or not
        if (row[i] === 1) {
          board.togglePiece(rowIndex, i);
          return upRow(board, rowIndex - 1);
        } else {
          board.togglePiece(rowIndex, i);
          if (board.hasAnyOptimizedConflictsOn(rowIndex, i)) {
            board.togglePiece(rowIndex, i);
            return upRow(board, rowIndex - 1);
          } else {
            return addRow(board, rowIndex + 1);
          }
        } 
      } // untoggle current if toggled. if not toggled, toggle it & test, if pass, add next Row. 
      if (row[i] === 1) {
        board.togglePiece(rowIndex, i);
      } else {
        board.togglePiece(rowIndex, i);
        if (board.hasAnyOptimizedConflictsOn(rowIndex, i)) {
          board.togglePiece(rowIndex, i);
        } else {
          return addRow(board, rowIndex + 1);
        }
      }
    }
  };

  if (n > 1) {
    addRow(board, 0);
  }


  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

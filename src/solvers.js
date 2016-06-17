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


  var board = new Board({n: n});

  var addRow = function(board, rowIndex) {
  // base case: if rowInx = n 
    // return solution
    if (rowIndex === n) {
      var rows = board.rows();
      var queens = 0;
      rows = _.flatten(rows); 
      for (var i = 0; i < rows.length; i++) {
        if (rows[i] === 1) {
          queens++;
        }
      }
      if (queens === n) {
        solution = board.rows();
        return board.rows();
      } else {
        return;
      }
    } else {
    // iterate through the array at rowIndx
      for (var i = 0; i < n; i++) {
      // toggle the element
      // run collsion test
        board.togglePiece(rowIndex, i);
        // if test fails
          // untoggle
        if (board.hasAnyQueenConflictsOn(rowIndex, i)) {
          board.togglePiece(rowIndex, i);
        } else {
          // recursively call with board, rowIndx++
          // console.log('to adrow from uprow')
          // console.table(board.rows())
          return addRow(board, rowIndex + 1);
        }
      }
      // If the for loop has eneded and nothing has been toggled    
      // recursively call UpRow helper function with board, rowIndx--,
      // console.log('up Row') 
      // console.table(board.rows())
      return upRow(board, rowIndex - 1);
    }
    
  };

  var upRow = function(board, rowIndex) {
    // debugger
  // UP ROW helper function take board and rowIndx
    // iterate throught the array at rowIndx
    var row = board.get(rowIndex);
    var queenIndex = row.indexOf(1);

    for (var i = queenIndex; i < n; i++) {
      if (i === n - 1) {
        if (row[i] === 1) {
          board.togglePiece(rowIndex, i);
          return upRow(board, rowIndex - 1);
        } else {
          board.togglePiece(rowIndex, i);
          if (board.hasAnyQueenConflictsOn(rowIndex, i)) {
            board.togglePiece(rowIndex, i);
            return upRow(board, rowIndex - 1);
          } else {
            return addRow(board, rowIndex + 1);
          }
        } 
      }
      if (row[i] === 1) {
        board.togglePiece(rowIndex, i);
      } else {
        board.togglePiece(rowIndex, i);
        if (board.hasAnyQueenConflictsOn(rowIndex, i)) {
          board.togglePiece(rowIndex, i);
        } else {
          return addRow(board, rowIndex + 1);
        }
      }
    }
  };


    // for (var i = index; i < n; i++) {
    //   // testing to see if last colIndx
    //   if (i === n - 1) {
    //     if (row[i] === 0) {
    //       board.togglePiece(rowIndex, i);
    //       if (!board.hasAnyQueenConflictsOn(rowIndex, i)) {
    //         return addRow(board, rowIndex + 1);
    //       } else {
    //         board.togglePiece(rowIndex, i);
    //         return upRow(board, rowIndex - 1);
    //       }
    //     }
    //   } 

    //   if (row[i] === 1) {
    //     board.togglePiece(rowIndex, i);
    //   } else if 
    //   if (row[i] === 0) {


    //   }
    //     board.togglePiece(rowIndex, i + 1)
    //     if (!board.hasAnyQueenConflictsOn(rowIndex, i + 1)) {
    //       return addRow(board, rowIndex + 1);
    //     } else {
    //       board.togglePiece(rowIndex, i + 1);
    //     }
    //   }
    // }




        // toggle next i+1
        // call addRow with board and rowIndx++


  addRow(board, 0);
  
  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

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
  var topDecisions = [];
  var solutionBoards = [];

  // creating all top decision branches
  // for (var i = 0; i < n; i++) {
  //   var board = new Board({n: n});
  //   board.togglePiece(0, i);
  //   topDecisions.push(board);
  // }

  var board = new Board({n: n});

  var addRow = function(board, rowIndex) {
    if (rowIndex === n) {
      solutionBoards.push(board);
    } else {
      for (var i = 0; i < n; i++) {
        debugger;
        // var row = board.get(currentRow);
        board.togglePiece(rowIndex, i);
        if (board.hasAnyRooksConflicts()) {
          board.togglePiece(rowIndex, i);
        } else {
          board.togglePiece(rowIndex, i);
          var newBoard = new Board(board.rows());
          newBoard.togglePiece(rowIndex, i);
          addRow(newBoard, rowIndex++);        
        } 
      }
    }
  };
    // get the next row
    // iterate through each index
    // at each index, toggle, and then test for conflict
    // if conflict, untoggle
    // if no conflict, untoggle (to reset board), and then
    // create new copy of that board, and toggle;
    // and then recurisvely call with this board onto next row
    // if no more rows, then its solved, 
    // push it to solutions


  addRow(board, 0);
  // console.dir(solutionBoards[0].rows());

  // recursive function that goes into the next row
  // finds an index with no conflict, toggle it
  // call itself again, goes into the next row, 
  // when no more rows, return board;

  //[1, 0, 0] 
  //[0, 0, 0] 2nd loop
  // recursive function for next row

  //[1, 0, 0]
  //[0, 1, 0] third, figure out how toggle off previously toggled.
  // recursive function for next row



  // decision tree
  // for first row, iterate and insert piece on each index (our top level decision);
    // for each separate index, it'll have multiple branches
    // within branch
      // go to next row, iterate through and check for collisions
      // if no collision, insert piece at index
      // store this row
      // recursion: move to next row and iterate again to check for collisions, insert piece, & store row
        // when done iterating through all rows, push all rows with first decision to a result board & return result board
  
  var solution = solutionBoards.pop(); //fixme
  if (n === 1) {
    return [[1]];
  }
  // if (n === 1) {
  //   solution
  // }

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
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

const RED_PAWN = 1;
const BLACK_PAWN = 2;
const RED_QUEEN = 3;
const BLACK_QUEEN = 4;
const TOP_ROW = 0;
const BOTTOM_ROW = 7;

module.exports = ({ game, destination, selectedPiece }) => {


  if (
    selectedPiece.i === undefined ||
    selectedPiece.j === undefined
  )
    return;

  if (!takeAvailableJumpIfExist(game, destination, selectedPiece)){
    game.message = "jump available! you must take the jump";
    return ;
  }
    game.message = '';
    const i = selectedPiece.i;
    const j = selectedPiece.j;
    const di = destination.i;
    const dj = destination.j;
    const distanceI = destination.i - selectedPiece.i;
    const distanceJ = destination.j - selectedPiece.j;
    const oneCellForwardI =
        i + Math.abs(distanceI) / distanceI;
    const oneCellForwardJ =
        j + Math.abs(distanceJ) / distanceJ;
    const destinationPiece = game.board[di][dj];
    const piece = game.board[i][j];


    // only move to empty spaces
    if (destinationPiece !== 0) return;

    // must move diagonal
    if (Math.abs(distanceI) !== Math.abs(distanceJ)) return;

    // red pawn can't move up
    if (piece === RED_PAWN && di <= i) return;

    // black pawn can't move down
    if (piece === BLACK_PAWN && di >= i) return;
    // can only move 1 or 2 slots
    if (Math.abs(distanceI) > 2) return;

  if (Math.abs(distanceI) === 2) {
    // check if jumping a piece
    const middlePiece =
      game.board[oneCellForwardI][oneCellForwardJ];
    if (middlePiece === 0) return;
    if (middlePiece !== piece) {
      game.board[oneCellForwardI][oneCellForwardJ] = 0;
    } else {
      return;
    }
  }

  game.board[di][dj] = game.board[i][j];
  game.board[i][j] = 0;

  if (piece === RED_PAWN && di === BOTTOM_ROW) {
    game.board[di][dj] = RED_QUEEN;
  } else if (piece === BLACK_PAWN && di === TOP_ROW) {
    game.board[di][dj] = BLACK_QUEEN;
  }

  game.turn = game.turn === 'red' ? 'black' : 'red';
};


const takeAvailableJumpIfExist = (game, destination, selectedPiece) => {

  const {turn, board} = game;
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (turn === 'red' && i < 6) {
        if (board[i][j] === 1) {
          const result = takeAvailableJumpIfExistRedPlayer(board, destination, selectedPiece, i , j)
          if (typeof result == 'boolean'){
            return result
          }
        }
      }
      if (turn === 'black' && i > 1) {
          if (board[i][j] === 2) {
            const result = takeAvailableJumpIfExistBlackPlayer(board, destination, selectedPiece, i , j)
            if (typeof result == 'boolean'){
              return result
            }
          }
        }
      }
    }
    return true;
}

const takeAvailableJumpIfExistRedPlayer = (board, destination, selectedPiece, i , j) => {
  if (j <= 1) {
    if (board[i + 1][j + 1] === 2 && board[i + 2][j + 2] === 0) {
      if (destination.i !== i + 2 || destination.j !== j + 2) {
        return false;
      }
      else {
        if (selectedPiece.i == i && selectedPiece.j == j) {
          return true
        }
      }
    }
  }
  else if (j >= 6) {
    if (board[i + 1][j - 1] === 2 && board[i + 2][j - 2] === 0) {
      if (destination.i !== i + 2 || destination.j !== j - 2) {
        return false;
      } else {
        if (selectedPiece.i == i && selectedPiece.j == j) {
          return true
        }
      }
    }
  }
  else {
    if (board[i + 1][j + 1] === 2 && board[i + 2][j + 2] === 0) {
      if (destination.i !== i + 2 || destination.j !== j + 2) {
        return false;
      } else {
        if (selectedPiece.i == i && selectedPiece.j == j) {
          return true
        }
      }
    }
    if (board[i + 1][j - 1] === 2 && board[i + 2][j - 2] === 0) {
      if (destination.i !== i + 2 || destination.j !== j - 2) {
        return false;
      } else {
        return true
      }
    }
  }
  return null;
}
const takeAvailableJumpIfExistBlackPlayer = (board, destination, selectedPiece, i , j) => {
  if (j <= 1) {
    if (board[i - 1][j + 1] === 1 && board[i - 2][j + 2] === 0) {
      if (destination.i !== i - 2 || destination.j !== j + 2) {
        return false;
      } else {
        if (selectedPiece.i == i && selectedPiece.j == j) {
          return true
        }
      }
    }
  }
  else if (j >= 6) {
    if (board[i - 1][j - 1] === 1 && board[i - 2][j - 2] === 0) {
      if (destination.i !== i - 2 || destination.j !== j - 2) {
        return false;
      } else {
        if (selectedPiece.i == i && selectedPiece.j == j) {
          return true
        }
      }
    }
  }
  else {
    if (board[i - 1][j + 1] === 1 && board[i - 2][j + 2] === 0) {
      if (destination.i !== i - 2 || destination.j !== j + 2) {
        return false;
      } else {
        if (selectedPiece.i == i && selectedPiece.j == j) {
          return true
        }
      }
    }
    if (board[i - 1][j - 1] === 1 && board[i - 2][j - 2] === 0) {
      if (destination.i !== i - 2 || destination.j !== j - 2) {
        return false;
      } else {
        if (selectedPiece.i == i && selectedPiece.j == j) {
          return true
        }
      }
    }
  }
  return null;
}

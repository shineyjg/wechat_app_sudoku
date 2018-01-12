
function formatTime(sec) {
  sec = Math.floor(sec / 1000)
  let days = Math.floor(sec / (3600 * 24))
  sec = sec - days * 3600 * 24
  let hours = Math.floor(sec / (3600))
  sec = sec - hours * 3600
  let minutes = Math.floor(sec / 60)
  sec = sec - minutes * 60

  if (hours < 10) {
    hours = '0' + hours
  }

  if (minutes < 10) {
    minutes = '0' + minutes
  }

  if (sec < 10) {
    sec = '0' + sec
  }

  if (days > 0) {
    return days + 'days ' + hours + ':' + minutes + ':' + sec
  }
  else {
    return hours + ':' + minutes + ':' + sec
  }
}

function shuffle(array) {
  var n = array.length
  while (n--) {
    var i = Math.floor(n * Math.random())
    var tmp = array[i]
    array[i] = array[n]
    array[n] = tmp
  }
  return array
}

function printBoard(board) {
  let line
  for (i = 0; i < 9; i++) {
    line = ''
    for (j = 0; j < 9; j++) {
      if (j === 3 || j === 6) {
        line += ' '
      }
      if (board[i * 9 + j] > 0) {
        // line += chalk.red(board[i * 9 + j])
        line += board[i * 9 + j]
      }
      else {
        line += board[i * 9 + j]
      }
    }
    if (i === 3 || i === 6) {
      console.log('')
    }
    console.log(line)
  }
}

function printGame(board, answer) {
  let line
  for (i = 0; i < 9; i++) {
    line = ''
    for (j = 0; j < 9; j++) {
      if (j === 3 || j === 6) {
        line += ' '
      }
      if (board[i * 9 + j] > 0) {
        line += answer[i * 9 + j]
      }
      else {
        line += answer[i * 9 + j]
      }
    }
    if (i === 3 || i === 6) {
      console.log('')
    }
    console.log(line)
  }
}

function toGrid(game) {
  let b = new Array(3)
  let index,flatIndex,i,j,k,l
  for (i = 0; i < 3; i++) {
    b[i] = new Array(3)
    for (j = 0; j < 3; j++) {
      b[i][j] = new Array(3)
      for (k = 0; k < 3; k++) {
        b[i][j][k] = new Array(3)
        for (l = 0; l < 3; l++) {
          index = {
            gridIndex: {
              r: i,
              c: j
            },
            cellIndex: {
              r: k,
              c: l
            }
          }
          flatIndex = toFlatIndex(index)
          b[i][j][k][l] = {
            index: index,
            origin: game.board[flatIndex],
            digit: game.board[flatIndex],
            answer: game.answer[flatIndex],
            candidate: 0,
            mode: 0
          }
        }
      }
    }
  }
  return b
}

// function toFlat (board) {
//   let b = new Array(81)
//   let index
//   for (let i = 0; i < 81; i++) {
//     index = toGridIndex(i)
//     b[i] = board[index.gridIndex.r][index.gridIndex.c][index.cellIndex.r][index.cellIndex.c]
//   }
//   return b
// }

// function toGridIndex (index) {
//   let row = parseInt(index / 9)
//   let col = index % 9
//   let r = parseInt(row / 3)
//   let c = parseInt(col / 3)
//   return {
//     gridIndex: {
//       r: row,
//       c: col
//     },
//     cellIndex: {
//       r: r,
//       c: c
//     }
//   }
// }

function toFlatIndex(index) {
  return index.gridIndex.r * 27 + index.cellIndex.r * 9 + index.gridIndex.c * 3 + index.cellIndex.c
}

module.exports = {
  shuffle: shuffle,
  printBoard: printBoard,
  printGame: printGame,
  toGrid: toGrid,
  formatTime: formatTime
}

import React from 'react';
import { Chess, Move, PieceSymbol, SQUARES, Square } from 'chess.js';
import { Dimensions, Image } from 'react-native';

export function applyMoves(moves: Move[], startFen?: string): Chess {
  // startFen is the initial position the move list starts from. may be starting position or a position from a predefined position
  const chess = new Chess(
    startFen
      ? startFen
      : 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
  );
  moves.forEach((move) => chess.move(move.san));
  return chess;
}

export const pieceSetExports = {
  wp: {
    source: require('../assets/piecesets/standard/wp.png'),
    alt: 'wp',
  },
  wb: {
    source: require('../assets/piecesets/standard/wb.png'),
    alt: 'wb',
  },
  wn: {
    source: require('../assets/piecesets/standard/wn.png'),
    alt: 'wn',
  },
  wr: {
    source: require('../assets/piecesets/standard/wr.png'),
    alt: 'wr',
  },
  wq: {
    source: require('../assets/piecesets/standard/wq.png'),
    alt: 'wq',
  },
  wk: {
    source: require('../assets/piecesets/standard/wk.png'),
    alt: 'wk',
  },
  bp: {
    source: require('../assets/piecesets/standard/bp.png'),
    alt: 'bp',
  },
  bb: {
    source: require('../assets/piecesets/standard/bb.png'),
    alt: 'bb',
  },
  bn: {
    source: require('../assets/piecesets/standard/bn.png'),
    alt: 'bn',
  },
  br: {
    source: require('../assets/piecesets/standard/br.png'),
    alt: 'br',
  },
  bq: {
    source: require('../assets/piecesets/standard/bq.png'),
    alt: 'bq',
  },
  bk: {
    source: require('../assets/piecesets/standard/bk.png'),
    alt: 'bk',
  },
  vs: {
    source: require('../assets/endgameicons/vs.png'),
    alt: 'vs',
  },
};

const w = Dimensions.get('window').width / 12;
const h = Dimensions.get('window').height / 15;
export const EndgameIcons = {
 
  'wP.png': (
    <Image
      source={require('../assets/endgameicons/wP.png')}
      alt="white pawn"
      resizeMode="contain"
      key="white pawn endgame icon"
      style={{ width: h, height: h }}
    />
  ),
  'wB.png': (
    <Image
      source={require('../assets/endgameicons/wB.png')}
      alt="white bishop"
      resizeMode="contain"
      key="white bishop endgame icon"
      style={{ width: h, height: h }}
    />
  ),
  'wK.png': (
    <Image
      source={require('../assets/endgameicons/wK.png')}
      alt="white king"
      resizeMode="contain"
      key="white king endgame icon"
      style={{ width: h, height: h }}
    />
  ),
  'wR.png': (
    <Image
      source={require('../assets/endgameicons/wR.png')}
      alt="white rook"
      resizeMode="contain"
      key="white rook endgame icon"
      style={{ width: h, height: h }}
    />
  ),
  'wQ.png': (
    <Image
      source={require('../assets/endgameicons/wQ.png')}
      alt="white queen"
      resizeMode="contain"
      key="white queen endgame icon"
      style={{ width: h, height: h }}
    />
  ),
  'wN.png': (
    <Image
      source={require('../assets/endgameicons/wN.png')}
      alt="white knight"
      resizeMode="contain"
      key="white knight endgame icon"
      style={{ width: h, height: h }}
    />
  ),
  'bP.png': (
    <Image
      source={require('../assets/endgameicons/bP.png')}
      alt="black pawn"
      resizeMode="contain"
      key="black pawn endgame icon"
      style={{ width: h, height: h }}
    />
  ),
  'bB.png': (
    <Image
      source={require('../assets/endgameicons/bB.png')}
      alt="black bishop"
      resizeMode="contain"
      key="black bishop endgame icon"
      style={{ width: h, height: h }}
    />
  ),
  'bK.png': (
    <Image
      source={require('../assets/endgameicons/bK.png')}
      alt="black king"
      resizeMode="contain"
      key="black king endgame icon"
      style={{ width: h, height: h }}
    />
  ),
  'bR.png': (
    <Image
      source={require('../assets/endgameicons/bR.png')}
      alt="black rook"
      resizeMode="contain"
      key="black rook endgame icon"
      style={{ width: h, height: h }}
    />
  ),
  'bQ.png': (
    <Image
      source={require('../assets/endgameicons/bQ.png')}
      alt="black queen"
      resizeMode="contain"
      key="black queen endgame icon"
      style={{ width: h, height: h }}
    />
  ),
  'bN.png': (
    <Image
      source={require('../assets/endgameicons/bN.png')}
      alt="black knight"
      resizeMode="contain"
      key="black knight endgame icon"
      style={{ width: h, height: h }}
    />
  ),
  'easy.png': (
    <Image
      source={require('../assets/endgameicons/easy.png')}
      alt="pacifier"
      style={{ width: h, height: h }}
      resizeMode="contain"
      key="pacifier"
    />
  ),
  'vs.png': (
    <Image
      source={require('../assets/endgameicons/vs.png')}
      alt="vs"
      style={{ width: h, height: h }}
      resizeMode="contain"
      key="vs"
    />
  ),
};

//////////////////////////////////
// endgame subcategory to png list
//////////////////////////////////
export function subcategoryToIcons(s: string) {
  const d = {
    One: 1,
    Two: 2,
    Three: 3,
    Four: 4,
    Five: 5,
  };
  let passedVS = false;
  const res: string[][] = [[], [], []];
  let arr = s.split(' ');

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] in d) {
      //for loop
      for (let j = 0; j < d[arr[i] as keyof typeof d]; j++) {
        if (passedVS === false) {
          // white
          if (arr[i + 1] === 'Pawn' || arr[i + 1] === 'Pawns') {
            res[0].push('wp');
          }
          if (arr[i + 1] === 'Bishop' || arr[i + 1] === 'Bishops') {
            res[0].push('wb');
          }
          if (arr[i + 1] === 'Knight' || arr[i + 1] === 'Knights') {
            res[0].push('wn');
          }
          if (arr[i + 1] === 'Rook' || arr[i + 1] === 'Rooks') {
            res[0].push('wr');
          }
          if (arr[i + 1] === 'Queen' || arr[i + 1] === 'Queens') {
            res[0].push('wq');
          }
          if (arr[i + 1] === 'King' || arr[i + 1] === 'King') {
            res[0].push('wk');
          }
        } else {
          // black
          if (arr[i + 1] === 'Pawn' || arr[i + 1] === 'Pawns') {
            res[2].push('bp');
          }
          if (arr[i + 1] === 'Bishop' || arr[i + 1] === 'Bishops') {
            res[2].push('bb');
          }
          if (arr[i + 1] === 'Knight' || arr[i + 1] === 'Knights') {
            res[2].push('bn');
          }
          if (arr[i + 1] === 'Rook' || arr[i + 1] === 'Rooks') {
            res[2].push('br');
          }
          if (arr[i + 1] === 'Queen' || arr[i + 1] === 'Queens') {
            res[2].push('bq');
          }
          if (arr[i + 1] === 'King' || arr[i + 1] === 'King') {
            res[2].push('bk');
          }
        }
      }
    } else {
      if (passedVS === false) {
        if (arr[i] === 'Pawn') {
          res[0].push('wp');
        }
        if (arr[i] === 'Bishop') {
          res[0].push('wb');
        }
        if (arr[i] === 'Knight') {
          res[0].push('wn');
        }
        if (arr[i] === 'Rook') {
          res[0].push('wr');
        }
        if (arr[i] === 'Queen') {
          res[0].push('wq');
        }
        if (arr[i] === 'King') {
          res[0].push('wk');
        }
      } else {
        if (arr[i] === 'Pawn') {
          res[2].push('bp');
        }
        if (arr[i] === 'Bishop') {
          res[2].push('bb');
        }
        if (arr[i] === 'Knight') {
          res[2].push('bn');
        }
        if (arr[i] === 'Rook') {
          res[2].push('br');
        }
        if (arr[i] === 'Queen') {
          res[2].push('bq');
        }
        if (arr[i] === 'King') {
          res[2].push('bk');
        }
      }
    }

    if (arr[i] === 'vs') {
      // add vs to res
      res[1].push('vs');
      passedVS = true;
    }
  }
  return res;
}

//////////////////////
// MIND MELD FUNCTIONS
//////////////////////
export function nextMindMeldSquare(fen: string) {
  const chess = new Chess(fen);
  const legalMoves = chess.moves({ verbose: true });
  const memo: {
    [key: string]: number;
  } = {};
  for (const move of legalMoves) {
    if (move.to in memo) {
      memo[move.to] += 1;
    } else {
      if (move.flags !== 'n') {
        continue;
      }
      memo[move.to] = 1;
    }
  }
  const arr = Object.entries(memo);
  const filtered = arr.filter(([_key, value]) => value === 1);
  const rand = filtered[Math.floor(Math.random() * filtered.length)];
  return rand[0] as Square;
}

export function setupBoard(n: number) {
  const chess = new Chess();
  chess.clear();
  chess.put(
    { type: 'k', color: 'w' },
    SQUARES[Math.floor(Math.random() * SQUARES.length)],
  );
  chess.put(
    { type: 'k', color: 'b' },
    SQUARES[Math.floor(Math.random() * SQUARES.length)],
  );
  const pieces: PieceSymbol[] = ['b', 'n', 'r', 'q'];
  //const colors: Color[] = ['w', 'b'];
  for (let i = 0; i < n; i++) {
    let s = SQUARES[Math.floor(Math.random() * SQUARES.length)];

    // avoids collisions
    while (true) {
      if (!chess.get(s)) {
        chess.put(
          {
            type: pieces[Math.floor(Math.random() * pieces.length)],
            color: 'w',
          },
          s,
        );
        break;
      } else {
        s = SQUARES[Math.floor(Math.random() * SQUARES.length)];
      }
    }
  }
  for (let i = 0; i < n; i++) {
    let s = SQUARES[Math.floor(Math.random() * SQUARES.length)];

    // avoids collisions
    while (true) {
      if (!chess.get(s)) {
        chess.put(
          {
            type: pieces[Math.floor(Math.random() * pieces.length)],
            color: 'b',
          },
          s,
        );
        break;
      } else {
        s = SQUARES[Math.floor(Math.random() * SQUARES.length)];
      }
    }
  }
  return chess;
}

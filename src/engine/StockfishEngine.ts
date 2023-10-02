/*const stockfish = require('./stockfish.js');
class StockfishEngine {
  fen: string;
  engine: any;
  constructor() {
    this.engine = new stockfish();
    this.fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
    this.engine.onmessage = function (_data: string) {
      //console.log(data);
    };
    this.engine.postMessage('ucinewgame');
    this.engine.postMessage(`position fen ${this.fen}`);
    this.engine.postMessage('d');
    this.engine.postMessage('setoption name Skill level value 20');
    this.engine.postMessage('isready');
  }

  returnEngineMove(currFen: string) {
    let bestMove;
    this.engine.postMessage(`position fen ${currFen}`);
    this.engine.postMessage('go movetime 200');
    this.engine.onmessage = function (data: string) {
      //console.log(data);
      bestMove = data.match(/^bestmove\s([a-h][1-8])([a-h][1-8])/);
      console.log(bestMove);
    };
    return bestMove;
  }

  quit() {
    this.engine.postMessage('quit');
  }
}

const test = new StockfishEngine();
const res = test.returnEngineMove(
  'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR',
);
console.log(res);

export default StockfishEngine;*/
const Stockfish = require('./stockfish.asm');
class StockfishEngine {
    engine: any;
    constructor() {
        Stockfish().then((sf: any) => {
            console.log(sf);
        })
    }
}
export default StockfishEngine;
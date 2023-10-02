import { useCallback, useMemo } from 'react';
import type { Square } from './chess';
import { useChessboardProps } from './context/props-context/hooks';
import { useBoard } from './context/board-context/hooks';
import type { Vector } from './types';

const useReversePiecePosition = () => {
  const { pieceSize, playerColor } = useChessboardProps();
  const board = useBoard();
  const isWhite = useMemo(() => playerColor === 'w', [playerColor]);

  const calculateCol = useCallback(
    (col: number) => {
      'worklet';
      return isWhite ? 97 + col : 104 - col;
    },
    [isWhite],
  );

  const calculateRow = useCallback(
    (row: number) => {
      'worklet';
      return isWhite ? 8 - row : row + 1;
    },
    [isWhite],
  );

  const calculatePosition = useCallback(
    ({ x, y }: Vector) => {
      'worklet';
      if (isWhite) {
        return { x, y };
      } else {
        return {
          x: board[0].length - 1 - x,
          y: board.length - 1 - y,
        };
      }
    },
    [board, isWhite],
  );

  const toTranslation = useCallback(
    (to: Square) => {
      'worklet';
      const tokens = to.split('');
      const col = tokens[0];
      const row = tokens[1];
      if (!col || !row) {
        throw new Error('Invalid notation ' + to);
      }

      const x = isWhite
        ? col.charCodeAt(0) - 'a'.charCodeAt(0)
        : 'h'.charCodeAt(0) - col.charCodeAt(0);
      const indexes = {
        x,
        y: parseInt(row, 10) - 1,
      };
      const y = isWhite
        ? 7 * pieceSize - indexes.y * pieceSize
        : indexes.y * pieceSize + 1;
      return {
        x: indexes.x * pieceSize,
        y: y,
      };
    },
    [pieceSize, isWhite],
  );

  const toPosition = useCallback(
    ({ x, y }: Vector) => {
      'worklet';
      const col = String.fromCharCode(calculateCol(Math.round(x / pieceSize)));
      const row = `${calculateRow(Math.round(y / pieceSize))}`;

      return `${col}${row}` as Square;
    },
    [pieceSize, calculateCol, calculateRow],
  );

  return {
    toPosition,
    toTranslation,
    calculateCol,
    calculateRow,
    calculatePosition,
  };
};

export { useReversePiecePosition };

/*const useReversePiecePosition = () => {
	const { pieceSize } = useChessboardProps();

	const toTranslation = useCallback(
		(to: Square) => {
			'worklet';
			const tokens = to.split('');
			const col = tokens[0];
			const row = tokens[1];
			if (!col || !row) {
				throw new Error('Invalid notation: ' + to);
			}
			const indexes = {
				x: col.charCodeAt(0) - 'a'.charCodeAt(0),
				y: parseInt(row, 10) - 1,
			};
			return {
				x: indexes.x * pieceSize,
				y: 7 * pieceSize - indexes.y * pieceSize,
			};
		},
		[pieceSize]
	);

	const toPosition = useCallback(
		({ x, y }: Vector) => {
			'worklet';
			const col = String.fromCharCode(97 + Math.round(x / pieceSize));
			const row = `${8 - Math.round(y / pieceSize)}`;
			return `${col}${row}` as Square;
		},
		[pieceSize]
	);

	return { toPosition, toTranslation };
};

export { useReversePiecePosition };
*/

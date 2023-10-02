import type { PieceSymbol, Square } from 'chess.js';
import React, {
  createContext,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';
import type Animated from 'react-native-reanimated';
import { useSharedValue } from 'react-native-reanimated';
import { getChessboardState } from '../../helpers/get-chessboard-state';
import { useReversePiecePosition } from '../../notation';
import { useSetBoard } from '../board-context/hooks';
import { useBoardPromotion } from '../board-promotion-context/hooks';
import type { ChessboardRef } from '../board-refs-context';
import { usePieceRefs } from '../board-refs-context/hooks';
import { useChessEngine } from '../chess-engine-context/hooks';
import { useChessboardProps } from '../props-context/hooks';
const _ = require('lodash');

type BoardOperationsContextType = {
  selectableSquares: Animated.SharedValue<Square[]>;
  onMove: (from: Square, to: Square) => void;
  onSelectPiece: (square: Square) => void;
  moveTo: (to: Square) => void;
  isPromoting: (from: Square, to: Square) => boolean;
  selectedSquare: Animated.SharedValue<Square | null>;
  turn: Animated.SharedValue<'w' | 'b'>;
};

const BoardOperationsContext = createContext<BoardOperationsContextType>(
  {} as any,
);

export type BoardOperationsRef = {
  reset: () => void;
};

const BoardOperationsContextProviderComponent = React.forwardRef<
  BoardOperationsRef,
  { controller?: ChessboardRef; children?: React.ReactNode }
>(({ children, controller }, ref) => {
  const chess = useChessEngine();
  const setBoard = useSetBoard();
  const {
    pieceSize,
    onMove: onChessboardMoveCallback,
    colors: { checkmateHighlight },
    soundEnabled,
    hapticsEnabled,
    playerColor,
  } = useChessboardProps();
  const { toTranslation } = useReversePiecePosition();
  const selectableSquares = useSharedValue<Square[]>([]);
  const selectedSquare = useSharedValue<Square | null>(null);
  const { showPromotionDialog } = useBoardPromotion();
  const pieceRefs = usePieceRefs();

  ////////////////////
  // AUDIO //
  ////////////////////
  const [currentSound, setCurrentSound] = useState<Audio.Sound | null>(null);
  async function playSound(
    soundType: 'move' | 'check' | 'capture' | 'checkmate',
  ) {
    const allSounds = {
      move: require('../../assets/sound/move.mp3'),
      check: require('../../assets/sound/move.mp3'),
      capture: require('../../assets/sound/capture.mp3'),
      checkmate: require('../../assets/sound/checkmate.mp3'),
    };

    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    const { sound } = await Audio.Sound.createAsync(
      allSounds[soundType as keyof typeof allSounds],
    );
    setCurrentSound(sound);
    await sound.playAsync();
  }

  useEffect(() => {
    return currentSound
      ? () => {
          currentSound.unloadAsync();
        }
      : undefined;
  }, [currentSound]);
  ////////////////////
  // AUDIO //
  ////////////////////

  ////////////////////
  // HAPTICS //
  ////////////////////

  const moveHaptics = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  }, []);

  ////////////////////
  // HAPTICS //
  ////////////////////

  const turn = useSharedValue(chess.turn());

  useImperativeHandle(
    ref,
    () => ({
      reset: () => {
        selectableSquares.value = [];
        controller?.resetAllHighlightedSquares();
        turn.value = chess.turn();
      },
    }),
    [chess, controller, selectableSquares, turn],
  );

  const isPromoting = useCallback(
    (from: Square, to: Square) => {
      if (!to.includes('8') && !to.includes('1')) {
        return false;
      }

      const val = toTranslation(from);
      const x = Math.floor(val.x / pieceSize);
      const y = Math.floor(val.y / pieceSize);
      const piece = chess.board()[y][x];

      if (playerColor === 'w') {
        if (piece?.type === 'p') {
          if (piece.color === 'w' && to.includes('8')) {
            return true;
          } else if (piece.color === 'b' && to.includes('1')) {
            return true;
          }
        }
      } else {
        if (piece?.type === 'p') {
          console.log(piece.type);
          if (piece.color === 'w' && to.includes('8')) {
            return true;
          } else if (piece.color === 'b' && to.includes('1')) {
            return true;
          }
        }
      }
      return false;
      /*
			return playerColor === 'w'
				? piece?.type === 'p' &&
						((to.includes('8') && piece.color === 'w') ||
							(to.includes('1') && piece.color === 'b'))
				: piece?.type === 'p' &&
						((to.includes('8') && piece.color === 'w') ||
							(to.includes('1') && piece.color === 'b'));*/
    },
    [chess, pieceSize, playerColor, toTranslation],
  );

  const findKing = useCallback(
    (type: 'wk' | 'bk') => {
      const board = chess.board();
      for (let x = 0; x < board.length; x++) {
        const row = board[x];
        for (let y = 0; y < row.length; y++) {
          const col = String.fromCharCode(97 + Math.round(x));

          const currRow = `${8 - Math.round(y)}`;
          const square = `${col}${currRow}` as Square;

          const piece = chess.get(square);
          if (
            piece?.color === type.charAt(0) &&
            piece.type === type.charAt(1)
          ) {
            return square;
          }
        }
      }
      return null;
    },
    [chess],
  );

  const moveProgrammatically = useCallback(
    (from: Square, to: Square, promotionPiece?: PieceSymbol) => {
      const move = chess.move({
        from,
        to,
        promotion: promotionPiece as any,
      });
      if (move == null) {
        return;
      }

      turn.value = chess.turn();

      /*runOnJS(() => {
        //'worklet';
        setBoard(chess.board());
      });
      const updateBoard = () => {
        setBoard(chess.board());
      };
      runOnJS(updateBoard)();*/
      setBoard(chess.board());

      if (soundEnabled) {
        const gameCopy = _.cloneDeep(chess);
        gameCopy.undo();
        const squarePiece = gameCopy.get(to);
        if (squarePiece) {
          playSound('capture');
        } else if (chess.isCheck()) {
          playSound('check');
        } else {
          playSound('move');
        }
        if (
          chess.isCheckmate() ||
          chess.isDraw() ||
          chess.isThreefoldRepetition()
        ) {
          playSound('checkmate');
        }
      }
      if (hapticsEnabled) {
        moveHaptics();
      }

      const isCheckmate = chess.isCheckmate();

      if (isCheckmate) {
        const square = findKing(`${chess.turn()}k`);
        if (!square) {
          return;
        }
        controller?.highlight({ square, color: checkmateHighlight });
      }

      onChessboardMoveCallback?.({
        move,
        state: {
          ...getChessboardState(chess),
          inPromotion: promotionPiece != null,
        },
      });
    },
    [
      checkmateHighlight,
      chess,
      controller,
      findKing,
      hapticsEnabled,
      moveHaptics,
      onChessboardMoveCallback,
      setBoard,
      soundEnabled,
      turn,
    ],
  );

  const onMove = useCallback(
    (from: Square, to: Square) => {
      selectableSquares.value = [];
      selectedSquare.value = null;
      const lastMove = { from, to };
      controller?.resetAllHighlightedSquares();
      controller?.highlight({ square: lastMove.from });
      controller?.highlight({ square: lastMove.to });

      const in_promotion = isPromoting(from, to);
      if (!in_promotion) {
        moveProgrammatically(from, to);
        return;
      }

      pieceRefs?.current?.[to]?.current?.enable(false);
      showPromotionDialog({
        type: chess.turn(),
        onSelect: (piece) => {
          moveProgrammatically(from, to, piece);
          pieceRefs?.current?.[to]?.current?.enable(true);
        },
      });
    },
    [
      chess,
      controller,
      isPromoting,
      moveProgrammatically,
      pieceRefs,
      selectableSquares,
      selectedSquare,
      showPromotionDialog,
    ],
  );

  const onSelectPiece = useCallback(
    (square: Square) => {
      selectedSquare.value = square;

      const validSquares = (chess.moves({
        square,
      }) ?? []) as Square[];

      selectableSquares.value = validSquares.map((square) => {
        const splittedSquare = square.split('x');
        if (splittedSquare.length === 1) {
          // either no capture or is castling
          if (square === ('O-O' as Square)) {
            const currentTurn = chess.turn();
            if (currentTurn === 'w') {
              return 'g1' as Square;
            } else {
              return 'g8' as Square;
            }
          } else if (square === ('O-O-O' as Square)) {
            const currentTurn = chess.turn();
            if (currentTurn === 'w') {
              return 'c1' as Square;
            } else {
              return 'c8' as Square;
            }
          } else {
            return square;
          }
        }

        // second half capture like in Nxe4 -> just e4
        return splittedSquare[splittedSquare.length - 1] as Square;
      });
    },
    [chess, selectableSquares, selectedSquare],
  );

  const moveTo = useCallback(
    (to: Square) => {
      if (selectedSquare.value != null) {
        controller?.move({ from: selectedSquare.value, to: to });
        return true;
      }
      return false;
    },
    [controller, selectedSquare.value],
  );

  const value = useMemo(() => {
    return {
      onMove,
      onSelectPiece,
      moveTo,
      selectableSquares,
      selectedSquare,
      isPromoting,
      turn,
    };
  }, [
    isPromoting,
    moveTo,
    onMove,
    onSelectPiece,
    selectableSquares,
    selectedSquare,
    turn,
  ]);

  return (
    <BoardOperationsContext.Provider value={value}>
      {children}
    </BoardOperationsContext.Provider>
  );
});

const BoardOperationsContextProvider = React.memo(
  BoardOperationsContextProviderComponent,
);

export { BoardOperationsContextProvider, BoardOperationsContext };

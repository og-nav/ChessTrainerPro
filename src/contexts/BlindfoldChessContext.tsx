import React, {
  createContext,
  createRef,
  Dispatch,
  RefObject,
  SetStateAction,
  useRef,
  useState,
} from 'react';
import { ChessboardRef } from '../components/chessboard';
import { Move } from 'chess.js';

interface BlindfoldChessContextInterface {
  blindfoldChessboardRef: RefObject<ChessboardRef> | null;
  gameHistory: Move[];
  setGameHistory: Dispatch<SetStateAction<Move[]>>;
  playAsBlack: boolean;
  setPlayAsBlack: Dispatch<SetStateAction<boolean>>;
}

export const BlindfoldChessContext =
  createContext<BlindfoldChessContextInterface>({
    blindfoldChessboardRef: createRef<ChessboardRef>(),
    gameHistory: [],
    setGameHistory: () => {},
    playAsBlack: false,
    setPlayAsBlack: () => {},
  });

const BlindfoldChessProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const blindfoldChessboardRef = useRef<ChessboardRef>(null);
  const [gameHistory, setGameHistory] = useState<Move[]>([]);
  const [playAsBlack, setPlayAsBlack] = useState(false);
  return (
    <BlindfoldChessContext.Provider
      value={{
        blindfoldChessboardRef,
        gameHistory,
        setGameHistory,
        playAsBlack,
        setPlayAsBlack,
      }}>
      {children}
    </BlindfoldChessContext.Provider>
  );
};

export default BlindfoldChessProvider;

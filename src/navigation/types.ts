import { NavigatorScreenParams } from '@react-navigation/native';

export type DrawerParamList = {
  Main: undefined;
  Settings: undefined;
  About: undefined;
  'Endgame Trainer': NavigatorScreenParams<EndgameNavigatorParamList>;
  'Blindfold Chess': undefined;
  'Blindfold Tactics': undefined;
  Evaluation: undefined;
  'Guess The Elo': undefined;
  'Guess The Move': undefined;
  'Mind Meld': undefined;
  'Regular Tactics': undefined;
  'Tactical Foresight': undefined;
};

export type EndgameNavigatorParamList = {
  Categories: undefined;
  Subcategories: {
    subcategories: {
      games: {
        fen: string;
        target: string;
      }[];
      name: string;
    }[];
  };
  Positions: {
    games: {
      fen: string;
      target: string;
    }[];
  };
  Game: {
    fen: string;
    target: string;
  };
};

export type BlindfoldChessParamList = {
  'Play Blindfold Chess': undefined;
  'Blindfold Chess Moves': undefined;
  'Blindfold Chess Board': undefined;
  'Blindfold Chess Settings': undefined;
};

export type AuthenticationParamList = {
  Welcome: undefined;
  'Sign In': undefined;
  'Sign Up': undefined;
};

import React, { createContext, useState } from 'react';

interface GlobalSettings {
  // state
  displayName: string;
  boardColors: { white: string; black: string };
  hapticsEnabled: boolean;
  soundEnabled: boolean;

  // state actions
  resetProgress: () => void;
  toggleDisplayName: (name: string) => void;
  toggleBoardColors: (num: number) => void;
  toggleHaptics: () => void;
  toggleSound: () => void;
}

const defaultGlobalSettings = {
  displayName: '',
  boardColors: { white: '#F0D9B5', black: '#B58863' },
  hapticsEnabled: true,
  soundEnabled: true,
  resetProgress: () => {},
  toggleDisplayName: () => {},
  toggleBoardColors: () => {},
  toggleHaptics: () => {},
  toggleSound: () => {},
};

export const GlobalSettingsContext = createContext<GlobalSettings>(
  defaultGlobalSettings,
);

export const boardColorOptions = {
  1: {
    black: '#B58863',
    white: '#F0D9B5',
  },
  2: {
    black: '#82A05C',
    white: '#EEEFD4',
  },
  3: {
    black: '#759655',
    white: '#EEEED1',
  },
};

const GlobalSettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [displayName, setDisplayName] = useState(
    defaultGlobalSettings.displayName,
  );
  const [boardColors, setBoardColors] = useState(
    defaultGlobalSettings.boardColors,
  );
  const [hapticsEnabled, setHaptics] = useState(
    defaultGlobalSettings.hapticsEnabled,
  );
  const [soundEnabled, setSound] = useState(defaultGlobalSettings.soundEnabled);
  const resetProgress = () => {
    console.log(' progress is reset!');
  };

  const toggleDisplayName = (name: string) => {
    setDisplayName(name);
  };
  const toggleBoardColors = (num: number) => {
    setBoardColors({
      ...boardColors,
      black: boardColorOptions[num as keyof typeof boardColorOptions].black,
      white: boardColorOptions[num as keyof typeof boardColorOptions].white,
    });
  };
  const toggleHaptics = () => {
    setHaptics((prev) => !prev);
  };
  const toggleSound = () => {
    setSound((prev) => !prev);
  };

  return (
    <GlobalSettingsContext.Provider
      value={{
        displayName,
        toggleDisplayName,
        boardColors,
        toggleBoardColors,
        hapticsEnabled,
        toggleHaptics,
        soundEnabled,
        toggleSound,
        resetProgress,
      }}>
      {children}
    </GlobalSettingsContext.Provider>
  );
};

export default GlobalSettingsProvider;

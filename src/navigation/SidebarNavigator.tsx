import React from 'react';
import {
  DrawerContentComponentProps,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Sidebar from '../components/Sidebar';
import { DrawerParamList } from './types';
import BlindfoldChessProvider from '../contexts/BlindfoldChessContext';

//screens
import { Main, Settings, About } from '../screens';
import {
  BlindfoldChess,
  BlindfoldTactics,
  Evaluation,
  GuessTheElo,
  GuessTheMove,
  MindMeld,
  RegularTactics,
  TacticalForesight,
} from '../screens';
import EndgameTrainerNavigator from './EndgameTrainerNavigator';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return <Sidebar {...props} />;
}

const Drawer = createDrawerNavigator<DrawerParamList>();

function SidebarNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Endgame Trainer"
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000',
      }}
      useLegacyImplementation={false}>
      <Drawer.Screen name="Main" component={Main} />
      <Drawer.Screen name="Settings" component={Settings} />
      <Drawer.Screen name="About" component={About} />
      <Drawer.Screen name="Blindfold Chess">
        {() => (
          <BlindfoldChessProvider>
            <BlindfoldChess />
          </BlindfoldChessProvider>
        )}
      </Drawer.Screen>
      <Drawer.Screen
        name="Endgame Trainer"
        component={EndgameTrainerNavigator}
      />
      <Drawer.Screen name="Blindfold Tactics" component={BlindfoldTactics} />
      <Drawer.Screen name="Evaluation" component={Evaluation} />
      <Drawer.Screen name="Guess The Elo" component={GuessTheElo} />
      <Drawer.Screen name="Guess The Move" component={GuessTheMove} />
      <Drawer.Screen name="Mind Meld" component={MindMeld} />
      <Drawer.Screen name="Regular Tactics" component={RegularTactics} />
      <Drawer.Screen name="Tactical Foresight" component={TacticalForesight} />
    </Drawer.Navigator>
  );
}
export default SidebarNavigator;

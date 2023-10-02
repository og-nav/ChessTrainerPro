import React, { useCallback } from 'react';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import AnimatedFeather from './AnimatedFeather';
import AnimatedView from './AnimatedView';
import ThemeToggle from './ThemeToggle';
import SidebarButton from './SidebarButton';
import AnimatedText from './AnimatedText';
import { primary } from '../contexts/ThemeContext';

const Sidebar: React.FC<DrawerContentComponentProps> = props => {
  const { state, navigation } = props;
  const currentRoute = state.routeNames[state.index];

  const handlePressBackButton = useCallback(() => {
    navigation.closeDrawer();
  }, [navigation]);

  const handlePressMain = useCallback(() => {
    navigation.navigate('Main');
  }, [navigation]);

  const handlePressBlindfoldChess = useCallback(() => {
    navigation.navigate('Blindfold Chess');
  }, [navigation]);

  const handlePressEndgameTrainer = useCallback(() => {
    navigation.navigate('Endgame Trainer');
  }, [navigation]);

  const handlePressBlindfoldTactics = useCallback(() => {
    navigation.navigate('Blindfold Tactics');
  }, [navigation]);

  const handlePressMindMeld = useCallback(() => {
    navigation.navigate('Mind Meld');
  }, [navigation]);

  const handlePressRegularTactics = useCallback(() => {
    navigation.navigate('Regular Tactics');
  }, [navigation]);

  const handlePressTacticalForesight = useCallback(() => {
    navigation.navigate('Tactical Foresight');
  }, [navigation]);

  const handlePressGuessTheMove = useCallback(() => {
    navigation.navigate('Guess The Move');
  }, [navigation]);

  const handlePressGuessTheElo = useCallback(() => {
    navigation.navigate('Guess The Elo');
  }, [navigation]);

  const handlePressEvaluation = useCallback(() => {
    navigation.navigate('Evaluation');
  }, [navigation]);

  const handlePressSettings = useCallback(() => {
    navigation.navigate('Settings');
  }, [navigation]);

  const handlePressAbout = useCallback(() => {
    navigation.navigate('About');
  }, [navigation]);

  const cc = { light: primary[100], dark: primary[700] };

  return (
    <AnimatedView
      style={{
        flex: 1,
        padding: 20,
        paddingTop: 10,
        alignItems: 'center',
      }}
      customColors={cc}
      safe={true}>
      <AnimatedView
        style={{ flex: 1, width: '100%', marginTop: 4 }}
        customColors={cc}>
        <AnimatedView
          customColors={cc}
          style={{ alignItems: 'flex-end', marginBottom: 4 }}>
          <AnimatedFeather
            onPress={handlePressBackButton}
            name={'chevron-left'}
            size={30}
            customColors={{ light: primary[900], dark: 'white' }}
            style={{ marginBottom: 8 }}
          />
        </AnimatedView>
        {/*}
        <SidebarButton
          active={currentRoute === 'Main'}
          onPress={handlePressMain}
          icon="inbox">
          <AnimatedText
            style={{ fontSize: 16 }}
            customColors={
              currentRoute === 'Main'
                ? { light: 'white', dark: 'white' }
                : { light: primary[900], dark: 'white' }
            }>
            Main
          </AnimatedText>
        </SidebarButton>
       */}

        <SidebarButton
          active={currentRoute === 'Endgame Trainer'}
          onPress={handlePressEndgameTrainer}
          icon="chess-board">
          <AnimatedText
            style={{ fontSize: 16 }}
            customColors={
              currentRoute === 'Endgame Trainer'
                ? { light: 'white', dark: 'white' }
                : { light: primary[900], dark: 'white' }
            }>
            Endgame Trainer
          </AnimatedText>
        </SidebarButton>

        <SidebarButton
          active={currentRoute === 'Blindfold Chess'}
          onPress={handlePressBlindfoldChess}
          icon="chess">
          <AnimatedText
            style={{ fontSize: 16 }}
            customColors={
              currentRoute === 'Blindfold Chess'
                ? { light: 'white', dark: 'white' }
                : { light: primary[900], dark: 'white' }
            }>
            Blindfold Chess
          </AnimatedText>
        </SidebarButton>
        {/*
        <SidebarButton
          active={currentRoute === 'Blindfold Tactics'}
          onPress={handlePressBlindfoldTactics}
          icon="puzzle-piece">
          <AnimatedText
            style={{ fontSize: 16 }}
            customColors={
              currentRoute === 'Blindfold Tactics'
                ? { light: 'white', dark: 'white' }
                : { light: primary[900], dark: 'white' }
            }>
            Blindfold Tactics
          </AnimatedText>
          </SidebarButton>

        <SidebarButton
          active={currentRoute === 'Mind Meld'}
          onPress={handlePressMindMeld}
          icon="brain">
          <AnimatedText
            style={{ fontSize: 16 }}
            customColors={
              currentRoute === 'Mind Meld'
                ? { light: 'white', dark: 'white' }
                : { light: primary[900], dark: 'white' }
            }>
            Mind Meld
          </AnimatedText>
        </SidebarButton>*/}

        {/*<SidebarButton
          active={currentRoute === 'Regular Tactics'}
          onPress={handlePressRegularTactics}
          icon="delicious">
          <AnimatedText
            style={{ fontSize: 16 }}
            customColors={
              currentRoute === 'Regular Tactics'
                ? { light: 'white', dark: 'white' }
                : { light: primary[900], dark: 'white' }
            }>
            Regular Tactics
          </AnimatedText>
        </SidebarButton>

        {/*<SidebarButton
					active={currentRoute === 'Guess The Move'}
					onPress={handlePressGuessTheMove}
					icon='question'
				>
					<AnimatedText
						style={{ fontSize: 16 }}
						customColors={
							currentRoute === 'Guess The Move'
								? { light: 'white', dark: 'white' }
								: { light: primary[900], dark: 'white' }
						}
					>
						Guess The Move
					</AnimatedText>
					</SidebarButton>

        <SidebarButton
          active={currentRoute === 'Tactical Foresight'}
          onPress={handlePressTacticalForesight}
          icon="glasses">
          <AnimatedText
            style={{ fontSize: 16 }}
            customColors={
              currentRoute === 'Tactical Foresight'
                ? { light: 'white', dark: 'white' }
                : { light: primary[900], dark: 'white' }
            }>
            Tactical Foresight
          </AnimatedText>
        </SidebarButton>*/}

        {/*<SidebarButton
					active={currentRoute === 'Evaluation'}
					onPress={handlePressEvaluation}
					icon='hashtag'
				>
					<AnimatedText
						style={{ fontSize: 16 }}
						customColors={
							currentRoute === 'Evaluation'
								? { light: 'white', dark: 'white' }
								: { light: primary[900], dark: 'white' }
						}
					>
						Evaluation
					</AnimatedText>
					</SidebarButton>

				<SidebarButton
					active={currentRoute === 'Guess The Elo'}
					onPress={handlePressGuessTheElo}
					icon='poo'
				>
					<AnimatedText
						style={{ fontSize: 16 }}
						customColors={
							currentRoute === 'Guess The Elo'
								? { light: 'white', dark: 'white' }
								: { light: primary[900], dark: 'white' }
						}
					>
						Guess The Elo
					</AnimatedText>
					</SidebarButton>*/}
        {/*
        <SidebarButton
          active={currentRoute === 'Settings'}
          onPress={handlePressSettings}
          icon="wrench">
          <AnimatedText
            style={{ fontSize: 16 }}
            customColors={
              currentRoute === 'Settings'
                ? { light: 'white', dark: 'white' }
                : { light: primary[900], dark: 'white' }
            }>
            Settings
          </AnimatedText>
        </SidebarButton>

        <SidebarButton
          active={currentRoute === 'About'}
          onPress={handlePressAbout}
          icon="info-circle">
          <AnimatedText
            style={{ fontSize: 16 }}
            customColors={
              currentRoute === 'About'
                ? { light: 'white', dark: 'white' }
                : { light: primary[900], dark: 'white' }
            }>
            About
          </AnimatedText>
          </SidebarButton>*/}
      </AnimatedView>
      <ThemeToggle />
    </AnimatedView>
  );
};

export default Sidebar;

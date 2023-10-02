import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import AnimatedText from '../components/AnimatedText';
import AnimatedView from '../components/AnimatedView';
import Chessboard, { ChessboardRef } from '../components/chessboard';

const Main = () => {
  const chessboardRef = useRef<ChessboardRef>(null);

  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <Navbar />
      <AnimatedText>Main</AnimatedText>
      <Chessboard
        ref={chessboardRef}
        durations={{ move: 250 }}
        playerColor="b"
        //onMove={({ state }) => {
        //	setFen(state.fen);
        //}}
      />
      {/*
			<Pressable
				style={{ height: 150, width: 150, backgroundColor: 'white' }}
				onPress={() => chessboardRef.current?.undo()}
			>
				<Text>undo</Text>
				<Text>{fen}</Text>
			</Pressable>*/}
    </AnimatedView>
  );
};

export default Main;

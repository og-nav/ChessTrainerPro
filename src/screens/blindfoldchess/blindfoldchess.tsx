import React, { useContext, useState } from 'react';
import { AnimatedView, AnimatedText } from '../../components';
import {
  Dimensions,
  FlatList,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  scrollTo,
  SharedValue,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Navbar from '../../components/Navbar';

import BlindfoldChessPlay from './blindfoldchessplay';
import BlindfoldChessMoves from './blindfoldchessmoves';
import BlindfoldChessBoard from './blindfoldchessboard';
import BlindfoldChessSettings from './blindfoldchesssettings';
import { ThemeContext, defaultColors } from '../../contexts/ThemeContext';
//import { BlindfoldChessContext } from '../../contexts/BlindfoldChessContext';
import BlindfoldChessProvider from '../../contexts/BlindfoldChessContext';

const { width } = Dimensions.get('screen');

interface TabsProps {
  tabName: string;
  screen: JSX.Element;
}

const tabs: TabsProps[] = [
  {
    tabName: 'Play',
    screen: <BlindfoldChessPlay />,
  },
  {
    tabName: 'Moves',
    screen: <BlindfoldChessMoves />,
  },
  {
    tabName: 'Board',
    screen: <BlindfoldChessBoard />,
  },
  {
    tabName: 'Settings',
    screen: <BlindfoldChessSettings />,
  },
  //engine strength
  //color played (white or black)
];

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
interface FlatListViewProps {
  item: TabsProps;
}

interface FlatListTextProps {
  item: TabsProps;
  index: number;
  viewTranslatePoints: number[];
  setViewTranslatePoints: React.Dispatch<React.SetStateAction<number[]>>;
  tabWidths: number[];
  setTabWidths: React.Dispatch<React.SetStateAction<number[]>>;
}

const FlatListView: React.FC<FlatListViewProps> = ({ item }) => {
  return (
    <Animated.View key={item.tabName} style={styles.FLView}>
      {item.screen}
    </Animated.View>
  );
};

const FlatListText: React.FC<FlatListTextProps> = ({
  item,
  index,
  viewTranslatePoints,
  setViewTranslatePoints,
  tabWidths,
  setTabWidths,
}) => {
  const handleViewLayout = (event: LayoutChangeEvent) => {
    const { x } = event.nativeEvent.layout;
    const currentPoints = [...viewTranslatePoints];
    currentPoints[index] = x;
    setViewTranslatePoints(currentPoints);
  };

  const handleTextLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    const currentTabWidths = [...tabWidths];
    currentTabWidths[index] = width;
    setTabWidths(currentTabWidths);
  };

  return (
    <AnimatedView onLayout={handleViewLayout} key={item.tabName}>
      <AnimatedText
        onLayout={handleTextLayout}
        //fontSize={'md'}
        //fontWeight={500}
        style={{
          fontSize: 17,
          fontWeight: '500',
        }}>
        {item.tabName}
      </AnimatedText>
    </AnimatedView>
  );
};

interface tabProps {
  scrollXValue: SharedValue<number>;
}

const Tabs: React.FC<tabProps> = ({ scrollXValue }) => {
  const { theme } = useContext(ThemeContext);
  const [viewTranslatePoints, setViewTranslatePoints] = useState<number[]>([]);
  const [tabWidths, setTabWidths] = useState<number[]>([]);
  const indicatorStyle = useAnimatedStyle(() => {
    return tabWidths.length === 4 && viewTranslatePoints.length === 4
      ? {
          width: interpolate(
            scrollXValue.value,
            [0, width, 2 * width, 3 * width],
            [tabWidths[0], tabWidths[1], tabWidths[2], tabWidths[3]],
            Extrapolation.CLAMP,
          ),
          transform: [
            {
              translateX: interpolate(
                scrollXValue.value,
                [0, width, 2 * width, 3 * width],
                [
                  viewTranslatePoints[0],
                  viewTranslatePoints[1],
                  viewTranslatePoints[2],
                  viewTranslatePoints[3],
                ],
                Extrapolation.CLAMP,
              ),
            },
          ],
        }
      : {
          width: 0,
          transform: [{ translateX: 0 }],
        };
  });

  return (
    <AnimatedView style={styles.tv}>
      <AnimatedView style={styles.tvv}>
        {tabs.map((value, index) => {
          return (
            <FlatListText
              key={value.tabName}
              item={value}
              index={index}
              viewTranslatePoints={viewTranslatePoints}
              setViewTranslatePoints={setViewTranslatePoints}
              tabWidths={tabWidths}
              setTabWidths={setTabWidths}
            />
          );
        })}
      </AnimatedView>
      <Animated.View
        style={[
          styles.tvvv,
          indicatorStyle,
          {
            backgroundColor:
              theme === 'dark'
                ? defaultColors.light.view
                : defaultColors.dark.view,
          },
        ]}
      />
    </AnimatedView>
  );
};

const TabBar = () => {
  const { top } = useSafeAreaInsets();
  const scrollValue = useSharedValue(0);
  const scrollRef = useAnimatedRef();
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollValue.value = event.contentOffset.x;
    },
  });

  const scrollMomentumEndHandler = useAnimatedScrollHandler({
    onMomentumEnd: (event) => {
      const scrollDiff = event.contentOffset.x % width;
      if (scrollDiff > width / 2) {
        const scrollMultiplier = Math.ceil(event.contentOffset.x / width);
        scrollTo(scrollRef, scrollMultiplier * width, 0, true);
      } else {
        const scrollMultiplier = Math.floor(event.contentOffset.x / width);
        scrollTo(scrollRef, scrollMultiplier * width, 0, true);
      }
    },
  });

  return (
    <AnimatedView
      //flex={1} pt={top} bg={useColorModeValue('white', 'primary.900')}>
      style={{ flex: 1, marginTop: top / 2 }}>
      <Tabs scrollXValue={scrollValue} />
      <LinearGradient
        colors={['rgba(0,0,0,1)', 'transparent']}
        style={{ position: 'absolute', height: top * 2, zIndex: 10 }}
      />
      <AnimatedFlatList
        ref={scrollRef}
        onMomentumScrollEnd={scrollMomentumEndHandler}
        onScroll={scrollHandler}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        scrollEventThrottle={16}
        bounces={false}
        style={{ position: 'relative', zIndex: 0 }}
        data={tabs}
        renderItem={({ item }) => {
          return <FlatListView item={item as TabsProps} />;
        }}
      />
    </AnimatedView>
  );
};

function BlindfoldChess() {
  return (
    <AnimatedView style={{ flex: 1 }} safe={true}>
      <Navbar />
      <BlindfoldChessProvider>
        <TabBar />
      </BlindfoldChessProvider>
    </AnimatedView>
  );
}

const styles = StyleSheet.create({
  FLView: {
    height: '100%',
    width: width,
  },
  tv: {
    position: 'absolute',
    width: '100%',
    zIndex: 20,
    paddingHorizontal: 16,
  },
  tvv: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  tvvv: {
    position: 'relative',
    height: 6,
    width: 120,
    borderRadius: 6,
    top: 3,
  },
});

export default React.memo(BlindfoldChess);

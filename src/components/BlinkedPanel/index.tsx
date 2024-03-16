import React, { ReactElement } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSequence, withTiming } from 'react-native-reanimated';

interface BlinkedPanelProps {
  blinking?: boolean;
  invertedBlink?: boolean;
  children: ReactElement;
}

const BlinkedPanel: React.FC<BlinkedPanelProps> = ({ children, blinking = true, invertedBlink = false}) => {
  const opacity = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const startBlinking = () => {
    opacity.value = withSequence(
      withTiming(0, { duration: 500 }), // Opacidade para 0
      withTiming(1, { duration: 500 }) // Opacidade para 1
    );
  };

  React.useEffect(() => {
    if (blinking) {
      const intervalId = setInterval(startBlinking, 1000);
      return () => clearInterval(intervalId);
    } else {
      if (!invertedBlink) {
        opacity.value = 1; // Reinicia a opacidade para 1 quando parar de piscar
      } else {
        opacity.value = 0;
      }
    }
  }, [blinking]);

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 150,
  },
});

export default BlinkedPanel;
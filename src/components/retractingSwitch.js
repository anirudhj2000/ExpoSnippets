import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const RetractingSwitch = ({ value, onChange }) => {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const HandleChange = () => onChange();

  const tap = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {})
    .onChange((event) => {
      console.log("event", event.translationX);
      offset.value = Math.min(event.translationX, 72);
    })
    .onFinalize(() => {
      if (offset.value > 70) {
        HandleChange();
        console.log("offsert", offset.value);
      }
      offset.value = withTiming(0);
    });

  return (
    <ImageBackground
      source={
        value
          ? require("../../assets/day.png")
          : require("../../assets/night.png")
      }
      style={styles.body}
      resizeMode="contain"
    >
      <GestureDetector gesture={tap}>
        <Animated.View style={[styles.switchToggle, animatedStyles]}>
          <Image
            source={
              value
                ? require("../../assets/Sun.png")
                : require("../../assets/Moon.png")
            }
            resizeMode="contain"
            style={styles.switchToggle}
          />
        </Animated.View>
      </GestureDetector>
    </ImageBackground>
  );
};

const styles = new StyleSheet.create({
  body: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120,
    borderColor: "#c7c7c7",
    padding: 1,
  },
  switchToggle: {
    height: 40,
    width: 40,
    borderRadius: 48,
  },
});

export default RetractingSwitch;

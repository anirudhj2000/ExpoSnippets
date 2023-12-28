import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
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
    <View style={styles.body}>
      <GestureDetector gesture={tap}>
        <Animated.View style={[styles.switchToggle, animatedStyles]} />
      </GestureDetector>
      <View style={{ marginHorizontal: "5%" }}>
        <Text>{value ? "On" : "Off"}</Text>
      </View>
    </View>
  );
};

const styles = new StyleSheet.create({
  body: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 120,
    height: 48,
    borderRadius: 48,
    borderColor: "#c7c7c7",
    borderWidth: 1,
    padding: 1,
  },
  switchToggle: {
    height: 44,
    width: 44,
    borderRadius: 48,
    backgroundColor: "#c7c7c7",
  },
});

export default RetractingSwitch;

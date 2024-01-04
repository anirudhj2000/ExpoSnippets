import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const FloatingActionButtonDemo = () => {
  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const [showDelete, setShowDelete] = React.useState(false);
  const [hideIcon, setHideIcon] = React.useState(false);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value },
    ],
  }));

  const HandleChange = () => onChange();

  const handleShowDelete = () => setShowDelete(!showDelete);
  const handleHideIcon = () => setHideIcon(true);

  const tap = Gesture.Pan()
    .runOnJS(true)
    .onBegin(() => {
      handleShowDelete();
    })
    .onChange((event) => {
      positionX.value = event.translationX;
      positionY.value = event.translationY;
    })
    .onFinalize(() => {
      if (positionX.value < width * 0.5) {
        positionX.value = width * 0.01;
      } else {
        positionX.value = width * 0.88;
      }

      if (positionY.value > height * 0.6) {
        handleHideIcon();
      }

      handleShowDelete();
    });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "#fff" }}>
          Draggable Floating Action Button
        </Text>
      </View>

      {!hideIcon ? (
        <GestureDetector gesture={tap}>
          <Animated.View
            style={[
              animatedStyles,
              { height: height * 0.05, width: height * 0.05 },
            ]}
          >
            <View
              style={{
                backgroundColor: "#d295f5",
                height: height * 0.05,
                width: height * 0.05,
                margin: "1%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 8,
              }}
            >
              <Text style={{ fontSize: 24, color: "#fff" }}>+</Text>
            </View>
          </Animated.View>
        </GestureDetector>
      ) : (
        <View
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              borderRadius: 8,
            }}
            onPress={() => {
              positionX.value = 0;
              positionY.value = 0;
              setHideIcon(false);
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                margin: "2%",
              }}
            >
              Show Icon
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {showDelete ? (
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={{
            height: height * 0.2,
            width: "100%",
            position: "absolute",
            bottom: 0,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: height * 0.075,
              width: height * 0.075,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: height * 0.075,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          >
            <AntDesign name="delete" size={24} color="white" />
            <Text style={{ color: "#fff" }}>Close</Text>
          </View>
        </LinearGradient>
      ) : null}
    </SafeAreaView>
  );
};

export default FloatingActionButtonDemo;

const styles = new StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    backgroundColor: "#2647b5",
  },

  title: {
    height: height * 0.1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

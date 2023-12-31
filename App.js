import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import RetractingSwitchDemo from "./src/screens/retractingSwitchDemo";
import FloatingActionButtonDemo from "./src/screens/floatingActionMenuDemo";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FloatingActionButtonDemo />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

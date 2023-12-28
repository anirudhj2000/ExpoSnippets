import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RetractingSwitch from "../components/retractingSwitch";

const RetractingSwitchDemo = () => {
  const [value, setValue] = useState(false);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: !value ? "#000" : "#fff",
      }}
    >
      <View style={{ display: "flex", marginBottom: "10%" }}>
        <Text
          style={{
            fontSize: 32,
            color: value ? "#000" : "#fff",
            fontWeight: "bold",
          }}
        >
          Retracting Switch
        </Text>
      </View>
      <RetractingSwitch
        value={value}
        onChange={() => {
          setValue(!value);
        }}
      />
    </View>
  );
};

export default RetractingSwitchDemo;

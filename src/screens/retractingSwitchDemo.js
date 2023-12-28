import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RetractingSwitch from "../components/retractingSwitch";

const RetractingSwitchDemo = () => {
  const [value, setValue] = useState(false);
  return (
    <View style={{ display: "flex", flexDirection: "column" }}>
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

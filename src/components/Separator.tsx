import React, { PureComponent } from "react";
import { View } from "react-native";
import { Colors, Fonts } from "src/common";

const Separator = () => {
  return <View style={{ height: 0.5, backgroundColor: Colors.inputBorder, marginHorizontal: Fonts.w(20) }} />;
};

export default Separator;

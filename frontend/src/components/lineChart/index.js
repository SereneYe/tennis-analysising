import React from "react";
import { Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";

export const LineChartComponent = () => {
  const OFFSET = 50;
  const data = [
    { value: 66 },
    { value: 68 },
    { value: 72 },
    { value: 68 },
    { value: 78 },
    { value: 65 },
    { value: 80 },
    { value: 67 },
    { value: 77 },
    { value: 68 },
    { value: 72 },
    { value: 78 },
    { value: 67 },
    { value: 71 },
    { value: 68 },
    { value: 78 },
    { value: 65 },
    { value: 82 },
  ];

  return (
    <View style={{}}>
      <LineChart
        areaChart
        curved
        data={data}
        hideDataPoints
        spacing={15}
        color1="#6A994E"
        startFillColor="#6A994E"
        endFillColor="#6A994E"
        startOpacity={0.9}
        endOpacity={0.2}
        initialSpacing={0}
        noOfSections={4}
        yAxisColor={theme.colors.textDark}
        yAxisThickness={0}
        rulesType="solid"
        rulesColor={theme.colors.textDark}
        yAxisTextStyle={{ color: theme.colors.textDark }}
        xAxisColor={theme.colors.textDark}
        yAxisOffset={50}
      />
    </View>
  );
};

export default LineChartComponent;

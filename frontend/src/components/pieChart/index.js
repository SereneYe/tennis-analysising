import React from "react";
import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";

const PieChartComponent = () => {
  const pieData = [
    {
      value: 47,
      color: "#6A994E",
      gradientCenterColor: "#386641",
      focused: true,
    },
    { value: 40, color: "#BACD92", gradientCenterColor: "#BACD92" },
    { value: 16, color: "#FFF5CD", gradientCenterColor: "#FFF5CD" },
    { value: 3, color: "#F29C6E", gradientCenterColor: "#F29C6E" },
  ];

  const renderDot = (color) => {
    return (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  const renderLegendComponent = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 10,
            marginLeft: 25,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#6A994E")}
            <Text style={{ color: theme.colors.textDark }}>Excellent: 47%</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#FFF5CD")}
            <Text style={{ color: theme.colors.textDark }}>Okay: 16%</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginLeft: 25,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: 120,
              marginRight: 20,
            }}
          >
            {renderDot("#BACD92")}
            <Text style={{ color: theme.colors.textDark }}>Good: 40%</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", width: 120 }}
          >
            {renderDot("#F29C6E")}
            <Text style={{ color: theme.colors.textDark }}>Poor: 3%</Text>
          </View>
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        marginBottom: hp(2),
      }}
    >
      <View style={{ padding: 20, alignItems: "center" }}>
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          centerLabelComponent={() => {
            return (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    fontSize: 22,
                    color: theme.colors.textDark,
                    fontWeight: "bold",
                  }}
                >
                  47%
                </Text>
                <Text style={{ fontSize: 18, color: theme.colors.textDark }}>
                  Excellent
                </Text>
              </View>
            );
          }}
        />
      </View>
      {renderLegendComponent()}
    </View>
  );
};

export default PieChartComponent;

import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import React from "react";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";
import RenderHtml from "react-native-render-html";
import Avatar from "../avartar/index";
import { styles, tagsStyles } from "./styles";
import * as Progress from "react-native-progress";

import PieChartComponent from "../pieChart";
import BarChartComponent from "../barChart";
import LineChartComponent from "../lineChart";

const SummaryCard = ({ item, user }) => {
  const htmlBody = { html: item?.body };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* user info and post time */}
        <View style={styles.userInfo}>
          <Avatar
            size={hp(4.5)}
            uri={
              user.image ? user.image : require("../../images/defaultUser.png")
            }
            rounded={theme.radius.md}
          />
          <View style={{ gap: 2 }}>
            <Text style={styles.username}>
              {user.name ? user.name : "Default Name"}
            </Text>
          </View>
        </View>
      </View>

      {/* post image & body */}
      <View style={styles.content}>
        <View style={styles.postBody}>
          {item?.body && (
            <RenderHtml
              contentWidth={wp(100)}
              source={htmlBody}
              tagsStyles={tagsStyles}
              render
            />
          )}
        </View>

        {/* *******************Add for Summary detail******************** */}

        <View style={styles.resultContainer}>
          {/* *****BEFORE AVG SCORE******* */}
          <View style={styles.resultColumnContainer}>
            <Text style={styles.resultTitle}>🎾 {item.type} 🎾</Text>

            <Text style={styles.resultTitle}>
              ✅ Total Turns: {item.practiceTurns}
            </Text>

            <Text style={styles.resultTitle}>
              ⏱️ Total Time: {item.practiceTime} min
            </Text>
            <Text style={styles.resultTitle}>
              🎯 Progress: {(item.practiceTime / 600) * 100}%
            </Text>
          </View>
          <View style={styles.resultColumnContainer}>
            <Text style={styles.resultTitle}>⭐️ Your Average Score ⭐️</Text>
            <View style={{ alignSelf: "center", marginBottom: hp(2.5) }}>
              <Progress.Circle
                size={120}
                showsText={true}
                progress={item.averageScore / 100}
                formatText={() => item.averageScore}
                unfilledColor="#ededed"
                borderColor="#ededed"
                color={theme.colors.primary}
                direction="clockwise"
                strokeCap="round"
                thickness={16}
                style={styles.circlestyle}
                textStyle={styles.textStyle}
              />
            </View>
          </View>
          {/* *******CHART******** */}
          <View style={styles.resultColumnContainer}>
            <Text style={styles.pieChartTitle}>
              ⭐️ Performance Details ⭐️
            </Text>
            <PieChartComponent style={styles.pieChart} />
          </View>

          <View style={styles.resultColumnContainer}>
            <Text style={styles.resultTitle}>⭐️ Practice Time ⭐️</Text>
            <BarChartComponent />
          </View>

          <View style={styles.resultColumnContainer}>
            <Text style={styles.resultTitle}>⭐️ My Practice Score ⭐️</Text>
            <LineChartComponent />
          </View>

          <View style={styles.resultColumnContainer}>
            <Text style={styles.resultTitle}>⭐️ Your Summary ⭐️</Text>
            <View style={styles.resultTextContainer}>
              <Text style={styles.resultText}>
                👉 Fake instruction Fakytjrdfhgcne instruction Fake instruction
                Fake instructiondghnb Fake
              </Text>
              <Text style={styles.resultText}>
                👉 Fake instrucfghjmntion Fake instruction Famnvbgvhbcmnke
                instruction Fake instruction Fakytjrdfhgcne
              </Text>
              <Text style={styles.resultText}>
                👉 Fake instrucfghjmntion Fake instruction Famnvbgvhbcmnke
                instruction Fake instruction Fakytjrdfhgcne
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SummaryCard;

import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import React from "react";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";
import RenderHtml from "react-native-render-html";
import { Video } from "expo-av";
import Avatar from "../avartar/index";
import { styles, tagsStyles, shadowStyles } from "./styles";
import * as Progress from "react-native-progress";
import { ThreeDotIcon, TrashIcon } from "../icons/icons";

const HistoryCard = ({
  item,
  user,
  navigation,
  showMoreIcon = true,
  hasShadow = true,
  showDelete = false,
  showResult = false,
  onDelete = () => {},
}) => {
  const htmlBody = { html: item?.body };

  const handlePostDelete = () => {
    Alert.alert("Confirm", "Are you sure you want to do this?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel delete"),
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => onDelete(item),
        style: "destructive",
      },
    ]);
  };

  const openPostDetails = () => {
    navigation.navigate("historyDetail", { historyId: item.id });
  };

  return (
    <View style={[styles.container, hasShadow && shadowStyles]}>
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
            <Text style={styles.postTime}>
              {item.create_at ? item.create_at : "18/09/2024 7:00 PM"}
            </Text>
          </View>
        </View>
        {/* actions */}
        {showMoreIcon && (
          <TouchableOpacity onPress={openPostDetails}>
            <ThreeDotIcon
              name="threeDotsHorizontal"
              size={hp(3.4)}
              strokeWidth={3}
              color={theme.colors.text}
            />
          </TouchableOpacity>
        )}

        {showDelete && (
          <View style={styles.actions}>
            <TouchableOpacity onPress={handlePostDelete}>
              <TrashIcon
                name="delete"
                size={hp(2.5)}
                color={theme.colors.rose}
              />
            </TouchableOpacity>
          </View>
        )}
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

        {!showResult && (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              {item.title ? item.title : "Uploaded Yesterday"}
            </Text>
          </View>
        )}
        {/* *******************Add for Result detail******************** */}
        {showResult && (
          <View style={styles.resultContainer}>
            <View style={styles.resultColumnContainer}>
              <Text style={styles.resultTitle}>⭐️ Your Total Score ⭐️</Text>
              <View style={{ alignSelf: "center" }}>
                <Progress.Circle
                  size={120}
                  showsText={true}
                  progress={82 / 100}
                  formatText={() => 82}
                  unfilledColor="#ededed"
                  borderColor="#ededed"
                  color={theme.colors.primary}
                  direction="clockwise"
                  strokeCap="round"
                  thickness={12}
                  style={styles.circlestyle}
                  textStyle={styles.textStyle}
                />
              </View>
            </View>
            <View style={styles.resultColumnContainer}>
              <Text style={styles.resultTitle}>🎾 Practice Type: Backhand</Text>
              <View style={styles.resultRowContainer}>
                <Text style={styles.resultTitle}>🎯 Turns: 5</Text>
                <Text style={styles.resultTitle}>✅ Correct: 4</Text>
              </View>
            </View>

            <View style={styles.resultColumnContainer}>
              <Text style={styles.resultTitle}>⭐️ Your Image Title ⭐️</Text>
              <View style={styles.resultImageContainer}>
                <Image
                  source={require("../../images/result1.png")}
                  style={{ ...styles.resultImage }}
                />
                <Image
                  source={require("../../images/result2.png")}
                  style={{ ...styles.resultImage }}
                />
              </View>
            </View>
            <View style={styles.resultColumnContainer}>
              <Text style={styles.resultTitle}>⭐️ Your Image Title 2 ⭐️</Text>
              <View style={styles.resultImageContainer}>
                <Image
                  source={require("../../images/result2.png")}
                  style={{ ...styles.resultImage }}
                />
                <Image
                  source={require("../../images/result1.png")}
                  style={{ ...styles.resultImage }}
                />
              </View>
            </View>
            <View style={styles.resultColumnContainer}>
              <Text style={styles.resultTitle}>⭐️ Your Image Title 3 ⭐️</Text>
              <View style={styles.resultImageContainer}>
                <Image
                  source={require("../../images/result2.png")}
                  style={{ ...styles.resultImage }}
                />
                <Image
                  source={require("../../images/result1.png")}
                  style={{ ...styles.resultImage }}
                />
              </View>
            </View>

            <View style={styles.resultColumnContainer}>
              <Text style={styles.resultTitle}>⭐️ Your Instruction ⭐️</Text>
              <View style={styles.resultTextContainer}>
                <Text style={styles.resultText}>
                  👉 Fake instruction Fakytjrdfhgcne instruction Fake
                  instruction Fake instructiondghnb Fake
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

            <View style={styles.resultLastColumnContainer}>
              <Text style={styles.resultTitle}>⭐️ Your Video ⭐️</Text>
            </View>
          </View>
        )}
        {/* post video */}
        <Video
          style={[
            styles.postMedia,
            { height: hp(40), width: wp(70), alignSelf: "center" },
          ]}
          source={{ uri: item.url }}
          useNativeControls
          resizeMode="cover"
          isLooping
        />
      </View>
    </View>
  );
};

export default HistoryCard;

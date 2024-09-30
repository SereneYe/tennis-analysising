import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import React from "react";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../constants/common";
import { Video } from "expo-av";
import { styles } from "./styles";

export const HistoryCardImageContainer = ({ item, index }) => {
  return (
    <View style={styles.cardImageContainer}>
      <Text style={styles.resultDivisor}>
        {"---------------" + " TURN " + (index + 1) + " ---------------"}
      </Text>
      <View style={styles.resultColumnContainer}>
        <Text style={styles.resultTitle}>⭐️ Stage 1 Comparison ⭐️</Text>
        <View style={styles.resultImageContainer}>
          <Image
            source={{ uri: item.image_url1 }}
            style={{ ...styles.resultImage }}
          />
          <Image
            source={{ uri: item.image_url1 }}
            style={{ ...styles.resultImage }}
          />
        </View>
        <Text style={styles.resultTitle}>⭐️ Stage 2 Comparison ⭐️</Text>
        <View style={styles.resultImageContainer}>
          <Image
            source={{ uri: item.image_url2 }}
            style={{ ...styles.resultImage }}
          />
          <Image
            source={{ uri: item.image_url2 }}
            style={{ ...styles.resultImage }}
          />
        </View>
        <Text style={styles.resultTitle}>⭐️ Stage 3 Comparison ⭐️</Text>
        <View style={styles.resultImageContainer}>
          <Image
            source={{ uri: item.image_url3 }}
            style={{ ...styles.resultImage }}
          />
          <Image
            source={{ uri: item.image_url3 }}
            style={{ ...styles.resultImage }}
          />
        </View>
      </View>

      <View style={styles.resultColumnContainer}>
        <Text style={styles.resultTitle}>⭐️ Your Instruction ⭐️</Text>
        <View style={styles.resultTextContainer}>
          <Text style={styles.resultText}>👉 {item.instruction1}</Text>
          <Text style={styles.resultText}>👉 {item.instruction2}</Text>
          <Text style={styles.resultText}>👉 {item.instruction3}</Text>
        </View>
      </View>

      <View style={styles.resultLastColumnContainer}>
        <Text style={styles.resultTitle}>⭐️ Your Video ⭐️</Text>
        <Video
          style={[styles.postMedia, {}]}
          source={{ uri: item.video_url }}
          useNativeControls
          resizeMode="cover"
          isLooping
        />
      </View>
    </View>
  );
};

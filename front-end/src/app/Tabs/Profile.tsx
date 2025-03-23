import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import ProfileFeature from "@/src/components/Profile/ProfileFeature";
import { useSelector } from "react-redux";
import OrderHistory from "@/src/app/Product/OrderHistory";
import { router } from "expo-router";

export default function Profile() {
  return (
    <View>
      <ProfileFeature />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/Product/OrderHistory")}
      >
        <Text style={styles.buttonText}>Xem lịch sử mua hàng</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#f0f0f0", // Nền trắng đậm
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#000", // Chữ đen
    fontSize: 16,
    fontWeight: "bold",
  },
});

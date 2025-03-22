import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LandingPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Image Background */}
      <Image 
        source={require("../../assets/images/landing.gif")} 
        style={styles.backgroundImage}
        resizeMode="cover" // Giúp ảnh bao phủ toàn bộ không gian
      />
      
      {/* Content */}
      <View style={styles.overlay}>
        <Text style={styles.title}>Expert in making Coffee</Text>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate("Auth/Login")} 
        >
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Đảm bảo mọi thứ nằm giữa màn hình
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute", // Đặt ảnh ở nền
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%", // Làm cho ảnh bao phủ toàn bộ chiều rộng
    height: "100%", // Làm cho ảnh bao phủ toàn bộ chiều cao
  },
  overlay: {
    position: "absolute", // Đặt các phần tử này lên trên ảnh GIF
    top: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    fontStyle: "italic",
    marginBottom: 20,
    marginTop: 280,


    color: "#8B5A2B", // Đảm bảo chữ hiển thị rõ trên nền GIF
  },
  button: {
    backgroundColor: "#8B5A2B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: 100,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 24,
    textAlign: "center",
    fontWeight: "bold",
  },
});

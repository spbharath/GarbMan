import React from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const logo = require("../assets/Logo.png");

const UserHomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 justify-center items-center bg-[#2ab162]">
      <Image source={logo} />
      <Text className="w-[80%] h-10 text-center text-[#161649] text-2xl font-semibold mt-3">
        HOME
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Request")}
        className="mt-3 p-2 w-[80%] bg-[#161649] border"
      >
        <Text className="text-center text-white">Raise Request</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("AllRequests")}
        className="mt-3 p-2 w-[80%] bg-[#161649] border"
      >
        <Text className="text-center text-white">View All Requests</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("CollectBin")}
        className="mt-3 p-2 w-[80%] bg-[#161649] border"
      >
        <Text className="text-center text-white">Collect Bin</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="mt-3 p-2 w-[80%] bg-[#161649] border"
      >
        <Text className="text-center text-white">LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserHomeScreen;

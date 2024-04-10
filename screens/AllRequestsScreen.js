import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const logo = require("../assets/Logo.png");

const AllRequestsScreen = ({ navigation }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    // Load the selected marker details from AsyncStorage when the component mounts
    loadSelectedMarker();
  }, []);

  // Function to load the selected marker details from AsyncStorage
  const loadSelectedMarker = async () => {
    try {
      const marker = await AsyncStorage.getItem("selectedMarker");
      if (marker !== null) {
        // If marker details are found, parse and set them in the state
        setSelectedMarker(JSON.parse(marker));
      }
    } catch (error) {
      console.error("Error loading selected marker details:", error);
    }
  };

  const clearAsyncStorage = async () => {
    await AsyncStorage.clear();
    navigation.navigate("UserHome");
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#2ab162]">
      <Image source={logo} />
      <Text className="w-[80%] h-10 text-center text-[#161649] text-xl font-semibold mt-3">
        YOUR COLLECTION REQUEST
      </Text>
      {selectedMarker ? (
        <View className="w-[80%] bg-[#fff] rounded-md p-2 shadow-md shadow-black">
          <View className="flex-row justify-between">
            <Text className="text-lg">{selectedMarker.trashCanId}</Text>
            <Text className="text-lg">{selectedMarker.trashLevel}%</Text>
          </View>
          <Text className="text-lg">{selectedMarker.name}</Text>
          <TouchableOpacity
            className="w-[40%] h-[35] border rounded-md mt-[8] bg-[#161649]"
            onPress={clearAsyncStorage}
          >
            <Text className="text-center mt-[5] text-white"> Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>No collection request found</Text>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("UserHome")}
        className="mt-3 p-2 w-[80%] bg-[#161649] border"
      >
        <Text className="text-center text-white">BACK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AllRequestsScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Linking,
  Image,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

const logo = require("../assets/Logo.png");
``;
const DriverScreen = ({ navigation }) => {
  const [requestDetails, setRequestDetails] = useState(null);
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
    // Load request details from AsyncStorage when the component mounts
    loadRequestDetails();

    // Fetch driver's current location when the component mounts
    getLocation();
  }, []);

  // Function to load request details from AsyncStorage
  const loadRequestDetails = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("selectedMarker");
      if (jsonValue !== null) {
        const request = JSON.parse(jsonValue);
        setRequestDetails(request);
      } else {
        // If no request details found, reset state
        setRequestDetails(null);
      }
    } catch (error) {
      console.error("Error loading request details:", error);
    }
  };

  // Function to get the current location of the driver
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setDriverLocation(location.coords);
  };

  // Function to handle navigation to requested location
  const navigateToLocation = () => {
    if (!driverLocation || !requestDetails) {
      console.error("Driver location or request details not available");
      return;
    }

    const { latitude, longitude } = requestDetails;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${driverLocation.latitude},${driverLocation.longitude}&destination=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  // Function to handle "Done" button press
  const handleDone = async () => {
    try {
      // Remove request details from AsyncStorage
      await AsyncStorage.removeItem("selectedMarker");
      // Reset request details state
      setRequestDetails(null);
    } catch (error) {
      console.error("Error removing request details:", error);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#2ab162]">
      <Image source={logo} />
      <Text className="w-[80%] h-10 text-center text-[#161649] text-2xl font-semibold mt-3">
        REQUESTS
      </Text>
      {requestDetails ? (
        <View className="w-[80%] bg-[#fff] rounded-md p-2 shadow-md shadow-black">
          <View className="flex-row justify-between">
            <Text>{requestDetails.trashCanId}</Text>
            <Text>{requestDetails.trashLevel}%</Text>
          </View>
          <Text>{requestDetails.name}</Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              className="w-[45%] h-[35] border rounded-md mt-[8] bg-[#161649]"
              onPress={navigateToLocation}
            >
              <Text className="text-center mt-[5] text-white">
                Go to Location
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-[45%] h-[35] border rounded-md mt-[8] bg-[#161649]"
              onPress={handleDone}
            >
              <Text className="text-center mt-[5] text-white">Job Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <Text>No request at the moment</Text>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="mt-3 p-2 w-[80%] bg-[#161649] border"
      >
        <Text className="text-center text-white">LOGOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detailsContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    alignItems: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default DriverScreen;

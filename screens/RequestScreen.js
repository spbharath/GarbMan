import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import Constants from "expo-constants";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

import locationsData from "../locations.json";
const logo = require("../assets/Logo.png");

const RequestScreen = ({ navigation }) => {
  const [trashCanId, setTrashCanId] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    // Fetch user's current location when the component mounts
    getLocation();

    // Set locations from JSON data
    setLocations(locationsData);
  }, []);

  // Function to get the current location of the user
  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.error("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setUserLocation(location.coords);
  };

  // Function to handle request submission
  const handleRequestSubmit = async () => {
    if (!selectedMarker) {
      Alert.alert("Error", "Please select a marker");
      return;
    }

    if (selectedMarker.trashLevel <= 50) {
      Alert.alert("Error", "Trash Level should be greater than 50%");
      return;
    }

    try {
      // Check if a marker is already selected
      const existingMarker = await AsyncStorage.getItem("selectedMarker");
      if (existingMarker) {
        Alert.alert("Request Aldready Raised!");
        return;
      }

      // Save selected marker details in AsyncStorage
      await AsyncStorage.setItem(
        "selectedMarker",
        JSON.stringify(selectedMarker)
      );
      // Reset form fields after submission
      setTrashCanId("");
      // Navigate to AllRequestsScreen after successful submission
      navigation.navigate("AllRequests");
    } catch (error) {
      console.error("Error saving selected marker details:", error);
    }
  };

  // Function to handle marker press
  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
    setTrashCanId(marker.trashCanId);
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#2ab162]">
      <Image source={logo} className="w-[150] h-[150]" resizeMode="stretch" />
      <Text className="w-[80%] h-10 text-center text-[#161649] text-xl font-semibold mt-3">
        GARBAGE COLLECTION REQUEST
      </Text>
      <TextInput
        className="w-[80%] p-2 border mt-2 text-center text-white text-xl"
        placeholder="SELECT A BIN"
        value={trashCanId}
        onChangeText={(text) => setTrashCanId(text)}
        editable={false} // Disable editing of the input
      />
      {userLocation && (
        <View className="w-[95%] h-[55%] mt-5 border">
          <MapView
            className="flex-1"
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: userLocation.latitude,
                longitude: userLocation.longitude,
              }}
              title="Your Location"
            />
            {locations.map((location) => (
              <Marker
                key={location.trashCanId}
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title={location.name}
                description={`Trash Can ID: ${location.trashCanId}, Trash Level: ${location.trashLevel}%`}
                onPress={() => handleMarkerPress(location)}
              />
            ))}
          </MapView>
        </View>
      )}

      <TouchableOpacity
        onPress={handleRequestSubmit}
        className="mt-3 p-2 w-[80%] bg-[#161649] border"
      >
        <Text className="text-center text-white">REQUEST</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  map: {
    flex: 1,
    width: "95%",
    height: "65%",
  },
});

export default RequestScreen;

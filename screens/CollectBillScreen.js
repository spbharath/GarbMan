import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import Constants from "expo-constants";

const logo = require("../assets/Logo.png");

const CollectBillScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [weight, setWeight] = useState("");

  const handleSubmit = () => {
    // Handle form submission logic here, e.g., send data to server or perform local processing
    console.log("Name:", name);
    console.log("Address:", address);
    console.log("Pincode:", pincode);
    console.log("Weight:", weight);

    // Clear form fields after submission
    setName("");
    setAddress("");
    setPincode("");
    setWeight("");
    Alert.alert(
      "Alert",
      "Your Request Has been Submitted! Please wait our technicans will contact you. Thanks"
    );
    navigation.navigate("UserHome");
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#2ab162]">
      <Image source={logo} />
      <Text className="w-[80%] h-10 text-center text-[#161649] text-2xl font-semibold mt-3">
        COLLECT BIN
      </Text>
      <TextInput
        className="w-[80%] p-2 border mt-5 text-white"
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        className="w-[80%] p-2 border mt-5 text-white"
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        className="w-[80%] p-2 border mt-5 text-white"
        placeholder="Pincode"
        value={pincode}
        onChangeText={setPincode}
        keyboardType="numeric"
      />
      <TextInput
        className="w-[80%] p-2 border mt-5 text-white"
        placeholder="Weight (in kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TouchableOpacity
        className="mt-3 p-2 w-[80%] bg-[#161649] border"
        onPress={handleSubmit}
      >
        <Text className="text-center text-white">SUBMIT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 20,
    justifyContent: "center",
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
});

export default CollectBillScreen;

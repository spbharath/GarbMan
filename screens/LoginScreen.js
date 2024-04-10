import React, { useState } from "react";
import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
const logo = require("../assets/Logo.png");

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDriver, setIsDriver] = useState(false);

  const handleLogin = () => {
    // Your authentication logic here
    if (
      (isDriver && username === "driver" && password === "driverpassword") ||
      (!isDriver && username === "user" && password === "userpassword")
    ) {
      if (isDriver) {
        navigation.navigate("Driver"); // Navigate to DriverScreen if the user is a driver
      } else {
        navigation.navigate("UserHome"); // Navigate to Home if the user is a regular user
      }
    } else {
      alert("Invalid username or password");
    }
    setUsername("");
    setPassword("");
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#2ab162]">
      <Image source={logo} />
      <Text className="w-[80%] h-10 text-center text-[#161649] text-2xl font-semibold mt-3">
        LOGIN
      </Text>

      <TextInput
        className="w-[80%] p-2 border mt-5"
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}
        className="w-[80%] p-2 border mt-5"
      />

      <View className="w-[80%] border mt-5">
        <Picker
          selectedValue={isDriver}
          onValueChange={(value) => setIsDriver(value)}
        >
          <Picker.Item label="User" value={false} />
          <Picker.Item label="Driver" value={true} />
        </Picker>
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        className="mt-3 p-2 w-[80%] bg-[#161649] border"
      >
        <Text className="text-center text-white">LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-2 p-2 w-[80%]"
        onPress={() => navigation.navigate("Register")}
      >
        <Text className="text-center underline">
          Don't have account... Register!
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

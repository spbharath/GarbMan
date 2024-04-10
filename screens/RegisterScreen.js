import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import { Picker } from "@react-native-picker/picker";
const logo = require("../assets/Logo.png");

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isDriver, setIsDriver] = useState(false);

  const handleRegister = () => {
    // Your registration logic here
    alert("Registration successful!");
    navigation.navigate("Login");
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#2ab162]">
      <Image source={logo} />

      <Text className="w-[80%] h-10 text-center text-[#161649] text-2xl font-semibold mt-3">
        REGISTER
      </Text>

      <TextInput
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        className="w-[80%] p-2 border mt-5"
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
        onPress={handleRegister}
        className="mt-3 p-2 w-[80%] bg-[#161649] border"
      >
        <Text className="text-center text-white">REGISTER</Text>
      </TouchableOpacity>

      <TouchableOpacity
        className="mt-2 p-2 w-[80%]"
        onPress={() => navigation.navigate("Login")}
      >
        <Text className="text-center underline">Aldready have account...!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

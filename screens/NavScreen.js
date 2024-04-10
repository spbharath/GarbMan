import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import RequestScreen from "./RequestScreen";
import DriverScreen from "./DriverScreen";
import AllRequestsScreen from "./AllRequestsScreen";
import UserHomeScreen from "./UserHomeScreen";
import CollectBillScreen from "./CollectBillScreen";

const Stack = createNativeStackNavigator();

const NavScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Driver"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="UserHome" component={UserHomeScreen} />
        <Stack.Screen name="AllRequests" component={AllRequestsScreen} />
        <Stack.Screen name="CollectBin" component={CollectBillScreen} />
        <Stack.Screen name="Request" component={RequestScreen} />
        <Stack.Screen name="Driver" component={DriverScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavScreen;

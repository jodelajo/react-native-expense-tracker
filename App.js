import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageResult from "./screens/ManageResult";
import RecentResults from "./screens/RecentResults";
import AllResults from "./screens/AllResults";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import ResultsContextProvider from "./store/results-context";
import AuthContextProvider from "./store/auth-context";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ResultsOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageResult");
            }}
          />
        ),
        headerLeft: ({ tintColor }) => (
          <IconButton
            icon="settings"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("Login");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentResults"
        component={RecentResults}
        options={{
          title: "Resultaten deze periode",
          tabBarLabel: "Deze periode",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllResults"
        component={AllResults}
        options={{
          title: "Alle resultaten",
          tabBarLabel: "Totaal",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ title: "Inloggen" }}
      />
      <Stack.Screen
        name="Signup"
        component={SignUp}
        options={{ title: "Sign up" }}
      />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ResultsOverview"
        component={ResultsOverview}
        options={{ headerShown: false, title: "Overview" }}
      />
      <Stack.Screen
        name="ManageResult"
        component={ManageResult}
        options={{ title: "manage result", presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <ResultsContextProvider>
          <NavigationContainer>
            <AuthStack />
          </NavigationContainer>
        </ResultsContextProvider>
      </AuthContextProvider>
    </>
  );
}

import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import {
//   createDrawerNavigator,
//   DrawerContentScrollView,
//   DrawerItemList,
//   DrawerItem,
// } from "@react-navigation/drawer";
import ManageResult from "./screens/ManageResult";
import RecentResults from "./screens/RecentResults";
import AllResults from "./screens/AllResults";
import { GlobalStyles } from "./constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import ResultsContextProvider, {
  ResultsContext,
} from "./store/results-context";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import UserProfile from "./screens/UserProfile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen";
import { View, StyleSheet } from "react-native";
import { useMediaQuery } from "react-responsive";
import envs from "./config/env";
import axios from "axios";
import DrawerNavigator from "./components/navigation/DrawerNavigator";

const Stack = createNativeStackNavigator();
const { API_KEY } = envs;

SplashScreen.preventAutoHideAsync();



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
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ManageResult"
        component={ManageResult}
        options={{ title: "manage result", presentation: "modal" }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
    </NavigationContainer>
  );
}


function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  const isBigScreen = useMediaQuery({ minDeviceWidth: 450 });
  // console.log("big screen", isBigScreen);

  async function refreshToken() {
    const refreshedToken = await AsyncStorage.getItem("refreshToken");
    console.log("refresh tokenin app.js", refreshedToken);
    const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
    const response = await axios.post(
      url,
      "grant_type=refresh_token&refresh_token=" + refreshedToken
    );
    console.log("response in refreshtoken in app.js", response.data);
    console.log("refresh token in async storage", refreshedToken);
  }

  setInterval(() => {
    refreshToken();
    console.log("refreshhhh!");
  }, 1000 * 60 * 55);

  async function fetchToken() {
    const storedToken = await AsyncStorage.getItem("token");
    console.log("storedToken", storedToken);
    if (storedToken) {
      authCtx.authenticate(storedToken);
    }
    setIsTryingLogin(false);
  }
  useEffect(() => {
    fetchToken();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (!isTryingLogin) {
      await SplashScreen.hideAsync();
    }
  }, [isTryingLogin]);

  if (isTryingLogin) {
    return null;
  }

  if (!isBigScreen) {
    return (
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Navigation />
      </View>
    );
  } else {
    return (
      <View style={styles.web} onLayout={onLayoutRootView}>
        <View style={styles.container}>
          <Navigation />
        </View>
      </View>
    );
  }
}

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <ResultsContextProvider>
          <Root />
        </ResultsContextProvider>
      </AuthContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  web: {
    backgroundColor: GlobalStyles.colors.primary800,
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  container: {
    marginTop: 20,
    marginBottom: 40,
    minWidth: 350,
    maxWidth: 428,
    maxHeight: 928,
    flex: 1,
  },
});

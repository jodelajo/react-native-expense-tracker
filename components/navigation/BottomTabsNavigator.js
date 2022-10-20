import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import RecentResults from "../../screens/RecentResults";
import AllResults from "../../screens/AllResults";
import { GlobalStyles } from "../../constants/styles";
import Ionicons from "react-native-vector-icons/Ionicons";



const BottomTabs = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  
    return (
      <BottomTabs.Navigator
        screenOptions={({ navigation }) => ({
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
           // headerLeft: ({ tintColor }) => (
          //   <IconButton
          //     icon="settings"
          //     size={24}
          //     color={tintColor}
          //     // onPress={() => authCtx.logout(resultsCtx.setResults)}
          //     // onPress={() => navigation.navigate("UserProfile")}
          //   />
          // ),
          // headerRight: ({ tintColor }) => (
          //   <IconButton
          //     icon="add"
          //     size={24}
          //     color={tintColor}
          //     onPress={() => {
          //       navigation.navigate("ManageResult");
          //     }}
          //   />
          // ),
        })}
      >
        <BottomTabs.Screen
          name="RecentResults"
          component={RecentResults}
          options={{
            headerShown: false,
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
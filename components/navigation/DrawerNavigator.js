import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useContext } from "react";
import { AuthContext } from "../../store/auth-context";
import { ResultsContext } from "../../store/results-context";
import { View, StyleSheet } from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../../constants/styles";
import BottomTabsNavigator from "./BottomTabsNavigator";
import UserProfile from "../../screens/UserProfile";
import Courses from "../../screens/Courses";
import Statistics from "../../screens/Statistics";
import UpdateProfileForm from "../auth/UpdateProfileForm";

const Drawer = createDrawerNavigator();

function AppDrawerContent(props) {
  // console.log("props", props);
  const authCtx = useContext(AuthContext);
  const resultsCtx = useContext(ResultsContext);

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.logoutButton}>
        <DrawerItem
          label="Log out"
          onPress={() => authCtx.logout(resultsCtx.setResults)}
          labelStyle={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
            textAlign: "center",
          }}
        />
      </View>
      {/* <View>
            <DrawerItem 
            label="Overzicht resultaten"
            onPress={()=>}
            />
        </View> */}
      <DrawerItemList {...props} style={{ borderWidth: 1 }} />
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator({ navigation }) {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <AppDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        drawerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
          color: "white",
        },
        drawerType: "slide",
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
      }}
    >
      <Drawer.Screen
        name="ResultsOverview"
        component={BottomTabsNavigator}
        options={{
          title: "Overzicht resultaten",
          drawerLabel: "Overzicht",
          drawerLabelStyle: { color: "white", fontWeight: "bold" },
          drawerActiveBackgroundColor: GlobalStyles.colors.minor,
          drawerInactiveBackgroundColor: GlobalStyles.colors.primary700,
        }}
      />
      <Drawer.Screen
        name="UserProfile"
        // navigation={navigation}
        component={UserProfile}
        options={{
          drawerLabel: "Jouw profiel",
          drawerLabelStyle: { color: "white", fontWeight: "bold" },
          drawerActiveBackgroundColor: GlobalStyles.colors.minor,
          drawerInactiveBackgroundColor: GlobalStyles.colors.primary700,
        }}
      />
       <Drawer.Screen
        name="UpdateProfileForm"
        // navigation={navigation}
        component={UpdateProfileForm}
        options={{
          drawerLabel: "Profiel wijzigen",
          drawerLabelStyle: { color: "white", fontWeight: "bold" },
          drawerActiveBackgroundColor: GlobalStyles.colors.minor,
          drawerInactiveBackgroundColor: GlobalStyles.colors.primary700,
          // drawerItemStyle: {display: 'none'}
        }}
      />
      <Drawer.Screen
        name="Courses"
        component={Courses}
        options={{
          drawerLabel: "Jouw vakken",
          drawerLabelStyle: { color: "white", fontWeight: "bold" },
          drawerActiveBackgroundColor: GlobalStyles.colors.minor,
          drawerInactiveBackgroundColor: GlobalStyles.colors.primary700,
        }}
      />
      <Drawer.Screen
        name="Statistics"
        component={Statistics}
        options={{
          drawerLabel: "Statistieken",
          drawerLabelStyle: { color: "white", fontWeight: "bold" },
          drawerActiveBackgroundColor: GlobalStyles.colors.minor,
          drawerInactiveBackgroundColor: GlobalStyles.colors.primary700,
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  logoutButton: {
    // height: 50,
    backgroundColor: GlobalStyles.colors.major,
    marginVertical: 6,
    marginHorizontal: 40,
    borderRadius: 36,
    justifyContent: "center",
    // alignItems: 'center'
    // textAlign: 'center'
  },
  buttonText: {
    color: "white",
  },
});

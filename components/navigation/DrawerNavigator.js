import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { DrawerActions } from "@react-navigation/native";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../store/auth-context";
import { ResultsContext } from "../../store/results-context";
import { View, StyleSheet, Pressable } from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../../constants/styles";
import BottomTabsNavigator from "./BottomTabsNavigator";
import UserProfile from "../../screens/UserProfile";
import Courses from "../../screens/Courses";
import Statistics from "../../screens/Statistics";
import UpdateProfileForm from "../auth/UpdateProfileForm";
import Avatar from "../UI/Avatar";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation }) {
  const [resultStack, setResultStack] = useState();
  const [photoUrl, setPhotoUrl] = useState()
  function AppDrawerContent(props) {
    console.log("props", props);
    const authCtx = useContext(AuthContext);
    const resultsCtx = useContext(ResultsContext);

    useEffect(() => {
      setResultStack(props.state.index === 0);
      setPhotoUrl(authCtx.currentUser?.photoUrl)
    }, [authCtx]);

    

    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        <View style={styles.logoutButton}>
          <DrawerItem
            label="Uitloggen"
            onPress={() => authCtx.logout(resultsCtx.setResults)}
            labelStyle={{
              color: "white",
              fontSize: 18,
              fontWeight: "bold",
              textAlign: "center",
            }}
          />
        </View>
        <DrawerItemList {...props} style={{ borderWidth: 1 }} />
      </DrawerContentScrollView>
    );
  }

  return (
    <Drawer.Navigator
      drawerContent={(props) => <AppDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        title: "Jouw profiel",
        drawerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
          color: "white",
        },
        drawerType: "slide",
        headerLeft: () => (
          <Pressable style={styles.avatarContainer} onPress={()=> navigation.dispatch(DrawerActions.toggleDrawer())}>
           
              <Avatar
                size={32}
                source={{
                  uri: photoUrl
                    ? photoUrl
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8vw6lSyyJyi4M87YNItzmpm9mMUni0dOJu1bJg-w5wRApCc60oOPwT4ZC2oFkQAl2qq8&usqp=CAU",
                }}
              />
          
          </Pressable>
        ),
        headerRight: ({ tintColor }) =>
          resultStack && (
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
        navigation={navigation}
        component={UpdateProfileForm}
        options={{
          drawerLabel: "Profiel wijzigen",
          drawerLabelStyle: { color: "white", fontWeight: "bold" },
          drawerActiveBackgroundColor: GlobalStyles.colors.minor,
          drawerInactiveBackgroundColor: GlobalStyles.colors.primary700,
          drawerItemStyle: { display: "none" },
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
  avatarContainer: {
    paddingLeft: 16,
    paddingTop: 16,
  }
});

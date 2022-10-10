import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from "@react-navigation/drawer";
import { useContext} from 'react'
import { AuthContext } from "../../store/auth-context";
import {  ResultsContext} from "../../store/results-context"
import {  View, StyleSheet } from 'react-native'
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../../constants/styles";
import BottomTabsNavigator from "./BottomTabsNavigator";
import UserProfile from "../../screens/UserProfile";

const Drawer = createDrawerNavigator();

function AppDrawerContent(props) {
    const authCtx = useContext(AuthContext);
    const resultsCtx = useContext(ResultsContext);
  
    return (
      <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
        {/*all of the drawer items*/}
        <View style={styles.logoutButton}>
          {/* here's where you put your logout drawer item*/}
          <DrawerItem
            label="Log out"
            onPress={() => authCtx.logout(resultsCtx.setResults)}
            labelStyle={{ color: "white" }}
          />
        </View>
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
            backgroundColor: GlobalStyles.colors.major,
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
            drawerLabel: "Overzicht",
            drawerLabelStyle: { color: "white" },
          }}
        />
        <Drawer.Screen name="UserProfile" component={UserProfile}  options={{
            drawerLabel: "Jouw profiel",
            drawerLabelStyle: { color: "white" },
          }}/>
      </Drawer.Navigator>
    );
  }

  const styles = StyleSheet.create({
    logoutButton: {
        height: 50,
        backgroundColor: GlobalStyles.colors.insufficient,
        margin: 16,
        borderRadius: 16,
      },
      buttonText: {
        color: "white",
      },
  })
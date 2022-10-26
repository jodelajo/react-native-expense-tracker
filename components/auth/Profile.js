import { View, Text, StyleSheet } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
// import UpdateProfileForm from "./UpdateProfileForm";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

export default function Profile() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const name = authCtx.currentUser.displayName;
  console.log("name in profile", name);
  return (
    <View style={styles.container}>
       <View style={styles.formContainer}>
      <Text style={styles.text}>Hoi {name}</Text>
      <Avatar
        source={{
          uri: authCtx.currentUser.photoUrl
            ? authCtx.currentUser.photoUrl
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8vw6lSyyJyi4M87YNItzmpm9mMUni0dOJu1bJg-w5wRApCc60oOPwT4ZC2oFkQAl2qq8&usqp=CAU",
        }}
        size={200}
      />
      <Button
        onPress={() => navigation.navigate("UpdateProfileForm")}
        style={styles.buttonUpload}
      >Profiel wijzigen</Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // padding: 20,
  },
  formContainer: {
    marginTop: 40,
    marginHorizontal: 16,
    minWidth: '94%',
    paddingHorizontal: 8,
    paddingVertical: 40,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonUpload: {
    marginTop: 10,
    backgroundColor: GlobalStyles.colors.major,
    borderRadius: 8,
    minWidth: '90%'
  }
});

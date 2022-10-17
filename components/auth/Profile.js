import { View, Text, StyleSheet, Button } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import UpdateProfileForm from "./UpdateProfileForm";
import Avatar from "../UI/Avatar";

export default function Profile() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const name = authCtx.displayName;
  console.log("name in profile", name);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hoi {name}</Text>
      <Avatar
        source={{
          uri: authCtx.avatar
            ? authCtx.avatar
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8vw6lSyyJyi4M87YNItzmpm9mMUni0dOJu1bJg-w5wRApCc60oOPwT4ZC2oFkQAl2qq8&usqp=CAU",
        }}
        size={100}
      />
      <Button
        title="Profiel wijzigen"
        onPress={() => navigation.navigate(UpdateProfileForm)}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

import { View, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import Profile from "../components/auth/Profile";

export default function UserProfile() {
  return (
    <View style={styles.container}>
      <Profile />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    padding: 24,
  },
});

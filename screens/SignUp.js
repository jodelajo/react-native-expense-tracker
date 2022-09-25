import AuthContent from "../components/auth/AuthContent";
import { StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { View } from "react-native";

export default function SigUp() {
  return (
    <View style={styles.container}>
      <AuthContent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});

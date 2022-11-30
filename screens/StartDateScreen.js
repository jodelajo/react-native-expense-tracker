import StartDate from "../components/courses/StartDate"
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";


export default function StartDateScreen() {
    return <View style={styles.container}>
        <StartDate />
    </View>
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: GlobalStyles.colors.primary700,
      padding: 24,
    },
  });
  
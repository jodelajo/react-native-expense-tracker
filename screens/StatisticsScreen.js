import { View, Text, StyleSheet } from "react-native";
import { errorMessages } from "../constants/errorMessages";
import Statistics from "../components/statistics/Statistics";
import { GlobalStyles } from "../constants/styles";

export default function StatisticsScreen() {

  return (
    <View style={styles.container}>
      <Statistics />
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

import { View, Text, StyleSheet } from "react-native"
import CoursesForm from "../components/courses/CoursesForm"
import { GlobalStyles } from "../constants/styles";

export default function Courses() {
    return ( <View style={styles.container}>
        <CoursesForm />
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: GlobalStyles.colors.primary700,
      padding: 24,
    },
  });
  
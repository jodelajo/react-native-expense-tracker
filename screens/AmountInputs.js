import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import Input from "../components/manageResult/Input";
import ResultItem from "../components/ResultsOutput/ResultItem";

export default function AmountInputs() {
  return (
    <View style={styles.container}>
        <View style={styles.formContainer}>

            <View style={styles.inputContainer}>
            <View style={styles.button}><Text style={styles.text}>PW</Text></View>
        
        <Input />
            </View>
      
        </View>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  formContainer: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end'
    // flex: 1,
  },
  button: {
    height: 34,
    backgroundColor: GlobalStyles.colors.major,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 7,
    width: 80,
    justifyContent: "center",
    alignItems: 'center'
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});

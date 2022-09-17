import { useState, useEffect, useContext } from "react";
import { View, Switch, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import { ResultsContext } from "../../store/results-context";

export default function ResultForm({
  onCancel,
  onSubmit,
  isEditing,
  submitButtonLabel,
  defaultValues,
}) {
  const [inputValues, setInputValues] = useState({
    course: defaultValues ? defaultValues.course : " ",
    date: defaultValues ? getFormattedDate(defaultValues.date) : "",
    isMajor: defaultValues ? defaultValues.major : false,
    result: defaultValues ? defaultValues.result.toString() : "",
  });


  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }

  function submitHandler() {
    // console.log("input values", inputValues);

    const resultData = {
      course: inputValues.course,
      date: new Date(inputValues.date),
      major: inputValues.isMajor,
      result: inputValues.result,
      // saldo: inputValues.saldo,
    };
    onSubmit(resultData);
  }
  // console.log("input values", inputValues);

  return (
    <View style={styles.form}>
      <Text style={styles.titleStyle}>Jouw resultaat</Text>
      <Input
        label="Vak"
        textInputConfig={{
          autoCorrect: false,
          autoCapitalize: "words",
          onChangeText: inputChangedHandler.bind(this, "course"),
          value: inputValues.course,
        }}
      />
      <View style={styles.switchContainer}>
        <Text
          style={
            !inputValues.isMajor
              ? [styles.label, styles.activeMinor]
              : [styles.label, styles.left]
          }
        >
          SO
        </Text>
        <Switch
          trackColor={{
            false: GlobalStyles.colors.minor,
            true: GlobalStyles.colors.major,
          }}
          thumbColor={
            inputValues.isMajor
              ? GlobalStyles.colors.primary50
              : GlobalStyles.colors.primary50
          }
          ios_backgroundColor={GlobalStyles.colors.minor}
          onValueChange={inputChangedHandler.bind(this, "isMajor")}
          value={inputValues.isMajor}
          style={styles.switch}
        />
        <Text
          style={
            inputValues.isMajor
              ? [styles.label, styles.activeMajor]
              : [styles.label]
          }
        >
          Proefwerk
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          style={styles.rowInput}
          label="Datum"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Cijfer"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "result"),
            value: inputValues.result,
          }}
        />
      </View>
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Cancel
        </Button>
        <Button onPress={submitHandler} style={styles.button}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  form: {
    marginTop: 30,
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  switch: {
    marginHorizontal: 30,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    minWidth: 80,
  },
  left: {
    textAlign: "right",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  activeMinor: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "right",
    color: GlobalStyles.colors.minor,
  },
  activeMajor: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "left",
    color: GlobalStyles.colors.major,
  },
});

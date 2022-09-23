import { useState, useEffect } from "react";
import { View, Switch, Text, StyleSheet, TextInput, Alert } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import SearchBarDropdown from "../SearchBarDropdown";

export default function ResultForm({
  onCancel,
  onSubmit,
  isEditing,
  submitButtonLabel,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    course: { 
      value: defaultValues ? defaultValues.course : "", 
      isValid: true 
    },
    date: {
      value: defaultValues
        ? getFormattedDate(defaultValues.date)
        : dateInputHandler(),
      isValid: true,
    },
    major: {
      value: defaultValues ? defaultValues.major : false,
      isValid: true,
    },
    result: {
      value: defaultValues ? defaultValues.result.toString() : 0,
      isValid: true,
    },
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : 0,
      isValid: true,
    },
  });

  const [selectedItem, setSelectedItem] = useState("");
  const [dataSource] = useState([
    "Wiskunde",
    "Engels",
    "Frans",
    "Duits",
    "Nederlands",
    "Geschiedenis",
    "Aardrijkskunde",
    "Biologie",
    "Natuurkunde",
    "Muziek",
    "Gym",
  ]);

  const onSelect = (item) => {
    setSelectedItem(item);
  };

  function dateInputHandler() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const monthOutput = month < 10 ? "0" + month : month;
    const year = today.getFullYear();
    return year + "-" + monthOutput + "-";
  }

  function amountHandler() {
    const result = inputs.result.value;

    function setInputsHandler(amount) {
      setInputs((curInputs) => {
        return {
          ...curInputs,
          amount: {value: amount, isValid: true},
        };
      });
    }

    if (result < 5.5 && inputs.major.value) {
      setInputsHandler(-2.5);
    }
    if (result < 4 && inputs.major.value) {
      setInputsHandler(-5.0);
    }
    if (result < 5.5 && !inputs.major.value) {
      setInputsHandler(-1.25);
    }
    if (result < 4 && !inputs.major.value) {
      setInputsHandler(-2.5);
    }
    if (result >= 5.5 && inputs.major.value) {
      setInputsHandler(2.5);
    }
    if (result >= 7.5 && inputs.major.value) {
      setInputsHandler(5.0);
    }
    if (result >= 5.5 && !inputs.major.value) {
      setInputsHandler(1.25);
    }
    if (result >= 7.5 && !inputs.major.value) {
      setInputsHandler(2.5);
    }
  }

  useEffect(() => {
    amountHandler();
  }, [inputs.result, inputs.major]);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  }
  function courseHandler(course) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        course: {value: course, isValid: true},
      };
    });
  }

  function submitHandler() {
    console.log("input values", inputs);
    amountHandler();
    const resultData = {
      course: inputs.course.value,
      date: new Date(inputs.date.value),
      major: inputs.major.value,
      result: inputs.result.value,
      amount: inputs.amount.value,
    };

    const courseIsValid = resultData.course.length > 0;
    const dateIsValid = resultData.date.toString() !== "Invalid Date";
    const majorIsValid = typeof resultData.major == "boolean";
    const resultIsValid =
      !isNaN(resultData.result) &&
      resultData.result > 0 &&
      resultData.result <= 10;
    const amountIsValid = !isNaN(resultData.amount);

    if (
      !courseIsValid ||
      !dateIsValid ||
      !majorIsValid ||
      !resultIsValid ||
      !amountIsValid
    ) {
      Alert.alert("ongeldige input", "je bent een troelalala");
      return;
    }

    onSubmit(resultData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.titleStyle}>Jouw resultaat</Text>

      <SearchBarDropdown
        dataSource={dataSource}
        onSelect={onSelect}
        courseHandler={courseHandler}
        course={inputs.course.value}
        style={styles.dropdown}
      />

      <View style={styles.switchContainer}>
        <Text
          style={
            !inputs.major.value
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
            inputs.major.value
              ? GlobalStyles.colors.primary50
              : GlobalStyles.colors.primary50
          }
          ios_backgroundColor={GlobalStyles.colors.minor}
          onValueChange={inputChangedHandler.bind(this, "major")}
          value={inputs.major.value}
          style={styles.switch}
        />
        <Text
          style={
            inputs.major.value ? [styles.label, styles.activeMajor] : [styles.label]
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
            keyboardType: "number-pad",
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Cijfer"
          textInputConfig={{
            keyboardType: "numbers-and-punctuation",
            onChangeText: inputChangedHandler.bind(this, "result"),
            value: inputs.result.value,
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
  dropdown: {
    marginHorizontal: 4,
    backgroundColor: "red,",
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
  searchbar: {
    backgroundColor: GlobalStyles.colors.error50,
    height: 30,
    borderRadius: 6,
  },
});

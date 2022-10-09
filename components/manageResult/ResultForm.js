import { useState, useEffect } from "react";
import { View, Switch, Text, StyleSheet, TextInput, Alert } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import SearchBarDropdown from "../SearchBarDropdown";
import RadioButton from "../RadioButtons";

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
      isValid: true,
    },
    date: {
      value: defaultValues
        ? getFormattedDate(defaultValues.date)
        : dateInputHandler(),
      isValid: true,
    },
    confirmed: {
      value: defaultValues ? defaultValues.confirmed : false,
      isValid: true,
    },
    type: {
      value: defaultValues ? defaultValues.type.toString() : 0,
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

  const onSelect = (item) => {
    setSelectedItem(item);
  };

  const [userOption, setUserOption] = useState(null);
  const selectType = (item) => {
    setUserOption(item);
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
          amount: { value: amount, isValid: true },
        };
      });
    }
    if (result < 5.5 && inputs.type.value === "PW") {
      setInputsHandler(-2.5);
    }
    if (result < 4 && inputs.type.value === "PW") {
      setInputsHandler(-5.0);
    }
    if (result < 5.5 && inputs.type.value === "SO") {
      setInputsHandler(-1.25);
    }
    if (result < 4 && inputs.type.value === "MO") {
      setInputsHandler(-1.25);
    }
    if (result < 5.5 && inputs.type.value === "MO") {
      setInputsHandler(-0.65);
    }
    if (result < 4 && inputs.type.value === "SO") {
      setInputsHandler(-2.5);
    }
    if (result >= 5.5 && inputs.type.value === "PW") {
      setInputsHandler(2.5);
    }
    if (result >= 7.5 && inputs.type.value === "PW") {
      setInputsHandler(5.0);
    }
    if (result >= 5.5 && inputs.type.value === "SO") {
      setInputsHandler(1.25);
    }
    if (result >= 7.5 && inputs.type.value === "SO") {
      setInputsHandler(2.5);
    }
    if (result >= 5.5 && inputs.type.value === "MO") {
      setInputsHandler(0.65);
    }
    if (result >= 7.5 && inputs.type.value === "MO") {
      setInputsHandler(1.25);
    }
  }

  useEffect(() => {
    amountHandler();
  }, [inputs.result, inputs.type]);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }
  function courseHandler(course) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        course: { value: course, isValid: true },
      };
    });
  }
  function typeHandler(type) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        type: { value: type, isValid: true },
      };
    });
  }

  function submitHandler() {
    console.log("input values", inputs);
    amountHandler();
    const resultData = {
      course: inputs.course.value,
      date: new Date(inputs.date.value),
      confirmed: inputs.confirmed.value,
      type: inputs.type.value,
      result: inputs.result.value,
      amount: inputs.amount.value,
    };

    const courseIsValid = resultData.course.length > 0;
    const dateIsValid = resultData.date.toString() !== "Invalid Date";
    const confirmedIsValid = typeof resultData.confirmed == "boolean";
    const typeIsValid =
      resultData.type === "PW" ||
      resultData.type === "MO" ||
      resultData.type === "SO";
    const resultIsValid =
      !isNaN(resultData.result) &&
      resultData.result > 0 &&
      resultData.result <= 10;
    const amountIsValid = !isNaN(resultData.amount);

    if (
      !courseIsValid ||
      !dateIsValid ||
      !confirmedIsValid ||
      !typeIsValid ||
      !resultIsValid ||
      !amountIsValid
    ) {
      // Alert.alert("ongeldige input", "je bent een troelalala");
      setInputs((curInputs) => {
        return {
          course: { value: curInputs.course.value, isValid: courseIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          confirmed: { value: curInputs.confirmed.value, isValid: confirmedIsValid },
          type: { value: curInputs.type.value, isValid: typeIsValid },
          result: { value: curInputs.result.value, isValid: resultIsValid },
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
        };
      });
      return;
    }

    onSubmit(resultData);
  }

  const formIsInvalid =
    !inputs.course.isValid ||
    !inputs.date.isValid ||
    !inputs.confirmed.isValid ||
    !inputs.type.isValid ||
    !inputs.result.isValid ||
    !inputs.amount.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.titleStyle}>Jouw resultaat</Text>

      <SearchBarDropdown
        onSelect={onSelect}
        courseHandler={courseHandler}
        course={inputs.course.value}
        style={styles.dropdown}
        invalid={!inputs.course.isValid}
      />

      {/* <View style={styles.switchContainer}>
        <Text
          style={
            !inputs.confirmed.value
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
            GlobalStyles.colors.primary50
          }
          ios_backgroundColor={GlobalStyles.colors.minor}
          onValueChange={inputChangedHandler.bind(this, "major")}
          value={inputs.major.value}
          style={styles.switch}
          invalid={!inputs.major.isValid}
        />
        <Text
          style={
            inputs.major.value
              ? [styles.label, styles.activeMajor]
              : [styles.label]
          }
        >
          PROEFWERK
        </Text>
      </View> */}
      <RadioButton 
      onSelect={selectType} 
      // option={userOption} 
      typeHandler={typeHandler}
      value={inputs.type.value}
      invalid={!inputs.type.isValid}
      />
      <View style={styles.inputContainer}>
        <Input
          style={styles.rowInput}
          label="Datum"
          invalid={!inputs.date.isValid}
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
          invalid={!inputs.result.isValid}
          textInputConfig={{
            keyboardType: "numbers-and-punctuation",
            onChangeText: inputChangedHandler.bind(this, "result"),
            value: inputs.result.value,
          }}
        />
      </View>
      {formIsInvalid && <Text style={styles.errorText}>bla bla</Text>}
      <View style={styles.buttons}>
        <Button mode="flat" onPress={onCancel} style={styles.button}>
          Annuleren
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
    width: "100%",
    marginTop: 8,
  },
  switch: {
    marginHorizontal: 14,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    width: 120,
  },
  left: {
    textAlign: "right",
  },
  rowInput: {
    flex: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
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
    fontSize: 12,
    textAlign: "right",
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.minor,
    color: "white",
    padding: 8,
  },
  activeMajor: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "left",
    borderRadius: 6,
    backgroundColor: GlobalStyles.colors.major,
    color: "white",
    padding: 8,
  },
  searchbar: {
    backgroundColor: GlobalStyles.colors.error50,
    height: 30,
    borderRadius: 6,
  },
});

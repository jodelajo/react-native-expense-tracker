import { useState, useEffect } from "react";
import { View, Switch, Text, StyleSheet, TextInput } from "react-native";
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
  const [inputValues, setInputValues] = useState({
    course: defaultValues ? defaultValues.course : (filtered ? filtered : ''),
    date: defaultValues
      ? getFormattedDate(defaultValues.date)
      : dateInputHandler(),
    isMajor: defaultValues ? defaultValues.major : false,
    result: defaultValues ? defaultValues.result.toString() : 0,
    amount: defaultValues ? defaultValues.amount.toString() : 0,
  });

  const [isSearching, setIsSearching] = useState(false);
  const [selectedItem, setSelectedItem] = useState('')
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
    "Gym"
  ]);
  const [filtered, setFiltered] = useState(false);

  const onSelect = (item) => {
    setSelectedItem(item)
  }

  // const onSearch = (text) => {
  //   if (text) {
  //     setIsSearching(true);
  //     const temp = text.toLowerCase();
  //     console.log('temp', temp)
  //     // console.log('data source in resultform', dataSource)
  //     const tempList = dataSource.filter((item) => {
  //       // console.log('item', item)
  //       const courseItem = item.toLowerCase().includes(temp)
  //       if (courseItem) {
  //         return item;
  //       }
  //     });
  //     setFiltered(tempList);
  //     console.log('templist', tempList)
  //   } else {
  //     setIsSearching(false);
  //     setFiltered(dataSource);
  //   }
  // };
  // console.log('filterd', filtered)

  // function searchInputHandler(text) {
  //   if(filtered) {
     
  //    return text
  //   }
  // }

  function dateInputHandler() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const monthOutput = month < 10 ? "0" + month : month;
    const year = today.getFullYear();
    return year + "-" + monthOutput + "-";
  }

  function amountHandler() {
    const result = inputValues.result;

    function setInputValuesHandler(amount) {
      setInputValues((curInputValues) => {
        return {
          ...curInputValues,
          amount: amount,
        };
      });
    }

    if (result < 5.5 && inputValues.isMajor) {
      setInputValuesHandler(-2.5);
    }
    if (result < 4 && inputValues.isMajor) {
      setInputValuesHandler(-5.0);
    }
    if (result < 5.5 && !inputValues.isMajor) {
      setInputValuesHandler(-1.25);
    }
    if (result < 4 && !inputValues.isMajor) {
      setInputValuesHandler(-2.5);
    }
    if (result >= 5.5 && inputValues.isMajor) {
      setInputValuesHandler(2.5);
    }
    if (result >= 7.5 && inputValues.isMajor) {
      setInputValuesHandler(5.0);
    }
    if (result >= 5.5 && !inputValues.isMajor) {
      setInputValuesHandler(1.25);
    }
    if (result >= 7.5 && !inputValues.isMajor) {
      setInputValuesHandler(2.5);
    }
  }

  useEffect(() => {
    amountHandler();
  }, [inputValues.result, inputValues.isMajor]);

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: enteredValue,
      };
    });
  }
  function courseHandler(course) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        course: course
      }
    })
  }

  function submitHandler() {
    console.log("input values", inputValues);
    amountHandler();
    const resultData = {
      course: inputValues.course,
      date: new Date(inputValues.date),
      major: inputValues.isMajor,
      result: inputValues.result,
      amount: inputValues.amount,
    };
    onSubmit(resultData);
  }

  return (
    <View style={styles.form}>
      <Text style={styles.titleStyle}>Jouw resultaat</Text>

      <SearchBarDropdown 
      dataSource={dataSource}  
      onSelect={onSelect} 
      // value={selectedItem} 
      courseHandler={courseHandler} 
      course={inputValues.course} 
      style={styles.dropdown} 
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
            keyboardType: "number-pad",
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputValues.date,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Cijfer"
          textInputConfig={{
            keyboardType: "numbers-and-punctuation",
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
  dropdown: {
    marginHorizontal: 4,
    backgroundColor: 'red,'
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
  }
});

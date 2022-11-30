import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../manageResult/Input";
import { ResultsContext } from "../../store/results-context";
import { AuthContext } from "../../store/auth-context";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";
import { storeStartDate } from "../../http/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import { getFormattedDate } from "../../util/date";

export default function StartDate() {
  const navigation = useNavigation();
  const resultsCtx = useContext(ResultsContext);
  const authCtx = useContext(AuthContext);
  const storedStartDate = resultsCtx?.startDate;
  const [date, setDate] = useState(
    storedStartDate || "Nog geen datum ingesteld."
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  console.log("stored", storedStartDate);

  function dateHandler(value) {
    console.log("value", value);
    setIsValid(false);
    if (value.length === 10) {
      setDate(value);
    }
  }

  useEffect(() => {
    function dateValidator() {
      if (date.toString() !== "Invalid Date") {
        setIsValid(true);
      } else {
        setDate(date);
        setIsValid(false);
      }
    }
    dateValidator();
  }, [date]);

  const submitHandler = async () => {
    console.log("date???", date);
   
    console.log("sttate valid", isValid);
    setIsLoading(true);
    try {
      await storeStartDate(
        date,
        authCtx.currentUser.userId,
        authCtx.token.accessToken
      );
      resultsCtx.setStartDate(date.toString().slice(0,10));
    } catch (error) {
      console.log(error);
    }
    navigation.navigate("RecentResults");
    setIsLoading(false);
  };
  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <Input
        label="Startdatum huidige periode"
        invalid={!isValid}
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          keyboardType: "numbers-and-punctuation",
          onChangeText: (value) => dateHandler(value),
          defaultValue: storedStartDate
        }}
      />
      <Button
        style={!isValid ? styles.disabled : styles.button}
        onPress={submitHandler}
        disabled={!isValid}
      >
        Opslaan
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  button: {
    marginTop: 10,
    backgroundColor: GlobalStyles.colors.major,
    borderRadius: 8,
    minWidth: "90%",
  },
  disabled: {
    marginTop: 10,
    backgroundColor: GlobalStyles.colors.primary500,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.primary700,
    borderRadius: 8,
    minWidth: "90%",
    cursor: "default",
    color: GlobalStyles.colors.primary500,
  },
});

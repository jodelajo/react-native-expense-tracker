import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import Input from "../manageResult/Input";
import { ResultsContext } from "../../store/results-context";
import { AuthContext } from "../../store/auth-context";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";
import { storeStartDate } from "../../http/http";
import { getFormattedDate } from "../../util/date";

export default function StartDate() {
    const navigation = useNavigation();
  const resultsCtx = useContext(ResultsContext);
  const authCtx = useContext(AuthContext);
  const storedStartDate = resultsCtx.startDate;
  const [date, setDate] = useState(storedStartDate || "Nog geen datum ingesteld.");
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  
  // console.log('date', date)
  // const dateIsValid = (resultData.date.toString() !== "Invalid Date");
  // console.log(resultsCtx.startDate)
 
  console.log("stored", storedStartDate);
 

  const dateIsValid = date.toString() !== "Invalid Date";

  function dateHandler(value) {
    console.log("value", value);
    setIsValid(false)
    if (value.length === 10) {
        setDate(new Date(value));
        // setIsValid(true)
    }
  
  }

  useEffect(()=> {
    // console.log('date to string', date.toString())
    // console.log('date length', date.length)
    function dateValidator() {

        if(date.toString() !== "Invalid Date") {
         setIsValid(true)
        } else {
            setDate(date)
            setIsValid(false)
        }
       }
       dateValidator()
  },[date])


  const submitHandler = async () => {
    console.log("date???", date);
    console.log("sttate valid", isValid)
    // console.log('formatted date', getFormattedDate(date))
    console.log("valid?", dateIsValid);
    setIsLoading(true);
    try {
      await storeStartDate(
        date,
        authCtx.currentUser.userId,
        authCtx.token.accessToken
      );
      resultsCtx.setStartDate(date);
    } catch (error) {
      console.log(error);
    }
    navigation.navigate("RecentResults");
    setIsLoading(false);
  };

  return (
    <View>
      <Input
        label="Start datum huidige periode"
        invalid={!isValid}
        textInputConfig={{
          placeholder: "YYYY-MM-DD",
          maxLength: 10,
          keyboardType: "numbers-and-punctuation",
          onChangeText: (value) => dateHandler(value),
          defaultValue: storedStartDate,
        }}
      />
      <Button style={styles.button} onPress={submitHandler}>
        Opslaan
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    backgroundColor: GlobalStyles.colors.major,
    borderRadius: 8,
    minWidth: "90%",
  },
});

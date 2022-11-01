import React, { useState } from "react";
import { StyleSheet, View, Switch, Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../UI/Button";
import Input from "./Input";

function AuthForm({ isLogin, onSubmit, credentialsInvalid }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [isStudent, setIsStudent] = useState(true);
  // const [isEnabled, setIsEnabled] = useState(false);


  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "confirmEmail":
        setEnteredConfirmEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmPassword(enteredValue);
        break;
      // case "userRole":
      //   setIsStudent(enteredValue);
    }
  }



  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      confirmEmail: enteredConfirmEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmPassword,
      // role: isStudent,
    });
  }
  // const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.form}>
      <View>
        <Input
          label="Emailadres"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          keyboardType="email-address"
          isInvalid={emailIsInvalid}
          // defaultValue={AsyncStorage.getItem('email') ? AsyncStorage.getItem('email') : ''}
        />
        {!isLogin && (
          <Input
            label="Emailadres bevestigen"
            onUpdateValue={updateInputValueHandler.bind(this, "confirmEmail")}
            value={enteredConfirmEmail}
            keyboardType="email-address"
            isInvalid={emailsDontMatch}
          />
        )}
        <Input
          label="Wachtwoord"
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          secure
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Wachtwoord bevestigen"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        {/* <View style={styles.switchContainer}>
        <Text
           style={[styles.label, styles.left]}
        >
         Student
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
          onValueChange={updateInputValueHandler.bind(this, "userRole")}
          value={isStudent}
          style={styles.switch}
          // invalid={!inputs.major.isValid}
        />
        <Text
          style={styles.label}
        >
         Ouder
        </Text>
      </View>
      <Input
            label="Emailadres kind"
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            secure
            value={enteredConfirmPassword}
            isInvalid={passwordsDontMatch}
          /> */}
        <View style={styles.buttons}>
          <Button onPress={submitHandler} style={styles.button}>
            {isLogin ? "Inloggen" : "Inschrijven"}
          </Button>
        </View>
      </View>
    </View>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
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
  buttons: {
    marginTop: 12,
  },
  button: {
    backgroundColor: GlobalStyles.colors.major,
  },
});

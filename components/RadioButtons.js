import { View, Text, Pressable, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { useState, useEffect } from "react";

export default function RadioButton({ onSelect, typeHandler, value }) {
  const data = [{ value: "SO" }, { value: "PW" }, { value: "MO" }];
  const [typeStyles, setTypeStyles] = useState({});
  function onSelectedItem(item) {
    onSelect(item.value);
    typeHandler(item.value);
    styleHandler(item.value);
  }

  function styleHandler(option) {
    if (option === "PW") {
      setTypeStyles({
        backgroundColor: GlobalStyles.colors.major,
      });
    }
    if (option === "SO") {
      setTypeStyles({
        backgroundColor: GlobalStyles.colors.minor,
      });
    }
    if (option === "MO") {
      setTypeStyles({
        backgroundColor: GlobalStyles.colors.oral,
      });
    }
  }

  useEffect(() => {
    styleHandler(value);
  }, []);

  return (
    <View style={styles.container}>
      {data.map((item) => {
        return (
          <Pressable
            onPress={() => onSelectedItem(item)}
            style={[styles.button, item.value === value && typeStyles]}
            key={item.value}
            value={item.value}
          >
            <Text style={styles.text}> {item.value}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    height: 40,
    backgroundColor: GlobalStyles.colors.primary500,
    borderRadius: 4,
    margin: 6,
    width: 80,
    justifyContent: "center",
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});

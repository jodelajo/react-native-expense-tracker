import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Platform,
  Keyboard,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import Input from "../manageResult/Input";
import { GlobalStyles } from "../../constants/styles";
import Button from "../UI/Button";
import { storeCourse } from "../../http/http";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../store/auth-context";
import { ResultsContext } from "../../store/results-context";
import {
  KeyboardAwareFlatList,
  KeyboardAwareScrollView,
} from "react-native-keyboard-aware-scroll-view";
import LoadingOverlay from "../UI/LoadingOverlay";

export default function CoursesForm() {
  const authCtx = useContext(AuthContext);
  const coursesCtx = useContext(ResultsContext);
  const [course, setCourse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [coursesList, setCoursesList] = useState(
    coursesCtx.courses
      ? coursesCtx.courses
      : ["Nederlands", "Wiskunde", "Engels"]
  );

  function coursesHandler() {
    console.log("course", course);
    console.log("list", coursesList);
    const coursesCheck = coursesList.filter(
      (currCourse) => currCourse === course
    );
    console.log("courses check", coursesCheck);
    if (coursesCheck.length > 0) {
      if (Platform.OS === "web") {
        alert("Dit vak bestaat al");
      } else {
        Alert.alert("Dit vak bestaat al");
      }
      return
    }
    if (course === "") {
      if (Platform.OS === "web") {
        alert("Je moet eerst een vak invullen");
      } else {
        Alert.alert("Je moet eerst een vak invullen");
      }
      return
    } else {
      setCoursesList((currentCourse) => [...currentCourse, course]);
    }
    Keyboard.dismiss();
    setCourse("");
  }

  // console.log('sort?', coursesList.sort((a, b)=> b - a))
  async function submitHandler() {
    console.log("submit", coursesList);
    setIsLoading(true);
    try {
      await storeCourse(coursesList, authCtx.currentUser.userId, authCtx.token);
      coursesCtx.setCurrentCourses(coursesList);
    } catch (error) {
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  function deleteCourse(item) {
    setCoursesList((currentCourse) => {
      return currentCourse.filter((course) => course !== item);
    });
    console.log("delete");
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    // <KeyboardAwareScrollView>
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            label="Vak"
            textInputConfig={{
              onChangeText: (newCourse) =>
                setCourse(newCourse.replace(/^./, (str) => str.toUpperCase())),
              value: course,
              // defaultValue: authCtx.currentUser.displayName,
            }}
          />
          <Button onPress={coursesHandler} style={styles.addButton}>
            <Ionicons
              name="add-circle"
              size={24}
              color={GlobalStyles.colors.primary700}
            />
          </Button>
        </View>

        <FlatList
          data={coursesList}
          renderItem={(itemData) => {
            // console.log(coursesList);
            //  console.log(itemData)
            return (
              <View style={styles.courseList}>
                <Text style={styles.courseText}>{itemData.item}</Text>
                <Button onPress={() => deleteCourse(itemData.item)}>
                  {" "}
                  <Ionicons name="close" size={20} color={"gray"} />
                </Button>
              </View>
            );
          }}
        />
        <View>
          {/* <Button onPress={coursesHandler} style={styles.button}>
            Voeg toe
          </Button> */}
          <Button onPress={submitHandler} style={styles.button}>
            Opslaan
          </Button>
        </View>
      </View>
    </View>
    // </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  formContainer: {
    marginTop: 24,
    // marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    justifyContent: "center",
    maxHeight: 600,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    position: "relative",
    marginBottom: 30,
  },
  input: {
    flex: 1,
  },
  addButton: {
    position: "absolute",
    right: 4,
    bottom: 2,
  },
  courseList: {
    marginHorizontal: 4,
    marginVertical: 6,
    backgroundColor: GlobalStyles.colors.primary700,
    paddingLeft: 10,
    paddingRight: 4,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  courseText: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // backgroundColor: GlobalStyles.colors.primary100,
    // height: 40,
    // marginTop: 30,
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});

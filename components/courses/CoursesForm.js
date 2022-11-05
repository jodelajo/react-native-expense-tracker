import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  Platform,
  Keyboard,
} from "react-native";
import { useState, useContext } from "react";
import Input from "../manageResult/Input";
import { GlobalStyles } from "../../constants/styles";
import Button from "../UI/Button";
import { storeCourse } from "../../http/http";
import Ionicons from "react-native-vector-icons/Ionicons";
import { AuthContext } from "../../store/auth-context";
import { ResultsContext } from "../../store/results-context";
import LoadingOverlay from "../UI/LoadingOverlay";
import { useNavigation } from "@react-navigation/native";

export default function CoursesForm() {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);
  const coursesCtx = useContext(ResultsContext);

  const [course, setCourse] = useState("");
  const [showMessage, setShowMessage] = useState(true)
  const [isLoading, setIsLoading] = useState(false);
  const [coursesList, setCoursesList] = useState(
    coursesCtx.courses
      ? coursesCtx.courses
      : ["Nederlands", "Wiskunde", "Engels"]
  );

  // console.log("context courses in coursesform", coursesCtx.courses);
  function coursesHandler() {
    const coursesCheck = coursesList.filter(
      (currCourse) => currCourse === course
    );
    // console.log("courses check", coursesCheck);

    if (coursesCheck.length > 0) {
      if (Platform.OS === "web") {
        alert("Dit vak bestaat al");
      } else {
        Alert.alert("Dit vak bestaat al");
      }
      setCourse("");
      return;
    }
    if (course === "") {
      if (Platform.OS === "web") {
        alert("Je moet eerst een vak invullen");
      } else {
        Alert.alert("Je moet eerst een vak invullen");
      }
      return;
    } else {
      setCoursesList((currentCourse) => [...currentCourse, course]);
    }
    Keyboard.dismiss();
    setShowMessage(false)
    setCourse("");
  }

  async function submitHandler() {
    setIsLoading(true);
    try {
      await storeCourse(coursesList, authCtx.currentUser.userId, authCtx.token);
      coursesCtx.setCurrentCourses(coursesList);
    } catch (error) {
      setIsLoading(false);
    }
    navigation.navigate("RecentResults");
    setIsLoading(false);
  }

  function deleteCourse(item) {
    setCoursesList((currentCourse) => {
      return currentCourse.filter((course) => course !== item);
    });
  }
  if (isLoading) {
    return <LoadingOverlay />;
  }

  function newCourseHandler(currCourse) {
    const trimmedCourse = currCourse.replace(/\s/g, "");
    const capitalizedCourse =
      trimmedCourse && trimmedCourse[0].toUpperCase() + trimmedCourse.slice(1);
    setCourse(capitalizedCourse);
  }
  function deleteMessage(){
    setShowMessage(false)
  }
  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Input
            style={styles.input}
            label="Vak"
            textInputConfig={{
              onChangeText: (course) => newCourseHandler(course),
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
        {!coursesCtx.courses && showMessage &&(
          <View style={styles.initialTextContainer}>
            <Button onPress={deleteMessage}> <Ionicons name="close" size={16} color={"white"} /></Button>
           <View style={styles.textContainer}>
           <Text style={styles.initialText}>
              Hier staan alvast wat vakken voor je klaar. Je kunt een vak toevoegen
              en op plusje klikken. Je kunt ze weer verwijderen met het kruisje.
            </Text>
            <Text style={styles.bold}> Vergeet niet je vakken op te slaan.</Text>
           </View>
           
          </View>
        )}
        <FlatList
          data={coursesList}
          renderItem={(itemData) => {
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
          <Button onPress={submitHandler} style={styles.button}>
            Opslaan
          </Button>
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
    marginBottom: 20,
  },
  input: {
    flex: 1,
  },
  addButton: {
    position: "absolute",
    right: 4,
    bottom: 2,
  },
  initialTextContainer: {
    marginTop: -10,
    marginBottom: 10,
    backgroundColor: GlobalStyles.colors.minor,
    paddingHorizontal: 2,
    paddingBottom: 8,
    // textAlign: 'center',
    borderRadius: 8,
    // justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  textContainer: {
    marginTop: -8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 8,
  },
  initialText: {
    textAlign: 'center',
    color: "white",
    // width: "100%",
    marginHorizontal: 6,
    
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
  bold: {
    fontWeight: 'bold',
    marginTop: 6,
    color: "white",
    textAlign: 'center',
    // width: "100%",
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
    marginTop: 10,
    backgroundColor: GlobalStyles.colors.major,
    borderRadius: 8,
    minWidth: '90%'
  },
  // buttonUpload: {
  //   marginTop: 10,
  //   backgroundColor: GlobalStyles.colors.major,
  //   borderRadius: 8,
  //   minWidth: '90%'
  // }
});

import Input from "../manageResult/Input";
import envs from "../../config/env";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import {
  // Button,
  Image,
  Platform,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../store/auth-context";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { GlobalStyles } from "../../constants/styles";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";

const { API_KEY } = envs;

export default function UpdateProfileForm() {
  const navigation = useNavigation();
  const storage = getStorage();

  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(
    authCtx.avatar
      ? authCtx.avatar
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8vw6lSyyJyi4M87YNItzmpm9mMUni0dOJu1bJg-w5wRApCc60oOPwT4ZC2oFkQAl2qq8&usqp=CAU"
  );
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    console.log("image", image);
    console.log("avatar", authCtx.avatar);
    // console.log('photoUrl', photoUrl)
    async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, no permissions given to photos");
        }
      }
    };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const uploadImage = async () => {
    console.log("localId", authCtx.userId);
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    const fileRef = ref(storage, `${authCtx.userId}/avatar`);
    try {
      setUploading(true);
      const result = await uploadBytes(fileRef, blob);
      console.log("result", result);
    } catch (error) {
      console.log("error", error);
      setUploading(false);
    }
    setUploading(false);
    if (Platform.OS !== "web") {
      blob.close();
    }

    getUrl(fileRef);
  };

  const getUrl = async (fileRef) => {
    try {
      setUploading(true);
      const response = await getDownloadURL(fileRef).then((downloadURL) => {
        authCtx.setPhotoUrl(downloadURL);
        AsyncStorage.setItem("photoUrl", downloadURL);
        updateHandler(downloadURL);
      });
    } catch (error) {
      console.log("error", error);
      setUploading(false);
    }
    setUploading(false);
    navigation.navigate("UserProfile");
  };

  async function updateHandler(downloadURL) {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
    try {
      const response = await axios.post(url, {
        idToken: authCtx.token,
        displayName: username,
        photoUrl: downloadURL,
        returnSecureToken: true,
      });
      console.log(
        "response in updatehandler in updwateprofileform",
        response.data
      );
      authCtx.setName(response.data.displayName);
      AsyncStorage.setItem("displayName", response.data.displayName);
      // authCtx.setPhotoUrl(response.data.photoUrl)
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.formContainer}>
        <Input
          // defaultValue="hoi"
          // style={styles.rowInput}
          label="Username"
          // invalid={!inputs.result.isValid}
          textInputConfig={{
            //   keyboardType: "numbers-and-punctuation",
            onChangeText: (newName) => setUsername(newName),
            // value: authCtx.displayName
            placeholder: authCtx.displayName,
          }}
        />

        <View style={styles.avatarContainer}>
          {image && <Avatar source={{ uri: image }} size={200} />}
        </View>
        <Button onPress={pickImage} style={styles.button}>
          Selecteer een foto uit je bibliotheek
        </Button>
        {!uploading ? (
          <Button style={styles.buttonUpload} onPress={uploadImage}>Profiel bijwerken </Button>
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}
        </View>
       
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
    // padding: 10,
    // paddingHorizontal: 30,
  },
  formContainer: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  avatarContainer: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  button: {
    backgroundColor: GlobalStyles.colors.minor,
    borderRadius: 8,
  },
  buttonUpload: {
    marginTop: 10,
    backgroundColor: GlobalStyles.colors.major,
    borderRadius: 8,
  }
  // avatar: {
  //   borderRadius: 100,
  //   borderWidth: 2,
  //   borderColor: "white",
  //   width: 200,
  //   height: 200,
  //   overflow: "hidden",
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
});

import Input from "../manageResult/Input";
import envs from "../../config/env";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { Platform, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "../../store/auth-context";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { GlobalStyles } from "../../constants/styles";
import Avatar from "../UI/Avatar";
import Button from "../UI/Button";
import LoadingOverlay from "../UI/LoadingOverlay";
import { onAuthStateChanged, getAuth } from "firebase/auth/react-native";

const { API_KEY } = envs;

export default function UpdateProfileForm() {
  const navigation = useNavigation();
  const storage = getStorage();

  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState(
    authCtx.currentUser?.displayName || ""
  );
  const [image, setImage] = useState(
    authCtx.currentUser.photoUrl
      ? authCtx.currentUser.photoUrl
      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8vw6lSyyJyi4M87YNItzmpm9mMUni0dOJu1bJg-w5wRApCc60oOPwT4ZC2oFkQAl2qq8&usqp=CAU"
  );
  const [uploading, setUploading] = useState(false);
  const [token, setToken] = useState(authCtx.currentUser?.idToken)

  
  const currentUser = authCtx?.currentUser
  const uid = authCtx.currentUser?.uid

  console.log("currUser", currentUser);
  console.log('token', token)

  const auth = getAuth();
  onAuthStateChanged(auth, (response) => {
    console.log('hiii')
    if (response) {
      console.log(response);
      response.getIdToken().then(function (data) {
        console.log("data", data);
        setToken(data)
      });
    }

  // useEffect(() => {
   
  //   });

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
    setUploading(true);
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log("result in pickImage", result.uri);
    if (!result.cancelled) {
      setImage(result.uri);
    }
    setUploading(false);
  };

  const uploadImage = async () => {
    setUploading(true);
    // console.log('hoi', currentUser.uid);
    if (image !== currentUser.photoUrl) {
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
     
      try {
        const fileRef =
        uid && ref(storage, `${uid}/avatar.png`);
        await uploadBytes(fileRef, blob);
        if (fileRef) {
          getUrl(fileRef);
        }
        if (Platform.OS !== "web") {
          blob.close();
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      updateHandler(authCtx.currentUser.photoUrl);
    }
  };

  const getUrl = async (fileRef) => {
    setUploading(true);
    try {
      await getDownloadURL(fileRef).then((downloadURL) => {
        authCtx.setUser({ ...currentUser, photoUrl: downloadURL });
        updateHandler(downloadURL);
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  async function updateHandler(downloadURL) {
    setUploading(true);
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
    try {
      const response = await axios.post(url, {
        idToken: token,
        displayName: username,
        photoUrl: downloadURL,
        returnSecureToken: true,
      });
      console.log(
        "response in updatehandler in updwateprofileform",
        response.data
      );
      authCtx.setUser({
        ...authCtx.currentUser,
        displayName: response.data.displayName,
        photoUrl: response.data.photoUrl,
      });
      await AsyncStorage.setItem("displayName", response.data.displayName);
      await AsyncStorage.setItem("photoUrl", response.data.photoUrl);
    } catch (error) {
      console.log("error", error);
    }
    navigation.navigate("UserProfile");
    setUploading(false);
  }

  return (
    <>
      {!uploading ? (
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Input
              // style={styles.rowInput}
              label="Username"
              // invalid={!inputs.result.isValid}
              textInputConfig={{
                onChangeText: (newName) => setUsername(newName),
                defaultValue: authCtx.currentUser.displayName,
              }}
            />

            <View style={styles.avatarContainer}>
              <Avatar source={{ uri: image }} size={200} />
            </View>
            <Button onPress={pickImage} style={styles.button}>
              Selecteer een foto uit je bibliotheek
            </Button>

            <Button style={styles.buttonUpload} onPress={uploadImage}>
              Profiel bijwerken{" "}
            </Button>
          </View>
        </View>
      ) : (
        <LoadingOverlay />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  formContainer: {
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
  },
});

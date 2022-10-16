import Input from "../manageResult/Input";
import envs from "../../config/env";
import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Image,
  Platform,
  View,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { AuthContext } from "../../store/auth-context";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { ref, uploadBytes, getDownloadURL, getStorage } from "firebase/storage";
import { GlobalStyles } from "../../constants/styles";

const { API_KEY } = envs;

export default function UpdateProfileForm() {
  const navigation = useNavigation();
  const storage = getStorage();

  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [image, setImage] = useState();
  const [uploading, setUploading] = useState(false);


  useEffect(() => {
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
      console.log("image", result.uri);
    }
  };

  const uploadImage = async () => {
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

    const fileRef = ref(storage, "avatar");
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
       updateHandler(downloadURL)
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
        returnSecureToken: true
      });
      console.log(
        "response in updatehandler in updwateprofileform",
        response.data
      );
      authCtx.setName(response.data.displayName);
      authCtx.setPhotoUrl(response.data.photoUrl)
    } catch (error) {
     console.log('error', error)
    }
  }

  return (
    <>
      <View style={styles.container}>
        <Input
          // style={styles.rowInput}
          label="Username"
          // invalid={!inputs.result.isValid}
          textInputConfig={{
            //   keyboardType: "numbers-and-punctuation",
            onChangeText: (newName) => setUsername(newName),
            //   value: inputs.result.value,
          }}
        />

        <View style={styles.avatarContainer}>
          {image && <Image source={{ uri: image }} style={styles.avatar} />}
        </View>
        <Button
          title="Selecteer een foto uit je bibliotheek"
          onPress={pickImage}
        />
        {!uploading ? (
          <Button title="Profiel bijwerken" onPress={uploadImage} />
        ) : (
          <ActivityIndicator size="large" color="black" />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  avatarContainer: {
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    padding: 20,
  },
  avatar: {
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "white",
    width: 200,
    height: 200,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});

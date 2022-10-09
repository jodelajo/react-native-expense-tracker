import Input from "../manageResult/Input";
import envs from "../../config/env";
import axios from "axios";
import { useState, useContext } from "react";
import { Button, Image, View } from "react-native";
import { AuthContext } from "../../store/auth-context";
import * as ImagePicker from "expo-image-picker";
const { API_KEY } = envs;
// const authCtx = useContext(AuthContext);

export default function UpdateProfileForm() {
 
  const [profile, setProfile] = useState();
  const [username, setUsername] = useState("");
  const [image, setImage] = useState(localFile);

  const localFile = `./../assets/icon.png`;
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  async function updateHandler() {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;
    const response = await axios.post(url, {
      idToken: authCtx.token,
      displayName: username,
      photoUrl: image,
      returnSecureToken: true,
    });
    console.log(
      "response in updatehandler in updateprofileform",
      response.data.providerUserInfo
    );
  }

  return (
    <>
      <View>
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
        {/* <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && (
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        )} */}
      </View>
      <Button title="Profiel bijwerken" onPress={updateHandler} />
    </>
  );
}

import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { View, Button, Alert } from "react-native";
import { storage } from "../../config/firebase";
import {  ref } from 'firebase/storage'

export default function ImagePickerFromCamera({image, setImage}){
    console.log(setImage)
    
    const storageRef = ref(storage)
    const avatarRef = ref(storageRef, 'avatar')
const [cameraPermissionInformation, requestPermission] = useCameraPermissions()

async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
        const response = await requestPermission()
        return response.granted
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
        Alert.alert('geen toegang tot camera, je moet toegang geven')
        return false
    }
    return true
}


    async function takeImageHandler() {
       const hasPermission = await verifyPermissions()
       if (!hasPermission){
        return
       }
      const image = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      })
      console.log('image', image)
      setImage(image.uri)
    }
    return(
        <View>
            {/* {image &&<View></View>} */}
            <Button title="Maak een foto" onPress={takeImageHandler}/>
        </View>
    )
}
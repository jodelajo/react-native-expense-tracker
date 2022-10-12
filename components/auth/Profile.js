import { View, Text, StyleSheet, Image, Button } from "react-native"
import { AuthContext } from "../../store/auth-context"
import { useContext } from "react"
import { GlobalStyles } from "../../constants/styles"
import { useNavigation } from "@react-navigation/native"
import UpdateProfileForm from "./UpdateProfileForm"
// import Button from "../UI/Button"


export default function Profile() {
    const navigation = useNavigation()
    // console.log('props in profile!!!', props)
    // const navigation = props.navigation
    const authCtx = useContext(AuthContext)
    const name = authCtx.displayName
    console.log('name in profile', name)
    const avatar = authCtx.avatar
    console.log(avatar)
    return (
            <View style={styles.container}>
                <Text style={styles.text}>Hoi {name}</Text>
                <Image
                source={{ uri: avatar }}
                style={styles.avatar}
                />
                  <Button title="Profiel wijzigen" onPress={()=> navigation.navigate(UpdateProfileForm)}/>
            </View>
          
    )
}
const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    avatar: {
        borderRadius: '50%',
        borderBottomWidth: 1,
        borderColor: GlobalStyles.colors.primary700,
        height: 60,
        width: 60,
        marginBottom: 20,
    }
})
import { useState } from "react";
import AuthContent from "../components/auth/AuthContent";
import { Alert, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { LoginUser } from "../components/auth/CreateUser";

export default function Login() {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

async function loginHandler({email, password}) {
    console.log(email, password)
    setIsLoading(true)
    try {
      await LoginUser(email, password)
    } catch (error) {
        // setError(error.toString())
        // setIsLoading(false)
        Alert.alert("blabla", "sdoij soidfjsod isdoi sdofij")
    }
    setIsLoading(false)
}
if (isLoading) {
    return <LoadingOverlay  />
}
// if (error && !isLoading) {
//     console.log(error)
//     return <ErrorOverlay message={error} />
// }
    return (<View style={styles.container}>
 <AuthContent isLogin onAuthenticate={loginHandler} />
    </View>)
   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary700
    }
})
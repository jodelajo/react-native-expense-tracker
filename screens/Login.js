import { useState, useContext } from "react";
import AuthContent from "../components/auth/AuthContent";
import { Alert, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { LoginUser } from "../components/auth/CreateUser";
import { AuthContext } from "../store/auth-context";
import FetchUser from "../components/auth/FetchUser";
import { fetchUser } from "../components/UI/http";

export default function Login() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    // const [user, setUser ] = useState()

    const authCtx = useContext(AuthContext)

async function loginHandler({email, password}) {
    console.log(email, password)
    setIsLoading(true)
    try {
      const token = await LoginUser(email, password)
      authCtx.authenticate(token)
    //   console.log('token in login', token)
      const result = await FetchUser(email)
    authCtx.setUser(result)
    //   console.log('response in login', response)
    } catch (error) {
        // setError(error.toString())
        // setIsLoading(false)
        Alert.alert("blabla", "sdoij soidfjsod isdoi sdofij")
    }
    setIsLoading(false)
    // console.log('user', user)
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
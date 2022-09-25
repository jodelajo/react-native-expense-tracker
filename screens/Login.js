import { useState } from "react";
import AuthContent from "../components/auth/AuthContent";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { LoginUser } from "../components/auth/CreateUser";

export default function Login() {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

async function loginHandler({email, password}) {
    console.log(email, password)
    try {
        setIsLoading(true)
        await LoginUser(email, password)
    } catch (error) {
        setError(error.toString())
        setIsLoading(false)
    }
    setIsLoading(false)
}
if (isLoading) {
    return <LoadingOverlay  />
}
if (error && !isLoading) {
    console.log(error)
    return <ErrorOverlay message={error} />
}
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
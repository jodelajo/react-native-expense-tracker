import AuthContent from "../components/auth/AuthContent";
import { Alert, StyleSheet } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { View } from "react-native";
import { CreateUser } from "../components/auth/CreateUser";
import { useState , useContext, useEffect} from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import { AuthContext } from "../store/auth-context";
import { fetchUser } from "../components/UI/http";


export default function SignUp() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const authCtx = useContext(AuthContext)

async function signupHandler({email, password}) {
    console.log(email, password)
    try {
        setIsLoading(true)
        const token = await CreateUser(email, password)
        authCtx.authenticate(token)
        authCtx.logout()
       
    } catch (error) {
      // Alert.alert('jajaja', 'sdiof soidfjoi sdfoijoi')
        setError(error.toString())
        // setIsLoading(false)
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

  return (
    <View style={styles.container}>
      <AuthContent onAuthenticate={signupHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});

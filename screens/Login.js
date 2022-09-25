import AuthContent from "../components/auth/AuthContent";
import { StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

export default function Login() {
    return (<View style={styles.container}>
 <AuthContent isLogin />
    </View>)
   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary700
    }
})
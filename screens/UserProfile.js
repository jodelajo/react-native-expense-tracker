import { View, Text,Button, StyleSheet, } from "react-native"
import { AuthContext } from "../store/auth-context"
import { ResultsContext } from "../store/results-context"
import {  useContext } from "react"
import { GlobalStyles } from "../constants/styles"
import UpdateProfileForm from "../components/auth/UpdateProfileForm"
import Profile from "../components/auth/Profile"


export default function UserProfile() {
    const authCtx = useContext(AuthContext)
    const resultsCtx = useContext(ResultsContext)
    return (
<View style={styles.container}>
    <Button title="Uitloggen" onPress={() => authCtx.logout(resultsCtx.setResults)}/>

    {/* <Profile /> */}
    {/* <UpdateProfileForm/> */}
</View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary700,
        padding: 24,
    }
})
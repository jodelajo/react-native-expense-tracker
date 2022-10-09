import { View, Text,Button } from "react-native"
import { AuthContext } from "../store/auth-context"
import { ResultsContext } from "../store/results-context"
import {  useContext } from "react"

export default function UserProfile() {
    const authCtx = useContext(AuthContext)
    const resultsCtx = useContext(ResultsContext)
    return (
<View>
    <Button title="Uitloggen" onPress={() => authCtx.logout(resultsCtx.setResults)}/>
</View>
    )
}
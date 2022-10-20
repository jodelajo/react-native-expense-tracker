import { View, StyleSheet,Text } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import Button from "./Button";

export default function ErrorOverlay({message}) {
return <View style={styles.container}>
    <Text style={[styles.text, styles.title]}>Er is iets fout gegaan!</Text>
    <Text style={styles.text}>{message}</Text>
    {/* <Button onPress={onConfirm}>OK</Button> */}
</View>
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    text: {
        textAlign: 'center',
        marginBottom: 8,
        color: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
   
})
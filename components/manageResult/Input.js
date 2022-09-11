import {View, Text, TextInput, StyleSheet} from "react-native";
import {GlobalStyles} from "../../constants/styles";

export default function Input({label, textInputConfig, style}) {
    return <View style={[styles.inputContainer, style]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput style={styles.input} {...textInputConfig} />
    </View>

}
const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4,
        // minWidth: 100,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
        // minWidth: '40%',
        color: GlobalStyles.colors.primary700
    }
})
import {View, StyleSheet, Text} from "react-native";
import {GlobalStyles} from "../../constants/styles";

import ResultsList from "./ResultsList";
import ResultsSummary from "./ResultsSummary";


export default function ResultsOutput({results, resultPeriod, fallbackText}) {
    let content = <Text style={styles.infoText}>{fallbackText}</Text>
    if (results.length > 0) {
        content = <ResultsList results={results} />
    }

    return (
        <View style={styles.container}>
            <ResultsSummary results={results} periodName={resultPeriod} />
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
        flex: 1,
    },
    infoText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 32,
    }
})
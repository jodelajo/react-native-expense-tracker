import { useContext } from "react"
import {View, Text, StyleSheet} from "react-native"
import {GlobalStyles} from "../../constants/styles"
import { ResultsContext } from "../../store/results-context"

export default function ResultsSummary({results, periodName}) {
    const {saldo} = useContext(ResultsContext)
    // const resultsSum = results.reduce((sum, result) => {
    //     return sum + result.result
    // }, 0)

    return <View style={styles.container}>
        <Text style={styles.period}>{periodName}</Text>
        <Text style={styles.sum}>{saldo}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500,
    }
})
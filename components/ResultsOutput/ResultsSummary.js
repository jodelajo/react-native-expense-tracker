import React, { useContext , useEffect} from "react"
import {View, Text, StyleSheet} from "react-native"
import {GlobalStyles} from "../../constants/styles"
import { ResultsContext } from "../../store/results-context"

export default function ResultsSummary({results, periodName}) {
    console.log('results', results)
    const { setSaldo } = useContext(ResultsContext)
    const resultsSum = results && results.reduce((sum, result) => {
        return sum + result.amount
    }, 0)

    useEffect(() => {
        setSaldo(resultsSum)
    },[resultsSum])


    return <View style={styles.container}>
        <Text style={styles.period}>{periodName}</Text>
        <Text style={styles.sum}>€ {resultsSum && resultsSum.toFixed(2)}</Text>
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
        marginBottom: 10,
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
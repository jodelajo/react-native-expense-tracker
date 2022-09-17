import { useContext, useEffect } from "react";
import {Pressable, View, Text, StyleSheet} from "react-native";
import {GlobalStyles} from "../../constants/styles";
import {getFormattedDate} from "../../util/date";
import {useNavigation} from "@react-navigation/native"
import { ResultsContext } from "../../store/results-context";


export default function ResultItem({id, major, course, result, date}) {
    const navigation = useNavigation()

    function resultPressHandler() {
        navigation.navigate("ManageResult", {
            resultId: id
        })
    }


    const {saldo, setSaldo} = useContext(ResultsContext)
    // console.log('context', resultsCtx.saldo)
    // console.log('result', result)
    // console.log('mojar', major)
  
    
  function saldoHandler() {
    // const saldo = resultsCtx.saldo
    // const result = result
    // const isMultiplier = major
    const isOk = 1.25
    const isGood = 2.5
  
  
    if(result >= 5.5) {
      setSaldo(saldo + isOk)
    }
    if(result >= 5.5 && major) {
      setSaldo(saldo + isGood)
    }
    if(result < 5.5) {
      setSaldo(saldo - isOk)
    }
    if (result < 5.5 && major) {
      setSaldo(saldo - isGood)
    }
  }
  
  useEffect(() => {
    saldoHandler()
  },[result, major])



    return <Pressable onPress={resultPressHandler} style={({pressed}) => pressed && styles.pressed}>
        <View style={[styles.resultItem, major ? styles.resultItemMajor : styles.resultItemMinor]}>
            <View>
                <Text style={[styles.textBase, styles.description]}>{course}</Text>
                <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
            </View>
            {/* <View style={[styles.resultContainer]}>
                <Text style={[styles.result]}>{saldo}</Text>
            </View> */}
            <View style={[styles.resultContainer, result < 5.5 ? styles.insufficient : styles.sufficient]}>
                <Text style={[styles.result, result < 5.5 ? styles.insufficient : styles.sufficient]}>{result}</Text>
            </View>
        </View>
    </Pressable>
}

const styles = StyleSheet.create({
    pressed: {
        opacity: .5,
    },
    resultItem: {
        padding: 12,
        marginVertical: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        shadowColor: GlobalStyles.colors.gray500,
        shadowRadius: 4,
        shadowOffset: {width: 1, height: 1},
        shadowOpacity: .4,
        minWidth: '100%',
    },
    resultItemMajor: {
        backgroundColor: GlobalStyles.colors.major,
    },
    resultItemMinor: {
        backgroundColor: GlobalStyles.colors.minor,
    },
    sufficient: {
        backgroundColor: GlobalStyles.colors.primary500,
        color: GlobalStyles.colors.sufficient,
    },
    insufficient: {
        backgroundColor: GlobalStyles.colors.primary500,
        color: GlobalStyles.colors.insufficient,
    },
    textBase: {
        color: GlobalStyles.colors.primary50,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    resultContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        width: 60,
    },
    result: {
        fontWeight: 'bold',
    }
})
import {useLayoutEffect, useContext} from "react"
import {View, StyleSheet} from "react-native"
import IconButton from "../components/UI/IconButton"
import {GlobalStyles} from "../constants/styles"
import Button from "../components/UI/Button"
import {ResultsContext} from "../store/results-context"

export default function ManageResult({route, navigation}) {
    const resultsCtx = useContext(ResultsContext)

    const editedResultId = route.params?.resultId
    const isEditing = !!editedResultId

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Wijzig cijfer' : 'Voeg cijfer toe'
        })
    }, [navigation, isEditing])

    function deleteResultHandler() {
        resultsCtx.deleteResult(editedResultId)
        navigation.goBack()
    }
    function cancelHandler() {
        navigation.goBack()
    }
    function confirmHandler() {
        if (isEditing) {
            resultsCtx.updateResult(
                editedResultId,
                {
                    course: 'test!!',
                    major: true,
                    result: 9.9,
                    date: new Date('2022-09-11')
                })
        } else {
            resultsCtx.addResult({
                course: 'test',
                major: true,
                result: 9.9,
                date: new Date('2022-09-11')
            })
        }
        navigation.goBack()
    }

    return <View style={styles.container}>
        <View style={styles.buttons}>
            <Button mode='flat' onPress={cancelHandler} style={styles.button}>Cancel</Button>
            <Button onPress={confirmHandler} style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
        </View>
        {isEditing && (
            <View style={styles.deleteContainer}>
                <IconButton
                    icon='trash'
                    color={GlobalStyles.colors.error500}
                    size={36}
                    onPress={deleteResultHandler} />
            </View>
        )
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    }
})
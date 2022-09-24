import { useLayoutEffect, useContext } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ResultsContext } from "../store/results-context";
import ResultForm from "../components/manageResult/ResultForm";
import { deleteResult, storeResult, updateResult } from "../components/UI/http";

export default function ManageResult({ route, navigation }) {
  const resultsCtx = useContext(ResultsContext);

  const editedResultId = route.params?.resultId;
  const isEditing = !!editedResultId;

  const selectedResult = resultsCtx.results.find(
    (result) => result.id === editedResultId
  );
  //   console.log('selected result', selectedResult)
  //   console.log('edited rsult id', editedResultId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Wijzig cijfer" : "Voeg cijfer toe",
    });
  }, [navigation, isEditing]);

  async function deleteResultHandler() {
    resultsCtx.deleteResult(editedResultId);
    await deleteResult(editedResultId)
    navigation.goBack();
  }
  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(resultData) {
    if (isEditing) {
      resultsCtx.updateResult(editedResultId, resultData);
      await updateResult(editedResultId, resultData)
    } else {
      const id = await storeResult(resultData);
      resultsCtx.addResult({ ...resultData, id: id });
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ResultForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Wijzig" : "Voeg toe"}
        defaultValues={selectedResult}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteResultHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

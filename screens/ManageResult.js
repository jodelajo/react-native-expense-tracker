import { useLayoutEffect, useContext, useState } from "react";
import { View, StyleSheet } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ResultsContext } from "../store/results-context";
import { AuthContext } from "../store/auth-context";
import ResultForm from "../components/manageResult/ResultForm";
import { deleteResult, updateResult, storeResult } from "../components/UI/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

export default function ManageResult({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const resultsCtx = useContext(ResultsContext);
  const authCtx = useContext(AuthContext);

  const editedResultId = route.params?.resultId;
  const isEditing = !!editedResultId;

  const selectedResult = resultsCtx.results.find(
    (result) => result.id === editedResultId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Wijzig cijfer" : "Voeg cijfer toe",
    });
  }, [navigation, isEditing]);

  async function deleteResultHandler() {
    setIsLoading(true);
    try {
      resultsCtx.deleteResult(editedResultId);
      await deleteResult(editedResultId, authCtx.userId, authCtx.token);
    } catch (error) {
      setError("Kon resultaat niet verwijderen - Probeer later nog een keer!");
    }

    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(resultData) {
    setIsLoading(true);

    try {
      if (isEditing) {
        resultsCtx.updateResult(editedResultId, resultData);
        console.log("manage result", authCtx.token);
        await updateResult(editedResultId, resultData, authCtx.userId, authCtx.token);
      } else {
        const id = await storeResult(resultData, authCtx.userId, authCtx.token);
        resultsCtx.addResult({ ...resultData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      setError("Kon resultaat niet opslaan - probeer later nog een keer!");
    }
  }

  if (error && !isLoading) {
    return <ErrorOverlay message={error.toString()} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
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

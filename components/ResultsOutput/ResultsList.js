import {FlatList, StyleSheet} from "react-native";
import ResultItem from "./ResultItem";


function renderResultItem(itemData) {
    return <ResultItem  {...itemData.item} />
}
export default function ResultsList({results}) {
    return <FlatList
        data={results}
        renderItem={renderResultItem}
        keyExtractor={(item) => item.id}
    />
}

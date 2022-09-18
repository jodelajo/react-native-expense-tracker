import {useContext} from "react"
import ResultsOutput from "../components/ResultsOutput/ResultsOutput"
import {ResultsContext} from "../store/results-context"

export default function AllResults() {
    const resultsCtx = useContext(ResultsContext)
    console.log('all results results context', resultsCtx)
    return <ResultsOutput results={resultsCtx.results} resultPeriod='Totaal' fallbackText="Nog geen resultaten" />
}
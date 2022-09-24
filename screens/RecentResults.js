import ResultsOutput from "../components/ResultsOutput/ResultsOutput"
import {useContext, useEffect, useState} from "react"
import {ResultsContext} from "../store/results-context"
import {getDateMinusDays} from "../util/date"
import { fetchResults } from "../components/UI/http"


export default function RecentResults() {
    const resultsCtx = useContext(ResultsContext)

    useEffect(() => {
        async function getResults() {
           const results = await fetchResults()
           resultsCtx.setResults(results)
        }
       getResults()
    },[])


    const recentResults = resultsCtx.results.filter((item) => {
        const today = new Date()
        const thisPeriod = getDateMinusDays(today, 100)
        return (item.date >= thisPeriod) && (item.date <= today)
    })

    return <ResultsOutput results={recentResults} resultPeriod="Deze periode" fallbackText="Nog geen resultaten" />
}
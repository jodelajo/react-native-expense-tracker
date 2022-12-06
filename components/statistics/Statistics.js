import { View, Text, StyleSheet } from "react-native";
import { ResultsContext } from "../../store/results-context";
import { useContext, useState, useEffect } from "react";
import { GlobalStyles } from "../../constants/styles";

export default function Statistics() {
  const resultsCtx = useContext(ResultsContext);
  const [results, setResults] = useState(resultsCtx.results);
  const [prevScores, setPrevScores] = useState([]);
  const [curScores, setCurScores] = useState([]);
  //   const [bestCourse, setBestCourse] =
  const courses = resultsCtx.courses;
  const startDate = resultsCtx.startDate;
  const resultsHandler = () => {
    courses.map((course) => {
      let sum = 0;
      const currentResults = results
        .filter((result) => {
          if (result.course === course && result !== undefined) {
            sum += result.amount;
            return result;
          }
        })
        .map((result) => {
          //   console.log(currentResults);
          console.log(result.date)
          console.log(new Date(startDate))
          if (result.date < new Date(startDate)) {
            setPrevScores((scores) => {
              return {
                ...scores,
                [course]: {
                  course: result.course,
                  id: result.id,
                  saldo: sum,
                  average: sum / currentResults.length,
                },
              };
            });
          } else {
            setCurScores((curScores) => {
              return {
                ...curScores,
                [course]: {
                  course: result.course,
                  id: result.id,
                  saldo: sum,
                  average: sum / currentResults.length,
                },
              };
            });
          }
        });
      console.log("cur res", currentResults);
      console.log("sum", sum);
    });
  };

  useEffect(() => {
    resultsHandler();
    // console.log("??", results);
  }, [results, courses]);

  console.log("scores", prevScores);
  console.log("cur scores", curScores);

// const resultPrevPeriod = Object.values(prevScores).map((score)=> {
//     console.log(score)
//     let sum = 0
//     //  + score.saldo
//     // Object.values(score).forEach(element => {
        
//     // });
//     return sum  + score.saldo
// })

const resultPrevPeriod = Object.values(prevScores).reduce(function(tot, array) {
    return tot + array.saldo
}, 0)

console.log('result prev period', resultPrevPeriod)

const bestCoursePrevPeriod = Object.values(prevScores).sort((a,b)=> (b.average - a.average)).slice(0,1)[0]
const worstCoursePrevPeriod = Object.values(prevScores).sort((a,b)=> (a.average - b.average)).slice(0,1)[0]
console.log(bestCoursePrevPeriod)

  return (
    <View style={styles.container}>
      <Text>Eind datum vorige periode: {startDate}</Text>
      <Text>saldo vorige periode: € {resultPrevPeriod}</Text>
      {/* <Text>Eind saldo: {resultsCtx.saldo}</Text> */}
      {/* <Text>Periode</Text> */}
      <Text>Beste vak: {bestCoursePrevPeriod?.course} - {bestCoursePrevPeriod?.average.toFixed(2)} </Text>
      <Text>Slechtste vak: {worstCoursePrevPeriod?.course} -  {worstCoursePrevPeriod?.average.toFixed(2)}</Text>
      {/* <Text>Hoogste cijfer</Text>
      <Text>Laagste Cijfer</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 64,
    marginHorizontal: 32,
    padding: 16,
    borderRadius: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
});

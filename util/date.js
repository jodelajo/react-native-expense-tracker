export function getFormattedDate(date) {
    console.log('date', date.toString())
    return date.toString().slice(0, 10)
}

export function getDateMinusDays(date, days) {
   
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days)
}

// export function dateInputHandler() {
//     const today = new Date();
//     const month = today.getMonth() + 1;
//     const monthOutput = month < 10 ? "0" + month : month;
//     const year = today.getFullYear();
//     return year + "-" + monthOutput + "-" + "01";
//   }
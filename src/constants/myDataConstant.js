import myFinanceG from '../constants/bar.json'
import dataSummary from '../constants/summarytable.json'

function processMyFinance(myFinanceG) {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return (
    myFinanceG
      // .filter((item) => item.Opal === '0304701 Boyce Estate')
      .map((item) => {
        const cumBudget = parseFloat(item.cumBudget.toFixed(0))
        const cumActual = parseFloat(item.cumActual.toFixed(0))
        const { Opal, Month, ...rest } = item
        return {
          Opal,
          Month,
          myMonth: monthNames[Month - 1],
          Actuals: cumActual,
          Budget: cumBudget,
          ...rest,
        }
      })
  )
}

export const myFinanceGG = processMyFinance(myFinanceG)

function sumByOpal(data) {
  const opalSummary = data.reduce((acc, item) => {
    if (!acc[item.Opal]) {
      acc[item.Opal] = {
        Opal: item.Opal,
        BudgetSum: 0,
        ExpenseSum: 0,
        Remain: 0,
      }
    }

    acc[item.Opal].BudgetSum += item.BudgetSum / 1000
    acc[item.Opal].ExpenseSum += item.ExpenseSum / 1000
    acc[item.Opal].Remain += item.Remain

    return acc
  }, {})

  return Object.values(opalSummary)
}
// function sumByOpal(data) {
//   const opalSummary = data.reduce((acc, item) => {
//     if (!acc[item.Opal]) {
//       acc[item.Opal] = {
//         Opal: item.Opal,
//         BudgetSum: 0,
//         ExpenseSum: 0,
//         Remain: 0,
//       }
//     }

//     acc[item.Opal].BudgetSum = Math.round((acc[item.Opal].BudgetSum + item.BudgetSum) / 1000); // Divide by 1000 to convert to thousands (K) and round to 0 decimal places
//     acc[item.Opal].ExpenseSum = Math.round((acc[item.Opal].ExpenseSum + item.ExpenseSum) / 1000); // Divide by 1000 to convert to thousands (K) and round to 0 decimal places
//     acc[item.Opal].Remain = Math.round(acc[item.Opal].Remain + item.Remain); // No need to convert Remain to K if it's not required, but round to 0 decimal places

//     return acc;
//   }, {});

//   return Object.values(opalSummary);
// }
export let summedDataSummary = sumByOpal(dataSummary)

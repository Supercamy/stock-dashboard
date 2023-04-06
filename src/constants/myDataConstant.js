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

  return myFinanceG
    .filter((item) => item.Opal === '0304701 Boyce Estate')
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
}

export const myFinanceGG = processMyFinance(myFinanceG)

function sumByOpal(data) {
  const opalSummary = data.reduce((acc, item) => {
    if (!acc[item.Opal]) {
      acc[item.Opal] = {
        BudgetSum: 0,
        ExpenseSum: 0,
        Remain: 0,
      }
    }

    acc[item.Opal].BudgetSum += item.BudgetSum
    acc[item.Opal].ExpenseSum += item.ExpenseSum
    acc[item.Opal].Remain += item.Remain

    return acc
  }, {})

  return opalSummary
}

export const summedDataSummary = sumByOpal(dataSummary)

import { useState, useEffect, useContext } from 'react'
import React from 'react'
import Card from './Card'
import ChartFilter from './ChartFilter'
import { chartConfig } from '../constants/config'
import myFinance from '../constants/bar.json'
import { myFinanceGG } from '../constants/myDataConstant'

import dataSummary from '../constants/summarytable.json'

import {
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Label,
  LabelList,
  Legend,
  CartesianGrid,
  Bar,
  Line,
} from 'recharts'
import ThemeContext from '../context/ThemeContext'

const Chartg = () => {
  const [mainData, setMainData] = useState(myFinanceGG)
  const [filter, setFilter] = useState('1W')
  const { darkMode } = useContext(ThemeContext)

  useEffect(() => {
    fetchDate()
  }, [])

  const fetchDate = () => {
    // let myFinanceBoyce = myFinanceGG
    // setMainData(myFinanceBoyce)
  }

  return (
    <Card>
      <ul className='flex absolute top-2 right-2 z=40'>
        {Object.keys(chartConfig).map((item) => {
          return (
            <li key={item}>
              <ChartFilter
                text={item}
                active={filter === item}
                onClick={() => {
                  setFilter(item)
                }}
              />
            </li>
          )
        })}
      </ul>
      <ResponsiveContainer>
        <ComposedChart
          width={1600}
          height={800}
          data={mainData}
          margin={{ top: 55, right: 10, left: 10, bottom: 25 }}
        >
          <XAxis
            dataKey='myMonth'
            sclaeToFit='true'
            interval={0}
            // stroke={darkMode ? 'text-gray-900' : 'text-gray-900'}
          ></XAxis>
          <YAxis
            yAxisId={1}
            orientation='right'
            tickFormatter={(value) => {
              const valueInThousands = value / 1000
              const currencyFormatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
              return currencyFormatter.format(valueInThousands) + 'K'
            }}
          />
          <Tooltip
            formatter={(value, name) => {
              if (value === 0) {
                return null
              }
              const currencyFormatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })

              if (name === 'Actuals' || name === 'Budget') {
                return currencyFormatter.format(value)
              }

              return new Intl.NumberFormat('en').format(value)
            }}
            wrapperStyle={{ backgroundColor: '#ccc' }}
          />

          <Legend verticalAlign='bottom' height={36} />
          <CartesianGrid
            vertical={false}
            stroke='rgb(199 210 254)'
            strokeDasharray='5 5'
          />
          <Bar
            yAxisId={1}
            dataKey='Actuals'
            barSize={80}
            fill={darkMode ? '#3c389e' : '#312e81'}
            // fill={darkMode ? '##BB86FC' : '#6200EF'}
            // label={CustomizedLabel}
          >
            {/* <LabelList dataKey='Actuals' /> */}
          </Bar>

          <Line
            yAxisId={1}
            strokeWidth={2}
            type='monotone'
            dataKey='Budget'
            stroke={darkMode ? '#b30000' : '#ff0000'}
            // stroke='#ff0000'
            activeDot={{ r: 6 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default Chartg

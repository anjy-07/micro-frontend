import React from 'react'
import HighCharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';


const HighChartComponent = (props) => {
    let startMonth= props.startMonth
    console.log(startMonth)

    console.log(props.years)
    let startYear= props.startYear
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    let prevYearMonths =  months.slice([parseInt(startMonth)] , months.length-1).map((month) => `${month} ${parseInt(startYear)}`)
    let newYearMonths =  months.slice(0, [parseInt(startMonth)]-1).map((month) => `${month} ${parseInt(startYear) + 1}`)
    let xAxis = [...prevYearMonths, ...newYearMonths]
    console.log(xAxis)

    


    let years = props.years
   
    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            type: 'line'     
        },
        title: {
            text: 'Github profile activity trend'
        },
        subtitle: {
            text: 'Source: github.com'
        },
    
        yAxis: {
            title: {
                text: 'Number scale'
            }
        },
    
        xAxis: {
            categories: xAxis
        },
    
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        credits: {
            enabled: false
        },
        series: [ {
            name: 'Commits',
            data: [ 29742, 29851, 32490, 30282, 38121, 40434]
        }],
    
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    legend: {
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom'
                    }
                }
            }]
        }
    }
    
    return (
        <HighChartsReact
            highCharts={HighCharts}
            options={options}

        />
    )
}

export default HighChartComponent;
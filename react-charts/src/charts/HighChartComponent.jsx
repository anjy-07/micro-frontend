import React from 'react'
import HighCharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import { useEffect, useState} from 'react';


const HighChartComponent = (props) => { 
    const [xAxis, setxAxis] = useState([]);
    const [yAxis, setyAxis] = useState(Array(12).fill(0));

    useEffect(() =>{   
        if(props.object) {
            setxAxis(Object.keys(props.object))
            let y = Array(12).fill(0)
            y = Object.keys(props.object).map((month) =>{
                return props.object[month]
            })
            setyAxis(y)
        }   
    }, [props.object])
    
   
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
            data: yAxis
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
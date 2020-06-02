import React from 'react'
import HighCharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import { useEffect, useState} from 'react';


const DonutChart = (props) => { 
    const [xAxis, setxAxis] = useState([]);
    const [yAxis, setyAxis] = useState(Array(12).fill(0));

    useEffect(() =>{   
        if(props.object) {
            setxAxis(props.object)
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
            plotShadow: false
        },
        title: {
            text: 'Browser<br>shares<br>2017',
            align: 'center',
            verticalAlign: 'middle',
            y: 60
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%'],
                size: '110%'
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            innerSize: '50%',
            data: [
                ['Chrome', 58.9],
                ['Firefox', 13.29],
                ['Internet Explorer', 13],
                ['Edge', 3.78],
                ['Safari', 3.42],
                {
                    name: 'Other',
                    y: 7.61,
                    dataLabels: {
                        enabled: false
                    }
                }
            ]
        }]
    }
    return (
        <HighChartsReact
            highCharts={HighCharts}
            options={options}

        />
    )
}

export default DonutChart;
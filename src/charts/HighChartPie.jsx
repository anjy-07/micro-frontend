import React from 'react'
import HighCharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import { useEffect, useState} from 'react';

const HighChartPie = (props) => {
    const [data, setData] = useState([]);
    useEffect(() =>{   
        if(props.object) {
            let data = Object.keys(props.object).map((language) => {
                return {name: language, y: props.object[language]}
            })
            setData(data)
        }   
    }, [props.object])

    //fetching the data from parent
    const options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false,
            type: 'pie',
            
        },
        title: {
            text: 'Commit per Language, 2020'
        },
        tooltip: {
            //pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
            pointFormat: '<b>{series.name}</b>: {point.y:.1f}',
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        credits: {
            enabled: false
        },
        colors: ['#00876c', '#6aaa96',  '#f0b8b8',
            '#e67f83', '#d43d51',  '#aecdc2', '#f1f1f1'],
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Langauge',
            colorByPoint: true,
            data: data
        }]
    }
    options.title.text = props.title
    return (
        <HighChartsReact
            highCharts={HighCharts}
            options={options}

        />
    )
}

export default HighChartPie;


import React from 'react'
import HighCharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';

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
        accessibility: {
            rangeDescription: 'Range: 2015 to 2020'
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2015
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Line of Code',
        data: [ 57177, 69658, 97031, 119931, 137133, 154175]
    }, {
        name: 'Commits',
        data: [ 29742, 29851, 32490, 30282, 38121, 40434]
    }, {
        name: 'Stars',
        data: [ 16005, 19771, 20185, 24377, 32147, 39387]
    }, {
        name: 'Repositories',
        data: [ 7988, 12169, 15112, 22452, 34400, 34227]
    }, {
        name: 'Organizations',
        data: [ 8105, 11248, 8989, 11816, 18274, 18111]
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

const HighChartComponent = () => {
    return (
        <HighChartsReact
            highCharts={HighCharts}
            options={options}

        />
    )
}

export default HighChartComponent;
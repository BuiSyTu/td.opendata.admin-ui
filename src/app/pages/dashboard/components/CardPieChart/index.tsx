import React from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

interface CardPieChartProps {
    title: string,
    data: any,
}

const CardPieChart: React.FC<CardPieChartProps> = ({ title, data }) => {
    const colors = ["#636efa", "#ef553c", "#54cd96", "#ab63fa", "#f9a15a", "#40d3f3", "#f36692", "#b6e880", "#f097ff", "#fecb52", "#444fdb", "#f7a799", "#67fcc9", "#e0c6fc"]

    const isBig = window.innerWidth > 1199;
    const legendBig = {
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
        useHTML: true,
        y: 0,
        x: 0,
        padding: 10,
        margin: 0,
        itemWidth: 240,
        maxHeight: 250,
        labelFormat: '<span>{name}</span>: <b class="fw-bolder ms-auto fs-6" style="color: {color}">{y}</b><br/>',
        itemStyle: { "fontSize": "13px", "fontWeight": "normal", "fontFamily": "roboto", "lineHeight": "25px", "top": "-3px" }
    };

    const legendSmall = {
        align: 'left',
        verticalAlign: 'bottom',
        layout: 'horizontal',
        useHTML: true,
        y: 0,
        x: 0,
        padding: 0,
        margin: 0,
        labelFormat: '<span>{name}</span>: <b class="fw-bolder ms-auto">{y}</b><br/>',
        itemStyle: { "fontSize": "13px", "fontWeight": "normal", "fontFamily": "arial" }
    }

    const options = {
        chart: {
            type: 'pie',
            renderTo: 'containersss'
        },
        colors: colors,
        title: {
            text: '',
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            },
            series: {
                borderWidth: 0,
                innerSize: '50%',
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.0f}'
                }
            }
        },
        legend: isBig ? legendBig : legendSmall,
        series: [
            {
                data: data,
            },
        ],
        credits: {
            enabled: false,
        },
    };

    return (
        <div className='card shadow-sm min-h-100'>
            <div className="card-header px-4">
                <div className="card-title text-center">{title}</div>
            </div>
            <div className="card-body p-4 scroll mh-350px">
                <HighchartsReact
                    highcharts={Highcharts}
                    options={options}
                    containerProps={{ style: { height: "280px" } }} />
            </div>
        </div>
    )
}

export default CardPieChart
import React, { Component, useEffect, useState } from 'react';
import * as agCharts from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';
import Api from '../../service/api';


function OverviewChart() {
    // let data;
    // let total;
    // let options;
    // const numFormatter = new Intl.NumberFormat('en-US');

    const [data, setData] = useState([]);
    useEffect(() => {
        Api.admin.getOverview()
        .then(result => {
            return result.json();
        })
        .then(data=>{
            setData(data.overview);
        })
    }, []);
    
    const total = data.reduce((sum, d) => sum + d['turnovers'], 0);
    const numFormatter = new Intl.NumberFormat('en-US');
    const options = {
        autoSize: true,
        data,
        title: {
            text: 'Sales Figures',
            fontSize: 18,
        },
        subtitle: {
            text: 'Shopping Online',
        },
        series: [
            {
                type: 'pie',
                calloutLabelKey: 'catalog',
                fillOpacity: 0.9,
                strokeWidth: 0,
                angleKey: 'turnovers',
                sectorLabelKey: 'turnovers',
                calloutLabel: {
                    enabled: false,
                },
                sectorLabel: {
                    color: 'white',
                    fontWeight: 'bold',
                    formatter: ({ datum, sectorLabelKey }) => {
                        const value = datum[sectorLabelKey];
                        return numFormatter.format(value);
                    },
                },
                title: {
                    text: 'TurnOver (VND)',
                },
                fills: [
                    '#fb7451',
                    '#f4b944',
                    '#57cc8b',
                    '#49afda',
                    '#3988dc',
                    '#72508c',
                    '#b499b5',
                    '#b7b5ba',
                ],
                innerRadiusRatio: 0.5,
                innerLabels: [
                    {
                        text: numFormatter.format(total),
                        fontSize: 24,
                        fontWeight: 'bold',
                    },
                    {
                        text: 'Total',
                        fontSize: 16,
                    },
                ],
                highlightStyle: {
                    item: {
                        fillOpacity: 0,
                        stroke: '#535455',
                        strokeWidth: 1,
                    },
                },
                tooltip: {
                    renderer: ({ datum, calloutLabelKey, title, sectorLabelKey }) => {
                        return {
                            title,
                            content: `${datum[calloutLabelKey]}: ${numFormatter.format(
                                datum[sectorLabelKey]
                            )}`,
                        };
                    },
                },
            },
        ],
    };

    return <AgChartsReact options={options} />;
}

export default React.memo(OverviewChart);
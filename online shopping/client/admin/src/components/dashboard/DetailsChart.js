import React, { useEffect, useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';
import Api from '../../service/api';
import Loading from '../ui/Loading';

function DetailsChart(props) {
    const [startDate, endDate] = props.date;
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (startDate !== null && endDate !== null) {
            setIsLoading(true);
            Api.admin.getOverview({ startDate: startDate, endDate: endDate, type: 'childCatalog' })
                .then(result => {
                    return result.json();
                })
                .then(data => {
                    setData(data.overview);
                    setIsLoading(false);
                })
        }
    }, [endDate]);

    //     {
    //         'beverage': 'Coffee',
    //         'Q1': 450,
    //         'Q2': 560,
    //         'Q3': 600,
    //         'Q4': 700,
    //     },
    //     {
    //         'beverage': 'Tea',
    //         'Q1': 270,
    //         'Q2': 380,
    //         'Q3': 450,
    //         'Q4': 520,
    //     },
    //     {
    //         'beverage': 'Milk',
    //         'Q1': 180,
    //         'Q2': 170,
    //         'Q3': 190,
    //         'Q4': 200,
    //     },
    // ];
    const options = {
        data: data,
        title: {
            text: 'Shopping Online',
        },
        subtitle: {
            text: 'Turnovers (VNĐ)',
        },
        series: [{
            type: 'column',
            xKey: 'name',
            yKeys: ['turnovers'],
            label: {},
        }],
    }


    return (
        <>
            {isLoading && <Loading />}
            {!isLoading && <AgChartsReact options={options} />}
        </>
    );
}

export default DetailsChart
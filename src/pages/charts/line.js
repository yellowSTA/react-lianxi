import React, { Component } from 'react';
import { Card, Spin } from 'antd';
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

export default class Line extends Component {
    state = {
        loading: true,
        data: []
    }

    
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: [1000,2000,1500,3000,1200,900,800],
                loading: false
            })
        }, 3000);
    }

    getOptions = (data) => {
        let opt = {
            title: {
                text: '用户骑行量'
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series : [
                {
                    name:'订单量',
                    type:'line',
                    data: data
                }
            ]
        }
        return opt;
    }

    option2 = {
        title: {
            text: '用户骑行量'
        },
        legend: {
            data: ['ofo','mbike']
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series : [
            {
                name:'ofo',
                type:'line',
                data: [1000,2000,1500,2800,3000,3800,4200]
            },
            {
                name:'mbike',
                type:'line',
                data: [1500,2500,3000,3100,3300,3600,4000]
            }
        ]
    }

    options3 = {
        title: {
            text: '用户骑行量'
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            type: 'value'
        },
        series : [
            {
                name:'ofo',
                type:'line',
                data: [1000,2000,1500,2800,3000,3800,4200],
                areaStyle: {}
            }
        ]
    }

    render() {
        return (
            <div className="barPage">
                <Card title="折线图">
                    <Spin spinning={this.state.loading} tip="Loading...">
                        <ReactEcharts option={this.getOptions(this.state.data)} style={{height: 500}}></ReactEcharts>
                    </Spin>
                </Card>
                <Card title="折线图" style={{marginTop: 20}}>
                    <ReactEcharts option={this.option2} style={{height: 500}}></ReactEcharts>
                </Card>
                <Card title="折线图" style={{marginTop: 20}}>
                    <ReactEcharts option={this.options3} style={{height: 500}}></ReactEcharts>
                </Card>
            </div>
        )
    }
}

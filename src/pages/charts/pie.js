import React, { Component } from 'react';
import { Card, Spin } from 'antd';
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

export default class Pie extends Component {
    state = {
        loading: true,
        data: []
    }

    
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                data: [
                    {
                        name: '周一',
                        value: 2000
                    },
                    {
                        name: '周二',
                        value: 520
                    },
                    {
                        name: '周三',
                        value: 2000
                    },
                    {
                        name: '周四',
                        value: 3340
                    },
                    {
                        name: '周五',
                        value: 3900
                    },
                    {
                        name: '周六',
                        value: 3300
                    },
                    {
                        name: '周日',
                        value: 2200
                    },
                ],
                loading: false
            })
        }, 3000);
    }

    getOptions = (data) => {
        let opt = {
            title: {
                text: '用户骑行量'
            },
            legend: {
                orient: 'vertical',
                right: 20,
                top: 40,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            tooltip: {
                trigger: 'item',
                formatter: '{a}<br/>{b}：{c}（{d}%）'
            },
            series : [
                {
                    name:'订单量',
                    type:'pie',
                    barWidth: '60%',
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
            orient: 'vertical',
            right: 20,
            top: 40,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}：{c}（{d}%）'
        },
        series : [
            {
                name:'订单量',
                type:'pie',
                radius: ['50%', '70%'],
                barWidth: '60%',
                data: [
                    {
                        name: '周一',
                        value: 200
                    },
                    {
                        name: '周二',
                        value: 520
                    },
                    {
                        name: '周三',
                        value: 2000
                    },
                    {
                        name: '周四',
                        value: 3340
                    },
                    {
                        name: '周五',
                        value: 3900
                    },
                    {
                        name: '周六',
                        value: 3300
                    },
                    {
                        name: '周日',
                        value: 2200
                    },
                ]
            }
        ]
    }

    options3 = {
        title: {
            text: '用户骑行量'
        },
        legend: {
            orient: 'vertical',
            right: 20,
            top: 40,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a}<br/>{b}：{c}（{d}%）'
        },
        series : [
            {
                name:'订单量',
                type:'pie',
                barWidth: '60%',
                roseType: 'radius',
                data: [
                    {
                        name: '周一',
                        value: 800
                    },
                    {
                        name: '周二',
                        value: 1020
                    },
                    {
                        name: '周三',
                        value: 2000
                    },
                    {
                        name: '周四',
                        value: 3340
                    },
                    {
                        name: '周五',
                        value: 3900
                    },
                    {
                        name: '周六',
                        value: 3300
                    },
                    {
                        name: '周日',
                        value: 2200
                    },
                ].sort(function (a, b) { return a.value - b.value; })
            }
        ]
    }

    render() {
        return (
            <div className="barPage">
                <Card title="饼图">
                    <Spin spinning={this.state.loading} tip="Loading...">
                        <ReactEcharts option={this.getOptions(this.state.data)} style={{height: 500}}></ReactEcharts>
                    </Spin>
                </Card>
                <Card title="环形图" style={{marginTop: 20}}>
                    <ReactEcharts option={this.option2} style={{height: 500}}></ReactEcharts>
                </Card>
                <Card title="南丁格尔图" style={{marginTop: 20}}>
                    <ReactEcharts option={this.options3} style={{height: 500}}></ReactEcharts>
                </Card>
            </div>
        )
    }
}

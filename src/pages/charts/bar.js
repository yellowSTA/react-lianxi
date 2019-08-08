import React, { Component } from 'react';
import { Card } from 'antd';
import ReactEcharts from 'echarts-for-react';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/markPoint';

export default class Bar extends Component {
    componentDidMount() {
        
    }

    option = {
        color: ['#3398DB'],
        title: {
            text: '用户骑行量'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'骑行量',
                type:'bar',
                barWidth: '60%',
                data:[10, 52, 200, 334, 390, 330, 220]
            }
        ]
    }

    option2 = {
        color: ['#3398DB', '#ef4437', '#61a0a8'],
        title: {
            text: '用户骑行量'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['ofo', 'mbkie', 'xiaolan']
        },
        xAxis : [
            {
                type : 'category',
                data : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'ofo',
                type:'bar',
                barWidth: '20%',
                data:[20, 60, 300, 434, 590, 230, 120]
            },
            {
                name:'mbkie',
                type:'bar',
                barWidth: '20%',
                data:[50, 52, 350, 334, 490, 530, 220]
            },
            {
                name:'xiaolan',
                type:'bar',
                barWidth: '20%',
                data:[10, 80, 200, 234, 200, 180, 90]
            }
        ]
    }

    render() {
        return (
            <div className="barPage">
                <Card title="柱形图">
                    <ReactEcharts option={this.option} style={{height: 500}}></ReactEcharts>
                </Card>
                <Card title="柱形图" style={{marginTop: 20}}>
                    <ReactEcharts option={this.option2} style={{height: 500}}></ReactEcharts>
                </Card>
            </div>
        )
    }
}

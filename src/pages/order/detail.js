import React, { Component } from 'react';
import SimpleHeader from '../../components/simpleHeader';
import './index.less';

export default class OrderDetail extends Component {
    state = {
        orderInfo: {}
    }

    componentDidMount() {
        const orderId = this.props.match.params.orderId;
        this.getDetail(orderId);
        this.createMap()
    }

    //获取详情
    getDetail = (orderId) => {
        global.$get('orderDetail',{orderId}).then(res => {
            if(res.code == 0) {
                this.setState({
                    orderId: res.result
                })
            }
        })
    }

    //生成地图
    createMap = () => {
        this.map = new window.BMap.Map("map-container");
        let point = new window.BMap.Point(116.404, 39.915);
        this.map.centerAndZoom('深圳', 15);
        this.addMapControl(this.map);
    }
    addMapControl = (map) => {
        map.addControl(new window.BMap.NavigationControl());    
        map.addControl(new window.BMap.ScaleControl()); 
        map.enableScrollWheelZoom(true);
    }

    //绘制行驶路线
    drawBikeRoute = () => {
        
    }

    render() {
        const {orderInfo} = this.state;
        return (
            <div className="orderDetail">
                <SimpleHeader/>
                <div id="map-container"></div>
                <div className="info">
                    <div className="">
                        <div className="title">基础信息</div>
                        <ul>
                            <li className="s-gray">用车模式<span className="s-black f-ml40">{orderInfo.mode == 1 ? '服务区' : '停车点'}</span></li>
                            <li className="s-gray">订单编号<span className="s-black f-ml40">{orderInfo.bike_sn}</span></li>
                            <li className="s-gray">车辆编号<span className="s-black f-ml40">{orderInfo.bike_sn}</span></li>
                            <li className="s-gray">用户姓名<span className="s-black f-ml40">{orderInfo.bike_sn}</span></li>
                            <li className="s-gray">手机号码<span className="s-black f-ml40">{orderInfo.bike_sn}</span></li>
                        </ul>
                    </div>
                    <div className="">
                        <div className="title">行驶轨迹</div>
                        <ul>
                            <li className="s-gray">行程起点<span className="s-black f-ml40">{orderInfo.start_location}</span></li>
                            <li className="s-gray">行程终点<span className="s-black f-ml40">{orderInfo.end_location}</span></li>
                            <li className="s-gray">行驶里程<span className="s-black f-ml40">{orderInfo.distance/1000 + 'km'}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
import React, { Component } from 'react';
import SimpleHeader from '../../components/simpleHeader';
import './index.less';
import startIcon from '../../assets/img/start_point.png';
import endIcon from '../../assets/img/end_point.png';

export default class OrderDetail extends Component {
    state = {
        orderInfo: {}
    }

    componentDidMount() {
        const orderId = this.props.match.params.orderId;
        this.getDetail(orderId);
    }

    //获取详情
    getDetail = (orderId) => {
        global.$get('orderDetail',{orderId}).then(res => {
            if(res.code == 0) {
                let result = res.result;
                this.setState({
                    orderInfo: result
                })
                this.createMap(result.position_list, result.area)
            }
        })
    }

    //生成地图
    createMap = (posList, areaList) => {
        this.map = new window.BMap.Map("map-container"); //创建地图实例
        this.map.centerAndZoom('北京市', 10); //设置地图聚焦点
        this.addMapControl(this.map); //添加地图控件
        this.drawServiceArea(areaList); //绘制服务区
        this.drawBikeRoute(this.map,posList); //绘制车辆行驶轨迹
    }
    addMapControl = (map) => {
        map.addControl(new window.BMap.NavigationControl());    
        map.addControl(new window.BMap.ScaleControl()); 
        map.enableScrollWheelZoom(true);
    }

    /**
     * 绘制行驶路线
     * @param {Object} map -地图对象
     * @param {Array} posList -要绘制路线的坐标点
     */
    drawBikeRoute = (map = this.map, posList) => {
        if(!posList.length) {
            return;
        }
        const endPoint = posList[posList.length - 1];
        this.addMarker(posList[0],startIcon, {w:36, h:42});
        this.addMarker(endPoint,endIcon, {w:36, h:42});

        //链接路线
        let trackPoint = posList.map((item, index) => {
            return new window.BMap.Point(item.lon, item.lat);
        })

        let Polyline = new window.BMap.Polyline(trackPoint, {
            strokeColor: '#1e90ff',
            strokeWeight: 3,
            strokeOpacity: 1
        })
        map.addOverlay(Polyline);
        map.centerAndZoom(new window.BMap.Point(endPoint.lon, endPoint.lat),10);
    }
    /**
     * 绘制服务区
     * @param {Array} areaList -服务区经纬度
     */
    drawServiceArea = (areaList) => {
        let trackPoint = areaList.map((item, index) => {
            return new window.BMap.Point(item.lon, item.lat);
        })
        let polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#ef4437',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: .4
        })
        this.map.addOverlay(polygon);
    }
    /**
     * 地图添加标记
     * @param {Object} pos -经纬度
     * @param {string} img -标记图片
     * @param {Object} size -图片宽高
     */
    addMarker = (pos, img, size) => {
        const BMap = window.BMap;
        let point = new BMap.Point(pos.lon, pos.lat);
        let icon = new BMap.Icon(
            img,
            new BMap.Size(size.w,size.h),
            {
                imageSize: new BMap.Size(size.w, size.h),
                anchor: new BMap.Size(size.w / 2, size.h)
            }
        )
        let marker = new BMap.Marker(point, {icon: icon});
        this.map.addOverlay(marker);
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
                            <li className="s-gray">订单编号<span className="s-black f-ml40">{orderInfo.order_sn}</span></li>
                            <li className="s-gray">车辆编号<span className="s-black f-ml40">{orderInfo.bike_sn}</span></li>
                            <li className="s-gray">用户姓名<span className="s-black f-ml40">{orderInfo.user_name}</span></li>
                            <li className="s-gray">手机号码<span className="s-black f-ml40">{orderInfo.mobile}</span></li>
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
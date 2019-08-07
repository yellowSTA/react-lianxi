import React, { Component } from 'react';
import './index.less';
import startIcon from '../../assets/img/start_point.png';
import endIcon from '../../assets/img/end_point.png';
import bikeIcon from '../../assets/img/bike.jpg'
import { Card, Form, Input, DatePicker, Button, Select } from 'antd';
const Option = Select.Option;


export default class BikeMap extends Component {
    componentDidMount() {
        this.initData()
    }
    state = {
        total: 0,
        list: []
    }
    pages = {
        page: 1
    }
    //初始化数据
    initData = () => {
        global.$get('bikeList', this.pages).then(res => {
            if(res.code == 0) {
                this.createMap(res.result)
            }
        })
    }
    //渲染地图
    createMap = (data) => {
        const BMap = window.BMap;
        this.map = new BMap.Map('map');
        let list = data.route_list;
        let gpsEnd = list[list.length - 1].split(',');
        let pointEnd = new BMap.Point(gpsEnd[0], gpsEnd[1]);
        this.map.centerAndZoom(pointEnd, 11);
        this.map.addControl(new window.BMap.NavigationControl());    
        this.map.addControl(new window.BMap.ScaleControl()); 
        this.map.enableScrollWheelZoom(true);

        let posList = list.map(item => {
            const [lon, lat] = item.split(',');
            return {lon, lat}
        })
        this.drawServiceArea(data.service_list)
        this.drawBikeRoute(this.map, posList)
        this.addBikePoint(data.bike_list)
    }
    /**
     * 在地图中标记自行车位置
     * @param {Array} bikePoints -自行车经纬度
     */
    addBikePoint = (bikePoints) => {
        const list = bikePoints.map(item => {
            const [lon, lat] = item.split(',');
            return {lon, lat};
        })
        list.forEach(item => {
            this.addMarker(item, bikeIcon, {w:36, h:42})
        })
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
        this.addMarker(posList[0], startIcon, {w:36, h:42});
        this.addMarker(endPoint, endIcon, {w:36, h:42});

        //链接路线
        let trackPoint = posList.map((item, index) => {
            return new window.BMap.Point(item.lon, item.lat);
        })

        let Polyline = new window.BMap.Polyline(trackPoint, {
            strokeColor: '#1e90ff',
            strokeWeight: 2,
            strokeOpacity: 1
        })
        map.addOverlay(Polyline);
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
            strokeWeight: 3,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: .2
        })
        this.map.addOverlay(polygon);
    }
    //查询
    onSearch = (params) => {
        console.log(params)
    }
    render() {
        return (
            <div className="bikeMap">
                <Card>
                    <SearchForm onSearch={this.onSearch} />
                </Card>
                <Card style={{marginTop: 20}}>
                    <div id="map"></div>
                </Card>
            </div>
        )
    }
}

//搜索
class FilterForm extends Component {
    onSearch = () => {
        let formData = this.props.form.getFieldsValue()
        this.props.onSearch(formData)
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <Form.Item label="城市">
                    {
                        getFieldDecorator('city', {initialValue: '1'})(
                            <Select placeholder="请选择城市">
                                <Option value="0">全部</Option>
                                <Option value="1">北京</Option>
                                <Option value="2">上海</Option>
                                <Option value="3">深圳</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="f-mr20" onClick={this.onSearch}>查询</Button>
                </Form.Item>
            </Form>
        )
    }
}

const SearchForm = Form.create({})(FilterForm)
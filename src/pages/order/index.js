import React, { Component } from 'react';
import {Card, Form, Select, Button, DatePicker, Spin, Table, Modal, Row, Col, message} from 'antd';
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

export default class Order extends Component {
    state = {
        loading: true,
        total: 0,
        visible: false,
        endVisible: false, //结束订单弹窗
        itemInfo: {}, //表格行数据
        ebikeInfo: {} //结束订单详情
    }

    pages = {
        page: 1
    }

    componentWillMount() {
        this.initData()
    }

    //初始化数据
    initData() {
        global.$get('orderList', this.pages).then(res => {
            if(res.code == 0) {
                const list = res.result.item_list;
                this.setState({
                    list: list.map((item, index) => {
                        item.key = index;
                        return item;
                    }),
                    loading: false,
                    total: res.result.total_count
                })
            }
        })
    }

    //分页
    onPages = (page) => {
        this.pages.page = page;
        this.setState({
            loading: true
        })
        this.initData();
    }
    //查看详情
    lookDetail = (row) => {
        window.open(window.location.protocol+window.location.host + '/#/order-detail/' + row.id, '_blank')
    }

    //获取结束订单详情
    cancelInfo = (id) => {
        global.$get('cancelOrderInfo',{id}).then(res => {
            if(res.code == 0) {
                this.setState({
                    ebikeInfo: res.result,
                    endVisible: true
                })
            }
        })
    }

    //结束订单
    onCancel = (id) => {
        this.setState({
            endVisible: false
        })
        message.success('订单已取消');
        this.initData();
    }

    render() {
        const _this = this;
        const columns = [
            {title:'订单编号', dataIndex: 'order_sn'},
            {title:'车辆编号', dataIndex: 'bike_sn'},
            {
                title:'用户名', 
                dataIndex: 'user_name',
            },
            {
                title:'手机号', 
                dataIndex: 'mobile',
            },
            {
                title:'里程', 
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'km'
                }
            },
            {
                title:'行驶时长',
                dataIndex: 'total_time',
            },
            {
                title:'状态', 
                dataIndex: 'status',
                render(status) {
                    if(status == 1) {
                        return <span className="s-red">正在骑行</span>
                    } else {
                        return <span className="s-green">已结束</span>
                    }
                }
            },
            {title:'开始时间', dataIndex: 'start_time'},
            {title:'结束时间', dataIndex: 'end_time'},
            {title:'订单金额', dataIndex: 'total_fee'},
            {title:'实付金额', dataIndex: 'user_pay'},
            {
                title: '操作',
                key: 'operation',
                render(text, scope) {
                    return (
                        <div>
                            <Button type="link" onClick={_this.lookDetail.bind(_this, scope)}>详情</Button>
                            {
                                scope.status == 1 ? <Button type="link" onClick={_this.cancelInfo.bind(_this, scope.id)}>结束订单</Button> : ''
                            }
                        </div>
                    )
                }
            }
        ]
        const state = this.state;
        const {itemInfo, ebikeInfo} = state;
        return (
            <div className="order">
                <Card>
                    <SearchForm/>
                </Card>
                <Modal 
                    title="订单详情"
                    visible={state.visible}
                    footer={[<Button key="back" onClick={() => this.setState({visible:false})}>关闭</Button>]}>
                    <div>
                        <div>订单编号：{itemInfo.order_sn}</div>
                        <div>车辆编号：{itemInfo.bike_sn}</div>
                        <div>用户名：{itemInfo.user_name}</div>
                        <div>手机号：{itemInfo.mobile}</div>
                        <div>状态：{itemInfo.status == 1 ? '正在骑行' : '已结束'}</div>
                    </div>
                </Modal>
                <Modal
                    title="确定结束订单吗？"
                    visible={state.endVisible}
                    onOk={this.onCancel}
                    onCancel={() => this.setState({endVisible: false})}>
                    <div>
                        <Row>
                            <Col span={4}>车辆编号：</Col>
                            <Col span={20}>{ebikeInfo.bike_sn}</Col>
                        </Row>
                        <Row>
                            <Col span={4}>剩余电量：</Col>
                            <Col span={20}>{ebikeInfo.battery + '%'}</Col>
                        </Row>
                        <Row>
                            <Col span={4}>开始时间：</Col>
                            <Col span={20}>{ebikeInfo.start_time}</Col>
                        </Row>
                        <Row>
                            <Col span={4}>当前位置：</Col>
                            <Col span={20}>{ebikeInfo.location}</Col>
                        </Row>
                    </div>
                </Modal>
                <Spin spinning={state.loading} tip="Loading..." delay={500}>
                    <div className="table-wrap f-mt20">
                        <Table 
                            border 
                            columns={columns} 
                            dataSource={state.list} 
                            pagination={
                                {total: state.total, onChange: this.onPages}
                            } />
                    </div>
                </Spin>
            </div>
        )
    }
}

//搜索
class FilterForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <Form.Item label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select placeholder="请选择" style={{width: 100}}>
                                <Option value="0">全部</Option>
                                <Option value="1">北京市</Option>
                                <Option value="2">天津市</Option>
                                <Option value="3">深圳市</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="订单时间">
                    {
                        getFieldDecorator('time')(
                            <RangePicker
                                showTime={{ format: 'HH:mm' }}
                                format="YYYY-MM-DD HH:mm"
                                placeholder={['开始时间', '结束时间']}
                            />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="f-mr20">查询</Button>
                    <Button>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}

const SearchForm = Form.create({})(FilterForm)
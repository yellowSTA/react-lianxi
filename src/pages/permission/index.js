import React, { Component } from 'react';
import { Card, Button, Table, Spin, Input, Form, Select, Modal, message } from 'antd';
const Option = Select.Option;
const dateFormat = require('js-dateformat').dateFormat;

const columns = [
    {
        title: '角色ID',
        dataIndex: 'id'
    },
    {
        title: '角色名称',
        dataIndex: 'role_name'
    },
    {
        title: '创建时间',
        dataIndex: 'create_time',
        render(time) {
            return dateFormat(new Date(time), 'yyyy-mm-dd HH:MM:ss');
        }
    },
    {
        title: '使用状态',
        dataIndex: 'status',
        render(text, row) {
            return text == 0 ? '停用' : '启用';
        }
    },
    {
        title: '授权时间',
        dataIndex: 'authorize_time',
        render(time) {
            return dateFormat(new Date(time), 'yyyy-mm-dd HH:MM:ss');
        }
    },
    {
        title: '授权人',
        dataIndex: 'authorize_user_name'
    },
    {
        title: '操作',
        render(text, row) {
            return (
                <div>
                    <a href="javascript:;" className="f-mr20">设置权限</a>
                    <a href="javascript:;">用户授权</a>
                </div>
            )
        }
    }
]

export default class Permission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            list: [],
            visible: false
        }
        this.pages = {
            page: 1
        }
    }

    componentWillMount() {
        this.initData();
    }

    initData = () => {
        global.$get('roleList',this.pages).then(res => {
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

    //添加角色
    addUser = () => {
        let formData = this.userForm.props.form.getFieldsValue();
        console.log(formData)
        message.info('添加成功')
        this.ctrlModal()
    }

    //控制弹窗
    ctrlModal = () => {
        this.setState({
            visible: !this.state.visible
        })
    }

    render() {
        const state = this.state;
        return (
            <div className="permissionPage">
                <Card>
                    <Button type="primary" className="f-mr10" onClick={this.ctrlModal}>创建角色</Button>
                </Card>
                <Spin spinning={state.loading} tip="Loading..." delay={500}>
                    <div className="table-wrap">
                        <Table 
                            border 
                            columns={columns} 
                            dataSource={state.list} 
                            pagination={
                                {total: state.total, onChange: this.onPages}
                            } />
                    </div>
                </Spin>
                <Modal 
                    title="添加角色"
                    onOk={this.addUser}
                    visible= {state.visible}
                    onCancel={
                        () => {
                            this.setState({visible: false})
                        }
                    }>
                    <AddForm wrappedComponentRef={data => {this.userForm = data}}></AddForm>
                </Modal>
            </div>
        )
    }
}

class RoleForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 18
            }
        }
        return (
            <Form {...formItemLayout}>
                <Form.Item label="角色名称">
                    {
                        getFieldDecorator('role_name')(
                            <Input type="text" placeholder="请输入角色名称" />
                        )
                    }
                </Form.Item>
                <Form.Item label="状态">
                    {
                        getFieldDecorator('status')(
                            <Select placeholder="请设置角色状态">
                                <Option value="0">关闭</Option>
                                <Option value="1">开启</Option>
                            </Select>
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}

const AddForm = Form.create({})(RoleForm)
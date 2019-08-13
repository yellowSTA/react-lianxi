import React, { Component } from 'react';
import { Card, Button, Table, Spin, Input, Form, Select, Modal, message, Tree } from 'antd';
import menuList from '../../assets/js/menuConfig';
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
const dateFormat = require('js-dateformat').dateFormat;

function getColumns(obj) {
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
                        <a href="javascript:;" className="f-mr20" onClick={obj.handlePermission.bind(obj, row)}>设置权限</a>
                    </div>
                )
            }
        }
    ]
    return columns;
}

export default class Permission extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            list: [],
            visible: false,
            isPermVisible: false,
            permDetail: {}, //权限详情
            permCheckedKeys: [] //选中的权限
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

    //权限设置弹窗
    handlePermission = (permDetail) => {
        let menus = permDetail.menus.map (item => {
            return `/admin${item}`
        })
        this.setState({
            permDetail,
            permCheckedKeys: menus,
            isPermVisible: true
        })
    }

    //选择权限
    treeCheck = (checkedKeys) => {
        this.setState({
            permCheckedKeys: checkedKeys
        })
    }
    //权限更改提交
    handlePermSubmit = () => {
        let params = this.PerEditForm.props.form.getFieldsValue();
        let permDetail = this.state.permDetail;
        let formData = {
            id: permDetail.id,
            status: params.status,
            menus: this.state.permCheckedKeys
        }
        global.$get('permEdit', formData).then(res => {
            if(res.code == 0) {
                message.info('设置成功')
                this.setState({
                    isPermVisible: false
                })
                this.initData();
            }
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
                            columns={getColumns(this)} 
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
                    onCancel={this.ctrlModal}>
                    <AddForm wrappedComponentRef={insct => {this.userForm = insct}}></AddForm>
                </Modal>
                <Modal 
                    title="设置权限"
                    visible={state.isPermVisible}
                    width={600}
                    onOk={this.handlePermSubmit}
                    onCancel={
                        () => {
                            this.setState({isPermVisible: false})
                        }
                    }>
                        <PerEditForm 
                            detailInfo={state.permDetail} 
                            checkedKeys={state.permCheckedKeys} 
                            onCheck={this.treeCheck}
                            wrappedComponentRef={insct => {this.PerEditForm = insct} } />
                    </Modal>
            </div>
        )
    }
}

//添加角色表单
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

//编辑权限表单
class PerEditForm extends Component {
    //渲染树形菜单
    renderTree = (data) => {
        let nodes = data.map((item, index) => {
            if(item.children) {
                return <TreeNode title={item.title} key={item.key}>{this.renderTree(item.children)}</TreeNode>
            } else {
                return <TreeNode title={item.title} key={item.key}></TreeNode>
            }
        })
        return nodes;
    }
    render() {
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 18
            }
        }
        const { getFieldDecorator } = this.props.form;
        const { detailInfo, checkedKeys, onCheck } = this.props;
        return(
            <Form {...formItemLayout}>
                <Form.Item label="角色名称">
                    <Input type="text" placeholder={detailInfo.role_name} disabled />
                </Form.Item>
                <Form.Item label="状态">
                    {
                        getFieldDecorator('status',{initialValue: 1})(
                            <Select placeholder="请设置角色状态">
                                <Option value={0}>关闭</Option>
                                <Option value={1}>开启</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Tree 
                    checkable 
                    defaultExpandAll
                    checkedKeys = {checkedKeys}
                    onCheck={onCheck}>
                    <TreeNode  title="平台权限" key="platform_all">
                        {this.renderTree(menuList)}
                    </TreeNode>
                </Tree>
            </Form>
        )
    }
}

PerEditForm = Form.create({})(PerEditForm);


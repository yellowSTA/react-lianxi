import React, { Component } from 'react';
import { Card, Button, Input, DatePicker, Form, Spin, Table, Modal, Radio, Select, message } from 'antd';
import moment from 'moment';
const Option = Select.Option;
const TextArea = Input.TextArea;

const columns = [
    {
        title: 'id',
        dataIndex: 'id'
    },
    {
        title: '用户名',
        dataIndex: 'username'
    },
    {
        title: '性别',
        dataIndex: 'sex',
        render(sex) {
            return sex == 1 ? '男' : '女';
        }
    },
    {
        title: '状态',
        dataIndex: 'state',
        render(state) {
            let status = {
                '1': '咸鱼',
                '2': '腊肉',
                '3': '鳝鱼',
                '4': '泥鳅',
                '5': '光明顶'
            }
            return status[state];
        }
    },
    {
        title: '爱好',
        dataIndex: 'interest',
        render(interest) {
            let status = {
                '1': '游泳',
                '2': '篮球',
                '3': '羽毛球',
                '4': '乒乓球',
                '5': '象棋',
                '6': '足球',
                '7': '跑步',
                '8': '暴走'
            }
            return status[interest];
        }
    },
    {
        title: '生日',
        dataIndex: 'birthday'
    },
    {
        title: '联系地址',
        dataIndex: 'address'
    },
    {
        title: '早起时间',
        dataIndex: 'time'
    }
]

export default class User extends Component {
    state = {
        loading: true,
        total: 0,
        list: [],
        isVisible: false, //控制弹窗
        title: '',
        selectItem: null //选中的一行数据
    }

    pages = {
        page: 1
    }

    componentDidMount() {
        this.initData()
    }

    //初始化数据
    initData = () => {
        global.$get('userList', this.page).then(res => {
            if(res.code == 0) {
                const list = res.result.item_list
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
    //搜索
    onSearch = (formData) => {
        console.log(formData)
    }

    //操作
    handleOper = (type) => {
        if(type == 'add') {
            this.setState({
                type,
                isVisible: true,
                title: '创建员工'
            })
        } else if(type == 'edit') {
            if(!this.state.selectItem) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                })
                return false;
            }
            this.setState({
                type,
                isVisible: true,
                title: '编辑员工'
            })
        } else if(type == 'delete') {
            let item = this.state.selectItem;
            if(!item) {
                Modal.info({
                    title: '提示',
                    content: '请选择一个用户'
                })
                return false;
            }
            const _this = this;
            Modal.confirm({
                title: '删除员工',
                content: `确认删除员工 ${item.username} 吗？`,
                onOk() {
                    _this.delStaff(item.id)
                }
            })
            
        }
    }

    //提交表单
    handleSubmit = () => {
        let formData = this.userForm.props.form.getFieldsValue();
        const state = this.state;
        if(state.type == 'add') {
            this.userForm.props.form.validateFields((err, values) => {
                if(!err) {
                    this.addStaff(formData);
                }
            })
        } else if(state.type == 'edit') {
            this.editStaff(formData)
        }
    }
    //添加员工
    addStaff = (data) => {
        global.$get('userAdd', data).then(res => {
            if(res.code == 0) {
                this.setState({
                    isVisible: false
                })
                message.success('添加成功');
                this.userForm.props.form.resetFields();
            }
        })
    }
    //编辑员工
    editStaff = (data) => {
        global.$get('userEdit', data).then(res => {
            if(res.code == 0) {
                this.setState({
                    isVisible: false
                })
                message.success('编辑成功');
                this.userForm.props.form.resetFields();
            }
        })
    }
    //删除员工
    delStaff = (id) => {
        global.$get('userDel',{id}).then(res => {
            if(res.code == 0) {
                message.success('删除成功');
            }
        })
    }

    //取消表单
    handleCancel = () => {
        this.setState({
            isVisible: false
        })
        this.userForm.props.form.resetFields()
    }

    render() {
        const state = this.state;
        const rowSelection = {
            type: 'radio',
            onChange: (selected, selectedRows, changeRows) => {
                this.setState({
                    selectItem: selectedRows[0]
                })
            }
        }
        return (
            <div className="userPage">
                <Card>
                    <SearchForm onSearch={this.onSearch} />
                </Card>
                {/* 表格 */}
                <Card style={{marginTop: 20}}>
                    <div className="btns">
                        <Button icon="plus" type="primary" onClick={this.handleOper.bind(this, 'add')}>添加员工</Button>
                        <Button icon="edit" type="primary" className="f-ml20" onClick={this.handleOper.bind(this, 'edit')}>编辑员工</Button>
                        <Button icon="delete" type="primary" className="f-ml20" onClick={this.handleOper.bind(this, 'delete')}>删除员工</Button>
                    </div>
                </Card>
                <Spin spinning={state.loading} tip="Loading..." delay={500}>
                    <div className="table-wrap">
                        <Table 
                            border 
                            columns={columns} 
                            dataSource={state.list} 
                            rowSelection={rowSelection}
                            pagination={
                                {total: state.total, onChange: this.onPages}
                            } />
                    </div>
                </Spin>
                {/* 添加员工 */}
                <Modal
                    title={state.title}
                    visible={state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={this.handleCancel}
                >
                    <UserForm type={state.type} userInfo={state.selectItem} wrappedComponentRef={formData => {this.userForm = formData}} ></UserForm>
                </Modal>
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
                <Form.Item label="用户名">
                    {
                        getFieldDecorator('user_name')(
                            <Input type="text" placeholder="请输入用户名" />
                        )
                    }
                </Form.Item>
                <Form.Item label="手机号">
                    {
                        getFieldDecorator('mobile')(
                            <Input type="tel" placeholder="请输入手机号" />
                        )
                    }
                </Form.Item>
                <Form.Item label="入职时间">
                    {
                        getFieldDecorator('entry_time')(
                            <DatePicker format='YYYY/MM/DD' />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" className="f-mr20" onClick={this.onSearch}>查询</Button>
                    <Button>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}

const SearchForm = Form.create({})(FilterForm)

const rules = {
    username: [{ required: true, message: '请输入用户名' }],
    sex: [{ required: true, message: '请选择性别' }],
    state: [{ required: true, message: '请选一个标签' }],
    birthday: [{ required: true, message: '请设置生日' }],
    address: [{ required: true, message: '请填写地址' }]
}

class AddUser extends Component {
    render() {
        let { type, userInfo } = this.props;
        let isAdd = type == 'add';
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                span: 4
            },
            wrapperCol: {
                span: 19
            }
        }
        return (
            <Form {...formItemLayout}>
                <Form.Item label="用户名" >
                    {
                        getFieldDecorator('username',{
                            initialValue: isAdd ? '' : userInfo.username,
                            rules: rules.username
                        })(
                            <Input type="text" placeholder="请输入用户名" />
                        )
                    }
                </Form.Item>
                <Form.Item label="性别" >
                    {
                        getFieldDecorator('sex',{
                            initialValue: isAdd ? '' : userInfo.sex,
                            rules: rules.sex
                        })(
                            <Radio.Group>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                        )
                    }
                </Form.Item>
                <Form.Item label="状态" >
                    {
                        getFieldDecorator('state',{
                            initialValue: isAdd ? 1 : userInfo.state,
                            rules: rules.state
                        })(
                            <Select placeholder="选一个标签">
                                <Option value={1}>咸鱼</Option>
                                <Option value={2}>腊肉</Option>
                                <Option value={3}>鳝鱼</Option>
                                <Option value={4}>泥鳅</Option>
                                <Option value={5}>光明顶</Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="生日" >
                    {
                        getFieldDecorator('birthday',{
                            initialValue: isAdd ? moment('2000/01/01', 'YYYY/MM/DD') : moment(userInfo.birthday),
                            rules: rules.birthday
                        })(
                            <DatePicker/>
                        )
                    }
                </Form.Item>
                <Form.Item label="联系地址" >
                    {
                        getFieldDecorator('address', {
                            initialValue: isAdd ? '' : userInfo.address,
                            rules: rules.address
                        })(
                            <TextArea rows={3} placeholder="请输入联系地址" />
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}

const UserForm = Form.create({})(AddUser)
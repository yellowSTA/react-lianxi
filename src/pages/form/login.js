import React, { Component } from 'react';
import { Form, Icon, Input, Button, Card, Checkbox } from 'antd';

class LoginForm extends Component {
    handleSubmit = () => {
        this.props.form.validateFields((err, values) => {
            if(!err) {
                console.log('Received values of form: ', values)
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="forms">
                <Card>
                    <Form layout="inline">
                        <Form.Item>
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item>
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card style={{marginTop: 20}}>
                    <Form style={{maxWidth: 300}}>
                        <Form.Item>
                            {
                                getFieldDecorator('username', {
                                    rules: [{required: true, message: '请填写用户名'}]
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入用户名" />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <span className="f-right">忘记密码</span>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.handleSubmit}>登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        )
    }
}

export default Form.create({name: 'normal_login'})(LoginForm)
import React, { Component } from 'react';
import { Form, Icon, Input, Button, Card } from 'antd';

export default class LoginForm extends Component {
    render() {
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
            </div>
        )
    }
}
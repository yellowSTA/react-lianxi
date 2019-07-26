import React, { Component } from 'react';
import { Form, Input, Button, Card } from 'antd';

export default class City extends Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        // const { getFieldDecorator } = this.props.form;
        return (
            <div className="city">
                <Card>
                    <Form.Item>

                    </Form.Item>
                </Card>
            </div>
        )
    }
}

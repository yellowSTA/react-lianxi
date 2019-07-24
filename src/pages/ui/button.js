import React, { Component } from 'react'
import { Card, Button } from 'antd'

export default class Buttons extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }

    openLoading = () => {
        this.setState({
            isLoading: true
        })
    }

    cancelLoading = () => {
        this.setState({
            isLoading: false
        })
    }

    render() {
        return (
            <div>
                <Card title="基础按钮">
                    <Button className="btn-gap" type="primary">study</Button>
                    <Button className="btn-gap">study</Button>
                    <Button className="btn-gap" type="dashed">study</Button>
                    <Button className="btn-gap" type="danger">study</Button>
                    <Button className="btn-gap" disabled>study</Button>
                </Card>
                <Card title="图形按钮" style={{marginTop: 20}}>
                    <Button icon="plus" className="btn-gap">创建</Button>
                    <Button icon="edit" className="btn-gap">编辑</Button>
                    <Button icon="delete" type="danger" className="btn-gap">删除</Button>
                    <Button icon="search" type="primary" className="btn-gap">搜索</Button>
                </Card>
                <Card title="loading按钮" style={{marginTop: 20}}>
                    <Button type="primary" className="btn-gap" onClick={this.openLoading} loading={this.state.isLoading}>确定提交</Button>
                    <Button icon="poweroff" type="primary" onClick={this.cancelLoading} className="btn-gap">click me</Button>
                </Card>
            </div>
        )
    }
}
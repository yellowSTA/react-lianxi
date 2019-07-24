import React, { Component } from 'react';
import { Card, Button, Modal } from 'antd';
import './index.less'

export default class Modals extends Component {
    state = {
        showModal1: false,
        showModal2: false
    }

    handleOpen(type, bol) {
        this.setState({
            [type]: bol
        })
    }

    handleConfirm() {
        Modal.confirm({
            title: '正在学习react吗？',
            content: '学习react全家桶+antd',
            okText: '确定',
            okType: 'primary',
            cancelText: '取消',
            onOk() {
                console.log('ok')
            },
            onCancel() {
                console.log('cancel');
            }
        })
    }

    handleSuccess() {
        Modal.success({
            title: '表单提交成功',
        });
    }

    render() {
        return (
            <div className="modal">
                <Card title="基础模态框" className="f-mt20">
                    <Button type="primary" className="btn-gap" onClick={this.handleOpen.bind(this,'showModal1', true)}>open</Button>
                    <Button type="primary" onClick={this.handleOpen.bind(this,'showModal2', true)}>自定义页脚</Button>
                </Card>
                <Card title="信息确认框" style={{marginTop:20}}>
                    <Button type="primary" className="btn-gap" onClick={this.handleConfirm.bind(this)}>confirm</Button>
                    <Button type="primary" className="btn-gap" onClick={this.handleSuccess.bind(this)}>Success</Button>
                    <Button type="primary" className="btn-gap" onClick={error}>Error</Button>
                    <Button type="primary" className="btn-gap" onClick={warning}>Warning</Button>
                </Card>
                <Modal title="react" visible={this.state.showModal1} onCancel={this.handleOpen.bind(this,'showModal1', false)}>
                    <p>欢迎学习react入门项目</p>
                </Modal>
                <Modal 
                    title="react" 
                    visible={this.state.showModal2} 
                    onCancel={this.handleOpen.bind(this,'showModal2', false)}
                    footer={[
                        <Button key="back" onClick={this.handleOpen.bind(this,'showModal2', false)}>
                            Return
                        </Button>,
                        <Button key="submit" type="primary">
                            Submit
                        </Button>
                    ]}
                    >
                    <p>欢迎学习react入门项目</p>
                </Modal>
            </div>
        )
    }
}

function error() {
    Modal.error({
        title: '错误提示框',
        content: 'some messages...some messages...',
    });
}

function warning() {
    Modal.warning({
        title: '警告框',
        content: 'some messages...some messages...',
    });
}
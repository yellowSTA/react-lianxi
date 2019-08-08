import React, { Component } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { Card, Modal, Button } from 'antd';
import draftToHtml from 'draftjs-to-html';

export default class Rich extends Component {
    state = {
        editorState: '',
        contentState: {},
        showRich: false
    }

    //编辑
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        })
    }

    //清空内容
    clearContent = () => {
        this.setState({
            contentState: {},
            editorState: ''
        })
    }

    onContentStateChange = (contentState) => {
        this.setState({
            contentState
        })
    }

    render() {
        const {editorState, contentState, showRich} = this.state;
        return (
            <div className="richPage">
                <Card>
                    <div className="f-mb20">
                        <Button type="primary" onClick={this.clearContent}>清空内容</Button>
                        <Button type="primary" className="f-ml20" onClick={() => {this.setState({showRich: true})}}>获取html文本</Button>
                    </div>
                    <Editor
                        editorState={editorState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={this.onEditorStateChange}
                        onContentStateChange={this.onContentStateChange}
                    />
                    <Modal
                        title="富文本内容"
                        visible={showRich}
                        onCancel={() => {this.setState({showRich: false})}}
                        footer={null}>
                            {draftToHtml(contentState)}
                    </Modal>
                </Card>
            </div>
        )
    }
}
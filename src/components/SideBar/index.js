import React, { Component } from 'react';
import { Menu } from 'antd';
import menuList from '../../assets/js/menuConfig.js';

const { SubMenu } = Menu;

export default class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    handleClick(e) {
        console.log('click', e);
    }
    componentWillMount() {
        const list = this.createMenu(menuList);
        this.setState({
            list
        })
    }
    // 生成菜单
    createMenu = (data) => {
        return data.map(item => {
            if(item.children) {
                return (
                    <SubMenu key={item.key} title={ item.title }>{ this.createMenu(item.children) }</SubMenu>
                )
            }
            return <Menu.Item key={item.key}>{item.title}</Menu.Item>
        })
    }

    render() {
        return (
            <div className="sideBar">
                <div className="logo">
                    <span>这里是logo</span>
                </div>
                <Menu onClick={this.handleClick.bind(this)} style={{ width: "100%", height: "calc(100% - 100px)" }} mode="vertical" theme="dark">
                    { this.state.list }
                </Menu>
            </div>
        )
    };
}
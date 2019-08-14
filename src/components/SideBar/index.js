import React, { Component } from 'react';
import { Menu } from 'antd';
import menuList from '../../assets/js/menuConfig.js';
import { connect } from 'react-redux';
import { switchMenu } from '../../redux/actions';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;

class SideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentKey: ''
        }
    }
    componentWillMount() {
        const list = this.createMenu(menuList);
        let currentKey = window.location.hash.replace(/#|\?.*$/,'');
        this.setState({
            list,
            currentKey
        })
    }
    // 生成菜单
    createMenu = (data) => {
        return data.map(item => {
            if(item.children) {
                return (
                    <SubMenu key={item.key} title={ <span>{item.title}</span> }>{ this.createMenu(item.children) }</SubMenu>
                )
            }
            return <Menu.Item key={item.key} title={item.title} onClick={this.handleClick}><Link to={item.key}>{item.title}</Link></Menu.Item>
        })
    }
    //菜单点击
    handleClick = ({item, key}) => {
        const { dispatch } = this.props;
        dispatch(switchMenu(item.props.title))
        this.setState({
            currentKey: key
        })
    }

    render() {
        return (
            <div className="sideBar">
                <div className="logo">
                    <span>这里是logo</span>
                </div>
                <Menu 
                    style={{ width: "100%", height: "calc(100% - 100px)" }} 
                    mode="vertical" 
                    theme="dark"
                    selectedKeys={[this.state.currentKey]}>
                    { this.state.list }
                </Menu>
            </div>
        )
    };
}

export default connect()(SideBar)
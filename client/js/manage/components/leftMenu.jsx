import React, {Component} from 'react'
import { Menu, Icon  } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup
import { query } from 'common/util.js'

class LeftMenu extends Component {
  state = {
    current: query.type || 'category',
  }
  handleClick(e){
      window.history.pushState(null, '管理列表', `manage?type=${e.key}`)
      this.setState({
          current: e.key
      },()=>{
          this.props.onClick(e.key)
      })
  }
  render() {
    return (
        <Menu
            onClick = {::this.handleClick}
            selectedKeys={[this.state.current]}
            style={{ width: 200,height:300 }}
            mode="inline"
            theme="dark"
            defaultOpenKeys={['sub1']} >
            <SubMenu key="sub1" title={<span><Icon type="setting" /><span>控制面板</span></span>}>
                <MenuItemGroup key="g1">
                    <Menu.Item key="category">
                        <Icon type="bars" />
                        <span>文章分类</span>
                    </Menu.Item>
                    <Menu.Item key="manage">
                        <Icon type="link" />
                        <span>文章管理</span>
                    </Menu.Item>
                    <Menu.Item key="edit">
                        <Icon type="appstore" />
                        <span>写文章</span>
                    </Menu.Item>
                </MenuItemGroup>
            </SubMenu>
        </Menu>
    );
  }
}

export default LeftMenu

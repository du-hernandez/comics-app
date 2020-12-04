import React from 'react';
import { Menu } from 'antd';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined
} from '@ant-design/icons';

const {SubMenu} = Menu;

const Home = () => {

  const handleClick = e => {
    console.log('clic: ', e);
  }

  return (
    <Menu
      onClick={handleClick}
      style={{ width: 256 }}
      defaultSelectedKeys={[ '3' ]}
      defaultOpenKeys={[ 'sub2' ]}
      mode='inline'
    >
      {/* <Menu.Item
        key='sub1'
        icon={<MailOutlined />}
        title='Home'
      >Home</Menu.Item> */}
      <Menu.Item
        key='sub1'
        icon={<MailOutlined />}
        title='Home'
      >Home</Menu.Item>

      <SubMenu
        key="sub2"
        icon={<AppstoreOutlined />}
        title="Comics">
        <Menu.Item key="3">Option 3</Menu.Item>
        <Menu.Item key="4">Option 4</Menu.Item>

        <SubMenu key="sub3" title="Submenu" icon={<SettingOutlined/>}>
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
        </SubMenu>

      </SubMenu>
    </Menu>
  )
};

export default Home;
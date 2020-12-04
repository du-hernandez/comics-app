import React, {useState} from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import './ManageComics.css';

const { Header, Sider, Content } = Layout;

const ManageComics = () => {

  const [ collapsed, setCollapsed ] = useState(false);

  const toggle = () => setCollapsed(!collapsed);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} theme='light'>
        <div className='logo' />
        <Menu theme='light' mode='inline' defaultOpenKeys={[ '1' ]}>
          <Menu.Item key='1' icon={<UserOutlined />}>Nav 1</Menu.Item>
          <Menu.Item key='2' icon={<VideoCameraOutlined/>}>Nav 2</Menu.Item>
          <Menu.Item key='3' icon={<UploadOutlined/>}>Nav 3</Menu.Item>
        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content className='site-layout-background'
          style={{
            margin: '24px, 16px',
            padding: 24,
            minHeight: 280
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
}

export default ManageComics;
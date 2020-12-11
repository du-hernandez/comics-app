import React, {useState} from 'react';
import { Layout, Menu, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import './Master.css';
import { useHistory } from 'react-router-dom';

const { Header, Sider, Content } = Layout;

const ManageComics = ({ children }) => {

  const [ collapsed, setCollapsed ] = useState(false);
  let history = useHistory();

  const toggle = () => setCollapsed(!collapsed);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} theme='light'>
        <div className='logo' />
        <Menu theme='light' mode='inline' defaultOpenKeys={[ '1' ]}>
          <Menu.Item key='1' icon={<HomeOutlined />}>
            <Button
              type='link'
              className='btn-link'
              onClick={() => history.push('/')}
            >Home</Button>
          </Menu.Item>
          <Menu.Item
            key='2' icon={<VideoCameraOutlined />}>
            <Button
              type='link'
              className='btn-link'
              onClick={() => history.push("/comics")}>
              Comics
            </Button>
          </Menu.Item>
          <Menu.Item key='3' icon={<UploadOutlined />}>
            <Button
              type='link'
              className='btn-link'
              onClick={() => history.push("/comics/manage")}>
              Manage comics
            </Button>
          </Menu.Item>
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
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

export default ManageComics;
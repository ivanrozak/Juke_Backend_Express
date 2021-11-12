import React from 'react';
import './App.css';
import Index from './views/Index';
import { Layout } from 'antd';
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <>
      <Layout>
        <Header>header</Header>
        <Layout>
          <Content
            className='site-layout'
            style={{ padding: '0 50px', margin: '56px 0' }}
          >
            <div
              className='site-layout-background'
              style={{ padding: 24, minHeight: 380 }}
            >
              <Index />
            </div>
          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          Design ©2021 Created by Ivan Rozak
        </Footer>
      </Layout>
    </>
  );
}

export default App;

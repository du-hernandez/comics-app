import React from 'react';
import { Layout } from 'antd';
import ComicCard from '../ComicCard/ComicCard'
import './ColumnCard.css';

const { Header, Footer, Content } = Layout;

const ColumnCard = ({
  title = 'Title',
  content = 'Content',
  footer = 'Footer',
  comics = []
}) => {
  // console.log('comics --> ', comics);
  return (
    <Layout className='column-card-container' >
      <Header className='header-column'>{title}</Header>
      <Content>
        {
          comics.map(comic => <ComicCard comic={comic} key={comic.id} />)
        }
      </Content>
      <Footer>{footer}</Footer>
    </Layout>
  );
}

export default ColumnCard;
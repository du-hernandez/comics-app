import React from 'react';
import { Layout } from 'antd';
import ComicCard from '../ComicCard/ComicCard';
import './ColumnCard.css';

const { Header, Footer, Content } = Layout;

const ColumnCard = ({
  title = 'Title',
  comics = [],
  onSelect
}) => {
  return (
    <Layout className='column-card-container' >
      <Header className='header-column'>{title}</Header>
      <Content>
        {
          comics.map(comic => (
            <ComicCard
              comic={comic}
              key={comic.id}
              onSelect={onSelect}
            />
          ))
        }
      </Content>
    </Layout>
  );
}

export default ColumnCard;
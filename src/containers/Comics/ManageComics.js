import React, { useState, useEffect } from 'react';
import { ColumnCard } from '../../components';
import { Api } from '../../common/api';
import './ManageComics.css';

const ManageComics = () => {
  const [ comics, setComics ] = useState({
    newComics: [], reviewComics: [], approvedComics: []
  });
  
  useEffect(() => {
    Api()
      .then(res => res.json())
      .then(res => setComics({ ...comics, newComics: res.data.results }))
      .catch(err => console.error("-----> ", err));
    return () => {
      // Component unmount
    }
  }, []);

  const handleSelect = comic => {
    switch (comic.state) {
      case 'NEW':
        comic.state = 'REVIEW';
        setComics({
          ...comics,
          newComics: comics.newComics.filter(i => i.id !== comic.id),
          reviewComics: [ ...comics.reviewComics, comic ]
        });
        return comic;
      case 'REVIEW':
        comic.state = 'APPROVED';
        return comic;
      case 'APPROVED':
      //   comic.state = '';
        return comic;
      default:
        comic.state = '';
        return comic;
    }
  }

  const assignState = (otherComics, state) => (
    otherComics.map(i => ({ ...i, state }))
  );

  return (
    <div className='manage-container'>
      <ColumnCard
        comics={assignState(comics.newComics, 'NEW')}
        onSelect={handleSelect}
        title='NUEVOS COMICS'
      />
      <ColumnCard
        comics={assignState(comics.reviewComics, 'REVIEW')}
        onSelect={handleSelect}
        title='EN REVISIÓN'
      />
      <ColumnCard
        comics={assignState(comics.approvedComics, 'APPROVED')}
        onSelect={handleSelect}
        title='APROVADOS'
      />
    </div>
  );
}

export default ManageComics;
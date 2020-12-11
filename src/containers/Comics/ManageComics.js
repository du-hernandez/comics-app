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
      .then(res => setComics({...comics, newComics: res.data.results}))
      .catch(err => console.error("-----> ", err));
    return () => {
      // Component unmount
    }
  }, []);

  console.log("comics: ", comics);

  return (
    <div className='manage-container'>
      <ColumnCard comics={comics.newComics} title='NUEVOS COMICS' />
      <ColumnCard comics={[]} title='EN REVISIÓN' />
      <ColumnCard comics={[]} title='APROVADOS' />
    </div>
  );
}

export default ManageComics;
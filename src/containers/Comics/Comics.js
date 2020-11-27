import React, {useEffect, useState} from 'react';
import { ComicCard } from '../../components';
import { Api } from '../../common/api';
// import 'Comics.css';

const Comics = () => {

  const [ comics, setComics ] = useState([]);

  useEffect(() => {
    Api()
      .then(res => res.json())
      .then(res => setComics(res.data.results))
      .catch(err => console.error("-----> ", err));
  }, []);

  if (comics.length > 0) {
    return (
      <div className='comic-container'>
        {
          comics.map(comic => {
            const {
              title,
              description,
              thumbnail
            } = comic;
            return (
              <ComicCard
                title={title}
                description={description}
                thumbnail={thumbnail ?
                  (`${thumbnail.path}.${thumbnail.extension}`)
                  : null}
              />
            )
          })
        }
      </div>
    )
  }
  
  return (
    <div><p>Loading...</p></div>
  );
}

export default Comics;
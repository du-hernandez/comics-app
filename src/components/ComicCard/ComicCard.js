import React from 'react';
import './ComicCard.css';

/**
 * 
 * @param {
 * title
 * description
 * thumbnail
 * }
 */

const ComicCard = ({title, id, description, thumbnail}) => {
  return (
    <div className='comic-card-container'>
      <div className='image'>
        <img
          src={thumbnail || 'https://e.rpp-noticias.io/xlarge/2020/04/26/182718_933313.jpg'}
          alt='Comic Marvel'
          width='200px'
        />
      </div>
      <div className='left-content'>
        <div>
          <label className='label'>Título: {title}</label>
        </div>
        {/* <div>
          <label className='label'>Id:</label>
        </div> */}
        {description &&
          <div>
            <label className='label'>Descripción</label>
            <p className='label'>{description}</p>
          </div>
        }
      </div>
    </div>
  );
}

export default ComicCard;
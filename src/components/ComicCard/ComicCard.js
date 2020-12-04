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

const ComicCard = ({
  comic,
  onSelect
}) => {
  const {
    title,
    id,
    description,
    thumbnail, } = comic;

  const onClick = () => {
    if (onSelect) {
      onSelect(comic);
    }
  }

  const image = `${thumbnail?.path}.${thumbnail?.extension}`;

  return (
    <div className='comic-card-container' onClick={onClick}>
      <div className='image'>
        <img
          src={image || 'https://e.rpp-noticias.io/xlarge/2020/04/26/182718_933313.jpg'}
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
            <label className='label'>Descripción:</label>
            <p className='label'>{description}</p>
          </div>
        }
      </div>
    </div>
  );
}

export default ComicCard;
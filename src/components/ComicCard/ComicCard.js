import React from 'react';
import { Button } from 'antd';
import './ComicCard.css';

/**
 * NEW
 * REVIEW
 * APPROVED
 */

const ComicCard = ({
  comic,
  onSelect,
}) => {
  const { title, id, description, thumbnail, } = comic;
  
  let message = 'A revisar';
  let buttonType = 'default';

  switch (comic.state) {
    case 'REVIEW':
      buttonType = 'primary';
      message = 'Añadir a lista';
      break;
    case 'APPROVED':
      message = 'Volver';
      buttonType = 'ghost';
      break;
    default:
      message = 'Sin estado';
      buttonType = 'text';
      break;
  }

  const onClick = () => {
    if (onSelect) {
      onSelect(comic);
    }
  }

  const image = `${thumbnail?.path}.${thumbnail?.extension}`;

  return (
    <div className='comic-card-container'>
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
      {onSelect && (
        <Button type={buttonType} onClick={onClick}>
          {message}
        </Button>
      )}
    </div>
  );
}

export default ComicCard;
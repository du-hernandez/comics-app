import React, { useState, Fragment } from 'react';
import { Button, Divider } from 'antd';
import './ComicCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { comicActions } from '../../services/comics/comicSlice';
import { AdminModal } from '../AdminModal/AdminModal';

const ComicCard = ({ comic, onSelect }) => {

  const [updateModalVisible, setUpdateModalVisible] = useState(false)

  const { title, id, description, thumbnail, state, imageUrl } = comic

  const { comics } = useSelector(state => state.comics)

  const dispatch = useDispatch()

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
      message = 'Seleccionar';
      buttonType = 'text';
      break;
  }

  const onClick = () => {
    let newState
    switch (comic.state) {
      case 'NEW':
        comic.state = 'REVIEW';
        newState = {
          ...comics,
          newComics: comics.newComics.filter(i => i.id !== comic.id),
          reviewComics: [...comics.reviewComics, comic]
        }
        dispatch(comicActions.setComics(newState))
        break;
      case 'REVIEW':
        comic.state = 'APPROVED';
        newState = {
          ...comics,
          reviewComics: comics.reviewComics.filter(i => i.id !== comic.id),
          approvedComics: [...comics.approvedComics, comic]
        }
        dispatch(comicActions.setComics(newState))
        break;
      case 'APPROVED':
        comic.state = 'REVIEW';
        newState = {
          ...comics,
          approvedComics: comics.approvedComics.filter(i => i.id !== comic.id),
          reviewComics: [comic, ...comics.reviewComics]
        }
        dispatch(comicActions.setComics(newState))
        break;
      default:
        comic.state = '';
        break;
    }
  }

  const deleteComic = () => {
    dispatch(comicActions.setComics({
      ...comics,
      reviewComics: comics.reviewComics.filter(i => i.id !== comic.id),
    }))
  }

  return (
    <div className='comic-card-container'>
      <div className='image'>
        <img
          src={imageUrl || 'https://e.rpp-noticias.io/xlarge/2020/04/26/182718_933313.jpg'}
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
      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px 10px' }}>
        <Button type={buttonType} onClick={onClick}>
          {message}
        </Button>
        <Divider />
        {state === 'REVIEW' && (
          <Fragment>
            <Button type={buttonType} onClick={() => setUpdateModalVisible(true)}>
              EDITAR
            </Button>
            <Button type="default" onClick={deleteComic}>
              ELIMINAR
            </Button>
          </Fragment>
        )}
      </div>
      <AdminModal
        title="ACTUALIZAR COMIC"
        visible={updateModalVisible}
        setVisible={setUpdateModalVisible}
        comic={comic}
      />
    </div>
  );
}

export default ComicCard;
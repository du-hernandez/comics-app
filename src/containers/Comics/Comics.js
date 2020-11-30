import React, {useEffect, useState} from 'react';
import { Api } from '../../common/api';
import { Modal } from 'antd';
import { ComicCard } from '../../components';
import './Comics.css';

import { Formik, validateYupSchema } from 'formik';
import {ValidationSchema} from './validations'

const MyModal = ({ comic, visible, handleOk, handleCancel }) => {
  const { title } = comic;
  return (
    <Modal
      title={title}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <ComicCard comic={comic} />
    </Modal>
  )
}

const Comics = () => {
  const [ comics, setComics ] = useState([]);
  const [ selected, setSelected ] = useState(null);
  const [ visible, setVisible ] = useState(false);
  const [newComics, setNewComics] = useState([]);

  const [ inputs, setInputs ] = useState({
    id: '',
    title: '',
    description: '',
    thumbnail: {
      path: '',
      extension:''
    },
  });

  useEffect(() => {
    Api()
      .then(res => res.json())
      .then(res => setComics(res.data.results))
      .catch(err => console.error("-----> ", err));
  }, []);

  const handleOk = () => setVisible(false);

  const handleCancel = () => setVisible(false);

  const handleComicSelect = comic => {
    setSelected(comic);
    setVisible(true);
  };

  const onChange = e => {
    if (e.target.name === 'path' || e.target.name === 'extension') {
      setInputs({
        ...inputs,
        thumbnail: {
          ...inputs.thumbnail,
          [ e.target.name ]: e.target.value
        },
      })
    } else {
      setInputs({
        ...inputs,
        [ e.target.name ]: e.target.value,
      })
    }
  }

  const save = () => {
    setNewComics(
      [ ...newComics,
        { ...inputs }
      ]
    )
  }
  
  if (comics.length > 0) {
    return (
      <>
        <div className='comic-container'>
          <div style={{ marginLeft: 20, padding: 20 }}>
            {
              [...newComics, ...comics].map(comic => {
                const { id } = comic;
                return (
                  <ComicCard
                    key={id}
                    comic={comic}
                    onSelect={handleComicSelect}
                  />
                )
              })
            }
          </div>
          <div style={{ padding: 20, marginLeft: 20, width: '200%' }}>
            {selected && <ComicCard comic={selected} />}
            <div style={{ width: 500, marginTop: 100, alignItems: 'center' }}>
              <form onSubmit={e => e.preventDefault()}>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 5 }}>
                  <label>Título</label>
                  <input placeholder='...' name='title' onChange={onChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 5, }}>
                  <label>Id</label>
                  <input placeholder='...' name='id' onChange={onChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 5, }}>
                  <label>Descripción</label>
                  <input placeholder='...' name='description' onChange={onChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 5, }}>
                  <label>Imagen</label>
                  <input placeholder='...' name='thumbnail' onChange={onChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 5, }}>
                  <label>Path</label>
                  <input placeholder='...' name='path' onChange={onChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 5, }}>
                  <label>Extension</label>
                  <input placeholder='...' name='extension' onChange={onChange} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', margin: 5, }}>
                  <button onClick={save} >Guardar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <MyModal
          comic={selected}
          visible={visible}
          handleOk={handleOk}
          handleCancel={handleCancel}
        /> */}
      </>
    )
  }
  
  return (
    <div><p>Loading...</p></div>
  );
}

export default Comics;
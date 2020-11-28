import React, {useEffect, useState} from 'react';
import { Api } from '../../common/api';
import { Modal } from 'antd';
import { ComicCard } from '../../components';
import './Comics.css';

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
  const [ selected, setSelected ] = useState({});
  const [ visible, setVisible ] = useState(false);

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

  if (comics.length > 0) {
    return (
      <>
        <div className='comic-container'>
          <div style={{marginLeft:20, padding:20}}>
            {
              comics.map(comic => {
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
          <div style={{padding:20, marginLeft:20, width: '200%', position:'absolute', right:-10}}>
            <ComicCard comic={selected} />
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
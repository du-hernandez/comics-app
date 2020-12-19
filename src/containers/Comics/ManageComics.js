import React, { useState, useEffect } from 'react';
import { ColumnCard } from '../../components';
import { Api } from '../../common/api';
import './ManageComics.css';
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { comicActions } from '../../services/comics/comicSlice'
import { Button } from 'antd';
import { AdminModal } from '../../components/AdminModal/AdminModal';

const ManageComics = () => {

  const [createModalVisible, setCreateModalVisible] = useState(false)

  const { newComics, comics, loading, comicSelected } = useSelector((state) => state.comics)


  const assignState = (otherComics, state) => (
    otherComics.map(i => ({ ...i, state }))
  );

  return (
    <div>
      <Button type="primary" onClick={() => setCreateModalVisible(true)}>AGREGAR COMIC</Button>
      <div className='manage-container'>
        <ColumnCard
          comics={assignState(comics.newComics, 'NEW')}
          title='NUEVOS COMICS'
        />
        <ColumnCard
          comics={assignState(comics.reviewComics, 'REVIEW')}
          title='EN REVISIÓN'
        />
        <ColumnCard
          comics={assignState(comics.approvedComics, 'APPROVED')}
          title='APROVADOS'
        />
      </div>
      <AdminModal
        visible={createModalVisible}
        setVisible={setCreateModalVisible}
        title="CREAR COMIC"
      />
    </div>
  );
}

export default ManageComics;
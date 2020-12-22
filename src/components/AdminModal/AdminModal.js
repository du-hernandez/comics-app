import React, { useEffect } from 'react'
import { Modal, Form, Input, InputNumber, Button, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'

import * as validation from "../../containers/Comics/validations"
import { comicActions } from '../../services/comics/comicSlice'

export const AdminModal = ({ comic, visible, setVisible, title }) => {

  const [form] = Form.useForm()

  const { comics } = useSelector(state => state.comics)

  const dispatch = useDispatch()

  useEffect(() => {
    form.setFieldsValue(comic)
  }, [])

  const onFinish = (values) => {
    if (comic) {
      const reviewComics = comics.reviewComics.map(c => (c.id === comic.id ? values : c))
      dispatch(comicActions.setComics({ ...comics, reviewComics }))
      message.success("Comic actualizado!")
    } else {
      dispatch(comicActions.addComic({ values, hide }))
    }
  }

  const hide = () => {
    setVisible(false)
    form.resetFields()
  }

  const footerModal = [
    <Button key="back" onClick={() => setVisible(false)}>
      CANCELAR
    </Button>,
    <Button key="save" type="primary" htmlType="submit" form="comic">
      GUARDAR
    </Button>
  ]

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={() => setVisible(false)}
      footer={footerModal}
    >
      <Form
        name="comic"
        onFinish={onFinish}
        validateMessages={validation.messages}
        form={form}
      >
        <Form.Item
          name="title"
          label="Título"
          rules={validation.schema.title}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Descripción"
          rules={validation.schema.description}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"imageUrl"}
          label="Ruta imagen"
          rules={validation.schema.imageUrl}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  )
}
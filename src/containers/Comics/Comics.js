import React, { useEffect, useState } from "react";
import { Api } from "../../common/api";
import * as validation from "./validations";
import { Form, Input, InputNumber, Button } from "antd";
import { useHistory } from "react-router-dom";
import { ComicCard } from "../../components";
import "./Comics.css";

import { useSelector, useDispatch, shallowEqual } from "react-redux";
import * as ComicsTypes from "../../services/comics/comicTypes";
import { comicActions } from '../../services/comics/comicSlice'

import { selectUpdatedComis } from './selector';

const Comics = () => {
  const {
    comics,
    loading,
    comicSelected,
    newComics
  } = useSelector(selectUpdatedComis(), shallowEqual);

  const dispatch = useDispatch();

  const history = useHistory();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = (comic) => {
    dispatch({
      type: ComicsTypes.ADD_COMIC,
      payload: { comic }
    });
  };

  const onFinishFailed = (res) => {
    // console.log(res);
  };

  const handleComicSelect = (comic) => (
    dispatch({
      type: ComicsTypes.SELECT_COMIC,
      payload: { comic }
    })
  )

  return (
    <div className="comic-container">
      <div style={{ marginLeft: 20, padding: 20 }}>
        {comics?.approvedComics.map((comic) => {
          const { id } = comic;
          return (
            <ComicCard key={id} comic={comic} onSelect={handleComicSelect} />
          );
        })}
      </div>
      <div style={{ padding: 20, marginLeft: 20, width: "200%" }}>
        {comicSelected && <ComicCard comic={comicSelected} />}
        <div style={{ width: 500, marginTop: 100, alignItems: "center" }}>
          <Form
            {...layout}
            name="new-comic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={validation.messages}
          >
            <Form.Item
              name="title"
              label="Título"
              rules={validation.schema.title}
            >
              <Input />
            </Form.Item>
            <Form.Item name="id" label="Id" rules={validation.schema.id}>
              <InputNumber />
            </Form.Item>
            <Form.Item
              name="description"
              label="Descripción"
              rules={validation.schema.description}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["thumbnail", "path"]}
              label="Path"
              rules={validation.schema.path}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["thumbnail", "extension"]}
              label="Extensión"
              rules={validation.schema.extension}
            >
              <Input />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Save
                </Button>
            </Form.Item>
          </Form>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="ghos"
            onClick={() => history.push("/comics/manage", { newComics })}
          >
            Manage comics
            </Button>
        </div>
      </div>
    </div>
  )
}

export default Comics;

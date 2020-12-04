import React, {useEffect, useState} from 'react';
import { Api } from '../../common/api';
import * as validation from './validations';

import {
  Form,
  Input,
  InputNumber,
  Button,
  // Radio,
  // Select,
  // Cascader,
  // DatePicker,
  // TreeSelect,
  // Switch,
  // Modal
} from 'antd';

import { ComicCard } from '../../components';
import './Comics.css';

const Comics = () => {
  const [ comics, setComics ] = useState([]);
  const [ selected, setSelected ] = useState(null);
  // const [ visible, setVisible ] = useState(false);
  const [newComics, setNewComics] = useState([]);

  // const [ inputs, setInputs ] = useState({
  //   id: '',
  //   title: '',
  //   description: '',
  //   thumbnail: {
  //     path: '',
  //     extension:''
  //   },
  // });

  useEffect(() => {
    Api()
      .then(res => res.json())
      .then(res => setComics(res.data.results))
      .catch(err => console.error("-----> ", err));
  }, []);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const onFinish = values => {
    console.log('values: ', values);
    setNewComics([...newComics, {...values}]);
  };

  const onFinishFailed = res => {
    console.log(res);
  }

  // const handleOk = () => setVisible(false);

  // const handleCancel = () => setVisible(false);

  const handleComicSelect = comic => {
    setSelected(comic);
    // setVisible(true);
  };

  // const onChange = e => {
  //   if (e.target.name === 'path' || e.target.name === 'extension') {
  //     setInputs({
  //       ...inputs,
  //       thumbnail: {
  //         ...inputs.thumbnail,
  //         [ e.target.name ]: e.target.value
  //       },
  //     })
  //   } else {
  //     setInputs({
  //       ...inputs,
  //       [ e.target.name ]: e.target.value,
  //     })
  //   }
  // }

  // const save = () => {
  //   setNewComics(
  //     [ ...newComics,
  //       { ...inputs }
  //     ]
  //   )
  // }
  
  if (comics.length > 0) {
    return (
      <div className='comic-container'>
        <div style={{ marginLeft: 20, padding: 20 }}>
          {
            [ ...newComics, ...comics ].map(comic => {
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
            <Form
              {...layout}
              // labelCol={{ span: 8 }}
              // wrapperCol={{ span: 16 }}
              name="new-comic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              validateMessages={validation.messages}
            >
              <Form.Item
                name='title'
                label="Título"
                rules={validation.schema.title}>
                <Input />
              </Form.Item>
              <Form.Item
                name='id'
                label="Id"
                rules={validation.schema.id}>
                <InputNumber />
              </Form.Item>
              <Form.Item
                name='description'
                label="Descripción"
                rules={validation.schema.description}>
                <Input />
              </Form.Item>
              <Form.Item
                name={[ 'thumbnail', 'path' ]}
                label="Path"
                rules={validation.schema.path}>
                <Input />
              </Form.Item>
              <Form.Item
                name={[ 'thumbnail', 'extension' ]}
                label="Extensión"
                rules={validation.schema.extension}>
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div><p>Loading...</p></div>
  );
}

export default Comics;
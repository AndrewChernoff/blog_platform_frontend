import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';
import { api } from '../../API/api';
import { useNavigate } from 'react-router-dom';

export const AddPost = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [textValue, setTextValue] = useState('');
  const [titleValue, setTitleValue] = useState('');
  const [tagsValue, setTagsValue] = useState('');
  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null)

  const handleChangeFile = async(e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null 
    
    if(file) {
      const formData = new FormData()

      formData.append('image', file)
      
      const {data} =  await api.uploadImg(formData)
      
      setImageUrl(`http://localhost:4444${data.url}`/* data.url */);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl(null)
  };

  const onTextChange = useCallback((e: string) => {
    setTextValue(e);
  }, []);

  const onTitleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.currentTarget.value);
  }, []);
  
  const onTagsChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTagsValue(e.currentTarget.value);
  }, []);

  const onSubmit = async() => {

   
     const {data} = await api.createPost({title: titleValue, text: textValue, tags: [tagsValue]/* , imageUrl  */})
    
     console.log(data);
     
     navigate('/')  
    
    }

  const uploadPreview = () => {
    inputRef.current?.click()
  }

  const options : any = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  return (
    <Paper style={{ padding: 30 }}>
      <Button variant="outlined" size="large" onClick={uploadPreview}>
        Загрузить превью
      </Button>
      <input type="file" ref={inputRef} onChange={handleChangeFile} hidden />
      {imageUrl && (
        <Button variant="contained" color="error" onClick={onClickRemoveImage}>
          Удалить
        </Button>
      )}
      {imageUrl && (
        <img className={styles.image} src={imageUrl} alt="Uploaded" />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        onChange={onTitleChange}
        value={titleValue}
        fullWidth
      />
      <TextField classes={{ root: styles.tags }} variant="standard" placeholder="Тэги" value={tagsValue} onChange={onTagsChange} fullWidth />
      <SimpleMDE className={styles.editor} value={textValue} onChange={onTextChange} options={options} />
      <div className={styles.buttons}>
        <Button size="large" variant="contained" onClick={onSubmit}>
          Опубликовать
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};

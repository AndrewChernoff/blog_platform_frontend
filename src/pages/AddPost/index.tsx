import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { api } from '../../API/api';
import { Navigate, useNavigate, useParams, Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { isAuthSelector } from '../../common/selectors';

export const AddPost = () => {
  const isAuth = useAppSelector(isAuthSelector) 
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [textValue, setTextValue] = useState('')
  const [titleValue, setTitleValue] = useState('')
  const [tagsValue, setTagsValue] = useState('')
  const navigate = useNavigate()
  const {_id}  = useParams() //for updating post


  const inputRef = useRef<HTMLInputElement>(null)
  
  const handleChangeFile = async(e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null 
    
    if(file) {
      const formData = new FormData()

      formData.append('image', file)
      
      const {data} =  await api.uploadImg(formData)
      
      /* setImageUrl(`${process.env.REACT_APP_API_URL}${data.url}`); */
      //setImageUrl(`http://localhost:4444${data.url}`); /// for localhost

      const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:4444'
      setImageUrl(`${baseUrl}${data.url}`); /// for localhost

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

  const onSubmit = async () => {
    if (_id) {
      if (imageUrl) {//if imageUrl send with image, if without image send without image 
        api.updatePost(_id, {
          title: titleValue,
          text: textValue,
          tags: [tagsValue],
          imageUrl,
        }).catch((error: Error) => alert("I'm sorry uploading images is unavailable for now."))
      } else {
        api.updatePost(_id, {
          title: titleValue,
          text: textValue,
          tags: [tagsValue],
        });
      }
    } else {
      if (imageUrl) {
        api.createPost({
          title: titleValue,
          text: textValue,
          tags: [tagsValue],
          imageUrl,
        });
      } else {
        api.createPost({
          title: titleValue,
          text: textValue,
          tags: [tagsValue],
        });
      }
    }

    navigate("/");
  };

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

  useEffect(() => {
    if(_id) {
      try {
        api.getPostItem(_id)
        .then((res: any) => {
          console.log(res)
          setImageUrl(res.imageUrl)
          setTextValue(res.text)
          setTitleValue(res.title)
          setTagsValue(res.tags)
        } )  
      } catch (error) {
       alert("Can't find post") 
      }
    }
  }, [])

  if(!isAuth && !localStorage.getItem('blog-token')) {
    return <Navigate to="/"/>
  }

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
         {_id ? 'Обновить' : 'Опубликовать'}
        </Button>
        <Link to="/">
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};

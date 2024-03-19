import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { PostItemType } from '../redux/posts/posts-types';
import { useParams } from 'react-router-dom';
import { api } from '../API/api';
import { useAppSelector } from '../hooks/redux-hooks';

export const PostsByTags = () => {
    const { tagName } = useParams()    
    const [posts, setPosts] = useState<PostItemType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const {items: tags, isLoading: isTagsLoading} = useAppSelector(state => state.posts.tags)

  
    const getPosts = async (param: string) => {
        const posts = await api.getPostsByTagName(param)
        return posts
    }


  useEffect(() => {
    if(tagName) {
        setLoading(true)
        getPosts(tagName)
            .then(res => setPosts(res.data))
        setLoading(false)
    }
  }, [])


  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {loading ? [...Array(5)].map((_) => <Post isLoading={loading}/>)
          : posts.map((el:PostItemType) => (
            <Post
              key={el._id}
              id={el._id}
              title={el.title}
              imageUrl={el.imageUrl}
              user={{
                avatarUrl: el.user.avatarUrl,
                fullName: el.user.fullName,
                id: el.user._id
              }}
              createdAt={el.user.createdAt}
              viewsCount={el.viewsCount}
              commentsCount={el.commentsCount}
              tags={el.tags}
              isEditable
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          {isTagsLoading ? <TagsBlock isLoading={isTagsLoading}/>
          :<TagsBlock items={tags} isLoading={false} />}
        </Grid>
      </Grid>
    </>
  );
};

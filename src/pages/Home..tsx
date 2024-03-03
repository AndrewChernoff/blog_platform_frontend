import React, { useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { fetchPosts, fetchTags } from '../redux/posts/posts-slice';

export const Home = () => {

  const dispatch = useAppDispatch()
  const posts = useAppSelector(state => state.posts.posts)
  const tags = useAppSelector(state => state.posts.tags)

  const isPostsLoading = posts.isLoading
  const isTagsLoading = tags.isLoading

  useEffect(() => {
    dispatch(fetchPosts())
    dispatch(fetchTags())
  }, [])

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isPostsLoading ? [...Array(5)].map((el: any) => <Post isLoading={isPostsLoading}/>)
          : posts.items.map((el) => (
            <Post
              key={el._id}
              id={el._id}
              title={el.title}
              imageUrl={el.imageUrl}
              user={{
                avatarUrl: el.user.avatarUrl,
                fullName: el.user.fullName,
              }}
              createdAt={el.user.createdAt}
              viewsCount={el.viewsCount}///
              commentsCount={3}////
              tags={el.tags}
              isEditable
            />
          ))}
        </Grid>
        <Grid xs={4} item>
          {isTagsLoading ? <TagsBlock isLoading={isTagsLoading}/>
          :<TagsBlock items={tags.items} isLoading={false} />}
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  );
};

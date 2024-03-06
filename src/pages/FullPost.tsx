import { useEffect, useState } from "react";
import Markdown from 'react-markdown'

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { PostItemType } from "../redux/posts/posts-types";
import { api } from "../API/api";

export const FullPost = () => {
  const [post, setPost] = useState<PostItemType>();
  const [isLoading, setIsloading] = useState<boolean>(false)

  const { id } = useParams();

  const fetchPost = async (id: string) => {
    const postItem = await api.getPostItem(id);
    setPost(postItem); // Set the fetched post to the state
  };

  useEffect(() => {
    if (id) {
      setIsloading(true)
      fetchPost(id).catch(() => alert('Error'))
      setIsloading(false)
    }
  }, []);

  if(isLoading) {
    return <Post isLoading/>
  }

  return (
    <>
      <Post
        id={post?._id}
        title={post?.title}
        imageUrl={post?.imageUrl}
        user={{
          avatarUrl: post?.user.avatarUrl,
          fullName: post?.user.fullName,
        }}
        createdAt={post?.createdAt}
        viewsCount={post?.viewsCount}
        commentsCount={3} //
        tags={post?.tags}
        isFullPost
      >
        
      {post && <p>
        <Markdown>
          {post.text}
          </Markdown>
        </p>} 
         
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};

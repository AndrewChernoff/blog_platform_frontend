import { useEffect, useState } from "react";
import Markdown from 'react-markdown'

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import { PostItemType } from "../redux/posts/posts-types";
import { api } from "../API/api";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { fetchComments } from "../redux/comments/comments-slice";

export const FullPost = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams(); //postId

  const comments = useAppSelector(state => state.comments.items)
  const [post, setPost] = useState<PostItemType>();
  const userId = post?.user._id
  const [isLoading, setIsloading] = useState<boolean>(false)

  const commentsCount = useAppSelector(state => state.posts.posts.items).find(el => el._id === id)?.commentsCount ///useing commentsCount from here because in local state it requires additional request

  const fetchPost = async (id: string) => {
    const postItem = await api.getPostItem(id);
    setPost(postItem); // Set the fetched post to the state
  };

  useEffect(() => {
    if (id) {
      setIsloading(true)
      fetchPost(id).catch(() => alert('Error'))
      setIsloading(false)
      dispatch(fetchComments(id))
    }
  }, []);

  if(isLoading || !post ) {
    return <Post isLoading/>
  }  

  return (
    <>
      <Post
        id={post._id}
        title={post.title}
        imageUrl={post.imageUrl}
        user={{
          avatarUrl: post.user.avatarUrl,
          fullName: post.user.fullName,
        }}
        createdAt={post.createdAt}
        viewsCount={post.viewsCount}
        commentsCount={commentsCount}
        tags={post?.tags}
        isFullPost
      >
        
      {post && <p>
        <Markdown>
          {post.text}
          </Markdown>
        </p>} 
         
      </Post>
      {id && <CommentsBlock
        postId={id}
        items={comments}
        isLoading={isLoading}
      >
        <Index id={post._id} />
      </CommentsBlock>
      }
    </>
  );
};

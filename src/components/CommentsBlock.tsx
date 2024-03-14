import React from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import DeleteIcon from '@mui/icons-material/Delete';
import { CommentType } from "../redux/comments/comments-types";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { deleteComment } from "../redux/comments/comments-slice";

type Props = {
  postId: string
  items: CommentType[]
  children?: any
  isLoading: boolean
}

export const CommentsBlock = ({ items, postId, children, isLoading = true }:Props) => {
  
  const dispatch = useAppDispatch()
  const userId = useAppSelector(state => state.auth.user?._id)
  
  const deleteCommentHandler = (commentId: string, postId: string, userId: string) => dispatch(deleteComment({id: commentId, postId, userId}))  

  return (
    <SideBlock title={items.length > 0 ? "Комментарии" : "Комментарев нету"}>
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj: CommentType, index: number) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                )}
              </ListItemAvatar>
              
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <ListItemText
                  primary={obj.user.fullName}
                  secondary={obj.text}
                />
              )}

              {userId === obj.user._id &&
                <button onClick={() => deleteCommentHandler(obj._id, postId, obj.user._id)} style={{border: 'none', backgroundColor: 'inherit', cursor: 'pointer'}}>
                  <DeleteIcon color="primary"  />
                </button>
              } 
            </ListItem>
            <Divider variant="inset" component="li" />
           
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};

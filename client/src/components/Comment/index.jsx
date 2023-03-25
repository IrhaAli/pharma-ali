import React from 'react'
import '../../styles/Comment.css'
import TimeAgo from 'timeago-react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function Comment(props) {
  return (
    <>
      <div className='comment'>
        <span className='commentDesc'>{props.comment.comment}</span>
        <div className="commentDeets">
          <p><TimeAgo datetime={props.comment.created_at} /></p>
          <div>
            <p>{props.comment.name}</p>
            <div>
              {props.user === props.comment.user_id && (<IconButton onClick={() => props.deleteComment(props.comment.id)}>
                <DeleteIcon />
              </IconButton>)}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Comment;
import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import '../../styles/Comments.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from '../Comment';
import IconButton from '@mui/material/IconButton';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import InputAdornment from '@mui/material/InputAdornment';
import CommentIcon from '@mui/icons-material/Comment';


function Comments(props) {
  // Set up all states for comment component
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [newComment, setNewComment] = useState('');

  // To open or close comment component
  const handleClick = () => {
    setOpen(!open)
  }

  // To add a comment
  const addComment = () => {
    const params = { user_id: props.user, comment: newComment, blog_id: props.blog_id }
    Promise.all([
      axios.post(`/comments/add`, params),
      axios.get(`/comments/${props.blog_id}`)
    ])
      .then((res) => {
        setComments(res[1].data.rows)
        setNewComment('');
      })
  }

  // To delete a comment
  const deleteComment = (id) => {
    Promise.all([
      axios.post("/comments/delete", id),
      axios.get(`/comments/${props.blog_id}`)
    ])
      .then((res) => {
        setComments(res[1].data.rows);
      })
  }

  // To load all comments when the blog is visited
  useEffect(() => {
    Promise.all([
      axios.get(`/comments/${props.blog_id}`),
    ]).then((data) => {
      setComments(data[0].data.rows)
    })
  }, []);



  return (
    <div className='comments'>
      <span className='commentsTitle'><h1>Comments</h1></span>
      <div className='commentsContainer'>

        {comments.map((comment) => (
          <>
            <Comment
              key={comment.id}
              comment={comment}
              setComments={() => props.setComment(comment)}
              deleteComment={deleteComment}
              user={props.user}
            />
          </>
        ))}

      </div>
      {props.user &&
        (<>
          <span className='commentsSubtitle'><h3>Leave a comment:</h3>
            <IconButton aria-label="comment" onClick={handleClick}>
              <CommentIcon />
            </IconButton>
          </span>

          {open && <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField id="filled-basic" label="Leave a comment" variant="filled" fullWidth
              {...props}
              value={newComment}
              onChange={(event) => setNewComment(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" color="white" size="large" onClick={addComment}>
                      <KeyboardReturnIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>}
        </>)}
    </div>
  )
}

export default Comments;
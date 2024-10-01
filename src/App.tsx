import './reset.css';

import { useEffect, useState } from 'react';

import styles from './App.module.css';

type PostResponse = {
  userId?: number;
  id?: number;
  title?: string;
  body?: string;
};

type CommentResponse = {
  postId?: number;
  id?: number;
  name?: string;
  email?: string;
  body?: string;
};

type CommentsArray = CommentResponse[];
type PostsArray = PostResponse[];

export const App = () => {
  const [id, setId] = useState(1);
  const [data, setData] = useState<PostResponse>();
  const [posts, setPosts] = useState<PostsArray>([]);
  const [comments, setComments] = useState<CommentsArray>([]);

  const Title = (prop: PostResponse) => {
    return (
      <div
        className={id === prop.id ? styles.selectedTitle : styles.title}
        onClick={() => {
          if (prop.id !== undefined) setId(prop.id);
        }}
      >
        <h4>{prop.id}.</h4> {prop.title}{' '}
      </div>
    );
  };

  const Body = (prop: PostResponse) => {
    return <div className={styles.body}>{prop.body} </div>;
  };

  const Comment = (prop: CommentResponse) => {
    return (
      <div className={styles.comment}>
        <h4>작성자: {prop.email}</h4>
        {prop.body}{' '}
      </div>
    );
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json() as Promise<PostsArray>)
      .then((response) => {
        setPosts(response);
      })
      .catch(() => {
        window.alert('');
      });
  }, []);

  useEffect(() => {
    let ignore = false;
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json() as Promise<CommentsArray>)
      .then((response) => {
        if (ignore) return;
        setComments(response);
        setData(posts[id - 1]);
      })
      .catch(() => {
        window.alert();
      });

    return () => {
      ignore = true;
    };
  }, [id, posts]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.page}>
        <div>포스트 목록</div>
        {posts.slice().map((post) => (
          <Title key={post.id} {...post}></Title>
        ))}
      </div>
      <div className={styles.page}>
        <div>내용</div> <Body {...data}></Body>
        <div>댓글</div>
        {comments.slice().map((comment) => (
          <Comment key={comment.id} {...comment}></Comment>
        ))}
      </div>
    </div>
  );
};

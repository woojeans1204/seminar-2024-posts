import './reset.css';

import { useEffect, useState } from 'react';

import styles from './App.module.css';

type TodoResponse = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const App = () => {
  const [id, setId] = useState(1);
  const [data, setData] = useState<TodoResponse>();

  useEffect(() => {
    let ignore = false;
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((response) => response.json() as Promise<TodoResponse>)
      .then((response) => {
        if (ignore) return;
        setData(response);
      })
      .catch(() => {
        window.alert();
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => {
          setId(id - 1);
        }}
      >
        왼쪽
      </button>
      <div>
        가운데 영역{' '}
        <div>
          {id} - {data?.id} - {data?.title}
        </div>
      </div>
      <button
        onClick={() => {
          setId(id + 1);
        }}
      >
        오른쪽
      </button>
    </div>
  );
};

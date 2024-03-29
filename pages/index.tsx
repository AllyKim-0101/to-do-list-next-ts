import type { NextPage } from "next";
import Head from "next/head";
import { FormEvent, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import type { Item } from "../utils/todos";
const Home: NextPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [toDoList, setToDoList] = useState<Item[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { title: inputValue };
    fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("success", data);
        setToDoList([...toDoList, data]);
        setInputValue("");
      });
  };
  //Display todolist from API
  useEffect(() => {
    //1.fetch from a todos API
    fetch("/api/todos")
      .then((response) => response.json())
      .then((response) => setToDoList(response));
    //2.parse jason format(sting) to js data structure
  }, []);

  //3.map over responses to diplay in li tag one by one

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>To-do-list</h1>

        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              title="Add a new todo item"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
              }}
            ></input>
            <button type="submit">Submit</button>
          </form>
          <div className={styles.checkboxList}>
            {toDoList.map((toDoItem) => (
              <div>
                <label key={toDoItem.url}>
                  <input
                    defaultChecked={toDoItem.completed}
                    type="checkbox"
                    value={toDoItem.url}
                    onChange={(e) => {
                      fetch(e.target.value, {
                        method: "PATCH",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ completed: e.target.checked }),
                      });
                    }}
                  ></input>
                  {toDoItem.title}
                </label>
                <span
                  className={styles.delete}
                  onClick={() => {
                    fetch(toDoItem.url, {
                      method: "DELETE",
                    })
                      .then(() => fetch("/api/todos"))
                      .then((response) => response.json())
                      .then((data) => setToDoList(data));
                  }}
                >
                  x
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

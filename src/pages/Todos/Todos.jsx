// react
import { useState, useEffect } from "react";

// supabase client
import { supabase } from "../../supabaseClient";

// context
import { useAuth } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeProvider";

// icons
import { MdAdd } from "react-icons/md";

// styles
import styles from "./Todos.module.scss";

// components
import { TodoCard, SkeletonTodoCard } from "../../components";

function Todo() {
  // state
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // context
  const { user } = useAuth();
  const { theme } = useTheme();

  // listen to changes in database and update state
  useEffect(() => {
    const subscribe = supabase
      .channel("custom-all-channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "todos" }, (payload) => {
        console.log("Change received!", payload);
        switch (payload.eventType) {
          case "INSERT":
            setTodos((prev) => [...prev, payload.new]);
            break;
          case "UPDATE":
            setTodos((prev) => prev.filter((item) => item.id !== payload.old.id));
            setTodos((prev) => [...prev, payload.new]);
            break;
          case "DELETE":
            setTodos((prev) => prev.filter((item) => item.id !== payload.old.id));
            break;
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscribe);
    };
  }, []);

  // delay data fetching
  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  // fetch todos on render
  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    // setIsLoading(true);
    await sleep(500);
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("id, task, is_complete, inserted_at")
        .order("inserted_at", { ascending: false });
      if (error) {
        console.log(error);
      } else if (data) {
        console.log(data);
        setTodos(data);
      }
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

  // sort todos by most recent
  const sortedTodos = [...todos].sort((a, b) => b.id - a.id);

  // add new todo
  const addTodo = async (e) => {
    try {
      const updates = {
        user_id: user?.id,
        task: task,
        inserted_at: new Date(),
      };

      let { error } = await supabase.from("todos").upsert(updates).select();

      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error.message);
    }
    setTask("");
  };

  // delete todo
  const deleteTodo = async (id) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
  };

  // show skelton when loading true
  if (isLoading) {
    return (
      <div className={`${styles.container} ${styles[theme]}`}>
        <h1>My Todos</h1>
        <div className={styles.todoContainer}>
          <div className={`${styles.addTodo} ${styles[theme]}`}>
            <input
              className={`${styles.input} ${styles[theme]}`}
              type="text"
              value={task || ""}
              placeholder="Start creating a supatask!"
              onChange={(e) => setTask(e.target.value)}
            />
            <button className={`${styles.button} ${styles[theme]}`} onClick={addTodo}>
              <MdAdd size={30} />
            </button>
          </div>
          <div className={styles.todoList}>
            <SkeletonTodoCard isLoading={isLoading} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${styles[theme]}`}>
      <h1>My Todos</h1>
      <div className={styles.todoContainer}>
        <div className={`${styles.addTodo} ${styles[theme]}`}>
          <input
            className={`${styles.input} ${styles[theme]}`}
            type="text"
            value={task || ""}
            placeholder="Start creating a supatask!"
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            type="button"
            aria-label="add task"
            className={`${styles.button} ${styles[theme]}`}
            onClick={addTodo}
          >
            <MdAdd size={30} />
          </button>
        </div>

        <p>active supatasks: {todos.filter((todo) => todo.is_complete === false).length}</p>
        <div className={styles.todoList}>
          {sortedTodos
            .filter((todo) => todo.is_complete === false)
            .map((todo) => (
              <TodoCard
                key={todo.id}
                id={todo.id}
                task={todo.task}
                date={todo.inserted_at}
                deleteTodo={deleteTodo}
                is_complete={todo.is_complete}
              />
            ))}
        </div>
        <p>completed supatasks: {todos.filter((todo) => todo.is_complete === true).length}</p>
        <div className={styles.todoList}>
          {sortedTodos.map(
            (todo) =>
              todo.is_complete && (
                <TodoCard
                  key={todo.id}
                  id={todo.id}
                  task={todo.task}
                  date={todo.inserted_at}
                  deleteTodo={deleteTodo}
                  is_complete={todo.is_complete}
                />
              )
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;

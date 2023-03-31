import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";
import { useAuth } from "../../context/AuthProvider";
import { useTheme } from "../../context/ThemeProvider";

// styles
import styles from "./Todos.module.scss";

// components
import TodoCard from "../../components/TodoCard/TodoCard";

function Todo() {
  // state
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const { user } = useAuth();

  // theme provider
  const { theme } = useTheme();

  useEffect(() => {
    // listen to changes in database and update state
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

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const { data, error } = await supabase
        .from("todos")
        .select("id, task, inserted_at")
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
  };

  const sortedTodos = [...todos].sort((a, b) => b.id - a.id);

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

  const deleteTodo = async (id) => {
    const { data, error } = await supabase.from("todos").delete().eq("id", id);
  };

  return (
    <>
      <div className={`${styles.container} ${styles[theme]}`}>
        <h1>My Todos</h1>
        <div className={styles.todoContainer}>
          <div className={styles.addTodo}>
            <input type="text" value={task || ""} onChange={(e) => setTask(e.target.value)} />
            <button onClick={addTodo}>Add Todo</button>
          </div>
          <div className={styles.todoList}>
            {sortedTodos.map((todo, index) => (
              <TodoCard
                key={todo.id}
                id={todo.id}
                task={todo.task}
                date={todo.inserted_at}
                deleteTodo={deleteTodo}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;

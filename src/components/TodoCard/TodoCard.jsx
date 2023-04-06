// supabase client
import { supabase } from "../../supabaseClient";

// styles
import styles from "./TodoCard.module.scss";

// react
import { useState } from "react";

// libraries
import { MdDeleteForever, MdCancel, MdDone, MdEdit } from "react-icons/md";
import PulseLoader from "react-spinners/PulseLoader";

// context
import { useTheme } from "../../context/ThemeProvider";

function TodoCard({ id, task, date, deleteTodo }) {
  const [isLoading, setIsLoading] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updateTask, setUpdateTask] = useState("");

  const { theme } = useTheme();

  const cancelEdit = () => {
    setEditing(!editing);
    setUpdateTask("");
  };

  const updateTodo = async (id) => {
    setIsLoading(true);
    setEditing(!editing);
    try {
      let { error } = await supabase.from("todos").update({ task: updateTask }).eq("id", id);
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error.message);
    }
    setUpdateTask("");
    setIsLoading(false);
  };

  return (
    <div className={`${styles.todo} ${styles[theme]}`}>
      {editing ? (
        <>
          <span className={styles.date}>{date}</span>
          <div className={styles.todoBtm}>
            <input
              type="text"
              value={updateTask || ""}
              onChange={(e) => setUpdateTask(e.target.value)}
              placeholder={task}
            />
            <div className={styles.btnContainer}>
              <button onClick={cancelEdit}>
                <MdCancel className={styles.icon} size={25} />
              </button>
              <button onClick={() => updateTodo(id)}>
                <MdDone className={styles.icon} size={25} />
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <span className={styles.date}>{date}</span>
          <div className={styles.todoBtm}>
            <div className={styles.todoText}>
              {isLoading ? (
                <PulseLoader
                  loading={isLoading}
                  size={5}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <p>{task || undefined}</p>
              )}
            </div>

            <div className={styles.btnContainer}>
              <button onClick={() => setEditing(!editing)}>
                <MdEdit className={styles.icon} size={25} />
              </button>
              <button onClick={() => deleteTodo(id)}>
                <MdDeleteForever className={styles.icon} size={25} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoCard;

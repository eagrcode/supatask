// supabase client
import { supabase } from "../../supabaseClient";

// styles
import styles from "./TodoCard.module.scss";

// react
import { useState } from "react";

// libraries
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

// spinners
import PulseLoader from "react-spinners/PulseLoader";

// context
import { useTheme } from "../../context/ThemeProvider";

function TodoCard({ id, task, date, deleteTodo, is_complete }) {
  // state
  const [isLoading, setIsLoading] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updateTask, setUpdateTask] = useState("");
  const [isComplete, setIsComplete] = useState(is_complete);

  // context destructure
  const { theme } = useTheme();

  const sleep = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  // cancel edit todo mode
  const cancelEdit = () => {
    setEditing(!editing);
    setUpdateTask("");
  };

  // update todo
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
    await sleep(500);
    setIsLoading(false);
  };

  // check as complete
  const checkComplete = async (id) => {
    setIsComplete(true);
    try {
      let { error } = await supabase.from("todos").update({ is_complete: true }).eq("id", id);
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // uncheck complete
  const uncheckComplete = async (id) => {
    setIsComplete(false);
    try {
      let { error } = await supabase.from("todos").update({ is_complete: false }).eq("id", id);
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={`${styles.todo} ${styles[theme]}`}>
      {editing ? (
        <>
          <div className={styles.todoTop}>
            <span className={styles.date}>{date}</span>
            <div className={styles.btnContainer}>
              <button
                type="button"
                aria-label="cancel edit"
                className={`${styles.button} ${styles[theme]}`}
                onClick={cancelEdit}
              >
                <FontAwesomeIcon icon={faXmark} size="2xl" />
              </button>
              <button
                type="button"
                aria-label="save edit"
                className={`${styles.button} ${styles[theme]}`}
                onClick={() => updateTodo(id)}
              >
                <FontAwesomeIcon icon={faCheck} size="2xl" />
              </button>
            </div>
          </div>

          <div className={styles.todoBtm}>
            <input
              className={`${styles.input} ${styles[theme]}`}
              type="text"
              value={updateTask || ""}
              onChange={(e) => setUpdateTask(e.target.value)}
              placeholder={task}
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.todoTop}>
            <p className={styles.date}>{date}</p>
            <div className={styles.btnContainer}>
              <button
                type="button"
                aria-label="edit"
                className={`${styles.button} ${styles[theme]}`}
                onClick={() => setEditing(!editing)}
              >
                <FontAwesomeIcon icon={faPenToSquare} size="2xl" />
              </button>
              <button
                type="button"
                aria-label="delete"
                className={`${styles.button} ${styles[theme]}`}
                onClick={() => deleteTodo(id)}
              >
                <FontAwesomeIcon icon={faTrash} size="2xl" />
              </button>
            </div>
          </div>

          <div className={styles.todoBtm}>
            {isLoading ? (
              <div className={styles.pulse}>
                <PulseLoader
                  loading={isLoading}
                  size={5}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                  color={theme == "dark" ? "white" : "black"}
                />
              </div>
            ) : (
              <>
                <p>{task || undefined}</p>
                {isComplete ? (
                  <button
                    type="button"
                    aria-label="mark as uncomplete"
                    className={styles.uncheck}
                    onClick={() => uncheckComplete(id)}
                  ></button>
                ) : (
                  <button
                    type="button"
                    aria-label="mark as complete"
                    className={styles.check}
                    onClick={() => checkComplete(id)}
                  ></button>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default TodoCard;

// supabase client
import { supabase } from "../../supabaseClient";

// styles
import styles from "./TodoCard.module.scss";

// react
import { useState } from "react";

// libraries
import { MdDeleteForever, MdCancel, MdDone, MdEdit } from "react-icons/md";

function TodoCard({ id, task, deleteTodo }) {
  const [editing, setEditing] = useState(false);
  const [updateTask, setUpdateTask] = useState("");

  const cancelEdit = () => {
    setEditing(!editing);
    setUpdateTask("");
  };

  const updateTodo = async (id) => {
    console.log(id);
    try {
      let { error } = await supabase.from("todos").update({ task: updateTask }).eq("id", id);
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error.message);
    }
    setEditing(!editing);
    setUpdateTask("");
  };

  return (
    <div className={styles.todo}>
      {editing ? (
        <>
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
        </>
      ) : (
        <>
          <p>{task}</p>
          <div className={styles.btnContainer}>
            <button onClick={() => setEditing(!editing)}>
              <MdEdit className={styles.icon} size={25} />
            </button>
            <button onClick={() => deleteTodo(id)}>
              <MdDeleteForever className={styles.icon} size={25} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TodoCard;
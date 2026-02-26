import React from "react";
import styles from "./ExpenseList.module.css";

function ExpenseItem({ expense, onDelete }) {
  const dateObj = expense.date ? new Date(expense.date) : null;

  return (
    <div className={styles.con_1}>
      <div>
        <h4>{expense.title}</h4>
        <p>{expense.category}</p>
        <p>{dateObj ? dateObj.toLocaleDateString() : "No date"}</p>
      </div>

      <div className={styles.con_2}>
        <strong>{expense.amount} сом</strong>
        <br />
        <button onClick={() => onDelete(expense.id)}>Delete</button>
      </div>
    </div>
  );
}

export default ExpenseItem;
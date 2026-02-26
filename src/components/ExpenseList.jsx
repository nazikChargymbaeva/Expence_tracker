import React from "react";
import styles from "./ExpenseList.module.css";
import ExpenseItem from "./ExpenseItem";

function ExpenseList({ items, onDeleteExpense }) {
  if (!items || items.length === 0) {
    return <p className={styles.p}>No expenses yet.</p>;
  }

  return (
    <div className={styles.con}>
      {items.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={onDeleteExpense}
        />
      ))}
    </div>
  );
}

export default ExpenseList;
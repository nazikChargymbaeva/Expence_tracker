import React from "react";
import styles from "./Summary.module.css";

function Summary({ expenses }) {
  const total = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  return (
    <div className={styles.summary}>
      <h3>Total Expenses: {total} сом</h3>
    </div>
  );
}

export default Summary;
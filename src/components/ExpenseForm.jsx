import React, { useState } from "react";
import styles from "./ExpenseForm.module.css"

function ExpenseForm(props) {

  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("")

  const submitHandler = (event) => {
    event.preventDefault();

    const expenseData = {
      id: Math.random().toString(),
      title: enteredTitle,
      category: enteredCategory,
      amount: +enteredPrice,
      date: new Date(enteredDate),
    };

    props.onAddExpense(expenseData);

    setEnteredTitle("");
    setEnteredPrice("");
    setEnteredDate("");
    setEnteredCategory("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className={styles.Add}>
        <h3>Add Expense</h3>

        <div className={styles.fields_row}>

          <input
            type="text"
            value={enteredTitle}
            onChange={(e) => setEnteredTitle(e.target.value)}
            placeholder="Title"
          />

          <select
            value={enteredCategory}
            onChange={(e) => setEnteredCategory(e.target.value)}
          >
            <option value="">Category</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="other">Hobby</option>
          </select>

          <input
            type="number"
            value={enteredPrice}
            onChange={(e) => setEnteredPrice(e.target.value)}
            placeholder="Price"
          />

          <input
            type="date"
            value={enteredDate}
            onChange={(e) => setEnteredDate(e.target.value)}
          />

          <button type="submit">Add Expense</button>

        </div>
      </div>
    </form>
  );
}

export default ExpenseForm;
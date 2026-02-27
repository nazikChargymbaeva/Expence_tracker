import React, { useState, useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // путь к твоему firebase.js
import styles from "./ExpenseForm.module.css";

function ExpenseForm(props) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredPrice, setEnteredPrice] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredCategory, setEnteredCategory] = useState("");

  // Сбрасываем форму при загрузке компонента
  useEffect(() => {
    setEnteredTitle("");
    setEnteredPrice("");
    setEnteredDate("");
    setEnteredCategory("");
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!enteredTitle || !enteredPrice || !enteredDate || !enteredCategory) {
      alert("Заполните все поля!");
      return;
    }

    const expenseData = {
      title: enteredTitle,
      category: enteredCategory,
      amount: +enteredPrice,
      date: new Date(enteredDate),
    };

    try {
      // Отправляем данные в Firebase Firestore
      await addDoc(collection(db, "expenses"), expenseData);
      console.log("Expense added successfully");

      // Обновляем локальный список расходов (если нужен)
      if (props.onAddExpense) {
        props.onAddExpense({
          ...expenseData,
          id: Math.random().toString(), // временный ID для UI
        });
      }

      // Очищаем форму
      setEnteredTitle("");
      setEnteredPrice("");
      setEnteredDate("");
      setEnteredCategory("");
    } catch (error) {
      console.error("Ошибка при добавлении расхода:", error);
      alert("Не удалось добавить расход. Попробуйте снова.");
    }
  };

  return (
    <form onSubmit={submitHandler} autoComplete="off">
      <div className={styles.Add}>
        <h3>Add Expense</h3>
        <div className={styles.fields_row}>
          <input
            type="text"
            value={enteredTitle}
            onChange={(e) => setEnteredTitle(e.target.value)}
            placeholder="Title"
            autoComplete="off"
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
            autoComplete="off"
          />
          <input
            type="date"
            value={enteredDate}
            onChange={(e) => setEnteredDate(e.target.value)}
            autoComplete="off"
          />
          <button type="submit">Add Expense</button>
        </div>
      </div>
    </form>
  );
}

export default ExpenseForm;
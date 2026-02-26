import React, { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import FilterBar from "../components/FilterBar";
import { FaUserCircle } from "react-icons/fa";
import Summary from "../components/Summary";
import "./Home.css";

function Home() {
  const [isRegistered, setIsRegistered] = useState(
    JSON.parse(localStorage.getItem("isRegistered")) || false
  );
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || { name: "", income: "", goals: "" }
  );
  const [expenses, setExpenses] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    localStorage.setItem("isRegistered", JSON.stringify(isRegistered));
  }, [isRegistered]);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleInputChange = (e) => {
    setUserData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = () => {
    if (userData.name && userData.income && userData.goals) {
      setIsRegistered(true);
    } else {
      alert("Заполните поля");
    }
  };

  const addExpenseHandler = (expense) => {
    setExpenses((prev) => [expense, ...prev]);
  };

  const deleteExpenseHandler = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchCategory = selectedCategory ? expense.category === selectedCategory : true;
    const matchMonth =
      selectedMonth !== "" ? new Date(expense.date).getMonth() === +selectedMonth : true;
    return matchCategory && matchMonth;
  });

  return (
    <div>
      {!isRegistered ? (
        <div className="reg">
            <img src="https://i.pinimg.com/736x/af/5b/6d/af5b6d761154f4e8b536ffd936e59730.jpg" alt="" />
          
          <div>
            <h1>
              Monthly <span>Budget</span>
            </h1>

            <input
              type="text"
              name="income"
              placeholder="Insert Your Income"
              value={userData.income}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="name"
              placeholder="Insert Your Name"
              value={userData.name}
              onChange={handleInputChange}
            />

            <input
              type="text"
              name="goals"
              placeholder="Insert Your Goals"
              value={userData.goals}
              onChange={handleInputChange}
            />

            <button onClick={handleRegister}>Start Your Calculation</button>
          </div>
        </div>
      ) : (
        <>
          <div className="home">
            <div>
              <p>Expenses</p>
              <h1>
                Monthly <span>Budget</span>
              </h1>
            </div>

            <div>
              <h2>
                <span>
                  <FaUserCircle />
                </span>{" "}
                Welcome {userData.name}
              </h2>
            </div>
          </div>
            <ExpenseForm onAddExpense={addExpenseHandler} />
          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
          <Summary expenses={filteredExpenses} />
          <ExpenseList items={filteredExpenses} onDeleteExpense={deleteExpenseHandler} />
        </>
      )}
    </div>
  );
}

export default Home;
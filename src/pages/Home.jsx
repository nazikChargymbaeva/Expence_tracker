import React, { useState, useEffect } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import FilterBar from "../components/FilterBar";
import { FaUserCircle } from "react-icons/fa";
import Summary from "../components/Summary";
import "./Home.css";

function Home() {
  // Загружаем статус регистрации из localStorage
  const [isRegistered, setIsRegistered] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("isRegistered"));
    return saved === true; // true только если ранее зарегистрирован
  });

  const [userData, setUserData] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("userData"));
    return saved
      ? {
          name: saved.name || "",
          income: saved.income?.toString() || "",
          goals: saved.goals || "",
        }
      : { name: "", income: "", goals: "" };
  });

  const [expenses, setExpenses] = useState(() => {
    // Если пользователь не зарегистрирован, не загружаем расходы
    return isRegistered
      ? JSON.parse(localStorage.getItem("expenses")) || []
      : [];
  });

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // Сохраняем userData и isRegistered в localStorage
  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("isRegistered", JSON.stringify(isRegistered));
  }, [isRegistered]);

  useEffect(() => {
    if (isRegistered) {
      localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses, isRegistered]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = () => {
    if (userData.name && userData.income && userData.goals) {
      setIsRegistered(true);
      // При новой регистрации очищаем старые расходы
      setExpenses([]);
      localStorage.removeItem("expenses");
    } else {
      alert("Пожалуйста, заполните все поля!");
    }
  };

  const addExpenseHandler = (expense) => {
    if (!isRegistered) return; // блокируем добавление до регистрации
    setExpenses((prev) => [expense, ...prev]);
  };

  const deleteExpenseHandler = (id) => {
    if (!isRegistered) return; // блокируем удаление до регистрации
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchCategory = selectedCategory
      ? expense.category === selectedCategory
      : true;
    const matchMonth =
      selectedMonth !== ""
        ? new Date(expense.date).getMonth() === +selectedMonth
        : true;
    return matchCategory && matchMonth;
  });

  // Если не зарегистрирован — показываем только форму регистрации
  if (!isRegistered) {
    return (
      <div className="reg">
        <img
          src="https://i.pinimg.com/736x/af/5b/6d/af5b6d761154f4e8b536ffd936e59730.jpg"
          alt="Budget"
        />
        <div className="reg-form">
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
    );
  }

  // Если зарегистрирован — показываем остальное приложение
  return (
    <div>
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
      <ExpenseList
        items={filteredExpenses}
        onDeleteExpense={deleteExpenseHandler}
      />
    </div>
  );
}

export default Home;
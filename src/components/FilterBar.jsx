import React from "react";
import styles from "./FilterBar.module.css";

function FilterBar({
  selectedCategory,
  onCategoryChange,
  selectedMonth,
  onMonthChange,
}) {
  return (
    <div className={styles.filterBar}>
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="food">Food</option>
        <option value="transport">Transport</option>
        <option value="other">Other</option>
      </select>

      <select
        value={selectedMonth}
        onChange={(e) => onMonthChange(e.target.value)}
      >
        <option value="">All Months</option>
        {[...Array(12)].map((_, i) => (
          <option key={i} value={i}>
            {new Date(0, i).toLocaleString("en", { month: "long" })}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState(null);

  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    expense_date: "",
    notes: ""
  });

  // =========================
  // FETCH EXPENSES
  // =========================
  const fetchExpenses = async () => {
    const res = await axios.get("http://127.0.0.1:5000/api/expenses");
    setExpenses(res.data);
  };

  // =========================
  // FETCH SUMMARY
  // =========================
  const fetchSummary = async () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    try {
      const res = await axios.get(
        `http://127.0.0.1:5000/api/summary?month=${month}&year=${year}`
      );
      setSummary(res.data);
    } catch {
      setSummary(null);
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, []);

  // =========================
  // HANDLE INPUT CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // =========================
  // ADD EXPENSE
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://127.0.0.1:5000/api/expenses", form);

    alert("Expense added!");

    setForm({
      title: "",
      amount: "",
      category: "",
      expense_date: "",
      notes: ""
    });

    fetchExpenses();
    fetchSummary();
  };

  // =========================
  // DELETE EXPENSE
  // =========================
  const deleteExpense = async (id) => {
    await axios.delete(`http://127.0.0.1:5000/api/expenses/${id}`);
    fetchExpenses();
    fetchSummary();
  };

  return (
    <div className="app-container">
    <h1>Expense Tracker</h1>

      <h1>Expense Tracker</h1>

      {/* =========================
          ADD EXPENSE FORM
      ========================== */}
      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />

        <input
          name="expense_date"
          type="date"
          value={form.expense_date}
          onChange={handleChange}
          required
        />

        <input
          name="notes"
          placeholder="Notes"
          value={form.notes}
          onChange={handleChange}
        />

        <button type="submit">Add Expense</button>
      </form>

      {/* =========================
          EXPENSE LIST
      ========================== */}
      <h2>Expenses</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>₹{e.amount}</td>
              <td>{e.category}</td>
              <td>{e.expense_date}</td>
              <td>
                <button onClick={() => deleteExpense(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* =========================
          MONTHLY SUMMARY
      ========================== */}
      {summary && (
        <>
          <h2>Monthly Summary</h2>
          <p>Total Spent: ₹{summary.total_spent}</p>
          <p>Total Transactions: {summary.total_transactions}</p>

          <img
            src={`data:image/png;base64,${summary.chart}`}
            alt="Chart"
          />
        </>
      )}
    </div>
  );
}

export default App;

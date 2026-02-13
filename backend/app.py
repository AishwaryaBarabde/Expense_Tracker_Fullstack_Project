from flask import Flask, request, jsonify
from models import db, Expense
from config import Config
from flask_cors import CORS
from datetime import datetime
from sqlalchemy import func
import matplotlib.pyplot as plt
import io
import base64
import pandas as pd

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
CORS(app)

with app.app_context():
    db.create_all()

# ===============================
# ADD EXPENSE
# ===============================
@app.route("/api/expenses", methods=["POST"])
def add_expense():
    data = request.json

    try:
        expense = Expense(
            title=data["title"],
            amount=float(data["amount"]),
            category=data["category"],
            expense_date=datetime.strptime(data["expense_date"], "%Y-%m-%d"),
            notes=data.get("notes", "")
        )

        db.session.add(expense)
        db.session.commit()

        return jsonify({"message": "Expense added"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400


# ===============================
# GET ALL EXPENSES
# ===============================
@app.route("/api/expenses", methods=["GET"])
def get_expenses():
    expenses = Expense.query.all()

    result = []
    for e in expenses:
        result.append({
            "id": e.id,
            "title": e.title,
            "amount": e.amount,
            "category": e.category,
            "expense_date": e.expense_date.strftime("%Y-%m-%d"),
            "notes": e.notes
        })

    return jsonify(result)


# ===============================
# UPDATE EXPENSE
# ===============================
@app.route("/api/expenses/<int:id>", methods=["PUT"])
def update_expense(id):
    expense = Expense.query.get(id)

    if not expense:
        return jsonify({"error": "Expense not found"}), 404

    data = request.json

    expense.title = data["title"]
    expense.amount = float(data["amount"])
    expense.category = data["category"]
    expense.expense_date = datetime.strptime(data["expense_date"], "%Y-%m-%d")
    expense.notes = data.get("notes", "")

    db.session.commit()

    return jsonify({"message": "Expense updated"})


# ===============================
# DELETE EXPENSE
# ===============================
@app.route("/api/expenses/<int:id>", methods=["DELETE"])
def delete_expense(id):
    expense = Expense.query.get(id)

    if not expense:
        return jsonify({"error": "Expense not found"}), 404

    db.session.delete(expense)
    db.session.commit()

    return jsonify({"message": "Expense deleted"})


# ===============================
# MONTHLY SUMMARY + CHART
# ===============================
@app.route("/api/summary", methods=["GET"])
def monthly_summary():
    month = int(request.args.get("month"))
    year = int(request.args.get("year"))

    expenses = Expense.query.filter(
        func.extract('month', Expense.expense_date) == month,
        func.extract('year', Expense.expense_date) == year
    ).all()

    if not expenses:
        return jsonify({"message": "No data found"}), 404

    df = pd.DataFrame([{
        "category": e.category,
        "amount": e.amount
    } for e in expenses])

    summary = df.groupby("category")["amount"].sum()

    total_spent = df["amount"].sum()
    total_transactions = len(df)

    # Create Pie Chart
    plt.figure(figsize=(6,6))
    summary.plot.pie(autopct="%1.1f%%")
    plt.title("Category Wise Spending")

    img = io.BytesIO()
    plt.savefig(img, format="png")
    img.seek(0)
    chart_url = base64.b64encode(img.getvalue()).decode()

    plt.close()

    return jsonify({
        "total_spent": float(total_spent),
        "total_transactions": total_transactions,
        "chart": chart_url
    })


if __name__ == "__main__":
    app.run(debug=True)

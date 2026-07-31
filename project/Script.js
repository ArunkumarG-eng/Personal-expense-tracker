const form = document.getElementById("expense-form");
const title = document.getElementById("title");
const amount = document.getElementById("amount");
const category = document.getElementById("category");

const expenseList = document.getElementById("expense-list");
const totalElement = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

displayExpenses();

form.addEventListener("submit", function(e){

    e.preventDefault();

    const expense = {
        id: Date.now(),
        title: title.value,
        amount: Number(amount.value),
        category: category.value
    };

    expenses.push(expense);

    saveExpenses();

    form.reset();

    displayExpenses();

});

function displayExpenses(){

    expenseList.innerHTML = "";

    let total = 0;

    expenses.forEach(expense=>{

        total += expense.amount;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${expense.title}</td>
            <td>${expense.category}</td>
            <td>₹${expense.amount}</td>
            <td>
                <button class="delete"
                onclick="deleteExpense(${expense.id})">
                Delete
                </button>
            </td>
        `;

        expenseList.appendChild(row);

    });

    totalElement.textContent = total;

}

function deleteExpense(id){

    expenses = expenses.filter(expense => expense.id !== id);

    saveExpenses();

    displayExpenses();

}

function saveExpenses(){

    localStorage.setItem("expenses", JSON.stringify(expenses));

}
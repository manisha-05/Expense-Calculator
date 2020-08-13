import React, { useState, useEffect } from "react";

import "./App.css";
import { ExpenseList, ExpenseForm } from "./components";
import { v4 as uuidv4 } from "uuid";

// const initialExpenses = [
//   { id: uuidv4(), charge: "rent", amount: 1600 },
//   { id: uuidv4(), charge: "Car payment", amount: 4000 },
//   { id: uuidv4(), charge: "Credit card bill", amount: 1200 },
// ];

const initialExpenses = localStorage.getItem("expenses")? JSON.parse(localStorage.getItem("expenses")):[]
function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [edit, setEdit] = useState(false)
  const [id, setId] = useState(0)
 
  useEffect( () =>{
    localStorage.setItem('expenses', JSON.stringify(expenses))
  
  }, [expenses])

  const handleCharge = (e) => {
   
    setCharge(e.target.value);
   
  };


  const handleAmount = (e) => {
    
    setAmount(e.target.value);
  };


  const handleSubmit = (e) => {
    
    e.preventDefault();
    if(charge!== "" && amount > 0){
      if(edit) {
        let tempExpenses = expenses.map(item => {
          return item.id === id? {...item, charge,amount} : item
            
        } )
        setExpenses(tempExpenses)
        setEdit(false)
        
      }
     else{
        const singleExpense = { id: uuidv4(), charge, amount }
        setExpenses([...expenses, singleExpense])
     }
    setCharge("")
    setAmount("")
    }
    else{
      alert("Charge field Cannot be empty and Amount has to be bigger than zero")
    }
  };
  const clearItems = (id) => {
    setExpenses([])
  }


  const deleteItem = (id) => {
    
    const tempExpense = expenses.filter((item) => item.id !== id );
    setExpenses(tempExpense)
  }


  const handleEdit = (id) => {
    const expense = expenses.find(item =>item.id === id )
    let {charge, amount} = expense
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
  }


  return (
    <>
      
      <h1> Expense Calculator </h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList expenses={expenses} clearItems={clearItems} handleEdit={handleEdit} deleteItem={deleteItem}/>
      </main>
      <h1>
        total spending:
        <span className="total">
          ${""}
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;

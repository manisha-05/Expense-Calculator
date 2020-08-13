import React from 'react'
import ExpenseItem from './ExpenseItem'
import { MdDelete } from "react-icons/md";

const ExpenseList = ({ expenses, clearItems, handleEdit, deleteItem }) => {
    return (
        <>
           <ul className="List">
           {expenses.map((expense) => {
             return  < ExpenseItem key={expense.id} expense={expense} handleEdit={handleEdit} deleteItem={deleteItem} />
           })}
            </ul>
            {expenses.length > 0 ? <button className="btn" onClick={clearItems}>clear expenses<MdDelete className="btn-icon"/></button>  : null}
        </>
    )
}

export default ExpenseList

import { useState } from "react";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";
import categories from "./expense-tracker/categories";

function App() {
    const [selectedCategory, setSelectedCategory] = useState("");
    const [expenses, setExpenses] = useState([
        { id: 1, description: "aaa", amount: 10, category: "Utilities" },
        { id: 2, description: "bbb", amount: 10, category: "Utilities" },
        { id: 3, description: "ccc", amount: 10, category: "Utilities" },
        { id: 4, description: "ddd", amount: 10, category: "Utilities" },
    ]);

    const visibleExpenses = selectedCategory
        ? expenses.filter((e) => e.category === selectedCategory)
        : expenses;

    return (
        <div>
            <ExpenseForm
                onSubmit={(expense) =>
                    setExpenses([
                        ...expenses,
                        { ...expense, id: expenses.length + 1 },
                    ])
                }
            />
            <div className="mb-5"></div>
            <ExpenseFilter
                onSelectCategory={(category) => setSelectedCategory(category)}
            />
            <div className="mb-3"></div>
            <ExpenseList
                expenses={visibleExpenses}
                onDelete={(id) =>
                    setExpenses(expenses.filter((e) => e.id !== id))
                }
            />
        </div>
    );
}

export default App;

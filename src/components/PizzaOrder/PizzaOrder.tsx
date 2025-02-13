import { produce } from "immer"
import { useState } from "react"

function PizzaOrder() {

    const [pizza, setPizza] = useState({
        name: "Peperoni",
        toppings: ["Mushroom"]
    })

    const handleClick = () => {
        setPizza(produce(draft => {
            draft.toppings.push("Tomatoes")
        }))
    }

    return (<>
        <div>Pizza Order</div>
        <p>{pizza.name} with: {pizza.toppings.join(" ")}</p>
        <button onClick={handleClick}>Add Tomatoes</button>
    </>
    )
}

export default PizzaOrder
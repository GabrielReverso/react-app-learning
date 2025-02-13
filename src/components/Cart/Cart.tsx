import { produce } from "immer"
import { useState } from "react"

function Cart() {

    const [cart, setCart] = useState({
        discont: .1,
        items: [
            { id: 1, title: "Product 1", quantity: 1 },
            { id: 2, title: "Product 2", quantity: 1 }
        ]
    })

    const handleClick = () => {
        setCart(produce(draft => {
            const item = draft.items.find(item => item.id === 1)
            if (item) item.quantity += 1
        }))
    }

    return (
        <>
            <div>Cart</div>
            {cart.items.map(item => <p key={item.id}>{item.title + " -> quantity: " + item.quantity}</p>)}
            <button onClick={handleClick}>Add product 1</button>
        </>
    )
}

export default Cart
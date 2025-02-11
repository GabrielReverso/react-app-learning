import { useState } from "react";

interface Props {
    items: string[]
    heading: string
    onSelectItem: (item: string) => void
}

export default function ListGroup({ items, heading, onSelectItem }: Props) {

    const [selectedIndex, setSelectedIndex] = useState(-1)

    const message = items.length === 0 && <p>No item found</p>

    return (
        <>
            <h1>{heading}</h1>
            {message}
            <ul className="list-group">
                {items.map((item, index) => {
                    return (
                        <li
                            key={item}
                            onClick={() => { setSelectedIndex(index); onSelectItem(item) }}
                            className={selectedIndex === index ? "list-group-item active" : "list-group-item"}>
                            {item}
                        </li>
                    )
                })}
            </ul>
        </>
    );
}
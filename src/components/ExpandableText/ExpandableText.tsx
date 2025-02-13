import React, { useState } from 'react'

interface Props {
    maxChars?: number
    children: string
}

const ExpandableText = ({ maxChars = 50, children }: Props) => {
    const [expanded, setExpanded] = useState(false)

    const handleClick = () => {
        setExpanded(!expanded)
    }

    const text = children.length <= maxChars ? <p>{children}</p> : <p>{expanded ? children : children.substring(0, maxChars)}...</p>

    return (
        <>
            {text}
            <button onClick={handleClick}>{expanded ? "less" : "more"}</button>
        </>
    )
}

export default ExpandableText
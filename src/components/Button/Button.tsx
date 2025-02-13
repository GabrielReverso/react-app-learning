import { ReactNode } from "react"
import styles from "./button.module.css"

interface Props {
    children: ReactNode
    color?: "primary" | "secondary" | "danger"
    onClick: () => void
}

const Button = ({ children, color = "primary", onClick }: Props) => {
    const buttonType = "btn btn-" + color
    return (
        <div className={[buttonType, styles.button].join(" ")} onClick={onClick}>{children}</div>
    )
}

export default Button
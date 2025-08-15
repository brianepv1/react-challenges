import type { MouseEventHandler, ReactElement } from "react"

type ButtonProps = {
    name: string
    onClick: MouseEventHandler
    className?: string

}

export default function Buttons(props: ButtonProps): ReactElement {
    const {name, onClick, className = 'btn' } = props

    const buttonClassName = `btn ${className || ''}`.trim();

    return <button className={buttonClassName} onClick={onClick}>{name}</button>
}
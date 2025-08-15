import type { MouseEventHandler } from "react"

export type ButtonProps = {
    name: string
    onClick: MouseEventHandler
    classNames: string
}
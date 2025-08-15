import type { ReactElement } from "react";
import type { ButtonProps } from "../../types/buttons";

export default function Button(props: ButtonProps): ReactElement{
    const { name, onClick, classNames} = props
    return <button className={classNames} onClick={onClick}>{name}</button>
}
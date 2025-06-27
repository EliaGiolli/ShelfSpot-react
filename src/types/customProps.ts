import { ReactNode, ChangeEvent } from "react"

export interface ButtonProps {
    className?: string,
    children?: ReactNode
    onClick?: () => void
    disabled?: boolean,
    type?: string,
}


export interface InputProps {
    className?: string,
    children?: ReactNode,
    type?:string,
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    searchTerm?: string,
    //That's because handleInputChange is a function that receive an event
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    id?: string,
    defaultValue?: string
}
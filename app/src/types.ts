// All serializible form HTML elements
import React from "react"
import {FormEventExtended} from "./components/Form"

export type FormElement = (
    HTMLInputElement |
    HTMLSelectElement |
    HTMLTextAreaElement |
    HTMLFieldSetElement |
    HTMLButtonElement
)

// Form elements type attribute possible values
export enum FormElementType {  // The ones unused fall to switch default section
    // <input>
    BUTTON = 'button',
    CHECKBOX = 'checkbox',
    COLOR = 'color',
    DATE = 'date',
    DATETIME = 'datetime-local',
    EMAIL = 'email',
    FILE = 'file',
    HIDDEN = 'hidden',
    IMAGE = 'image',
    MONTH = 'month',
    NUMBER = 'number',
    PASSWORD = 'password',
    RADIO = 'radio',
    RANGE = 'range',
    RESET = 'reset',
    SEARCH = 'search',
    SUBMIT = 'submit',
    TELEPHONE = 'tel',
    TEXT = 'text',
    TIME = 'time',
    URL = 'url',
    WEEK = 'week',
    // <select>
    SELECT_ONE = 'select-one',
    SELECT_MULTIPLE = 'select-multiple',
    // <textarea>
    TEXTAREA = 'textarea',
    // <fieldset>
    FIELDSET = 'fieldset',
    // <output>
    OUTPUT = 'output',
}

// Form element type generalized api representations
export type FormFieldType = (
    'str' | 'float' | 'int' |  // Input
    'list[str]' | 'list[float]' | 'list[int]' |  // ListField
    string[] | number[] |  // Select
    'number' | 'text'  // Default input types
)

// Default props passed to HTML element
export interface HTMLElementProps {
    style?: React.CSSProperties
    className?: string
    id?: string
    hidden?: boolean
    placeholder?: string
    role?: React.AriaRole
    // Event handlers
    onChange?: (
        event: React.FormEvent
    ) => void | Promise<void>
    onInput?: (
        event: React.FormEvent
    ) => void | Promise<void>
    onPaste?: (
        event: React.FormEvent
    ) => void | Promise<void>
    onSubmit?: (
        event: FormEventExtended
    ) => void | Promise<void>
    onClick?: (
        event: React.MouseEvent
    ) => void | Promise<void>
    onMouseMove?: (
        event: React.MouseEvent
    ) => void | Promise<void>
    onMouseOut?: (
        event: React.MouseEvent
    ) => void | Promise<void>
    onMouseDown?: (
        event: React.MouseEvent
    ) => void | Promise<void>
    onMouseUp?: (
        event: React.MouseEvent
    ) => void | Promise<void>
}

export interface FormElementProps extends HTMLElementProps {
    name?: string
    defaultValue?: any
    defaultChecked?: boolean
    required?: boolean
}

export type colorT = (  // String representing css color
    `rgba(${number}, ${number}, ${number}, ${number})` |
    `rgb(${number}, ${number}, ${number})` |
    `#${number | string}${number | string}${number | string}`
)

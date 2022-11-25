import React from 'react'
import ListField from "./ListField"
import {FormElementProps, FormFieldType} from "../../types"

interface TypedFieldProps extends FormElementProps {
    type: FormFieldType
}

export default class TypedField extends React.Component<TypedFieldProps, any> {
    public readonly rendered: React.ReactElement
    public constructor(props: TypedFieldProps) {
        super(props)
        this.rendered = ((): React.ReactElement => {
            switch (props.type) {
                case 'int':
                case 'number':
                    return <input
                        name={props.name}
                        type={'number'}
                        defaultValue={props.defaultValue}
                        required={props.required}
                    />
                case 'float':
                    return <input
                        name={props.name}
                        type={'number'}
                        step={'0.001'}
                        defaultValue={props.defaultValue}
                        required={props.required}
                    />
                case 'str':
                case 'text':
                    return <input
                        name={props.name}
                        type={'text'}
                        defaultValue={props.defaultValue}
                        required={props.required}
                    />
                case 'list[int]':
                    return <ListField
                        name={props.name}
                        type={'text'}
                        defaultValue={props.defaultValue}
                        required={props.required}
                    />
                case 'list[float]':
                    return <ListField
                        name={props.name}
                        type={'text'}
                        defaultValue={props.defaultValue}
                        required={props.required}
                    />
                case 'list[str]':
                    return <ListField
                        name={props.name}
                        type={'text'}
                        defaultValue={props.defaultValue}
                        required={props.required}
                    />
                default:  // Literal list of values given
                    if (props.type instanceof Array) {
                        return (
                            <select
                                name={props.name}
                                defaultValue={props.defaultValue}
                            >
                                {props.type.map(value =>
                                    <option value={value} key={value}>
                                        {value}
                                    </option>
                                )}
                            </select>
                        )
                    } else {
                        return <></>
                    }
            }
        })()
    }
    public render(): React.ReactElement {
        return this.rendered
    }
}

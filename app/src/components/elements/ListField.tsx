import React from 'react'
import TypedField from "./TypedField"
import {FormElementProps, FormFieldType} from "../../types"
import Form from "../Form";

interface ListFieldProps extends FormElementProps {
    type: FormFieldType
}

interface ListFieldState {
    amount: number
}

export default class ListField extends React.Component<
    ListFieldProps,
    ListFieldState
> {
    public constructor(props: ListFieldProps) {  // Dynamically resizable list input
        super(props)
        this.state = {
            amount: 2  // Nested inputs amount
        }
    }
    public static serialize(element: HTMLFieldSetElement): any[] {
        return Object.values(
            Form.serializeSet(element)
        )
    }
    public render(): React.ReactElement {
        return(
            <fieldset
                name={this.props.name}
                style={this.props.style}
                className={
                    'CustomFormField ListFieldClassLabel' + (
                        this.props.className ?
                            ' ' + this.props.className : ''
                    )
                }
                id={this.props.id}
                onClick={this.props.onClick}
                onChange={this.props.onChange}
                onInput={this.props.onInput}
                onPaste={this.props.onPaste}
                onMouseMove={this.props.onMouseMove}
                onMouseOut={this.props.onMouseOut}
                onMouseDown={this.props.onMouseDown}
                onMouseUp={this.props.onMouseUp}
                hidden={this.props.hidden}
                role={this.props.role}
            >
                {[...Array(this.state.amount).keys()].map(number =>
                    <TypedField
                        name={`${this.props.name}_${number}`}
                        type={this.props.type}
                        defaultValue={this.props.defaultValue}
                        required={this.props.required}
                        placeholder={this.props.placeholder}
                        key={number}
                    />
                )}
                <input onClick={() => {
                    this.setState({amount: this.state.amount + 1})
                }} type={'button'} value={'+'} />
                {this.state.amount !== 2 ? <input onClick={() => {
                    this.setState({amount: this.state.amount !== 2 ?
                            this.state.amount - 1 : this.state.amount})
                }} type={'button'} value={'-'}/> : null}
            </fieldset>
        )
    }
}

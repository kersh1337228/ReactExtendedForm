import React from 'react'
import {FormElement, FormElementType, HTMLElementProps} from "../types"
import ListField from "./elements/ListField"
import ColorField from "./elements/ColorField"

// Form event type with additional data
export interface FormEventExtended extends Omit<React.FormEvent, 'target'> {
    target: React.FormEvent['target'] & {
        data: {
            [key: string]: any
        }
    }
}

// Form component props type
interface FormProps extends HTMLElementProps {
    children?: any
    autocomplete?: 'on' | 'off'
    name?: string
    action?: string
    enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'
    method?: 'get' | 'post' | 'dialog'
    novalidate?: boolean
    target?: '_self' | '_blank' | '_parent' | '_top'
}

export default class Form extends React.Component<FormProps, any> {
    public constructor(props: FormProps) {
        super(props)
        this.submit = this.submit.bind(this)
    }
    public static serializeSet(set: HTMLFormElement | HTMLFieldSetElement): {[key: string]: any} {
        const serialized: {
            [key: string]: any
        } = {}
        const nested: FormElement[] = Array<FormElement>().concat(
            ...[...set.elements].filter(
                el => (el as FormElement).type as FormElementType === FormElementType.FIELDSET
            ).map(
                el => [...(el as HTMLFieldSetElement).elements] as FormElement[]
            ) as FormElement[][]
        )
        for (const element of set.elements) {
            if (!nested.includes(element as FormElement)) {
                const value = Form.serializeElement(
                    element as FormElement
                )
                if (value) {
                    serialized[(element as FormElement).name] = value
                }
            }
        }
        return serialized
    }
    public static serializeElement(element: FormElement): any {
        if (element.classList.contains('CustomFormField')) {  // Custom form elements processing
            if (element.classList.contains('ListFieldClassLabel')) {
                return ListField.serialize(element as HTMLFieldSetElement)
            } else if (element.classList.contains('ColorFieldClassLabel')) {
                return ColorField.serialize(element as HTMLFieldSetElement)
            }
        } else {  // Regular form elements processing
            switch (element.type as FormElementType) {
                case FormElementType.CHECKBOX:
                    return (element as HTMLInputElement).checked
                case FormElementType.NUMBER:
                case FormElementType.RANGE:
                    return (element as HTMLInputElement).valueAsNumber
                case FormElementType.FILE:
                    const fd = new FormData()
                    const el = element as HTMLInputElement
                    if (el && el.files) {
                        for (const file of el.files) {
                            fd.append('InputFiles', file)
                        }
                    }
                    return fd.get('InputFiles')
                case FormElementType.RADIO:
                    return (element as HTMLInputElement).checked ?
                        (element as HTMLInputElement).value : null
                case FormElementType.SELECT_MULTIPLE:
                    return [
                        ...(element as HTMLSelectElement).options
                    ].filter(
                        (opt: HTMLOptionElement) => opt.selected
                    ).map(
                        (opt: HTMLOptionElement) => opt.value
                    )
                case FormElementType.FIELDSET:
                    return Form.serializeSet(element as HTMLFieldSetElement)
                case FormElementType.BUTTON:
                case FormElementType.HIDDEN:
                case FormElementType.IMAGE:
                case FormElementType.RESET:
                case FormElementType.SUBMIT:
                case undefined:
                    return null
                default:
                    return (element as HTMLInputElement).value
            }
        }
    }
    public submit(event: React.FormEvent) {
        event.preventDefault()
        if (this.props.onSubmit) {
            const data = Form.serializeSet(event.target as HTMLFormElement)
            this.props.onSubmit({
                ...event,
                target: {
                    ...event.target, data
                }
            })
        }
    }
    public render(): React.ReactElement {
        return (
            <form
                autoComplete={this.props.autocomplete}
                name={this.props.name}
                action={this.props.action}
                encType={this.props.enctype}
                method={this.props.method}
                noValidate={this.props.novalidate}
                target={this.props.target}
                onSubmit={this.submit}
                style={this.props.style}
                className={this.props.className}
                id={this.props.id}
            >
                {this.props.children}
            </form>
        )
    }
}

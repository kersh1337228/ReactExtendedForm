import React from 'react'
import {colorT, FormElementProps} from "../../types"
import './ColorField.css'

// Change event type with additional data
export interface ColorChangeEvent extends Omit<React.ChangeEvent, 'target'> {
    target: React.MouseEvent['target'] & {
        color: colorT
    }
}

interface ColorFieldProps extends Omit<FormElementProps, 'onChange'> {
    defaultValue?: colorT
    onChange?: (event: ColorChangeEvent) => void
}

interface ColorFieldState {
    hidden: boolean
    color: {
        r: number, g: number,
        b: number, a: number
    }
}

export default class ColorField extends React.Component<
    ColorFieldProps,
    ColorFieldState
> {
    public constructor(props: ColorFieldProps) {
        super(props)
        this.state = {
            hidden: true,
            color: props.defaultValue ?
                ColorField.parseColor(props.defaultValue) :
                {
                    r: 0, g: 0, b: 0, a: 1
                }
        }
        this.onColorChange = this.onColorChange.bind(this)
        this.onAlphaChange = this.onAlphaChange.bind(this)
    }
    public static parseColor(color: colorT) {  // Takes color-like string and returns rgba color object
        const [hex, rgb, rgba] = [
            color.match(
                /#(?<r>[\da-f]{2})(?<g>[\da-f]{2})(?<b>[\da-f]{2})/
            ),
            color.match(
                /rgb\((?<r>[\d]+), (?<g>[\d]+), (?<b>[\d]+)\)/
            ),
            color.match(
                /rgba\((?<r>[\d]+), (?<g>[\d]+), (?<b>[\d]+), (?<a>[\d\\.]+)\)/
            )
        ]
        let output = {
            r: 255, g: 255, b: 255, a: 1
        }
        if (hex?.groups) {
            const hexSubs = {
                0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9,
                a: 10, b: 11, c: 12, d: 13, e: 14, f: 15
            }
            type hex = keyof typeof hexSubs
            output = {
                r: hexSubs[hex.groups.r[0] as hex] * 16 + hexSubs[hex.groups.r[1] as hex],
                g: hexSubs[hex.groups.g[0] as hex] * 16 + hexSubs[hex.groups.g[1] as hex],
                b: hexSubs[hex.groups.b[0] as hex] * 16 + hexSubs[hex.groups.b[1] as hex],
                a: 1
            }
        } else if (rgb?.groups) {
            output = {
                r: parseInt(rgb.groups.r), g: parseInt(rgb.groups.g),
                b: parseInt(rgb.groups.b), a: 1
            }
        } else if (rgba?.groups) {
            output = {
                r: parseInt(rgba.groups.r), g: parseInt(rgba.groups.g),
                b: parseInt(rgba.groups.b), a: parseFloat(rgba.groups.a)
            }
        }
        return output
    }
    public static serialize(element: HTMLFieldSetElement): colorT {
        type HTMLColorPalette = HTMLFieldSetElement['elements'] & {[key: string]: HTMLInputElement}
        return ((
            element.elements as HTMLColorPalette
            )[`${element.name}_color`] as HTMLInputElement
        ).value as colorT
    }
    public get hex(): colorT {
        const hexSubs = {
            0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9',
            10: 'a', 11: 'b', 12: 'c', 13: 'd', 14: 'e', 15: 'f'
        }
        type hex = keyof typeof hexSubs
        return `#${hexSubs[Math.floor(
            this.state.color.r / 16
        ) as hex] + hexSubs[this.state.color.r % 16 as hex]
        }${hexSubs[Math.floor(
            this.state.color.g / 16
        ) as hex] +
        hexSubs[this.state.color.g % 16 as hex]
        }${hexSubs[Math.floor(
            this.state.color.b / 16
        ) as hex] +
        hexSubs[this.state.color.b % 16 as hex]
        }`
    }
    public get rgba(): colorT {
        return `rgba(${this.state.color.r}, ${this.state.color.g}, ${this.state.color.b}, ${this.state.color.a})`
    }
    public onColorChange(event: React.ChangeEvent): void {
        const color = ColorField.parseColor(
            (event.target as HTMLInputElement).value as colorT
        )
        this.setState({color: {
                ...this.state.color,
                r: color.r, g: color.g, b: color.b
            }}, () => {
            if (this.props.onChange) {
                this.props.onChange({
                    ...event, target: {
                        ...event.target,
                        color: this.rgba
                    }
                })
            }
        })
    }
    public onAlphaChange(event: React.ChangeEvent): void {
        this.setState({color: {
            ...this.state.color, a: (
                event.target as HTMLInputElement
            ).valueAsNumber / 100
        }}, () => {
            if (this.props.onChange) {
                this.props.onChange({
                    ...event, target: {
                        ...event.target,
                        color: this.rgba
                    }
                })
            }
        })
    }
    public render(): React.ReactElement {
        return(
            <div>
                <svg width={25} height={25} onClick={() => {
                    this.setState({hidden: !this.state.hidden})
                }}>
                    <rect height={25} width={25} rx={7} fill={this.rgba}/>
                </svg>
                <fieldset
                    name={this.props.name}
                    style={{
                        ...this.props.style,
                        display: this.state.hidden ? 'none' : 'block'
                    }}
                    className={
                        'CustomFormField ColorFieldClassLabel' + (
                            this.props.className ?
                                ' ' + this.props.className : ''
                        )
                    }
                    id={this.props.id}
                    onClick={this.props.onClick}
                    onInput={this.props.onInput}
                    onPaste={this.props.onPaste}
                    onMouseMove={this.props.onMouseMove}
                    onMouseOut={this.props.onMouseOut}
                    onMouseDown={this.props.onMouseDown}
                    onMouseUp={this.props.onMouseUp}
                    hidden={this.props.hidden}
                    role={this.props.role}
                >
                    <input
                        type={'color'}
                        defaultValue={this.hex}
                        placeholder={this.props.placeholder}
                        onChange={this.onColorChange}
                        hidden={this.state.hidden}
                        className={'colorPalette'}
                    />
                    <input
                        type={'range'}
                        defaultValue={this.state.color.a * 100}
                        placeholder={this.props.placeholder}
                        onChange={this.onAlphaChange}
                    />
                    <input
                        name={`${this.props.name ?
                            this.props.name : ''
                        }_color`}
                        value={this.rgba} readOnly={true}
                        hidden={true}
                    />
                </fieldset>
            </div>
        )
    }
}

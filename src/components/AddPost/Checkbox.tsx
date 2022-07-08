import React from "react";
import styled from 'styled-components'

type CheckboxProps = {
    label: string,
    setter: Function,
    init: boolean
}

type CheckboxState = {
    checked: boolean,
    label: string,
    mouseEntered: boolean
}

const Container = styled.div`
    display: flex;
    flex: 1 1;
    width: 50px;
    height: 50px;
    font-size: 11px;
`

const CheckBox = styled.div`
`
const Label = styled.span`
    padding-left: 5px;
    padding-top: 2px;
`

class Checkbox extends React.Component<CheckboxProps, CheckboxState> {
    constructor(props: any) {
        super(props);
        this.state = {
            checked: false,
            label: "",
            mouseEntered: false,
        }
    }

    componentDidMount() {
        if (this.props.init) {
            this.setState({
                label: this.props.label,
                checked: true,
            })
        }
        else {
            this.setState({
                label: this.props.label,
                checked: false,
            })
        }
    }

    componentDidUpdate() {
    }

    static getDerivedStateFromProps(newProps: any, prevState: any) {
        return {
            checked: newProps.init,
        }
    }

    render() {

        const handleMouseEnter = (e: any) => {
            e.preventDefault();
            this.setState({
                mouseEntered: true
            })
        }

        const handleMouseLeave = (e: any) => {
            e.preventDefault();
            this.setState({
                mouseEntered: false
            })
        }
        return (
            <Container>
                <CheckBox 
                    style={{
                        height: '12px',
                        width: '12px',
                        border: '1px solid white',
                        backgroundColor: this.state.mouseEntered ? '#7d7d7d' : this.state.checked ? '#FFFFFF' : '#0B121C',
                    }} 
                    onClick={(e) => {
                        e.preventDefault();
                        this.setState({
                            checked: !this.state.checked,
                        })
                        this.props.setter()
                }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}></CheckBox>
                <Label>{this.state.label}</Label>
            </Container>
        )
    }
}

export default Checkbox;

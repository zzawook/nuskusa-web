import React from "react";
import styled from 'styled-components';
import { FirestoreComment } from '../../types/FirestoreComment'

type SecondaryProps= {
    data: FirestoreComment
}

type SecondaryState = {

}

class Secondary extends React.Component<SecondaryProps, SecondaryState> {
    constructor(props: SecondaryProps) {
        super(props);
        this.state = {
            commentEntered: "",
            commentArray: [],
        }
    }

    componentDidMount() {
        console.log(this.props.data);
    }

    render() {

        return (
            <div />
        )
    }
}

export default Secondary;
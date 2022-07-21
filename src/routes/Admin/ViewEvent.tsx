import React from 'react';
import styled from 'styled-components'
import Navbar from '../../components/Admin/Navbar';
import { FirebaseUser } from '../../types/FirebaseUser';
import { dbService } from '../../utils/firebaseFunctions';

const Wrapper = styled.div`
    
`
const Container = styled.div`
    
`
const RowContainer = styled.div`

`

type ViewEventState = {
    rows: any[],
}

type ViewEventProps = {
    firebaseUserData: FirebaseUser,
}

class ViewEvent extends React.Component<ViewEventProps, ViewEventState> {
    constructor(props: ViewEventProps) {
        super(props);
        this.state = {
            rows: [],
        }
    }

    componentDidMount() {
        const urls = window.location.href.split("/")
        const rows: any[] = [];
        dbService.collection("event").doc(urls[urls.length - 1]).collection("registrations").get().then(docs => {
            docs.forEach(registration => {
                const data = registration.data();
                const response = data.responseData
                const user = data.userData
                const userKeys = Object.keys(user)
                const responseKeys = Object.keys(response)
                const finalData = {} as any;
                for (let i = 0; i < userKeys.length; i++) {
                    finalData[userKeys[i]] = user[userKeys[i]];
                }
                for (let i = 0; i < responseKeys.length; i++) {
                    finalData[responseKeys[i]] = response[responseKeys[i]];
                }
                rows.push(finalData)
            })
            this.setState({
                rows: rows
            })
        })
    }

    render = () => {

        return (
            <Wrapper>
                <Navbar firebaseUserData={this.props.firebaseUserData}/>
                <Container>

                </Container>
            </Wrapper>
        )
    }
}

export default ViewEvent;
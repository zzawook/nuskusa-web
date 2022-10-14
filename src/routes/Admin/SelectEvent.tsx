import React from 'react';
import styled from 'styled-components'
import Navbar from '../../components/Admin/Navbar';
import { User } from '../../types/User';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const Container = styled.div`
    display: flex;
    flex-direction: column;
`
const EventContainer = styled.div`
    margin-top: 1px;
    height: 100px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const EventData = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 70%;
    height: 100%;
    border: 1px solid white;
    cursor: pointer;
    :hover {
        background-color: white;
        color: black;
    }
`
const EventTitle = styled.span`
    padding: 10px;
`

type SelectEventProps = {
    userData: User
}

type SelectEventState = {
    events: any[],
}

class SelectEvent extends React.Component<SelectEventProps, SelectEventState> {
    constructor(props: SelectEventProps) {
        super(props);
        this.state = {
            events: [],
        }
    }

    async componentDidMount() {
        const eventArray: any[] = [];
        const url = process.env.REACT_APP_HOST + '/api/event/getEvents'

        const response = await fetch(url);

        if (response.status == 200) {
            const eventData = await response.json();
            this.setState({
                events: eventData
            })
        }
    }

    render = () => {


        return (
            <Wrapper>
                <Navbar userData={this.props.userData} />
                <Container>
                    {this.state.events.map(eventData => {
                        return (
                            <EventContainer>
                                <EventData onClick={(event: any) => {
                                    event.preventDefault();
                                    window.location.href = "#/admin/event/" + eventData.id
                                }}>
                                    <EventTitle >
                                        {eventData.title}
                                    </EventTitle>
                                </EventData>
                            </EventContainer>
                        )
                    })}
                </Container>
            </Wrapper>
        )
    }
}

export default SelectEvent
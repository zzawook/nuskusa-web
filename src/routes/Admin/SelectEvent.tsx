import React from 'react';
import styled from 'styled-components'
import Navbar from '../../components/Admin/Navbar';
import { dbService } from '../../utils/firebaseFunctions';
import { FirebaseUser } from '../../types/FirebaseUser';

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
    firebaseUserData: FirebaseUser
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

    componentDidMount() {
        const eventArray: any[] = [];
        dbService.collection("events").get().then(events => {
            events.forEach(event => {
                const data = event.data() as any;
                eventArray.push({
                    title: data.title,
                    id: event.id,
                });
            })
            this.setState({
                events: eventArray,
            })
        })
    }

    render = () => {


        return (
            <Wrapper>
                <Navbar firebaseUserData={this.props.firebaseUserData}/>
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
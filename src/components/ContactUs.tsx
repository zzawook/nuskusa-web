import React from 'react';
import styled from 'styled-components';
import { SectionDescription, SectionTitle, Title } from '../utils/ThemeText';

class ContactUs extends React.Component<{}, {}> {
    constructor(props: any) {
        super (props)
        this.state = {

        }
    }

    render = () => {
        const ContactUsWrapper = styled.div`
            display: flex;
            flex-direction: row;
            height: 75vh;
            padding: 5% 15%;
            background: #0B121C;
            order: 10;
            text-align: left;
            justify-content: left;
        `

        const ContactDetailsWrapper = styled.div`
            display: flex;
            flex-direction: column;
            margin: 0px auto;
        `

        const ContactBox = styled.div`
            display: flex;
            flex-direction: row;
            border: 1px solid white;
            width: 20vw;
            height: 10vh;
            align-items: center;
        `

        const SubmissionBox = styled.div`
            width: 35vw;
            height: 70vh;
            background: white;
        `

        return (
            <ContactUsWrapper>
                <ContactDetailsWrapper>
                    <SectionTitle color='white' style={{marginLeft: '0px'}}>Contact Us</SectionTitle>
                    <ContactBox>
                        <SectionDescription color='white'>Email<br/>nuskusa@gmail.com</SectionDescription>
                    </ContactBox>
                </ContactDetailsWrapper>
                <SubmissionBox></SubmissionBox>
            </ContactUsWrapper>
        )
    }
}

export default ContactUs;
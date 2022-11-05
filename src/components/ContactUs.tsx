import React from 'react';
import CSS from 'csstype';
import styled from 'styled-components'
import { FaWpforms } from "react-icons/fa";

const width = window.innerWidth;
const height = window.innerHeight;

const Container = styled.div`
    display: flex;
    order: 3;
    position: relative;
    width: 100vw;
    height: 900px;
    background-color: transparent;
    font-family: var(--font-family-roboto);
    flex-direction: column;
    justify-content: center;
    z-index: 10;
`

const ElementContainer = styled.div`
    display: flex;
    flex-direction: row;
`

const ContactUsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 30vw;
    flex-grow: 2;
    align-items: flex-end;
    margin-right: 40px;
`

const FormContainer = styled.div`
    width: 30vw;
    flex-grow: 3;
`

const Title = styled.span`
    position: relative;
    font-weight: bold;
    font-style: normal;
    font-size: 40px;
    line-height: 48px;
    color: white;
    margin-bottom: 40px;
    margin-left: 15vw;
`

const EmailBox = styled.div`
    position: relative;
    height: 120px;
    width: 30vw;
    border-width: 1px;
    border-color: white;
    border-style: solid;
    box-sizing: border-box;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
`

const AddressBox = styled.div`
    position: relative;
    height: 120px;
    width: 30vw;
    border-width: 1px;
    border-color: white;
    border-style: solid;
    box-sizing: border-box;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
`

const FeedbackBox = styled.div`
    position: relative;
    height: 120px;
    width: 30vw;
    border-width: 1px;
    border-color: white;
    border-style: solid;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
`

const ContactBox = styled.form`
    position: relative;
    height: 550px;
    width: 40vw;
    background-color: white;
`

const FeatureBox = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`

const FeatureTitle = styled.span`
    position: relative;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    color: #FFFFFF;
    margin-bottom: 10px;
    margin-left: 40px;
    margin-top: 20px;
`

const FeatureExplanation = styled.span`
    position: relative;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    color: #FFFFFF;
    margin-left: 40px;
    margin-right: 10px;
    word-break: keep-all;
`

const NameInput = styled.input`
    position: relative;
    width: 30vw;
    height: 50px;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    margin-left: 5vw;
    margin-top: 20px;
    border-bottom: 1px solid rgba(11, 18, 28, 0.3);
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;
    color: rgba(11, 18, 28, 0.4);
`

const EmailInput = styled.input`
    position: relative;
    width: 30vw;
    height: 50px;
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    margin-left: 5vw;
    margin-top: 20px;
    margin-bottom: 40px;
    border-bottom: 1px solid rgba(11, 18, 28, 0.3);
    border-top: none;
    border-left: none;
    border-right: none;
    outline: none;
    color: rgba(11, 18, 28, 0.4);
`

const Message = styled.span`
    position: relative;
    color: rgba(11, 18, 28, 0.4);
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    margin-left: 5vw;
`

const MessageInput = styled.input`
    position: relative;
    width: 30vw;
    height: 200px;
    border: 1px solid rgba(11, 18, 28, 0.4);
    box-sizing: border-box;
    resize: none;
    padding: 10px;
    font-size: 12px;
    margin-left: 5vw;
    margin-top: 10px;
    outline: none;
`

const Submit = styled.button`
    position: relative;
    width: 30vw;
    height: 60px;
    background: #BDA06D;
    border: none;
    color: white;
    font-size: 22px;
    font-weight: 600;
    margin-left: 5vw;
    margin-top: 10px;
`

type ContactProps = {
    setLoading: Function,
    unsetLoading: Function,
}

type ContactStates = {
    nameInput: string,
    emailInput: string,
    messageInput: string,
}

class ContactUs extends React.Component<ContactProps, ContactStates> {
    state: ContactStates = {
        nameInput: 'Name',
        emailInput: 'Email',
        messageInput: "",
    }

    handleFormSubmit = async (event: any) => {
        event.preventDefault();

        const { nameInput, emailInput, messageInput } = this.state;
        const name = nameInput.trim()
        const email = emailInput.trim()
        const message = messageInput.trim()

        //Simple Validation
        if (name === 'Name' || "") {
            alert("이름을 입력해주세요")
            return;
        }
        if (email === 'Email' || !email.includes("@") || !email.includes(".")) {
            alert("유효한 이메일 주소를 입력해주세요")
            return;
        }

        this.props.setLoading()
        
        const url = process.env.REACT_APP_HOST + "/api/contactus"
        const body = {
            email: email,
            name: name,
            message: message
        }
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status == 200) {
            alert("Thanks for contacting us. Your message has been successfully delivered. \n \n 메시지가 전달되었습니다. 감사합니다.")
            this.setState({
                nameInput: 'Name',
                emailInput: 'Email',
                messageInput: '',
            })
            this.props.unsetLoading()
        }
        else {
            const text = await response.text()
            alert("Message couldn't be delivered for the following error. \n\n 메세지가 전달되지 못했습니다. \n\n" + text)
            this.setState({
                nameInput: 'Name',
                emailInput: 'Email',
                messageInput: '',
            })
            this.props.unsetLoading()
        }
    }
    handleNameChange = (event: any) => {
        event.preventDefault();
        const target = event.target;
        this.setState({
            nameInput: target.value,
        })
    }
    handleEmailChange = (event: any) => {
        event.preventDefault();
        const target = event.target;
        this.setState({
            emailInput: target.value
        })
    }
    handleMessageChange = (event: any) => {
        event.preventDefault();
        const target = event.target;
        this.setState({
            messageInput: target.value
        })
    }

    //Input Focus Handlers
    handleNameFocus = (event: any) => {
        event.preventDefault();
        const target = event.target;
        if (this.state.nameInput === 'Name') {
            this.setState({
                nameInput: ""
            })
        }
    }
    handleEmailFocus = (event: any) => {
        event.preventDefault();
        const target = event.target;
        if (this.state.emailInput === 'Email') {
            this.setState({
                emailInput: ''
            })
        }
    }

    //Input Blur Handlers
    handleNameBlur = (event: any) => {
        event.preventDefault();
        const target = event.target;
        if (this.state.nameInput == "") {
            this.setState({
                nameInput: 'Name'
            })
        }
    }
    handleEmailBlur = (event: any) => {
        event.preventDefault();
        const target = event.target;
        if (this.state.nameInput == "") {
            this.setState({
                emailInput: 'Email'
            })
        }
    }

    imgStyle: CSS.Properties = {
        position: 'relative',
        height: '40px',
        width: '40px',
        top: '35px',
        left: '20px'
    }

    render = () => {
        return (
            <Container>
                <Title>Contact Us</Title>
                <ElementContainer>
                    <ContactUsContainer>
                        <EmailBox>
                            <img style={this.imgStyle} src="https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/source/contactus1.png" />
                            <FeatureBox>
                                <FeatureTitle>Email</FeatureTitle>
                                <FeatureExplanation>nuskusa@gmail.com</FeatureExplanation>
                            </FeatureBox>
                        </EmailBox>
                        <AddressBox>
                            <img style={this.imgStyle} src="https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/source/contactus2.png" />
                            <FeatureBox>
                                <FeatureTitle>Address</FeatureTitle>
                                <FeatureExplanation>21 Lower Kent Ridge Rd Singapore 119077</FeatureExplanation>
                            </FeatureBox>
                        </AddressBox>
                        <FeedbackBox onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSceF0yRWmNTdoPHmtN0w4z7MySsXvUHfzUdwkQhOyNO2mJn8A/viewform?usp=sf_link", "_blank")}>
                            <div style={this.imgStyle}><FaWpforms size={45}></FaWpforms></div>
                            <FeatureBox>
                                <FeatureTitle>Feedback</FeatureTitle>
                                <FeatureExplanation>웹사이트 관련 피드백을 자유롭게 들려주세요!</FeatureExplanation>
                            </FeatureBox>
                        </FeedbackBox>
                    </ContactUsContainer>
                    <FormContainer>
                        <ContactBox onSubmit={this.handleFormSubmit}>
                            <NameInput value={this.state.nameInput} onChange={this.handleNameChange} onFocus={this.handleNameFocus} onBlur={this.handleNameBlur} />
                            <EmailInput value={this.state.emailInput} onChange={this.handleEmailChange} onFocus={this.handleEmailFocus} onBlur={this.handleEmailBlur} />
                            <Message>Message</Message>
                            <MessageInput value={this.state.messageInput} onChange={this.handleMessageChange} />
                            <Submit onClick={this.handleFormSubmit}>Submit</Submit>
                        </ContactBox>
                    </FormContainer>
                </ElementContainer>
            </Container>

        )
    }
}


export default ContactUs;
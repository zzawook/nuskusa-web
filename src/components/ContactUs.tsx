import React from 'react';
import CSS from 'csstype';
import { authService, dbService } from '../utils/firebaseFunctions';
import { EventEmitter } from 'stream';
import styled from 'styled-components'
import { FaWpforms } from "react-icons/fa";
//const nodemailer = require('nodemailer')

type ContactStates = {
    nameInput: string,
    emailInput: string,
    messageInput: string,
}

const width = window.innerWidth;
const height = window.innerHeight;

const Container =  styled.div`
    display: flex;
    order: 3;
    position: relative;
    width: ${(width * 0.7)}px;
    height: 685px;
    left: 0px;
    background-color: transparent;
    font-family: var(--font-family-roboto);
`

class ContactUs extends React.Component {
    state: ContactStates = {
        nameInput: 'Name',
        emailInput: 'Email',
        messageInput: "",
    }

    handleFormSubmit = (event: any) => {
        event.preventDefault();

        const { nameInput, emailInput, messageInput } = this.state;
        const name = nameInput.trim()
        const email = emailInput.trim()
        const message = messageInput.trim()

        //Simple Validation
        if (name === 'Name' || "") {
            alert("Please enter your name")
            return;
        }
        if (email === 'Email' || !email.includes("@") || !email.includes(".")) {
            alert("Please enter valid email address")
            return;
        }

        //Create DateTime string to name the contact document
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        const dateString = hour + ":" + minute + ":" + second + ", " + month + "." + day + "." + year;
        const data = {
            Datetime: Date.now(),
            name: name,
            email: email,
            message: message,
        }
        //Add to DB
        const res = dbService.collection('contacts').doc(dateString).set(data);
        alert("Thanks for contacting us. Your message has been successfully delivered. \n \n 메시지가 전달되었습니다. 감사합니다.")
        this.setState({
            nameInput: 'Name',
            emailInput: 'Email',
            messageInput: '',
        })
        /*
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'kjaehyeok21@gmail.com',
              pass: 'airbusa380861'
            }
        });
          
        const mailOptions = {
            from: 'kjaehyeok21@gmail.com',
            to: 'e0893439@u.nus.edu',
            subject: 'NUS 한인회 웹사이트에서 Contact Us Form이 작성되었습니다.',
            text: 'Name: ' + name + "\n Email: " + email + "\n \n Message: " + message,
        };
          
        transporter.sendMail(mailOptions, function(error: string, info: any){
            if (error) {
                console.log("ANGKIMO")
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        */

    }
    //Input Change Handlers
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

    //Browser Size Short-cut
    width = window.innerWidth;
    height = window.innerHeight;

    //CSS Styles
    
    titleStyle: CSS.Properties = {
        position: "absolute",
        left: "0px",
        top: "10px",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "40px",
        lineHeight: "48px",
        color: 'white'
    }
    emailBoxStyle: CSS.Properties = {
        position: "absolute",
        left: "0px",
        top: "100px",
        height: '113px',
        width: (this.width * 0.25).toString() + 'px',
        border: '1px solid #FFFFFF',
        boxSizing: 'border-box'
    }
    addressBoxStyle: CSS.Properties = {
        position: "absolute",
        left: "0px",
        top: "240px",
        height: '136px',
        width: (this.width * 0.25).toString() + 'px',
        border: '1px solid #FFFFFF',
        boxSizing: 'border-box'
    }
    feedbackBoxStyle: CSS.Properties = {
        position: "absolute",
        left: "0px",
        top: "403px",
        height: '136px',
        width: (this.width * 0.25).toString() + 'px',
        border: '1px solid #FFFFFF',
        boxSizing: 'border-box'
    }
    contactBoxStyle: CSS.Properties = {
        position: 'absolute',
        right: '0px',
        top: '0px',
        height: '671px',
        width: (this.width * 0.4).toString() + 'px',
        backgroundColor: 'white',
    }
    nameInputStyle: CSS.Properties = {
        position: 'absolute',
        top: '60px',
        left: '80px',
        width: ((this.width * 0.4) - 160).toString() + 'px',
        height: '50px',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '20px',
        paddingLeft: '0px',
        borderBottom: '1px solid rgba(11, 18, 28, 0.3)',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        color: this.state.nameInput === "Name" ? 'rgba(11, 18, 28, 0.4)' : 'black'
    }
    emailInputStyle: CSS.Properties = {
        position: 'absolute',
        top: '170px',
        left: '80px',
        width: ((this.width * 0.4) - 160).toString() + 'px',
        height: '50px',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '20px',
        paddingLeft: '0px',
        borderBottom: '1px solid rgba(11, 18, 28, 0.3)',
        borderTop: 'none',
        borderLeft: 'none',
        borderRight: 'none',
        color: this.state.emailInput === "Email" ? 'rgba(11, 18, 28, 0.4)' : 'black'
    }
    messageTextStyle: CSS.Properties = {
        position: 'absolute',
        left: '80px',
        top: '280px',
        color: 'rgba(11, 18, 28, 0.4)',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '20px',
    }
    messageInputStyle: CSS.Properties = {
        position: 'absolute',
        left: '80px',
        top: '320px',
        width: ((this.width * 0.4) - 160).toString() + 'px',
        height: '200px',
        border: '1px solid rgba(11, 18, 28, 0.4)',
        boxSizing: 'border-box',
        resize: 'none',
        padding: '10px',
        fontSize: '12px',
    }
    submitStyle: CSS.Properties = {
        position: 'absolute',
        left: '80px',
        bottom: '60px',
        width: ((this.width * 0.4) - 160).toString() + 'px',
        height: '62.75px',
        background: '#BDA06D',
        border: 'none',
        color: 'white',
        fontSize: '22px',
        fontWeight: 600
    }
    emailSpanStyle: CSS.Properties = {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '18px',
        color: '#FFFFFF',
        position: 'absolute',
        lineHeight: '29px',
        left: '100px',
        top: '20px'
    }
    addressSpanStyle: CSS.Properties = {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '18px',
        color: '#FFFFFF',
        position: 'absolute',
        lineHeight: '29px',
        left: '100px',
        top: '30px'
    }
    feedbackSpanStyle: CSS.Properties = {
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '18px',
        color: '#FFFFFF',
        position: 'absolute',
        lineHeight: '29px',
        left: '100px',
        top: '30px'
    }
    img1Style: CSS.Properties = {
        position: 'absolute',
        left: '30px',
        top: '40px'
    }
    img2Style: CSS.Properties = {
        position: 'absolute',
        left: '30px',
        top: '50px'
    }
    surveyIconWrapper: CSS.Properties = {
        position: 'absolute',
        left: '30px',
        top: '50px'
    }

    render = () => {
        return (
            <Container>
                <span style={this.titleStyle}>Contact Us</span>
                <div style={this.emailBoxStyle}>
                    <img style={this.img1Style} src="https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fcontactus1.png?alt=media&token=ff7ace54-f07b-4435-bf59-0ee845f147cf" />
                    <span style={this.emailSpanStyle}>Email<br />nuskusa@gmail.com</span>
                </div>
                <div style={this.addressBoxStyle}>
                    <img style={this.img2Style} src="https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fcontactus2.png?alt=media&token=093e63b1-8970-42e5-91e9-2e1d24b6e17b" />
                    <span style={this.addressSpanStyle}>Address<br />21 Lower Kent Ridge<br />Rd Singapore 119077</span>
                </div>
                <div style={this.feedbackBoxStyle} onClick={() => window.open("https://docs.google.com/forms/d/e/1FAIpQLSceF0yRWmNTdoPHmtN0w4z7MySsXvUHfzUdwkQhOyNO2mJn8A/viewform?usp=sf_link", "_blank")}>
                    <div style={this.surveyIconWrapper}><FaWpforms size={45}></FaWpforms></div>
                    <span style={this.feedbackSpanStyle}>Feedback<br />웹사이트 관련 피드백을 자유롭게 <br />들려주세요!</span>
                </div>
                <form style={this.contactBoxStyle} onSubmit={this.handleFormSubmit}>
                    <input style={this.nameInputStyle} value={this.state.nameInput} onChange={this.handleNameChange} onFocus={this.handleNameFocus} onBlur={this.handleNameBlur} />
                    <input style={this.emailInputStyle} value={this.state.emailInput} onChange={this.handleEmailChange} onFocus={this.handleEmailFocus} onBlur={this.handleEmailBlur} />
                    <span style={this.messageTextStyle}>Message</span>
                    <textarea style={this.messageInputStyle} value={this.state.messageInput} onChange={this.handleMessageChange} />
                    <button style={this.submitStyle} onClick={this.handleFormSubmit}>Submit</button>
                </form>
            </Container>

        )
    }
}


export default ContactUs;
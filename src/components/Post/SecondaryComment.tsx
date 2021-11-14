import React from "react";
import styled from 'styled-components';
import { FirestoreComment } from '../../types/FirestoreComment'

type SecondaryProps= {
    data: any
}

type SecondaryState = {
    secondary: any[],
    commentEntered: string,
    commentArray: string[],
    lastModified: number,
    replyOpen: boolean,
    reply: string,
}
const Container = styled.div`
    position: relative;
    top: 20px;
    width: ${(window.innerWidth * 0.4) - 20}px;
    background-color: transparent;
    color: white;
    font-size: 13px;
    font-weight: 800;
    line-height: 17px;
    margin-bottom: 80px;
`
const LeftBar = styled.div`
    position: absolute;
    top: 0px;
    left: 90px;
    height: 100%;
    padding-bottom: 10px;
    width: 0px;
    border: none;
    border-left: 1px solid #a8a8a8;
`
const ProfileImg = styled.img`
    width: 20px;
    height: 20px;
    padding: 10px;
    border-radius: 25px;
    border: 1px solid white;
    background-color: #0B121C;
    position: absolute;
    left: 105px;
    top: 0px;
`
const LastModified = styled.span`
    position: relative;
    left: 160px;
    top: 0px;
    font-weight: 700;
    font-size: 14px;
    line-height: 24.4px;
    color: #a8a8a8;
`
const Content = styled.div`
    position: relative;
    left: 160px;
`
const Like = styled.img`
    position: relative;
    left: 160px;
    top: 15px;
`
const LikeNum = styled.span`
    position: relative;
    left: 170px;
    top: 12px;
    font-weight: 700;
    font-size: 14px;
`
const ReplyButton = styled.button`
    &:hover {
        color: white;
    }

    position: relative;
    left: 198px;
    top: 10px;
    font-weight: 700;
    font-size: 14px;
    line-height: 24.4px;
    border: none;
    background-color: transparent;
    color: #a8a8a8;
`
const Form = styled.form`
    position: relative;
    top: 20px;
    left: 160px;
    margin-bottom: 10px;
`
const Input = styled.textarea`
    width: ${(window.innerWidth * 0.4) - 50}px;
    height: 70px;
    padding: 10px;
    background-color: #0B121C;
    border: 1px solid #9c9c9c;
    color: white;
    font-weight: bold;
    font-size: 14px;
    font-family: var(--font-family-roboto);
    resize: none;
`
const Cancel = styled.button`
    :hover {
        color: white;
    }

    position: relative;
    right: 0px;
    margin-top: 10px;
    width: 100px;
    height: 35px;
    background-color: transparent;
    border: none;
    color: #858585;
    font-weight: bold;
    font-size: 16px;
    right: 0px;
`
const Submit = styled.button`
    :hover {
        border: 1px solid white;
    }

    position: relative;
    right: 0px;
    margin-top: 10px;
    width: 100px;
    height: 35px;
    background-color: #BDA06D;
    border: none;
    color: white;
    font-weight: bold;
    font-size: 16px;
`

class Secondary extends React.Component<SecondaryProps, SecondaryState> {
    constructor(props: SecondaryProps) {
        super(props);
        this.state = {
            commentEntered: "",
            commentArray: [],
            secondary: [],
            lastModified: 0,
            replyOpen: false,
            reply: ""
        }
    }

    componentDidMount() {
        this.fetchComment();
    }

    fetchComment() {
        if (this.props.data.replies) {
            const replyArray: FirestoreComment[] = [];
            for (let i = 0; i < this.props.data.replies.length; i = i + 1) {
                console.log(this.props.data.replies[i])
                this.props.data.replies[i].onSnapshot((querySnapshot: any) => {
                    if (querySnapshot.exists) {
                        let data = querySnapshot.data() as FirestoreComment;
                        replyArray.push(data);
                        this.setState({
                            secondary: replyArray,
                        })
                    }
                })
            }
        }
        this.setState({
            lastModified: this.props.data.lastModified + (2.88 * Math.pow(10, 7))
        })
    }

    getLastUpdated = (time: any) => {
        const timeFromNow = (Date.now() - (time.seconds * 1000)) / 1000;
        const minutesFromNow = Math.floor(timeFromNow / 60)
        const hoursFromNow = Math.floor(timeFromNow / (60 * 60))
        if (hoursFromNow >= 1 && hoursFromNow < 24) {
            return hoursFromNow.toString() + " hours ago"
        }
        else if (minutesFromNow >= 1 && minutesFromNow < 60) {
            return minutesFromNow.toString() + " minutes ago"
        }
        else if (minutesFromNow <= 1) {
            return 'Just now'
        }
        else {
            return this.monthToString(time.toDate().getMonth()) + " " + time.toDate().getDate().toString() + " " + time.toDate().getFullYear().toString();
        }
    }

    monthToString = (month: number) => {
        if (month == 1) {
            return "January";
        }
        else if (month === 2) {
            return "February";
        }
        else if (month === 3) {
            return "March";
        }
        else if (month === 4) {
            return "April";
        }
        else if (month === 5) {
            return "May";
        }
        else if (month === 6) {
            return "June"
        }
        else if (month === 7) {
            return 'July'
        }
        else if (month === 8) {
            return 'August';
        }
        else if (month === 9) {
            return 'September'
        }
        else if (month === 10) {
            return 'October'
        }
        else if (month === 11) {
            return 'November'
        }
        else if (month === 12) {
            return "December"
        }
        else {
            return 'Invalid Month'
        }
    }

    render() {
        const handleReplyClick = (e: any) => {
            e.preventDefault();
            this.setState({
                replyOpen: !this.state.replyOpen,
            })
        }
        const handleCancelClick = (e: any) => {
            e.preventDefault()
            this.setState({
                reply: "",
                replyOpen: false,
            })
        }
        const handleInputChange = (e: any) => {
            e.preventDefault();
            this.setState({
                reply: e.target.value,
            })
        }
        const handleSubmitClick = (e: any) => {
            e.preventDefault();
            
        }

        return (
            <Container>
                <LeftBar />
                <ProfileImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fprofile_default.png?alt=media&token=61ab872f-8f29-4d50-b22e-9342e0581fb5'}/>
                <LastModified>{this.getLastUpdated(this.props.data.lastModified)}</LastModified>
                <Content>{this.props.data.content}</Content>
                <Like src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Flike.png?alt=media&token=fab6ba94-6f21-46db-bec3-6a754fb7eedb'} />
                <LikeNum>{this.props.data.likes.length}</LikeNum>
                <ReplyButton onClick={handleReplyClick}>Reply</ReplyButton>
                {this.state.replyOpen ? <Form>
                    <Input placeholder={'Reply...'} onChange={handleInputChange} value={this.state.commentEntered}/>
                    <Cancel onClick={handleCancelClick}>Cancel</Cancel>
                    <Submit onClick={handleSubmitClick}>Post</Submit>
                </Form> : <div />}
                {this.state.secondary.map(element => <Secondary data={element} />)}
            </Container>
        )
    }
}

export default Secondary;
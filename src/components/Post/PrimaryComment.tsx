import React from "react";
import styled from 'styled-components';
import Secondary from './SecondaryComment';
import { FirestoreComment } from '../../types/FirestoreComment'

type PrimaryProps = {
    data: any,
}

type PrimaryState = {
    commentEntered: string,
    commentArray: [],
    profileImg: string,
    lastModified: Date,
    secondaryOpen: boolean,
    secondary: any[],
}

const PrimaryComment = styled.div`
    position: relative;
    margin-top: 20px;
    margin-bottom: 45px;
`
const CommentArrow = styled.img`

`
const ProfileImg = styled.img`
    width: 20px;
    height: 20px;
    padding: 10px;
    border-radius: 25px;
    border: 1px solid white;
    background-color: #0B121C;
    position: absolute;
    left: 30px;
    top: -10px;
`
const LastModified = styled.span`
    position: relative;
    left: 73px;
    top: -10px;
    font-weight: 700;
    font-size: 14px;
    line-height: 24.4px;
    color: #a8a8a8;
`
const Content = styled.p`
    position: relative;
    left: 90px;
    top: -20px;
    font-size: 13px;
    font-weight: 800;
    line-height: 17px;
    width: 90%;
`
const Like = styled.img`
    position: relative;
    left: 90px;
    top: -15px;
`
const LikeNum = styled.span`
    position: relative;
    left: 98px;
    top: -20px;
    font-weight: 700;
    font-size: 14px;
`
const ReplyButton = styled.button`
    &: hover {
        color: white;
    }

    position: relative;
    left: 118px;
    top: -20px;
    font-weight: 700;
    font-size: 14px;
    line-height: 24.4px;
    border: none;
    background-color: transparent;
    color: #a8a8a8;
`

const data = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
}

class Primary extends React.Component<PrimaryProps, PrimaryState> {
    constructor(props: PrimaryProps) {
        super(props);
        this.state = {
            commentEntered: "",
            commentArray: [],
            lastModified: new Date(),
            secondaryOpen: false,
            secondary: [],
            profileImg: 'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fprofile_default.png?alt=media&token=61ab872f-8f29-4d50-b22e-9342e0581fb5',
        }
    }

    componentDidMount() {
        if (this.props.data.replies) {
            const replyArray: FirestoreComment[] = [];
            for (let i = 0; i < this.props.data.replies.length; i = i + 1) {
                this.props.data.replies[i].onSnapshot((querySnapshot: any) => {
                    if (querySnapshot.exists) {
                        let data = querySnapshot.data() as FirestoreComment;
                        replyArray.push(data)
                    }
                })
            }
            this.setState({
                secondary: replyArray,
            })
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
                secondaryOpen: true,
            })
        }
        const handleLikeClick = (e: any) => {
            e.preventDefault();
        }
        return (
            <PrimaryComment>
                <CommentArrow src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FcommentArrow.png?alt=media&token=e484a87e-cff6-4111-b36c-e82cedbe2584'} />
                <ProfileImg src={this.state.profileImg} />
                <LastModified>
                    {this.getLastUpdated(this.props.data.lastModified)}
                </LastModified>
                <Content>{this.props.data.content}</Content>
                <Like onClick={handleLikeClick} src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Flike.png?alt=media&token=fab6ba94-6f21-46db-bec3-6a754fb7eedb'}/>
                <LikeNum>{this.props.data.likes.length}</LikeNum>
                <ReplyButton onClick={handleReplyClick}>Reply</ReplyButton>
                {this.state.secondaryOpen ? this.state.secondary.map(element => <Secondary data={element} />) : <div />}
            </PrimaryComment>
        )
    }
}

export default Primary;
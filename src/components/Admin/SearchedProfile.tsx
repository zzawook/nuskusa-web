import React from 'react';
import styled from 'styled-components'
import { User } from '../../types/User';

const Wrapper = styled.div`
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 20px;
    border: 1px solid white;
`
const Name = styled.div`
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 18px;
    color: white;
    font-weight: bold;
`
const UserId = styled.div`
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 18px;
    color: white;
`
const Gender = styled.div`
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 18px;
    color: white;
`
const YearOfBirth = styled.div`
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 18px;
    color: white;
`
const Email = styled.div`
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 18px;
    color: white;
`
const Role = styled.div`
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 18px;
    color: white;
`
const Verified = styled.div`
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 18px;
    color: white;
`
const EnrolledYear = styled.div`
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 18px;
    color: white;
`
const Major = styled.div`
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 18px;
    color: white;
`
const KakaoTalkId = styled.div`
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 18px;
    color: white;
`
const ResendEmailVerification = styled.span`
    color: yellow;
    font-weight: 800;
    cursor: pointer;
    :hover {
        text-decoration: underline
    }
`

type SearchedProfileProps = {
    userData: User,
    name: string,
    gender: string,
    yearOfBirth: string,
    email: string,
    role: string,
    verified: boolean,
    enrolledYear: string,
    major: string,
    kakaoTalkId: string,
    setLoading: Function,
    unsetLoading: Function,
}

type SearchedProfileState = {
    users: User[],
    searched: boolean,
    searchedName: string,
    searchedProfiles: any[]
}

class SearchedProfile extends React.Component<SearchedProfileProps, SearchedProfileState> {
    constructor(props: SearchedProfileProps) {
        super(props);
        this.state = {
            users: [],
            searched: false,
            searchedName: '',
            searchedProfiles: []
        }
    }

    handleSendEmailVeriication = async (event: any) => {
        if (window.confirm(this.props.name + "님에게 인증이메일을 다시 보내시겠습니까?")) {
            this.props.setLoading()
            const url = process.env.REACT_APP_HOST + "/api/auth/sendVerificationEmail/" + this.props.email
            const response = await fetch(url, {
                method: "GET",
            })
            if (response.status == 200) {
                window.alert("인증 이메일을 재전송 했습니다.")
                this.props.unsetLoading()
            }
            else {
                window.alert("인증 이메일 전송에 실패했습니다.")
                this.props.unsetLoading()
            }
        }
    }

    render = () => {
        return (
            <Wrapper>
                <Name>Name: {this.props.name}</Name>
                <Gender>Gender: {this.props.gender}</Gender>
                <YearOfBirth>Year of birth: {this.props.yearOfBirth}</YearOfBirth>
                <Email>Email: {this.props.email}</Email>
                <Role>Role: {this.props.role}</Role>
                <Verified>verified: {this.props.verified.toString()}</Verified>
                <EnrolledYear>Enrolled Year: {this.props.enrolledYear}</EnrolledYear>
                <Major>Major: {this.props.major}</Major>
                <KakaoTalkId>KakaoTalk ID: {this.props.kakaoTalkId}</KakaoTalkId>
                <ResendEmailVerification onClick={this.handleSendEmailVeriication}>인증 이메일 재전송</ResendEmailVerification>
            </Wrapper>
        )
    }
}

export default SearchedProfile;
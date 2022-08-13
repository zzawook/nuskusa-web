import React from 'react';
import styled from 'styled-components'
import { User } from '../../types/User';
import { authService } from '../../utils/firebaseFunctions';

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
    userId: string,
    gender: string,
    yearOfBirth: string,
    email: string,
    role: string,
    verified: boolean,
    enrolledYear: string,
    major: string,
    kakaoTalkId: string,
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

    handleSendEmailVeriication = (event: any) => {
        if (window.confirm(this.props.name + "님에게 인증이메일을 다시 보내시겠습니까?")) {
            const userPassword = prompt(this.props.name + "님의 비밀번호를 입력해주세요")
            const adminPassword = prompt("현재 어드민 계정의 비밀번호를 입력해주세요")

            if (userPassword && adminPassword) {
                authService.signOut().then(() => {
                    authService.signInWithEmailAndPassword(this.props.email, userPassword).then(() => {
                        authService.currentUser?.sendEmailVerification().then(() => {
                            authService.signOut().then(() => {
                                authService.signInWithEmailAndPassword(this.props.userData.email, adminPassword).then(() => {
                                    window.alert("인증 이메일을 성공적으로 보냈습니다.")
                                }).catch(err => {
                                    window.alert("어드민 계정 재로그인 중 문제가 발생했습니다. " + err.message)
                                })
                            }).catch(err => {
                                window.alert("유저 계정 로그아웃 도중 문제가 발생했습니다. " + err.message)
                            });
                        }).catch(err => {
                            window.alert("인증 이메일을 보내는 도중 문제가 발생했습니다. " + err.message)
                        })
                    }).catch(err => {
                        window.alert("유저 계정으로 로그인 중 문제가 발생했습니다. " + err.message)
                    })
                }).catch(err => {
                    window.alert("어드민 계정 로그아웃 중 문제가 발생했습니다. " + err.message)
                });
            }
            else {
                window.alert("모든 값을 입력하지 않았습니다. 다시 모든 항목을 입력해주세요.")
            }
        }
        return;
    }

    render = () => {
        return (
            <Wrapper>
                <Name>Name: {this.props.name}</Name>
                <UserId>UserId: {this.props.userId}</UserId>
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
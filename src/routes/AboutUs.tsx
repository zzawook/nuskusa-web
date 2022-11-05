import React from 'react';
import Navbar from '../components/Navbar';
import { User } from '../types/User';
import styled from 'styled-components';
import Profile from '../components/AboutUs/Profile';

type AboutUsProps = {
    userData: User
}

type AboutUsState = {

}

const Container = styled.div`
    font-family: var(--font-family-roboto);
`
const Intro = styled.div`
    position: relative;
    width: 70%;
    left: 15%;
    top: 10%;
`
const MemberContainer = styled.div`
    position: absolute;
    width: 100%;
    background-color: #18202B;
    top: 800px;
`
const Member = styled.div`
    position: relative;
    width: 70%;
    left: 15%;
    height: 2900px;
    z-index: 10;
`
const GroupPhotoContainer = styled.div`
    position: absolute;    
    top: 160px;    
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const GroupPhoto = styled.img`
    max-height: 500px;
`
const HR = styled.div`
    position: absolute;
    left: 15%;
    height: 2750px;
    width: 1px;
    border-left: 1px solid #BDA06D;
    z-index: 11;
    top: 150px;
`
const ExecHead = styled.div`
    position: absolute;
    left: -10px;
    top: 150px;
    width: 20px;
    height: 20px;
    background-color: #BDA06D;
`
const WhoAreWe = styled.span`
    position: absolute;
    left: 0%;
    top: 15px;
    font-size: 22px;
    font-weight: 700;
    color: #d6d6d6;
`
const Title = styled.span` 
    position: absolute;
    left: 0%;
    top: 40px;
    font-size: 40px;
    font-weight: 800;
`
const ExecImages = styled.div` 
    display: flex;
    flex-direction: row;
    position: absolute;
    top: 180px;
    left: 20%;
`
const ImageBreak = styled.div`
    width: 23%;
`
const Explanation = styled.span`
    position: absolute;
    left: 0%;
    top: 100px;
    font-size: 13px;
    font-weight: 800;
    color: #b5b5b5;
`
const Introducing = styled.span`
    position: absolute;
    left: 0px;
    top: 20px;
    font-size: 22px;
    font-weight: 700;
    color: #b5b5b5;
`
const Snap = styled.span`
    position: absolute;
    left: 0px;
    top: 50px;
    font-size: 40px;
    font-weight: 800;
`
const ExecImg = styled.img`
    width: 30%; 
    height: 30%;
`
const SAHead = styled.div`
    position: absolute;
    left: -10px;
    top: 755px;
    width: 20px;
    height: 20px;
    background-color: #BDA06D;
`
const FinanceHead = styled.div`
    position: absolute;
    left: -10px;
    top: 1397px;
    width: 20px;
    height: 20px;
    background-color: #BDA06D;
`
const FinanceImg = styled.img`
    width: 30%;
`
const FinanceImages = styled.div`
    position: absolute;
    top: 850px;
    left: 20%;
    display: flex;
    flex-direction: row;
`
const ITHead = styled.div`
    position: absolute;
    left: -10px;
    top: 1997px;
    width: 20px;
    height: 20px;
    background-color: #BDA06D;
`
const ITImg = styled.img`
    width: 30%;
    height: 30%;
`
const ITImages = styled.div`
    position: absolute;
    top: 1450px;
    left: 15%;
    display: flex;
    flex-direction: row;
`
const PRImg = styled.img`
    width: 30%;
`
const PRImages = styled.div`
    position: absolute;
    top: 2100px;
    left: 15%;
    display: flex;
    flex-direction: row;
`
class AboutUs extends React.Component<AboutUsProps, AboutUsState> {
    constructor(props: any) {
        super(props);
        this.state = {
        }
    }

    render = () => {

        return (
            <Container>
                <Navbar userData={this.props.userData} />
                <Intro>
                    <WhoAreWe>Who are we?</WhoAreWe>
                    <Title>한인회 소개</Title>
                    <Explanation>NUS 한인 학생회 사이트에 오신 것을 환영합니다. 저희는 한인임원들로 구성되어 각종 정보 공유와 친목 다짐, 그리고 여러가지 이벤트 진행을 합니다.</Explanation>
                    <GroupPhotoContainer>
                        <GroupPhoto src={'https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/source/logo.png'} alt={'group photo'} />
                    </GroupPhotoContainer>

                </Intro>
                <MemberContainer>
                    <HR />
                    <Member>
                        <Introducing>Introducing</Introducing>
                        <Snap>한인회 멤버</Snap>
                        <ExecHead />
                        <ExecImages>
                            <ExecImg src={'https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/images/%EA%B0%95%EC%A4%80%ED%98%81.jpg'}></ExecImg>
                            <ImageBreak />
                            <ExecImg src={'https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/images/%EC%9C%A0%EB%8B%A4%ED%98%84.jpg'}></ExecImg>
                        </ExecImages>
                        <Profile top={390} bottom={-1} right={-1} left={50} name={'강준혁'} role={'학부생회장'} />
                        <Profile top={190} bottom={-1} right={0} left={-1} name={'유다현'} role={'Events'} />
                        <SAHead />
                        <FinanceHead />
                        <FinanceImages>
                            <FinanceImg src={'https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/images/%ED%95%98%EC%95%84%EC%97%B0.jpeg'} />
                            <ImageBreak />
                            <FinanceImg src={'https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/images/%EA%B6%8C%EB%91%90%ED%98%84.jpeg'} />
                        </FinanceImages>
                        <Profile top={900} bottom={-1} right={-1} left={50} name={'하아연'} role={'Sponsor & Alumni Relations'} />
                        <Profile top={1000} bottom={-1} right={-20} left={-1} name={'권두현'} role={'Sponsor & Alumni Relations'} />
                        <ITHead />
                        <ITImages>
                            <ITImg src={'https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/images/%EA%B9%80%EC%9E%AC%ED%98%81.jpg'} />
                            <ImageBreak />
                            <ITImg src={'https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/images/%EC%8B%A0%EC%A7%84.jpg'} />
                        </ITImages>
                        <Profile top={1700} bottom={-1} right={-1} left={35} name={'김재혁'} role={'Information Technology'} />
                        <Profile top={1500} bottom={-1} right={0} left={-1} name={'신진'} role={'Information Technology'} />
                        <PRImages>
                            <PRImg src={'https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/images/%EA%B3%A0%EC%84%A0%EB%AF%BC.jpg'} />
                            <ImageBreak />
                            <PRImg src={'https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/images/%EA%B0%95%EB%AF%BC%EA%B5%AC.png'} />
                        </PRImages>
                        <Profile top={2370} bottom={-1} right={-1} left={20} name={'고선민'} role={'Public Relations & Management'} />
                        <Profile top={2150} bottom={-1} right={0} left={-1} name={'강민구'} role={'Student Affairs'} />
                    </Member>
                </MemberContainer>
            </Container>
        )
    }
}


export default AboutUs;
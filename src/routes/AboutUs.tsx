import React from 'react';
import Navbar from '../components/Navbar';
import { FirebaseUser } from '../types/FirebaseUser';
import styled from 'styled-components';
import Profile from '../components/AboutUs/Profile';
import ContactUs from '../components/ContactUs'

type AboutUsProps = {
    firebaseUserData: FirebaseUser
}

type AboutUsState = {

}

const width = window.innerWidth;
const height = window.innerHeight;

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
    height: 3150px;
    z-index: 10;
`
const GroupPhoto = styled.img`
    position: absolute;
    min-width: ${width * 0.49}px;
    min-height: 200px;
    max-height: 500px;
    max-width: ${width * 0.7}px;
    top: 160px;
    left: ${((width * 0.7) - (width * 0.49)) / 2}px;
`
const HR = styled.div`
    position: absolute;
    left: 15%;
    height: 3000px;
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
const Exec = styled.span`
    position: absolute;
    top: 145px;
    left: 30px;
    font-weight: 800;
    font-size: 22px;
`
const ExecImg = styled.img`
    position: absolute;
    top: 180px;
    left: 15%;
    width: 70%;
`
const StudentAffairs = styled.div`
    position: absolute;
    top: 750px;
    left: 30px;
    font-weight: 800;
    font-size: 22px;
`
const SAHead = styled.div`
    position: absolute;
    left: -10px;
    top: 755px;
    width: 20px;
    height: 20px;
    background-color: #BDA06D;
`
const SAImg = styled.img`
    position: absolute;
    top: 815px;
    left: 15%;
    width: 70%;
`
const Finance = styled.div`
    position: absolute;
    top: 1390px;
    left: 30px;
    font-weight: 800;
    font-size: 22px;
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
    position: absolute;
    top: 1450px;
    left: 15%;
    width: 70%;
`
const IT = styled.div`
    position: absolute;
    top: 1990px;
    left: 30px;
    font-weight: 800;
    font-size: 22px;
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
    position: absolute;
    top: 2050px;
    left: 15%;
    width: 70%;
`
const PublicRelation = styled.div`
    position: absolute;
    top: 2640px;
    left: 30px;
    font-weight: 800;
    font-size: 22px;
`
const PRImg = styled.img`
    position: absolute;
    top: 2700px;
    left: 15%;
    width: 70%;
`
const PRHead = styled.div`
    position: absolute;
    left: -10px;
    top: 2647px;
    width: 20px;
    height: 20px;
    background-color: #BDA06D;
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
                <Navbar firebaseUserData={this.props.firebaseUserData} />   
                <Intro>
                    <WhoAreWe>Who are we?</WhoAreWe>
                    <Title>한인회 소개</Title>
                    <Explanation>NUS 한인 학생회 사이트에 오신 것을 환영합니다. 저희는 한인임원들로 구성되어 각종 정보 공유와 친목 다짐, 그리고 여러가지 이벤트 진행을 합니다.</Explanation>
                    <GroupPhoto src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fshutterstock_554314555_copy.jpg?alt=media&token=8a93d427-1b65-4947-ba14-42c5bb0b8e95'} alt={'group photo'} />

                </Intro>
                <MemberContainer>
                    <HR />
                    <Member>
                        <Introducing>Introducing</Introducing>
                        <Snap>한인회 멤버</Snap>
                        <ExecHead />
                        <Exec>임원진</Exec>
                        <ExecImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fshutterstock_554314555_copy.jpg?alt=media&token=8a93d427-1b65-4947-ba14-42c5bb0b8e95'}></ExecImg>
                        <Profile top={390} bottom={-1} right={-1} left={50} name={'박진아'} role={'학부생회장'}/>
                        <Profile top={190} bottom={-1} right={0} left={-1} name={'박수연'} role={'학부생부회장'}/>
                        <SAHead />
                        <StudentAffairs>Student Affairs</StudentAffairs>
                        <SAImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fshutterstock_554314555_copy.jpg?alt=media&token=8a93d427-1b65-4947-ba14-42c5bb0b8e95'}></SAImg>
                        <Profile top={850} bottom={-1} right={-1} left={50} name={'이소연'} role={'Student Affairs'}/>
                        <Profile top={999} bottom={-1} right={0} left={-1} name={'이새해'} role={'Student Affairs'}/>
                        <FinanceHead />
                        <Finance>Finance</Finance>
                        <FinanceImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fshutterstock_554314555_copy.jpg?alt=media&token=8a93d427-1b65-4947-ba14-42c5bb0b8e95'} />
                        <Profile top={1500} bottom={-1} right={-1} left={50} name={'하아연'} role={'Finance'}/>
                        <Profile top={1600} bottom={-1} right={0} left={-1} name={'권두현'} role={'Finance'}/>
                        <ITHead />
                        <IT>IT</IT>
                        <ITImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fshutterstock_554314555_copy.jpg?alt=media&token=8a93d427-1b65-4947-ba14-42c5bb0b8e95'} />
                        <Profile top={2200} bottom={-1} right={-1} left={50} name={'노영기'} role={'Information Technology'}/>
                        <Profile top={2100} bottom={-1} right={0} left={-1} name={'김재혁'} role={'Information Technology'}/>
                        <PublicRelation>Public Relation</PublicRelation>
                        <PRImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fshutterstock_554314555_copy.jpg?alt=media&token=8a93d427-1b65-4947-ba14-42c5bb0b8e95'} />
                        <PRHead />
                        <Profile top={2750} bottom={-1} right={-1} left={50} name={'유다현'} role={'Public Relations'}/>
                        <Profile top={2900} bottom={-1} right={0} left={-1} name={'강민구'} role={'Public Relations'}/>
                    </Member>    
                </MemberContainer>
            </Container>
        )
    }
}


export default AboutUs;
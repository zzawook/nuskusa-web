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
    height: 3500px;
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
    height: 3350px;
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
const Exec = styled.span`
    position: absolute;
    top: 145px;
    left: 30px;
    font-weight: 800;
    font-size: 22px;
`
const ExecImg = styled.img`
    width: 30%; 
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
    left: 20%;
    width: 25%;
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
    width: 30%;
`
const FinanceImages = styled.div`
    position: absolute;
    top: 1450px;
    left: 20%;
    display: flex;
    flex-direction: row;
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
    width: 30%;
`
const ITImages = styled.div`
    position: absolute;
    top: 2050px;
    left: 15%;
    display: flex;
    flex-direction: row;
`
const PublicRelation = styled.div`
    position: absolute;
    top: 2640px;
    left: 30px;
    font-weight: 800;
    font-size: 22px;
`
const PRImg = styled.img`
    width: 30%;
`
const PRImages = styled.div`
    position: absolute;
    top: 2700px;
    left: 15%;
    display: flex;
    flex-direction: row;
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
                    <GroupPhotoContainer>
                        <GroupPhoto src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Flogo.png?alt=media&token=b15f9322-a417-4037-98dc-180e89ef0970'} alt={'group photo'} />
                    </GroupPhotoContainer>

                </Intro>
                <MemberContainer>
                    <HR />
                    <Member>
                        <Introducing>Introducing</Introducing>
                        <Snap>한인회 멤버</Snap>
                        <ExecHead />
                        <Exec>임원진</Exec>
                        <ExecImages>
                            <ExecImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/images%2FIMG_4626.jpg?alt=media&token=afbfc168-154e-4dd4-b934-dd1434f7e9e2'}></ExecImg>
                            <ImageBreak />
                            <ExecImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/images%2FIMG_0521.JPG?alt=media&token=2f4adaec-080d-4c4d-85ba-3becc4a99d82'}></ExecImg>
                        </ExecImages>
                        <Profile top={390} bottom={-1} right={-1} left={50} name={'강준혁'} role={'학부생회장'}/>
                        <Profile top={190} bottom={-1} right={0} left={-1} name={'유다현'} role={'학부생부회장'}/>
                        <SAHead />
                        <StudentAffairs>Student Affairs</StudentAffairs>
                        <SAImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/images%2FIMG_0394.JPG?alt=media&token=695817b2-4d35-4c1f-ba4d-00872b31c2da'}></SAImg>
                        <Profile top={850} bottom={-1} right={-1} left={50} name={'이소연'} role={'Student Affairs'}/>
                        <FinanceHead />
                        <Finance>Finance</Finance>
                        <FinanceImages>
                            <FinanceImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/images%2FIMG_9916.JPG?alt=media&token=e4d3f7f7-c3a8-41a5-a182-b49fb93aa5c1'} />
                            <ImageBreak />
                            <FinanceImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/images%2FKakaoTalk_Photo_2022-02-18-22-20-17.jpeg?alt=media&token=9879e58a-e7c8-4705-aa65-0663648a13cb'} />
                        </FinanceImages>
                        <Profile top={1500} bottom={-1} right={-1} left={50} name={'하아연'} role={'Finance'}/>
                        <Profile top={1600} bottom={-1} right={0} left={-1} name={'권두현'} role={'Finance'}/>
                        <ITHead />
                        <IT>IT</IT>
                        <ITImages>
                            <ITImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FKakaoTalk_20220405_193229901.jpg?alt=media&token=28d17ec3-82d6-4d34-b639-a7eb17f29eac'} />
                            <ImageBreak />
                            <ITImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/images%2FKakaoTalk_20211010_113309252_02.jpg?alt=media&token=369cd448-a7d6-47c4-b03f-f32dde60a297'} />
                        </ITImages>
                        
                        <Profile top={2200} bottom={-1} right={-1} left={50} name={'김재혁'} role={'Information Technology'}/>
                        <Profile top={2100} bottom={-1} right={0} left={-1} name={'신진'} role={'Information Technology'}/>
                        <PublicRelation>Public Relation</PublicRelation>
                        <PRImages>
                            <PRImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FKakaoTalk_20220405_211536009.jpg?alt=media&token=155f3048-ed58-48c4-bcae-bf2f5d0eec0f'} />
                            <ImageBreak />
                            <PRImg src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/images%2FIMG_6633.png?alt=media&token=9c3f4487-4d2c-47b5-a00d-d22679b25550'} />     
                        </PRImages>
                        <PRHead />
                        <Profile top={2750} bottom={-1} right={-1} left={50} name={'고선민'} role={'Student Affairs'}/>
                        <Profile top={2900} bottom={-1} right={0} left={-1} name={'강민구'} role={'Student Affairs'}/>
                    </Member>    
                </MemberContainer>
            </Container>
        )
    }
}


export default AboutUs;
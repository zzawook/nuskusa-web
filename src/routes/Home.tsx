import React from 'react';
import { Link } from 'react-router-dom';
import { authService, dbService } from '../utils/firebaseFunctions';
import ContactUs from '../components/ContactUs'
import Post from './Post'
import styled from 'styled-components'
import ActivityList from '../components/ActivityList'
import Navbar from '../components/Navbar';
import { SectionDescription, Title } from '../utils/ThemeText';
import { GoldenButton } from '../components/GoldenButton';

type BoardObject = {
    title: string,
    description: string,
}


type HomeProps = {
    role: string
}

type HomeState = {

}

/**
 * Main page that the users will visit
 */
class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {

        }
    }

    render = () => {
        const Wrapper = styled.div`
            display: flex;
            flex-direction: column;
            background: #18202B;
        `

        const HomeBackground = styled.div`
            justify-content: center;
            display: flex;
            align-items: center;
            width: 100%;
            height: 90vh;
            background: linear-gradient(to bottom, #0B121C 55%, #18202B 35%);
            order: 1;
        `

        const MainBannerContainer = styled.div`
            display: flex;
            width: 70vw;
            height: 65vh;
            margin: auto;
            align-items: center;
        `
        const MainBanner = styled.div`
            display: flex;
            flex-direction: column;
            width: 60%;
            height: 25vh;
            background: white;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
            box-sizing: border-box;
            padding: 25px 50px;
        `
        const MainBannerImage = styled.img`
            height: auto;
            width: auto;
        `

        const Activity = styled.div`
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            bottom: 100%;
            height: 100vh;
            order: 2;
        `
        const ActivityWrapper = styled.section`
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            margin: 0 auto;
            width: 70%;
            justify-content: center;
        `

        return (
            <Wrapper>
                <Navbar />
                <HomeBackground>
                    <MainBannerContainer>
                        <MainBanner>
                            <p style={{ margin: '0', color: '#0B121C', opacity: '0.8', fontSize: '19px', fontWeight: 'bold' }}>
                                Welcome to
                            </p>
                            <Title color='#0B121C' style={{ marginTop: '5px', marginBottom: '5px' }}>NUS Korea Society</Title>
                            <p style={{ margin: '0', marginBottom: '20px', color: '#0B121C', opacity: '0.5', fontSize: '13px' }}>
                                NUS 한인 학생회 사이트에 오신 것을 환영합니다!
                            </p>
                            <GoldenButton to='/boards'>
                                <SectionDescription color='white' style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>
                                    + More Details
                                </SectionDescription>
                            </GoldenButton>
                        </MainBanner>
                    </MainBannerContainer>
                </HomeBackground>
                <Activity>
                    <Title color='#FFFFFF' style={{ marginLeft: '10px' }}>Our Activities</Title>
                    <ActivityWrapper>
                        <ActivityList title='교류활동' content='신환회, 개강/종강파티' />
                        <ActivityList title='이벤트' content='여러가지 이벤트!' />
                        <ActivityList title='취업활동 정보' content='인턴, 취업 관련한 웨비나' />
                    </ActivityWrapper>
                </Activity>
                <ContactUs />
            </Wrapper>
        )
    }
}

export default Home
import React from 'react';
import styled from 'styled-components'
import ActivityList from '../components/ActivityList'
import Navbar from '../components/Navbar';
import { Title } from '../utils/ThemeText';

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
            position: absolute;
            align-items: center;
        `
        const MainBanner = styled.div`
            width: 60%;
            height: 25vh;
            background: white;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
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
                            Welcome to
                            <Title color='#0B121C'>NUS Korea Society</Title>

                        </MainBanner>
                    </MainBannerContainer>
                </HomeBackground>
                <Activity>
                    <Title color='#FFFFFF' style={{marginLeft: '10px'}}>Our Activities</Title>
                    <ActivityWrapper>
                        <ActivityList />
                        <ActivityList />
                        <ActivityList />
                    </ActivityWrapper>
                </Activity>
            </Wrapper>
        )
    }
}

export default Home
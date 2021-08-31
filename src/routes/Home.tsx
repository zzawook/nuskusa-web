import React from 'react';
import './Home.css';
import styled from 'styled-components'
import ActivityList from '../components/ActivityList'
import Navbar from '../components/Navbar';
import { Title } from '../utils/themeComponents';

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
            display: block;
            height: 100%;
            width: 100%;
            background: #18202B;
        `
        const Activity = styled.div`
            margin: 0 auto;
            bottom: 100%;
            position: relative;
            height: auto;
            width: 60%;
        `
        const ActivityWrapper = styled.section`
            position: relative;
            margin: 0 auto;
            width: 70%;
            display: flex;
            justify-content: center;
        `

        const HomeBackground = styled.section`
            display: block;
            width: 100%;
            position: absolute;
            height: 100vh;
            background: #0B121C;
        `

        return (
            <Wrapper>
                <Navbar />
                <HomeBackground>

                </HomeBackground>
                <Activity>
                    <Title color='#FFFFFF'>Our Activities</Title>
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
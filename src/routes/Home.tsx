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
            width: 100%;
            height: 65vh;
            background: #0B121C;
            order: 1;
        `
        const HomeBackground2 = styled.div`
            width: 100%;
            height: 25vh;
            background: #18202B;
            order: 1;
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

                </HomeBackground>
                <HomeBackground2 />
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
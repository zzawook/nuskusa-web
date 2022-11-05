import React from 'react';
import ContactUs from '../components/ContactUs'
import styled from 'styled-components'
import ActivityList from '../components/Home/ActivityList'
import Navbar from '../components/Navbar';
import { DisplayLarge } from '../utils/ThemeText';
import { User } from '../types/User';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import CSS from 'csstype'
import AnnouncementList from '../components/Home/AnnouncementList';

type HomeProps = {
    userData: User
}

type HomeState = {
    loading: boolean
}

const height = window.innerHeight;

const LoadingBlocker = styled.div`
    opacity: 0.5;
    background-color: white;
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 11;
`
const LoadingText = styled.span`
    background-color: white;
    color: black;
    font-size: 16px;
    font-weight: 600;
`
/*
 * Main page that the users will visit
 */
class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {
            loading: false
        }
        this.setLoading.bind(this);
        this.unsetLoading.bind(this);
    }

    carouselStyle: CSS.Properties = {
        position: 'absolute',
        top: `${(height * 0.1) + 50}px`,
        right: '15vw',
        width: '30vw',
        height: '30vw',
    }

    componentDidMount = async () => {
        console.log(this.props)
    }

    setLoading = () => {
        this.setState({
            loading: true
        })
    }

    unsetLoading = () => {
        this.setState({
            loading: false
        })
    }

    render = () => {
        const Wrapper = styled.div`
            display: flex;
            flex-direction: column;
            background: #18202B;
            justify-content: center;
            align-items: center;
        `

        const HomeBackground = styled.div`
            justify-content: flex-start;
            display: flex;
            align-items: center;
            width: 100%;
            height: 90vh;
            background: linear-gradient(to bottom, #0B121C 55%, #18202B 35%);
            order: 1;
            padding-left: 15vw;
            padding-top: 5vh;
        `

        const AnnouncementDisplay = styled.div`
            position: absolute;
            top: ${(height * 0.1) + 50}px;
            left: 15vw;
            width: 39vw;
            height: 30vw;
            background: #f2f2f2;
        `

        /* const MainBannerContainer = styled.div`
            display: flex;
            width: 70vw;
            height: 65vh;
            margin: auto;
            align-items: center;
            z-index: 0;
        `
        const MainBanner = styled.div`
            display: flex;
            flex-direction: column;
            position: absolute;
            width: 42%;
            height: 25vh;
            background: white;
            box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.15);
            box-sizing: border-box;
            padding: 25px 50px;
        `
        const MainBannerImage = styled.img`
            height: auto;
            width: auto;
        ` */

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
        const carouselDivStyle: CSS.Properties = {
            height: '30vw',
            zIndex: -1,
        }

        return (
            <Wrapper>
                <Navbar userData={this.props.userData} />
                <div style={this.carouselStyle}>
                    <Carousel
                        dynamicHeight={false}
                        autoPlay={true}
                        infiniteLoop={true}
                        showArrows={false}
                        showIndicators={true}
                        showStatus={false}
                        showThumbs={false}
                    >
                        <div style={carouselDivStyle} onClick={() => window.open('https://www.instagram.com/p/Cfq-wfjLEKH/')}>
                            <img src="https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/images/%E1%84%89%E1%85%B5%E1%86%AB%E1%84%8B%E1%85%B5%E1%86%B8%E1%84%89%E1%85%A2%E1%86%BC+%E1%84%83%E1%85%A1%E1%86%AB%E1%84%90%E1%85%A9%E1%86%A8+22+23.jpeg" />
                        </div>
                        <div style={carouselDivStyle} onClick={() => window.open('https://www.instagram.com/p/Cfq-wfjLEKH/')}>
                            <img src="https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/images/%E1%84%89%E1%85%B5%E1%86%AB%E1%84%8B%E1%85%B5%E1%86%B8%E1%84%89%E1%85%A2%E1%86%BC+%E1%84%83%E1%85%A1%E1%86%AB%E1%84%90%E1%85%A9%E1%86%A8+22+23+%E1%84%89%E1%85%A5%E1%86%AF%E1%84%86%E1%85%A7%E1%86%BC.jpeg" />
                        </div>
                    </Carousel>
                </div>
                <HomeBackground>
                    <AnnouncementDisplay>
                        <p style={{ margin: '25px', color: '#000000', fontSize: '26px', fontWeight: 'bold' }}>공지사항</p>
                        <AnnouncementList postArray={[]} postListArray={[]}></AnnouncementList>
                    </AnnouncementDisplay>

                    {/* <MainBanner>
                        <p style={{ margin: '0', color: '#0B121C', opacity: '0.8', fontSize: '19px', fontWeight: 'bold' }}>
                            Welcome to
                        </p>
                        <DisplayLarge color='#0B121C' style={{ marginTop: '5px', marginBottom: '5px' }}>NUS Korea Society</DisplayLarge>
                        <p style={{ margin: '0', marginBottom: '20px', color: '#0B121C', opacity: '0.5', fontSize: '13px' }}>
                            NUS 한인 학생회 사이트에 오신 것을 환영합니다!
                        </p>
                        <GoldenButton to='/about-us'>
                            <DisplayMedium color='white' style={{ fontSize: '14px', fontWeight: 'bold', textAlign: 'center' }}>
                                + More Details
                            </DisplayMedium>
                        </GoldenButton>
                    </MainBanner> */}
                </HomeBackground>
                <Activity>
                    <DisplayLarge color='#FFFFFF' style={{ marginLeft: '10px' }}>Our Activities</DisplayLarge>
                    <ActivityWrapper>
                        <ActivityList title='교류활동' content='신입생 환영회, 문화교류, 캠퍼스 투어' image={'https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/source/home1.png'} />
                        <ActivityList title='이벤트' content='여러가지 이벤트!' image={'https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/source/home2.png'} />
                        <ActivityList title='취업활동 정보' content='인턴, 취업 관련 웨비나, 멘토 초청 강연' image={'https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/source/home3.png'} />
                    </ActivityWrapper>
                </Activity>
                <ContactUs setLoading={this.setLoading} unsetLoading={this.unsetLoading}/>
                {this.state.loading ? <LoadingBlocker><LoadingText>거의 다 됐어요! 조금만 기다려주세요 :)</LoadingText></LoadingBlocker> : <></>}
            </Wrapper>
        )
    }
}

export default Home
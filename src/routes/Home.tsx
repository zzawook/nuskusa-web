import React from 'react';
import { Link } from 'react-router-dom';
import { authService, dbService } from '../utils/firebaseFunctions';
import ContactUs from '../components/ContactUs'
import Post from './Post'
import styled from 'styled-components'
import ActivityList from '../components/Home/ActivityList'
import Navbar from '../components/Navbar';
import { DisplayMedium, DisplayLarge } from '../utils/ThemeText';
import { GoldenButton } from '../components/GoldenButton';
import { FirebaseUser } from '../types/FirebaseUser';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import CSS from 'csstype'


type HomeProps = {
    firebaseUserData: FirebaseUser
}

type HomeState = {

}

const width = window.innerWidth;
const height = window.innerHeight;



/**
 * Main page that the users will visit
 */
class Home extends React.Component<HomeProps, HomeState> {
    constructor(props: HomeProps) {
        super(props);
        this.state = {

        }
    }

    carouselStyle: CSS.Properties = {
        position: 'absolute',
        top: `${(height * 0.1) + 50}px`,
        width: '60%',
        left: '20%',
        height: '90vh',
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
            z-index: 0;
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
        const carouselDivStyle: CSS.Properties = {
            height: '70vh',
            zIndex: -1,
        }

        return (
            <Wrapper>
                <Navbar firebaseUserData={this.props.firebaseUserData} />   
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
                        <div style={carouselDivStyle} onClick={() => window.open('https://www.instagram.com/p/Cb6uxpCL_L8/?utm_source=ig_web_copy_link')}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FKakaoTalk_20220404_100531025.jpg?alt=media&token=2719d84d-2325-4d8d-a83e-e978dad59996" />
                        </div>
                        <div style={carouselDivStyle} onClick={() => window.open('https://www.instagram.com/p/CbUY6AvJr5U/?utm_source=ig_web_copy_link')}>
                        <img src="https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FKakaoTalk_20220320_102406142_01.png?alt=media&token=94e00dd9-6cdd-4897-b9a7-9123a687d47e" />
                        </div>
                        <div style={carouselDivStyle} onClick={() => window.open('https://www.instagram.com/p/CbUNejQLDRs/?utm_source=ig_web_copy_link')}>
                            <img src="https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FKakaoTalk_20220319_193657584_01.jpg?alt=media&token=08fae938-5af8-47eb-93a2-42522c3b73e4" />
                        </div>
                    </Carousel>  
                </div>    
                <HomeBackground>
                    <MainBannerContainer>
                        <MainBanner>
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
                        </MainBanner>
                    </MainBannerContainer>
                </HomeBackground>
                <Activity>
                    <DisplayLarge color='#FFFFFF' style={{ marginLeft: '10px' }}>Our Activities</DisplayLarge>
                    <ActivityWrapper>
                        <ActivityList title='교류활동' content='신입생 환영회, 문화교류, 캠퍼스 투어' image={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fhome1.png?alt=media&token=61ac81ed-3dff-4f66-a523-2600c4b35203'} />
                        <ActivityList title='이벤트' content='여러가지 이벤트!' image={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fhome2.png?alt=media&token=58c16a07-4595-4a92-af32-ba519fdf4380'}/>
                        <ActivityList title='취업활동 정보' content='인턴, 취업 관련 웨비나, 멘토 초청 강연' image={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2Fhome3.png?alt=media&token=3a7f0efb-dd6d-452d-91e0-3c08adca9c4e'}/>
                    </ActivityWrapper>
                </Activity>
                <ContactUs />
            </Wrapper>
        )
    }
}

export default Home
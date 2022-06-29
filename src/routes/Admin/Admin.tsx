import React from 'react';
import { Link } from 'react-router-dom';
import { authService, dbService } from '../../utils/firebaseFunctions';
import ContactUs from '../../components/ContactUs'
import Post from '../Post'
import styled from 'styled-components'
import ActivityList from '../../components/Home/ActivityList'
import Navbar from '../../components/Admin/Navbar';
import { DisplayMedium, DisplayLarge } from '../../utils/ThemeText';
import { GoldenButton } from '../../components/GoldenButton';
import { FirebaseUser } from '../../types/FirebaseUser';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import CSS from 'csstype'

const width = window.innerWidth;
const height = window.innerHeight;

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
    padding-top: 5vh
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
type AdminProps = {
    firebaseUserData: FirebaseUser
}

type AdminState = {

}

class Admin extends React.Component<AdminProps, AdminState> {
    constructor(props: AdminProps) {
        super(props);
        this.state = {

        }
    }

    

    render = () => {
        
        return (
            <Wrapper>
                <Navbar firebaseUserData={this.props.firebaseUserData} />
                <HomeBackground>
                    <MainBanner>
                        <p style={{ margin: '0', color: '#0B121C', opacity: '0.8', fontSize: '19px', fontWeight: 'bold' }}>
                            Welcome to
                        </p>
                        <DisplayLarge color='#0B121C' style={{ marginTop: '5px', marginBottom: '5px' }}>NUSKSA 관리자 페이지</DisplayLarge>
                        <p style={{ margin: '0', marginBottom: '20px', color: '#0B121C', opacity: '0.5', fontSize: '13px' }}>
                            NUS 한인 학생회 관리자 페이지에 오신 것을 환영합니다. 어떤 작업을 하실 지 위 안내바에서 선택해주세요.
                        </p>
                    </MainBanner>
                </HomeBackground>
            </Wrapper>
        )
    }
}

export default Admin
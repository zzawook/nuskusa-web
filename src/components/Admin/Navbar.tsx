import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../logo.png'
import { FirebaseUser } from '../../types/FirebaseUser';
import { authService } from '../../utils/firebaseFunctions';
import ProfileBadge from './../Profile/ProfileBadge';

type NavbarProps = {
    firebaseUserData: FirebaseUser
}

type NavBarState = {
    homeHover: boolean,
    aboutUsHover: boolean,
    boardHover: boolean,
    searchHover: boolean,
    draftHover: boolean,
}

class Navbar extends React.Component<NavbarProps, NavBarState> {
    constructor(props: NavbarProps) {
        super(props)
        this.state = {
            homeHover: true,
            aboutUsHover: false,
            boardHover: false,
            searchHover: false,
            draftHover: false,
        }
    }

    render = () => {
        const NavbarWrapper = styled.div`
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            position: relative;
            /* box-sizing: border-box; */
            background: #0B121C;
            display: flex;
            flex-direction: row;
            height: 10vh;
            justify-content: center;
            width: 100vw;
            max-width: 100%;
        `
        const NavbarContent = styled.div`
            display: flex;
            flex-direction: row;
            width: 70vw;
            justify-content: left;
            vertical-align: auto;
        `
        const Logo = styled.img`
            /* width: auto; */
            margin: auto 0;
            margin-right: 20px;
            justify-content: flex-start;
            cursor: pointer;
        `
        const NavbarButtonContainer = styled.div`
            display: flex;
            flex-direction: row;
            /* width: fit-content; */
        `
        const NavbarButton = styled.button`
            :hover {
                cursor: pointer;
                opacity: 1;
                background: #18202B;
            }
            display: inline-block;
            border: none;
            background: #0B121C;
            color: white;
            width: fit-content;
            height: auto;
            vertical-align: middle;
            opacity: 0.6;
            /* ::after {
                border-bottom: 3px solid #FFFFFF;
                width: 100px;
                display: block;
                content: '';
                margin: auto;
                padding-bottom: auto;
                border-radius: 5px;
            } */
        `
        const HomeText = styled.p<{ hover: boolean }>`
            color: #FFFFFF;
            font-size: 16px;
            padding-left: 2%;
            padding-right: 2%;
            width: 100px;
            position: relative;
            margin-bottom: auto;
            box-sizing: border-box;
        `
        const AboutUsText = styled.p<{ hover: boolean }>`
            color: #FFFFFF;
            font-size: 16px;
            padding-left: 2%;
            padding-right: 2%;
            width: 200px;
            position: relative;
            margin-bottom: auto;
            box-sizing: border-box;
        `
        const BoardText = styled.p<{ hover: boolean }>`
            color: #FFFFFF;
            font-size: 16px;
            padding-left: 2%;
            padding-right: 2%;
            width: 100px;
            position: relative;
            margin-bottom: auto;
            box-sizing: border-box;
        `
        const SearchText = styled.p<{ hover: boolean }>`
        color: #FFFFFF;
        font-size: 16px;
        padding-left: 2%;
        padding-right: 2%;
            
        position: relative;
        margin-bottom: auto;
        box-sizing: border-box;
    `
        const SignUpButton = styled.button`
            :hover {
                cursor: pointer;
            }
            background-color: #FFFFFF;
            border: 1px;
            height: fit-content;
            margin: auto;
            margin-left: 3vw;
            margin-right: 5px;
        `
        const SignInButton = styled.button`
            :hover {
                cursor: pointer;
            }
            background-color: #0B121C;
            border: 1px solid #FFFFFF;
            height: fit-content;
            margin: auto;
            margin-left: 5px;
            margin-right: 5px;
        `
        const SignInText = styled.p`
            font-weight: 700;
            font-size: 14px;
            color: #FFFFFF;
            margin: 5px;
            padding-left: 1vw;
            padding-right: 1vw;
        `
        const SignUpText = styled.p`
            font-weight: 700;
            font-size: 14px;    
            color: #101C2C;
            margin: 5px;
            padding-left: 1vw;
            padding-right: 1vw;
        `
        const handleLogoClick = (e: any) => {
            e.preventDefault();
        }

        return (
            <NavbarWrapper>
                <NavbarContent>
                    <Logo src={logo} width='64' height='64' onClick={handleLogoClick}></Logo>
                    <NavbarButtonContainer>
                        <NavbarButton onMouseEnter={() => this.setState({ homeHover: true })} onMouseLeave={() => this.setState({ homeHover: false })} onClick={() => window.location.href = "#/admin/verification"}>
                            <Link to='/admin/verification' style={{ color: '#FFFFFF', textDecoration: 'none' }}><HomeText hover={this.state.homeHover}>Verification</HomeText></Link>
                        </NavbarButton>
                        <NavbarButton onMouseEnter={() => this.setState({ aboutUsHover: true })} onMouseLeave={() => this.setState({ aboutUsHover: false })} onClick={() => window.location.href = "https://console.firebase.google.com/u/0/project/nus-kusa-website/overview"}>
                            <AboutUsText hover={this.state.aboutUsHover}><Link to='https://console.firebase.google.com/u/0/project/nus-kusa-website/overview' style={{ color: '#FFFFFF', textDecoration: 'none' }}>To Firebase Backend</Link></AboutUsText>
                        </NavbarButton>
                        <NavbarButton onMouseEnter={() => this.setState({ boardHover: true })} onMouseLeave={() => this.setState({ boardHover: false })} onClick={() => window.location.href = authService.currentUser ? "#/boards" : "#/signin"}>
                            {
                                authService.currentUser ?
                                    <BoardText hover={this.state.boardHover}><Link to='/boards' style={{ color: '#FFFFFF', textDecoration: 'none' }}>Boards</Link></BoardText>
                                    :
                                    <BoardText hover={this.state.boardHover}><Link to='/signin' style={{ color: '#FFFFFF', textDecoration: 'none' }}>Boards</Link></BoardText>
                            }
                        </NavbarButton>
                        <NavbarButton onMouseEnter={() => this.setState({ searchHover: true })} onMouseLeave={() => this.setState({ searchHover: false })} onClick={() => window.location.href = "#/admin/search"}>
                            <Link to='/admin/search' style={{ color: '#FFFFFF', textDecoration: 'none' }}><SearchText hover={this.state.searchHover}>Search Profile / Resend Verification</SearchText></Link>
                        </NavbarButton>
                        <NavbarButton onMouseEnter={() => this.setState({ draftHover: true })} onMouseLeave={() => this.setState({ draftHover: false })} onClick={() => window.location.href = "#/admin/draft/select"}>
                            <Link to='/admin/draft/select' style={{ color: '#FFFFFF', textDecoration: 'none' }}><SearchText hover={this.state.draftHover}>Draft Announcement</SearchText></Link>
                        </NavbarButton>
                        <NavbarButton onMouseEnter={() => this.setState({ draftHover: true })} onMouseLeave={() => this.setState({ draftHover: false })} onClick={() => window.location.href = "#/admin/event"}>
                            <Link to='/admin/event' style={{ color: '#FFFFFF', textDecoration: 'none' }}><SearchText hover={this.state.draftHover}>Events</SearchText></Link>
                        </NavbarButton>
                    </NavbarButtonContainer>
                </NavbarContent>
                {
                    authService.currentUser ?
                        <>
                            <ProfileBadge firebaseUserData={this.props.firebaseUserData} />
                            {/* <SignOut>Sign Out</SignOut> */}
                        </>
                        :
                        <>
                            <SignUpButton onClick={() => window.location.href = "/#/signup/select"}>
                                <SignUpText>
                                    <Link to='/signup/select' style={{ color: '#0B121C', textDecoration: 'none' }}>
                                        Sign Up
                                    </Link>
                                </SignUpText>
                            </SignUpButton>
                            <SignInButton onClick={() => window.location.href = "/#/signin"}>
                                <Link to='/signin' style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                                    <SignInText>
                                        Sign In
                                    </SignInText>
                                </Link>
                            </SignInButton>
                        </>
                }

            </NavbarWrapper >
        )
    }
}

export default Navbar;
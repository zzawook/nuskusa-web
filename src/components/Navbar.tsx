import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../logo.png'
import { User } from '../types/User';
import ProfileBadge from './Profile/ProfileBadge';

type NavbarProps = {
    userData: User
}

type NavBarState = {
    homeHover: boolean,
    aboutUsHover: boolean,
    boardHover: boolean,
}

class Navbar extends React.Component<NavbarProps, NavBarState> {
    constructor(props: NavbarProps) {
        super(props)
        this.state = {
            homeHover: true,
            aboutUsHover: false,
            boardHover: false,
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
                width: 44px;
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
            width: 100px;
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
                        <NavbarButton onMouseEnter={() => this.setState({ homeHover: true })} onMouseLeave={() => this.setState({ homeHover: false })} onClick={() => window.location.href = "#/"}>
                            <Link to='/home' style={{ color: '#FFFFFF', textDecoration: 'none' }}><HomeText hover={this.state.homeHover}>Home</HomeText></Link>
                        </NavbarButton>
                        <NavbarButton onMouseEnter={() => this.setState({ aboutUsHover: true })} onMouseLeave={() => this.setState({ aboutUsHover: false })} onClick={() => window.location.href = "#/about-us"}>
                            <AboutUsText hover={this.state.aboutUsHover}><Link to='/about-us' style={{ color: '#FFFFFF', textDecoration: 'none' }}>About Us</Link></AboutUsText>
                        </NavbarButton>
                        <NavbarButton onMouseEnter={() => this.setState({ boardHover: true })} onMouseLeave={() => this.setState({ boardHover: false })} onClick={() => window.location.href = this.props.userData.name ? "#/boards" : "#/signin"}>
                            {
                                this.props.userData.name ?
                                    <BoardText hover={this.state.boardHover}><Link to='/boards' style={{ color: '#FFFFFF', textDecoration: 'none' }}>Boards</Link></BoardText>
                                    :
                                    <BoardText hover={this.state.boardHover}><Link to='/signin' style={{ color: '#FFFFFF', textDecoration: 'none' }}>Boards</Link></BoardText>
                            }
                        </NavbarButton>
                    </NavbarButtonContainer>
                </NavbarContent>
                {
                    this.props.userData.name ?
                        <>
                            <ProfileBadge userData={this.props.userData} />
                            {/* <SignOut>Sign Out</SignOut> */}
                        </>
                        :
                        <>
                            <SignUpButton onClick={() => window.location.href = "/#/signup/terms"}>
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
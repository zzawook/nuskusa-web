import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../logo.png'
import { authService } from '../utils/firebaseFunctions';
import SignOut from './SignOut';

type NavbarProps = {

}

class Navbar extends React.Component<NavbarProps, {}> {
    constructor(props: NavbarProps) {
        super(props)
        this.state = {

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
            justify-content: right;
            vertical-align: auto;
        `
        const Logo = styled.img`
            width: auto;
            top: 0;
            bottom: 0;
            margin: auto 0;
            margin-right: auto;
            justify-content: flex-start;
            cursor: pointer;
        `
        const NavbarButtonContainer = styled.div`
            display: flex;
            width: fit-content;
        `
        const NavbarButton = styled.button`
            display: inline-block;
            border: none;
            background: #0B121C;
            color: white;
            width: fit-content;
            height: auto;
            vertical-align: middle;
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
        const NavbarText = styled.p`
            color: #FFFFFF;
            font-size: 16px;
            padding-left: 2%;
            padding-right: 2%;
            width: 100px;
            position: relative;
            margin-bottom: auto;
            box-sizing: border-box;
            opacity: 0.6;
            :hover {
                opacity: 1;
            }
        `

        const SignUpButton = styled.button`
            background-color: #FFFFFF;
            border: 1px;
            height: fit-content;
            margin: auto;
            margin-left: 3vw;
            margin-right: 5px;
        `
        const SignInButton = styled.button`
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
                        <NavbarButton>
                            <NavbarText><Link to='/home' style={{ color: '#FFFFFF', textDecoration: 'none' }}>Home</Link></NavbarText>
                        </NavbarButton>
                        <NavbarButton>
                            <NavbarText><Link to='/about-us' style={{ color: '#FFFFFF', textDecoration: 'none' }}>About Us</Link></NavbarText>
                        </NavbarButton>
                        <NavbarButton>
                            <NavbarText><Link to='/boards' style={{ color: '#FFFFFF', textDecoration: 'none' }}>Boards</Link></NavbarText>
                        </NavbarButton>
                        <NavbarButton>
                            <NavbarText><Link to='/contacts' style={{ color: '#FFFFFF', textDecoration: 'none' }}>Contact Us</Link></NavbarText>
                        </NavbarButton>
                        {authService.currentUser ?
                            <>
                                <SignOut>Sign Out</SignOut>
                            </>
                            :
                            <>
                                <SignUpButton>
                                    <SignUpText>
                                        <Link to='/signup' style={{ color: '#0B121C', textDecoration: 'none' }}>
                                            Sign Up
                                        </Link>
                                    </SignUpText>
                                </SignUpButton>
                                <SignInButton>
                                    <SignInText>
                                        <Link to='/signin' style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                                            Sign In
                                        </Link>
                                    </SignInText>
                                </SignInButton>
                            </>
                        }

                    </NavbarButtonContainer>
                </NavbarContent>
            </NavbarWrapper>
        )
    }
}

export default Navbar;
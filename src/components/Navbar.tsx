import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../logo.png'
import { SignInText, SignUpText } from '../utils/ThemeText'

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
            box-sizing: border-box;
            background: #0B121C;
            display: flex;
            flex-direction: row;
            height: 10vh;
            justify-content: center;
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
        `
        const NavbarButtonContainer = styled.div`
            display: flex;
            width: fit-content;
        `
        const NavbarButton = styled.button`
            display: inline-block;

            opacity: 0.6;
            border: none;
            background: #0B121C;
            color: white;
            width: fit-content;
            height: auto;
            vertical-align: middle;
            :hover {
                opacity: 1;
            }
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
        `

        const SelectedLine = styled.div`
            position: absolute;
            border: 3px solid #FFFFFF;
            width: 44px;
            bottom: 0;
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

        return (
            <NavbarWrapper>
                <NavbarContent>
                    <Logo src={logo} width='64' height='64' />
                    <NavbarButtonContainer>
                        <NavbarButton>
                            <NavbarText>Home</NavbarText>
                        </NavbarButton>
                        <NavbarButton>
                            <NavbarText><Link to='/about-us'>About Us</Link></NavbarText>
                        </NavbarButton>
                        <NavbarButton>
                            <NavbarText>Posts</NavbarText>
                        </NavbarButton>
                        <NavbarButton>
                            <NavbarText>Contact Us</NavbarText>
                        </NavbarButton>
                        <SignUpButton>
                            <SignUpText>
                                Sign Up
                            </SignUpText>
                        </SignUpButton>
                        <SignInButton>
                            <SignInText>
                                Sign In
                            </SignInText>
                        </SignInButton>
                    </NavbarButtonContainer>
                </NavbarContent>
            </NavbarWrapper>
        )
    }
}

export default Navbar;
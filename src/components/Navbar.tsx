import React from 'react';
import styled from 'styled-components';

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
            min-height: 10vh;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            position: relative;
            z-index: auto;
            box-sizing: border-box;

            background: #0B121C;
        `

        const NavbarText = styled.p`
            color: #FFFFFF;
            font-size: 20px;
            margin-top: 0;
        `
        return (
            <NavbarWrapper>
                <NavbarText>
                    BRUHHH
                </NavbarText>
            </NavbarWrapper>
        )
    }
}

export default Navbar;
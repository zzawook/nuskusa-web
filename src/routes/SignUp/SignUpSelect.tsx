import React from 'react';
import CSS from 'csstype';
import styled from 'styled-components'
import { FlexColumn } from '../../components/utils/UsefulDiv';
import Button from '../../components/SignUpSelect/Button'

type UserProps = {
    history: any,
    location: any,
}

type UserState = {
    email: string,
    password: string,
    name: string
}

const margin = 20;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    height: 100vh;
    align-items: center;
    background-color: #0B121C;
`
const Back = styled.button`
    position: absolute;
    display: flex;
    top: 25px;
    left: 25px;
    width: 95px;
    height: 50px;
    border: 2px solid white;
    color: #969696;
    background-color: #0B121C;
    font-weight: 500;
    cursor: pointer;
`
const DescriptionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 40vw;
    background-color: #0B121C;
`
const Title = styled.span`
    width: 50%;
    text-align: center;
    margin-bottom: ${margin}px;
    font-weight: 700;
    font-family: var(--font-family-roboto);
    color: white;
    font-size: 40px;
`
const Explanation = styled.span`
    text-align: center;
    font-weight: 800;
    font-size: 13px;
    color: #808080;
`
const Form = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60vw;
    height: 100vh;
    background-color: white;
`
const ButtonRow = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
class SignUpSelect extends React.Component<UserProps, UserState> {
    constructor(props: UserProps) {
        super(props);
        this.state = {
            email: '',
            password: '',
            name: '',
        }
    }

    handleBackClick = (event: any) => {
        event.preventDefault();
        window.history.back();
    }

    arrowStyle: CSS.Properties = {
        height: '15px',
        marginTop: '14px',
        marginRight: '10px',
    }

    imgStyle: CSS.Properties = {
        width: '60%',
    }

    render() {
        return (
            <>
                <Container>
                    <FlexColumn>
                        <Back onClick={this.handleBackClick}>
                            <img
                                style={this.arrowStyle}
                                src='https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/source/whiteArrow.png'
                            />
                            <p>Back</p>
                        </Back>
                        <DescriptionContainer>
                            <img
                                src='https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/source/signUpChar.png'
                                style={this.imgStyle}
                            />
                            <Title>Sign Up to Join!</Title>
                            <Explanation>NUS ????????? ???????????? ??????????????? ?????? ???????????? ???????????? ??? ?????? ????????? ????????? ??? ????????????.</Explanation>
                        </DescriptionContainer>
                    </FlexColumn>
                    <Form>
                        <ButtonRow>
                            <Button title="?????????" description="1?????? ????????? ????????? ?????????!" color="#FFDE00" linkTo="freshmen" />
                            <Button title="?????????" description="NUS??? ???????????? 2?????? ?????? ????????? ?????????!" color="#4287F5" linkTo='enrolled' />
                        </ButtonRow>
                        <ButtonRow>
                            <Button title="?????????" description="NUS??? ???????????? ????????? ???????????????!" color="#4CC76C" linkTo='graduated' />
                            <Button title="????????????" description="?????? ????????? ???????????????!" color="#b66bd6" linkTo='other' />
                        </ButtonRow>
                    </Form>
                </Container>
            </>

        )
    }
}

export default SignUpSelect
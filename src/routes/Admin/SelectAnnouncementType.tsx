import React from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import Navbar from '../../components/Admin/Navbar';
import { FirebaseUser } from '../../types/FirebaseUser';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { dbService } from '../../utils/firebaseFunctions';
import UserSlip from '../../components/Admin/UserSlip'
import { AiOutlineConsoleSql } from 'react-icons/ai';

const width = window.innerWidth;
const height = window.innerHeight;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: #18202B;
    justify-content: center;
    align-items: center;
`
const SelectBoxContainer = styled.div`
    display: flex;
    flex-direction: row;
    background: #18202b;
    justify-content: center;
    align-items: center;
`
const SelectBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 10vw;
    height: 10vw;
    background-color: white;
    justify-content: center;
    align-items: center;
    margin: 15px;
    cursor: pointer;
`
const TypeText = styled.span`
    color: #18202b;
    font-size: 18px;
    font-weight: 800;
    text-decoration: none;

`
const LoadingBlocker = styled.div`
    opacity: 0.5;
    background-color: black;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`
const LoadingText = styled.span`
    background-color: black;
    color: white;
    font-size: 16px;
    font-weight: 600;
`
type SelectAnnouncementTypeProps = {
    firebaseUserData: FirebaseUser,
}

type SelectAnnouncementTypeState = {
    loading: boolean,
    announcementTypes: Array<any>,
}

class SelectAnnouncementType extends React.Component<SelectAnnouncementTypeProps, SelectAnnouncementTypeState> {
    constructor(props: SelectAnnouncementTypeProps) {
        super(props);
        this.state = {
            loading: false,
            announcementTypes: [
                {
                    "id" : "announcement",
                    "name" : "일반 공지"
                }, 
                {
                    "id": "event",
                    "name": "이벤트 공지"
                }
        ],
        }
        this.setLoading.bind(this);
        this.unsetLoading.bind(this);
    }

    componentDidMount() {
    }

    setLoading = () => {
        this.setState({
            loading: true,
        })
    }

    unsetLoading = () => {
        this.setState({
            loading: false,
        })
    }

    componentDidUpdate() {
    }

    render = () => {
        return (
            <>
                {this.state.loading ? <LoadingBlocker><LoadingText>거의 다 됐어요! 조금만 기다려주세요 : </LoadingText></LoadingBlocker> : <></>}
                <Wrapper>
                    <Navbar firebaseUserData={this.props.firebaseUserData} />
                    
                    <SelectBoxContainer>
                        {this.state.announcementTypes.map(element => {
                            return <SelectBox onClick={() => {
                                window.location.href = "#/admin/draft/" + element.id
                            }}><Link to={"admin/draft/" + element.id}><TypeText>{element.name}</TypeText></Link></SelectBox>
                        })}
                    </SelectBoxContainer>
                </Wrapper>
            </>

        )
    }
}

export default SelectAnnouncementType
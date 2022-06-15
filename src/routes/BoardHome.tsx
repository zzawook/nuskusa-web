import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ContactUs from '../components/ContactUs';
import Navbar from '../components/Navbar';
import BoardThumbnail from '../components/BoardHome/BoardThumbnail';
import { dbService } from '../utils/firebaseFunctions';
import { DisplayLarge, Headline } from '../utils/ThemeText';
import { FirestoreBoard } from '../types/FirestoreBoard';
import VerificationRequest from '../components/Verification/VerificationRequest';
import { FirebaseUser } from '../types/FirebaseUser';

type BoardHomeProps = {
    firebaseUserData: FirebaseUser
}

type BoardHomeState = {
    boardArray: FirestoreBoard[],
    boardComponentArray: any[],
    title: string,
    description: string,
    permissions: string[]
}

class BoardHome extends React.Component<BoardHomeProps, BoardHomeState> {
    state: BoardHomeState = {
        boardArray: [],
        boardComponentArray: [],
        title: '',
        description: '',
        permissions: []
    }

    componentDidMount = () => {
        if (localStorage.getItem("seeVerify") === null) {
            localStorage.setItem("seeVerify", "yes");
        }
        this.fetchBoards();
    }

    fetchBoards = () => {
        dbService
            .collection('boards')
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const arr: FirestoreBoard[] = [];
                    const componentArray: any[] = [];
                    let key = 0;
                    querySnapshot.docs.forEach((doc) => {
                        const data = doc.data() as FirestoreBoard;
                        const component = (
                            <BoardThumbnail
                                key={key}
                                title={data.title}
                                boardId={data.boardId}
                                description={data.description}
                                permissions={data.permissions}
                                boardColor={data.boardColor}
                                boardTextColor={data.boardTextColor}
                                editPermission={data.editPermission}
                            />
                        )
                        key++;
                        arr.push(data);
                        if (data.permissions.includes(this.props.firebaseUserData.role)) {
                            componentArray.push(component);
                        }
                    })
                    this.setState({
                        boardArray: arr,
                        boardComponentArray: componentArray
                    })
                }
            })
    }

    handleChange = (event: any) => {
        event.preventDefault();
        const { name, value } = event.target;
        if (name === 'title') {
            this.setState({
                title: value
            })
        }
        else if (name === 'description') {
            this.setState({
                description: value
            })
        }
    }

    handleSubmit = (event: any) => {
        event.preventDefault();
        const { title, description } = this.state
        const permissionsArray: any[] = [];
        document.querySelectorAll('input[class=board-permissions]:checked')
            .forEach((element: any) => {
                permissionsArray.push(element.value);
            });
        dbService.collection('boards').doc(title).set({
            title: title,
            description: description,
            permissions: permissionsArray
        })
    }

    render = () => {
        const Container = styled.div`
            display: flex;
            flex-direction: column;
            align-items: center;
            background: #0B121C;
            height: 100%;
            width: 100vw;
        `
        const TextContainer = styled.div`
            display: flex;
            flex-direction: column;
            width: 70vw;
            min-height: ${window.innerHeight}px;
        `

        const ThumbnailContainer = styled.div`
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: left;
        `
        return (
            <Container>
                <Navbar firebaseUserData={this.props.firebaseUserData} />
                <TextContainer>
                    <DisplayLarge color='white' style={{ alignSelf: 'flex-start', marginLeft: '10px', marginBottom: '10px' }}>
                        게시판
                    </DisplayLarge>
                    <Headline color='white' style={{ opacity: '0.5', marginLeft: '10px', marginRight: '10px', wordBreak: 'keep-all', overflow: 'clip', width: '40vw', marginBottom: '30px' }}>
                        NUS 한인회 게시판에 오신 것을 환영합니다. 저희 게시판은 여러 게시글들을 통해 NUS 학생들, 그리고 NUS에 관심있는 사람들과 서로 소통하고 정보 공유를 위해 만들어진 페이지입니다.
                    </Headline>
                    <ThumbnailContainer>
                        {this.state.boardComponentArray}
                    </ThumbnailContainer>
                    {/* {this.props.firebaseUserData.role === 'Admin' ?
                        <form onSubmit={this.handleSubmit}>
                            <input name='title' type='string' onChange={this.handleChange} />
                            <input name='description' type='string' onChange={this.handleChange} /> <br />
                            Who can view this board? <br />
                            <input name='permissions' className='board-permissions' type='checkbox' value='User' />
                            <input name='permissions' className='board-permissions' type='checkbox' value='Undergraduate' />
                            <input name='permissions' className='board-permissions' type='checkbox' value='Graduate' />
                            <input type='submit' />
                        </form>
                        :
                        <div>

                        </div>
                    } */}
                </TextContainer>
                <ContactUs />
            </Container>
        )
    }
}

export default BoardHome;
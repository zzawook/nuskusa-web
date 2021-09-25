import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { authService, dbService } from '../utils/firebaseFunctions';
import { SectionDescription } from '../utils/ThemeText';

type BoardObject = {
    title: string,
    description: string,
}

type BoardHomeProps = {
    role: string
}

type BoardHomeState = {
    boardArray: BoardObject[],
    boardComponentArray: any[],
    title: string,
    description: string,
}

class BoardHome extends React.Component<BoardHomeProps, BoardHomeState> {
    state: BoardHomeState = {
        boardArray: [],
        boardComponentArray: [],
        title: '',
        description: '',
    }

    componentDidMount = () => {
        this.fetchBoards();
    }

    fetchBoards = () => {
        dbService
            .collection('boards')
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const arr: BoardObject[] = [];
                    const componentArray: any[] = [];
                    let key = 0;
                    querySnapshot.docs.forEach((doc) => {
                        const data = doc.data() as BoardObject;
                        const component = (
                            <div key={key}>
                                <Link to={`/boards/${data.title}`}>{data.title}</Link>
                                {/* put a modal for editing this board */}
                            </div>
                        )
                        key++;
                        arr.push(data);
                        componentArray.push(component);
                    })
                    this.setState({
                        boardArray: arr,
                        boardComponentArray: componentArray
                    })
                    console.log('all boards fetching successful')
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
        return (
            <div>
                <Navbar />
                <SectionDescription color='black' style={{ marginLeft: '10px', marginRight: '10px', overflow: 'clip', width: '40vw' }}>
                        NUS 한인회 게시판에 오신 것을 환영합니다. 저희 게시판은 여러 게시글들을 통해 NUS 학생들, 그리고 NUS에 관심있는 사람들과 서로 소통하고 정보 공유를 위해 만들어진 페이지입니다.
                </SectionDescription>
                {console.log(this.props.role)}
                {this.state.boardComponentArray}
                {this.props.role === 'Admin' ?
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
                    <div>Waiting</div>
                }
            </div>
        )
    }
}

export default BoardHome;
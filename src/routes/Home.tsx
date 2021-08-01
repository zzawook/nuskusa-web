import React, { FC, useEffect, useState } from 'react';
import { authService, dbService } from '../utils/firebaseFunctions';
import Board from './Board';

type BoardObject = {
    title: string,
    description: string,
    permissions: string[],
}

type HomeProps = {

}

type HomeState = {
    boardArray: BoardObject[],
    boardComponentArray: any[]
}



class Home extends React.Component<HomeProps, HomeState> {
    state: HomeState = {
        boardArray: [],
        boardComponentArray: []
    }

    componentDidMount() {
        this.fetchBoards();
    }

    fetchBoards() {
        dbService
            .collection('boards')
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const arr: BoardObject[] = [];
                    const componentArray: any[] = [];
                    querySnapshot.docs.forEach((doc) => {
                        const data = doc.data() as BoardObject;
                        const component = (
                            <Board boardId={doc.id} />
                        )
                        arr.push(data);
                        componentArray.push(component);
                    })
                    this.setState({
                        boardArray: arr,
                        boardComponentArray: componentArray
                    })
                }
            })
    }

    render() {
        return (
            <div>
                hi
                {this.state.boardComponentArray}
            </div>
        )
    }
}

export default Home;
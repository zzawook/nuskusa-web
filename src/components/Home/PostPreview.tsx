import React from 'react'
import styled from 'styled-components'
import { dbService } from '../../utils/FirebaseFunctions'
import { DisplaySmall, Headline } from '../../utils/ThemeText'
import BoardTag from '../Board/BoradTag'

type PreviewProps = {

}

type PreviewState = {
    componentArray: any[],
    selected: string
}

type FirestoreState = {
    title: string,
    parentBoard: string,
    boardColor: string
}

class PostPreview extends React.Component<PreviewProps, PreviewState> {
    constructor(props: PreviewProps) {
        super(props)
        this.state = {
            componentArray: [],
            selected: "인기글"
        }
    }

    componentDidMount = () => {

    }

    fetchTopPosts = () => {
        const Bulletin = styled.div`
            display: flex;
            flex-direction: row;
        `
        dbService.collectionGroup("posts")
            .orderBy("upvotes")
            .orderBy("numComments")
            .limit(5)
            .onSnapshot((querySnapshot) => {
                if (!querySnapshot.empty) {
                    const arr: any = []
                    querySnapshot.docs.forEach(element => {
                        const data = element.data() as FirestoreState
                        arr.push(
                            <Bulletin>
                                <BoardTag title={data.parentBoard} color={data.boardColor} />
                                <Headline color='#0B121C' style={{ opacity: '0.6' }}></Headline>
                            </Bulletin>
                        )
                    });
                    this.setState({
                        componentArray: arr
                    })
                }
            })
    }

    fetchAnnouncementPosts = () => {
        
    }

    changeToAnnouncement = () => {
        if (this.state.selected == "인기글") {
            this.setState({
                selected: '공지글'
            })
        }
    }

    changeToPopular = () => {
        if (this.state.selected == "공지글") {
            this.setState({
                selected: '인기글'
            })
        }
    }

    render = () => {
        const Wrapper = styled.div`
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            width: 40%;
            background-color: white;
            height: 50vh;
            margin-bottom: 20%;
        `
        const Header = styled.div`
            display: flex;
            flex-direction: row;
        `
        const Section = styled.section`
            display: flex;
            width: 50%;
            :hover {
                color: rgba(255, 255, 255, 1);
                box-shadow: 0 5px 10px rgba(0, 0, 0, .4);
            }
            :active {
                color: rgba(255, 255, 255, 1);
                box-shadow: 0 5px 10px rgba(0, 0, 0, 1);
            }
        `
        return (
            <Wrapper>
                <Header>
                    {this.state.selected === "공지글" ?
                        <>
                            <Section style={{ borderBottom: '2px solid rgba(0, 0, 0, 0.2)' }} onClick={this.changeToPopular}>
                                <DisplaySmall color='#000000' style={{ marginTop: '15px', marginBottom: '15px' }}>인기글</DisplaySmall>
                            </Section>
                            <Section style={{ borderBottom: '2px solid rgba(0, 0, 0, 1)' }} onClick={this.changeToAnnouncement}>
                                <DisplaySmall color='#000000' style={{ marginTop: '15px' }}>공지글</DisplaySmall>
                            </Section>
                        </>
                        :
                        <>
                            <Section style={{ borderBottom: '2px solid rgba(0, 0, 0, 1)' }} onClick={this.changeToPopular}>
                                <DisplaySmall color='#000000' style={{ marginTop: '15px', marginBottom: '15px' }}>인기글</DisplaySmall>
                            </Section>
                            <Section style={{ borderBottom: '2px solid rgba(0, 0, 0, 0.2)' }} onClick={this.changeToAnnouncement}>
                                <DisplaySmall color='#000000' style={{ marginTop: '15px' }}>공지글</DisplaySmall>
                            </Section>
                        </>
                    }

                </Header>
            </Wrapper>
        )
    }
}

export default PostPreview
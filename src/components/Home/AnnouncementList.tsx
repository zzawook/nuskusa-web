import React from 'react';
import styled from 'styled-components'
import { dbService } from '../../utils/firebaseFunctions';
import { Post } from '../../types/Post';

type PostState = {
    postArray: Post[],
    postListArray: any[]
}

const Wrapper = styled.div``

const AnnouncementLinkList = styled.ul`
    padding-left: 0px;
`

const AnnouncementLink = styled.li`
    color: black;
    height: 24px;
    font-size: 16px;
    cursor: pointer;
    list-style-type: none;
    border-top: 1px solid #bdbdbd;
    border-bottom: 1px solid #bdbdbd;
    line-height: 24px;
    padding: 10px;
    padding-left: 25px;
    margin-top: -1px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const TitleWrapper = styled.span`
    :hover {
        text-decoration: underline;
        text-underline-position: under;
        text-decoration-color: #888888;
    }
`

const DateWrapper = styled.div`
    color: #888888;
    font-size: 14px;
    padding-right: 10px;
`

class AnnouncementList extends React.Component<PostState> {
    state: PostState = {
        postArray: [],
        postListArray: [],
    }

    formatDate(dt: Date) {
        return dt.getFullYear().toString() + "." + (dt.getMonth() + 1).toString() + "." + dt.getDate().toString()
    }

    fetchAnnouncement = () => {
        const rawData: Post[] = [];
        const list: any[] = [];
        dbService
            .collection('boards')
            .doc('announcement')
            .collection('posts')
            .orderBy('lastModified', 'desc')
            .limit(10)
            .onSnapshot((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const data = doc.data() as Post;
                    rawData.push(data);
                    if (!data.isHidden) {
                        const component = (
                            <AnnouncementLink style={data.isPinned ? { backgroundColor: "#d9d9d9" } : {}} onClick={() => window.location.href = "/#/boards/announcement/" + doc.id}>
                                <TitleWrapper style={data.isPinned ? { fontWeight: "bold" } : {}}>{data.title}</TitleWrapper>
                                <DateWrapper>{this.formatDate(data.lastModified.toDate())}</DateWrapper>
                            </AnnouncementLink>
                        )
                        data.isPinned ? list.unshift(component) : list.push(component)
                    }
                })
                this.setState({
                    postArray: rawData,
                    postListArray: list
                })
            })

    }

    componentDidMount() {
        this.fetchAnnouncement();
    }

    render = () => {
        return (
            <Wrapper>
                <AnnouncementLinkList>{this.state.postListArray}</AnnouncementLinkList>
            </Wrapper>
        )
    }
}

export default AnnouncementList;
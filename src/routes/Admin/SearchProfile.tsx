import { Button, useScrollTrigger } from '@mui/material';
import React from 'react';
import styled from 'styled-components'
import Navbar from '../../components/Admin/Navbar';
import { FirebaseUser } from '../../types/FirebaseUser';
import { dbService } from '../../utils/firebaseFunctions';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: #18202B;
    justify-content: center;
    align-items: center;
`
const SearchInput = styled.input`
    
`
const SearchButton = styled.button`
    
`
const SearchedProfileWrapper = styled.div`
    
`
const SearchedProfile = styled.div`
    font-size: 20px;
    color: white;
`
const Username = styled.div`
    
`
const Gender = styled.div`
    
`
const YearOfBirth = styled.div`
    
`
const Email = styled.div`
    
`
const Role = styled.div`
    
`
const EnrolledYear = styled.div`
    
`
const Major = styled.div`
    
`
const KTId = styled.div`
    
`
type SearchProfileProps = {
    firebaseUserData: FirebaseUser,
}

type SearchProfileState = {
    users: FirebaseUser[],
    searched: boolean,
    searchedName: string,
    searchedProfiles: any[]
}

class SearchProfile extends React.Component<SearchProfileProps, SearchProfileState> {
    constructor(props: SearchProfileProps) {
        super(props);
        this.state = {
            users: [],
            searched: false,
            searchedName: '',
            searchedProfiles: []
        }
    }

    searchProfile = () => {
        dbService.collection('users').where('username', '==', this.state.searchedName).get().then((querySnapshot) => {
            let userArray: any[] = [];
            let componentArray: any[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                userArray.push(data)
                const component = (
                    <SearchedProfile>
                        <Username>Name: {data.username}</Username>
                        <Gender>Gender: {data.gender}</Gender>
                        <YearOfBirth>Year of birth: {data.yob}</YearOfBirth>
                        <Email>Email: {data.email}</Email>
                        <Role>Role: {data.role}</Role>
                        <EnrolledYear>Enrolled Year: {data.enrolledYear}</EnrolledYear>
                        <Major>Major: {data.major}</Major>
                        <KTId>KakaoTalk ID: {data.KTId}</KTId>
                    </SearchedProfile>
                )
                componentArray.push(component)
            })
            this.setState({users: userArray, searchedProfiles: componentArray})
        })
    }

    componentDidMount() {
    }

    render = () => {
        return (
            <Wrapper>
                <Navbar firebaseUserData={this.props.firebaseUserData} />
                <SearchInput
                    onChange={
                        (event) => this.setState({searchedName: event.target.value.toString()})
                    } 
                    value={this.state.searchedName} placeholder={'이름을 입력하세요'}>
                </SearchInput>
                <SearchButton onClick={this.searchProfile}>Submit</SearchButton>
                <SearchedProfileWrapper>
                    {this.state.searchedProfiles}
                </SearchedProfileWrapper>
            </Wrapper>
        )
    }
}

export default SearchProfile
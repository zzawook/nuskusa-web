import { Button, useScrollTrigger } from '@mui/material';
import React from 'react';
import styled from 'styled-components'
import Navbar from '../../components/Admin/Navbar';
import { FirebaseUser } from '../../types/FirebaseUser';
import { dbService } from '../../utils/firebaseFunctions';
import SearchedProfile from '../../components/Admin/SearchedProfile';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    background: #18202B;
    justify-content: center;
    align-items: center;
`
const SearchBar = styled.div`
    flex-direction: row;
    padding-top: 30px;
    padding-bottom: 20px;
`
const SearchInput = styled.input`
    width: 200px;
    height: 20px;
`
const SearchButton = styled.button`
    width: 70px;
    height: 25px;
    margin-left: 10px;
`
const SearchedProfileWrapper = styled.div`
    flex-direction: row;
    
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
                    <SearchedProfile 
                        firebaseUserData={this.props.firebaseUserData}
                        username={data.username} 
                        gender={data.gender} 
                        yob={data.yob} 
                        email={data.email} 
                        role={data.role} 
                        enrolledYear={data.enrolledYear}
                        major={data.major}
                        KTId={data.KTId}
                    />
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
                <SearchBar>
                    <SearchInput
                        onChange={
                            (event) => this.setState({searchedName: event.target.value.toString()})
                        } 
                        onKeyPress={this.searchProfile}
                        value={this.state.searchedName} placeholder={'이름을 입력하세요'}>
                    </SearchInput>
                    <SearchButton onClick={this.searchProfile}>Search</SearchButton>
                </SearchBar>
                <SearchedProfileWrapper>
                    {this.state.searchedProfiles}
                </SearchedProfileWrapper>
            </Wrapper>
        )
    }
}

export default SearchProfile
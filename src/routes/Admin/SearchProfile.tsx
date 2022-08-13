import React from 'react';
import styled from 'styled-components'
import Navbar from '../../components/Admin/Navbar';
import { User } from '../../types/User';
import { dbService } from '../../utils/firebaseFunctions';
import SearchedProfile from '../../components/Admin/SearchedProfile';
import CSS from 'csstype';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
    userData: User,
}

type SearchProfileState = {
    users: User[],
    searchBy: string,
    searched: boolean,
    searchedElement: string,
    searchedProfiles: any[]
}

class SearchProfile extends React.Component<SearchProfileProps, SearchProfileState> {
    constructor(props: SearchProfileProps) {
        super(props);
        this.state = {
            users: [],
            searchBy: '선택',
            searched: false,
            searchedElement: '',
            searchedProfiles: []
        }
    }

    setSearchBy = (e: string) => {
        this.setState({ searchBy: e })
    }

    searchProfile = () => {
        dbService.collection('users').where(this.state.searchBy, '==', this.state.searchedElement).get().then((querySnapshot) => {
            let userArray: any[] = [];
            let componentArray: any[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                userArray.push(data)
                const component = (
                    <SearchedProfile
                        userData={this.props.userData}
                        name={data.name}
                        userId={data.userId}
                        gender={data.gender}
                        yearOfBirth={data.yearOfBirth}
                        email={data.email}
                        role={data.role}
                        enrolledYear={data.enrolledYear}
                        verified={data.verified}
                        major={data.major}
                        kakaoTalkId={data.kakaoTalkId}
                    />
                )
                componentArray.push(component)
            })
            this.setState({ users: userArray, searchedProfiles: componentArray })
        })
    }

    componentDidMount() {
    }

    render = () => {
        return (
            <Wrapper>
                <Navbar userData={this.props.userData} />
                <SearchBar>
                    <DropdownButton id="dropdown-basic-button" title={this.state.searchBy} drop="up" autoClose={true}>
                        <Dropdown.Item as="button" onClick={() => this.setSearchBy("name")}>name</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => this.setSearchBy("yearOfBirth")}>Year of birth</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => this.setSearchBy("role")}>Role</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => this.setSearchBy("enrolledYear")}>Enrolled Year</Dropdown.Item>
                        <Dropdown.Item as="button" onClick={() => this.setSearchBy("major")}>Major</Dropdown.Item>
                    </DropdownButton>
                    <SearchInput
                        onChange={
                            (event) => this.setState({ searchedElement: event.target.value.toString() })
                        }
                        onKeyPress={this.searchProfile}
                        value={this.state.searchedElement} placeholder={'이름을 입력하세요'}>
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
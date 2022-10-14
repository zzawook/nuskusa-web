import React from 'react';
import styled from 'styled-components'
import Navbar from '../../components/Admin/Navbar';
import { User } from '../../types/User';
import SearchedProfile from '../../components/Admin/SearchedProfile';
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
const LoadingBlocker = styled.div`
    opacity: 0.5;
    background-color: black;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
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

type SearchProfileProps = {
    userData: User,
}

type SearchProfileState = {
    users: User[],
    searchBy: string,
    searched: boolean,
    searchedElement: string,
    searchedProfiles: any[],
    loading: boolean,
}

class SearchProfile extends React.Component<SearchProfileProps, SearchProfileState> {
    constructor(props: SearchProfileProps) {
        super(props);
        this.state = {
            users: [],
            searchBy: '선택',
            searched: false,
            searchedElement: '',
            searchedProfiles: [],
            loading: false,
        }
        this.setLoading = this.setLoading.bind(this);
        this.unsetLoading = this.unsetLoading.bind(this);
    }

    setSearchBy = (e: string) => {
        this.setState({ searchBy: e })
    }

    searchProfile = async () => {
        this.setState({
            loading: true,
        })
        const url = process.env.REACT_APP_HOST + "/api/profile/searchProfile?" + this.state.searchBy + "=" + this.state.searchedElement;

        const response = await fetch(url, {
            method: "GET"
        });

        if (response.status == 200) {
            const data = await response.json();
            const userArray: any[] = [];
            const componentArray: any[] = [];
            for (let i = 0; i < data.length; i++) {
                userArray.push(data[i]);
                componentArray.push(
                    <SearchedProfile
                        userData={this.props.userData}
                        name={data[i].name}
                        gender={data[i].gender}
                        yearOfBirth={data[i].yearOfBirth}
                        email={data[i].email}
                        role={data[i].role}
                        enrolledYear={data[i].enrolledYear}
                        verified={data[i].verified}
                        major={data[i].major}
                        kakaoTalkId={data[i].kakaoTalkId}
                        setLoading={this.setLoading}
                        unsetLoading={this.unsetLoading}
                    />
                )
            }
            this.setState({
                searchedProfiles: componentArray,
                loading: false,
            })
        }
        else {
            this.setState({
                loading: false,
            })
        }
    }

    componentDidMount() {
    }

    setLoading() {
        this.setState({
            loading: true
        })
    }

    unsetLoading() {
        this.setState({
            loading: false
        })
    }

    render = () => {
        return (
            <Wrapper>
                {this.state.loading ? <LoadingBlocker><LoadingText>거의 다 됐어요! 조금만 기다려주세요 : </LoadingText></LoadingBlocker> : <></>}
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
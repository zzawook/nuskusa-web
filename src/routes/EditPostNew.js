import React from "react";
import Navbar from "../components/Navbar";
import { dbService, storageService } from "../utils/firebaseFunctions";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import firebase from 'firebase';
import styled from 'styled-components'
import Select from 'react-select'
import '../components/Post/custom.css'
import Checkbox from '../../src/components/Post/Checkbox'

const height = window.innerHeight;
const width = window.innerWidth;

const Form = styled.form`
    position: absolute;
    top: ${(height * 0.1) + 85}px;
    left: ${(width * 0.15) + 150}px;
`
const Title = styled.input`
    left: 20px;
    color: ${props => props.value == 'Enter title...' ? 'gray' : 'white'};
    font-size: 14px;
    width: 400px;
    height: 40px;
    background-color: #0B121C;
    border-top: none;
    border-right: none;
    border-left: none;
    border-bottom: 1px solid white;
    outline: none;
`
const Container = styled.div`
    background: #0B121C;
    width: ${width}px;
    height: ${height}px;
`
const Back = styled.button`
    width: 95px;
    height: 41px;
    background-color: #18202B;
    position: absolute;
    top: ${(height * 0.1) + 20}px;
    left: 15%;
    padding-top: 0px;
    color: #bfbfbf;
    border: none;
    font-weight: 600;
    padding-left: 30px;
`
const Editor = styled.div` 
    position: absolute;
    top: ${(height * 0.1) + 150}px;
    left: 15%;
    width: 70%;
    height: 60%;
`
const Submit = styled.button`
    position: absolute;
    bottom: 50px;
    left: 15%;
    width: 190px;
    height: 63px;
    background-color: ${props => props.submitted ? '#8A744E': '#BDA06D'};
    font-weight: 700;
    font-size: 17px;
    color: white;
`
const SelectContainer = styled.div`
    position: absolute;
    width: 130px;
    height: 34px;
    left: 15%; 
    top: ${(height * 0.1) + 85}px;
    font-size: 10px;
    background-color: #0B121C;
`
const CheckBoxContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    height: 50px;
    width: ${450}px;
    position: absolute;
    bottom: 110px;
    left: ${width * 0.15}px;
`

class EditPostNew extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Enter title...',
            content: "<p></p>",
            isAnnouncement: false,
            isAnonymous: false,
            isPinned: false,
            isHidden: false,
            author: '',
            upvotes: 0,
            lastModified: firebase.firestore.Timestamp.fromDate(new Date()),
            permissions: ["Admin"],
        }
    }


    render = () => {
        return (
            <Container>
                <Navbar firebaseUserData={this.props.firebaseUserData}/>
                아무거나
            </Container>
        )
    }
}

export default EditPostNew
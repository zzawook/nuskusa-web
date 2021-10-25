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
import { runInThisContext } from "vm";

class Uploader {
    constructor( loader ) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(
            file => {
                return new Promise((resolve, reject) => {
                    const storageRef = storageService.ref();
                    let uploadTask = storageRef.child(`images/${file.name}`).put(file);
                    uploadTask.on(
                        firebase.storage.TaskEvent.STATE_CHANGED,
                        function(snapshot) {
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log("Upload is " + progress + "% done");
                            switch (snapshot.state) {
                                case firebase.storage.TaskState.PAUSED:
                                    console.log("Upload is paused");
                            }
                        },
                        function(error) {
                            switch (error.code) {
                                case "storage/unauthorized":
                                    reject(" User doesn't have permission to access the object");
                                    break;
                                case "storage/canceled":
                                    reject("User canceled the upload");
                                    break;
                                case "storage/unknown":
                                    reject("Unknown error occurred, inspect error.serverResponse");
                                    break;
                          }
                        },
                        function() {
                            console.log("Upload successful")
                            // Upload completed successfully, now we can get the download URL
                            uploadTask.snapshot.ref
                                .getDownloadURL()
                                .then(function(downloadURL) {
                                console.log("File available at", downloadURL);
                                resolve({
                                    urls: {
                                        'default': downloadURL
                                    }
                                });
                            });
                        }
                      );
                })
            }
        )
    }
}

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
    left: ${width * 0.15}px
`

class AddPost extends React.Component {
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
            lastModified: new Date(),
            permissions: ["Admin"],
        }
    }

    selectedBoard = {};
    content = '<p></p>';
    options = this.props.role === 'Admin' ? [
        { value: 'announcement', label: '공지사항' },
        { value: 'event', label: '이벤트' },
        { value: 'general', label: '자유게시판' },
        { value: 'grove', label: '대나무숲' },
        { value: 'jobs', label: '취업/인턴' },
    ] : [
        { value: 'event', label: '이벤트' },
        { value: 'general', label: '자유게시판' },
        { value: 'grove', label: '대나무숲' },
        { value: 'jobs', label: '취업/인턴' },
    ]
    submitted = false;

    componentDidMount() {
        if (! this.props.isVerified) {
            window.alert("You are not a verified user. Returning to previous page. \n \n 인증된 계정이 아닙니다. 이전 화면으로 돌아갑니다.");
            window.history.go(-1);
            return;
        }
        if (this.props.boardId == 'announcement') {
            if (this.props.role != 'admin') {
                window.alert("You do not have access to edit this post. \n \n 이 포스트를 수정할 권한이 없습니다.")
                window.history.go(-1);
            }
            this.selectedBoard = { value: 'announcement', label: '공지사항' };
        }
        else if (this.props.boardId = 'event') {
            this.selectedBoard = { value: 'event', label: '이벤트' };
        }
        else if (this.props.boardId = 'general') {
            this.selectedBoard = { value: 'general', label: '자유게시판' };
        }
        else if (this.props.boardId = 'grove') {
            this.selectedBoard = { value: 'grove', label: '대나무숲' };
        }
        else if (this.props.boardId = 'jobs') {
            this.selectedBoard = { value: 'jobs', label: '취업/인턴' };
        }
        this.fetchPost();
        this.setState({
            author: this.props.username,
        },
        () => {
            console.log(this.state)
        })
    }

    fetchPost = () => {
        dbService // Retrieve post information
            .collection('boards').doc(this.props.boardId)
            .collection('posts')
            .doc(this.props.postId)
            .onSnapshot((querySnapshot) => {
                if (querySnapshot.exists) {
                    let data = querySnapshot.data();
                    console.log(data);
                    if (data == undefined) {
                        return;
                    }
                    else {
                        if (data.permissions.includes(this.props.role)/* || data.permissions.includes("User")*/) {
                            console.log("I entered");
                            this.content = data.content;
                            this.setState({
                                title: data.title,
                                content: data.content,
                                author: data.author,
                                isAnnouncement: data.isAnnouncement,
                                isAnonymous: data.isAnonymous,
                                isHidden: data.isHidden,
                                isPinned: data.isPinned,
                                lastModified: data.lastModified,
                                permissions: data.permissions,
                                upvotes: data.upvotes,
                            }, () => {
                                console.log(this.state)
                            })
                        } 
                        else {
                            this.setState({
                                errorMsg: "Access denied-- you do not have permission."
                            })
                        }
                    }
                }
                console.log('post fetching successful')
            })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.submitted = true;
        this.setState({
            content: this.content,
        }, () => {
            if (this.selectedBoard === null) {
                window.alert("Please select a board to post your article. \n \n 게시판을 선택해주세요.")
                return;
            }
            if (this.content === '<p></p>') {
                window.alert("Your post is empty! \n \n 포스트를 작성해주세요.")
                return;
            }
            if (this.state.title.trim() === "" || this.state.title === "Enter title...") {
                window.alert("Please enter title. \n \n 제목을 작성해주세요.")
                return;
            }
            dbService
                .collection('boards').doc(this.selectedBoard.value)
                .collection('posts').doc(this.props.postId)
                .update(this.state);
        })
        
    }

    handleTitleChange = (e) => {
        const target = e.target;
        this.setState({
            title: target.value
        })
        e.preventDefault();
    }

    handleTitleBlur = (e) => {
        e.preventDefault();
        const target = e.target;
        if (target.value.trim() == "") {
            this.setState({
                title: 'Enter title...'
            })
        }
    }

    handleTitleFocus = (e) => {
        e.preventDefault();
        const target = e.target;
        if (target.value == "Enter title...") {
            this.setState({
                title: ""
            })
        }
    }

    handleSelectChange = (selected) => {
        this.selectedBoard = selected;
    }

    render = () => {
        const custom_config = {
            extraPlugins: [ MyCustomUploadAdapterPlugin ],
            toolbar: {
              items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'blockQuote',
                'insertTable',
                '|',
                'imageUpload',
                'mediaEmbed',
                'undo',
                'redo'
              ]
            },
            table: {
              contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
            },
        }

        function MyCustomUploadAdapterPlugin(editor) {
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
                return new Uploader(loader)
            }
        }

        const imageStyle = {
            position: 'absolute',
            top: '12px',
            left: '15px',
            height: '15px',
        }

        

        const customStyle = {
            valueContainer: (provided, state) => ({
                ...provided,
                backgroundColor: this.selectedBoard.value == 'announcement' ? '#FFD3D3' : 
                    this.selectedBoard.value === 'event' ? '#D6F2C4' : 
                    this.selectedBoard.value === 'general' ? '#C4F2EF' : 
                    this.selectedBoard.value === 'grove' ? '#99CEA5' : 
                    this.selectedBoard.value === 'jobs' ? '#F2CEFF' : '#0B121C',
            }),
            option: (provided, state) => ({
                ...provided,
                backgroundColor: '#18202B',
                color: 'white',
            }),
            control: (provided, state) => ({
                ...provided,                
                width: 'inherit',
                fontSize: '10px',
                backgroundColor: this.selectedBoard.value == 'announcement' ? '#FFD3D3' : 
                    this.selectedBoard.value === 'event' ? '#D6F2C4' : 
                    this.selectedBoard.value === 'general' ? '#C4F2EF' : 
                    this.selectedBoard.value === 'grove' ? '#99CEA5' : 
                    this.selectedBoard.value === 'jobs' ? '#F2CEFF' : '#0B121C',
                color: 'white',
                borderRadius: '0px',
                border: '1px solid white'
            }),
            singleValue: (provided, state) => {
                return { 
                    ...provided,
                    fontSize: '10px',
                    backgroundColor: this.selectedBoard.value == 'announcement' ? '#FFD3D3' : 
                    this.selectedBoard.value === 'event' ? '#D6F2C4' : 
                    this.selectedBoard.value === 'general' ? '#C4F2EF' : 
                    this.selectedBoard.value === 'grove' ? '#99CEA5' : 
                    this.selectedBoard.value === 'jobs' ? '#F2CEFF' : '#0B121C',
                    color: 'black'
                };
            },
            menu: (provided, state) => {
                return { 
                    ...provided,
                    backgroundColor: '#18202B',
                    color: 'white'
                };
            },
            menuList: (provided, state) => {
                return { 
                    ...provided,
                    backgroundCcolor: '#18202B',
                    color: 'white'
                };
            },
            indicatorSeparator: (provided, state) => {
                return {
                    ...provided,
                    backgroundColor: '#0B121C',
                    border: 'none'
                }
            }
        }

        const setAnnonymous = () => {
            console.log("Annonymouse set")
            this.setState({
                isAnonymous: ! this.state.isAnonymous,
            })
        }

        const setPinned = () => {
            console.log("Pinned set")
            this.setState({
                
                isPinned: ! this.state.isPinned,
            })
        }
        const setHidden = () => {
            console.log("Hidden set")
            this.setState({
                isHidden: ! this.state.isHidden,
            })
        }
        const setAnnouncement = () => {
            console.log("Announcement set")
            this.setState({
                isAnnouncement: ! this.state.isAnnouncement,
            })
        }
        const handleBackClick = (e) => {
            e.preventDefault();
            window.history.go(-1);
        }

        return (
            <Container>
                <Navbar />
                <Back><img src={'https://firebasestorage.googleapis.com/v0/b/nus-kusa-website.appspot.com/o/source%2FwhiteArrow.png?alt=media&token=efa6ec9b-d260-464e-bf3a-77a73193055f'} style={imageStyle} onClick={handleBackClick}/>Back</Back>
                <SelectContainer><Select options={this.options} value={this.selectedBoard} styles={customStyle} onChange={this.handleSelectChange}/></SelectContainer>
                <Form><Title type='text' key="titleInput" value={this.state.title} onChange={this.handleTitleChange} onBlur={this.handleTitleBlur} onFocus={this.handleTitleFocus}/></Form>
                <Editor>
                    <CKEditor
                        editor={ ClassicEditor }
                        data = {this.content}
                        config={custom_config}
                        onChange={ ( event, editor ) => {
                            this.content = editor.getData();
                        } }
                        onReady={(editor) => {
                            editor.editing.view.change((writer) => {
                                writer.setStyle(
                                    "height",
                                    `${(height * 0.9) - 380}px`,
                                    editor.editing.view.document.getRoot()
                                );
                            })
                        }}
                    />
                </Editor>
                <CheckBoxContainer>
                    {this.props.role == 'Admin' ? <Checkbox label="Anonymous" setter={setAnnonymous} init={this.state.isAnonymous}/> : this.selectedBoard.value == 'grove' ? <Checkbox label='Anonymous'/> : <div/>}
                    {this.props.role == 'Admin' ? <Checkbox label='Pinned' setter={setPinned} init={this.state.isPinned}/> : <div/>}
                    {this.props.role == 'Admin' ? <Checkbox label='Hidden' setter={setHidden} init={this.state.isHidden}/> : <div/>}
                    {this.props.role == 'Admin' ? <Checkbox label='Announcement' setter={setAnnouncement} init={this.state.isAnnouncement}/> : <div/>}
                </CheckBoxContainer>
                <Submit onClick={this.handleSubmit} submitted={this.submitted}>Post</Submit>
            </Container>
        )
    }
}

export default AddPost;
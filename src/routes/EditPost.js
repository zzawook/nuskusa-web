import React from "react";
import Navbar from "../components/Navbar";
import { dbService } from "../utils/FirebaseFunctions";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class EditPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            author: "tempUser",
            isAnnouncement: false,
            isAnonymous: false,
            isPinned: false,
            isHidden: false,
            lastModified: new Date(),
            upvotes: 0,
            permissions: ['Admin'],
        }
    }

    componentDidMount() {
        this.fetchPost();
    }

    fetchPost = () => {
        dbService // Retrieve post information
            .collection('boards').doc(this.props.boardId)
            .collection('posts')
            .doc(this.props.postId)
            .onSnapshot((querySnapshot) => {
                if (querySnapshot.exists) {
                    console.log(querySnapshot.data())
                    let data = querySnapshot.data();
                    console.log(data);
                    if (data == undefined) {
                        return;
                    }
                    else {
                        console.log(data.permissions)
                        console.log(this.props.role)
                        console.log(data.permissions.includes(this.props.role))
                        if (data.permissions.includes(this.props.role) || data.permissions.includes("User")) {
                            console.log("Entered")
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

    handleSubmit = (event) => {
        event.preventDefault();
        dbService
            .collection('boards').doc(this.props.boardId)
            .collection('posts').doc(this.props.postId).update(this.state);
    }

    render = () => {
        return (
            <div>
                <Navbar />
                <CKEditor
                    editor={ ClassicEditor }
                    data = {this.state.content}
                    onReady={ editor => {
                        // "editor" can be stored here and used when it is needed.
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        this.setState({
                            content: data,
                        })
                    } }
                    onBlur={ ( event, editor ) => {
                        const data = editor.getData();
                        if (data == "" || data == "<p></p>") {
                            this.setState({
                                content: '<p>Start making your post here!</p>'
                            })
                        }
                    } }
                    onFocus={ ( event, editor ) => {
                        const data = editor.getData();
                        if (data == "<p>Start making your post here!</p>") {
                            this.setState({
                                content: "<p></p>"
                            })
                        }
                    } }
                />
                <button onClick={this.handleSubmit} >Submit</button>
            </div>
        )
    }
}

export default EditPost;
import React from "react";
import Navbar from "../components/Navbar";
import { dbService, storageService } from "../utils/FirebaseFunctions";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import firebase from 'firebase';

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

class AddPost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: "<p>Start making your post here!</p>",
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

    componentDidMount() {
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        dbService
            .collection('boards').doc(this.props.boardId)
            .collection('posts')
            .add(this.state);
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
            }
        }

        function MyCustomUploadAdapterPlugin(editor) {
            editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
                return new Uploader(loader)
            }
        }

        return (
            <div>
                <Navbar />
                <CKEditor
                    editor={ ClassicEditor }
                    data = '<p>Start making your post here!</p>'
                    onReady={ editor => {
                        // "editor" can be stored here and used when it is needed.
                    } }
                    config={custom_config}
                    onChange={ ( event, editor ) => {
                        //event.preventDefault();
                        const data = editor.getData();
                        this.setState({
                            content: data,
                        })
                    } }
                    onBlur={ ( event, editor ) => {
                        //event.preventDefault()
                        //const data = editor.getData();
                        
                    } }
                    onFocus={ ( event, editor ) => {
                        //event.preventDefault()
                        //const data = editor.getData();
                        
                    } }
                />
                <button onClick={this.handleSubmit} >Submit</button>
            </div>
        )
    }
}

export default AddPost;
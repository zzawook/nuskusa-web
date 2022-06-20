import React from 'react';
import Avatar from 'react-avatar-edit'
import styled from 'styled-components';
import { FirebaseUser } from '../../types/FirebaseUser';
import { authService, dbService, storageService } from '../../utils/firebaseFunctions';
import firebase from 'firebase';

type PickerProps = {
  firebaseUserData: FirebaseUser
}

type PickerState = {
  preview: any,
  src: any,
}

class ProfilePicker extends React.Component<PickerProps, PickerState> {
  constructor(props: PickerProps) {
    super(props)
    this.state = {
      preview: null,
      src: ""
    }
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onBeforeFileLoad = this.onBeforeFileLoad.bind(this)
  }

  onClose() {
    this.setState({ preview: null })
  }

  onCrop(preview: any) {
    this.setState({
      preview,
    })
  }

  onBeforeFileLoad(elem: any) {
    if (elem.target.files[0].size > 5242880) {
      alert("File is too big!");
      elem.target.value = "";
    };
    const supportedTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (!supportedTypes.includes(elem.target.files[0].type)) {
      alert("File type is not supported! You must upload an image file.");
      elem.target.value = "";
    }
  }

  handlePictureSubmit = (event: any) => {
    event.preventDefault();
    const uid = authService.currentUser?.uid as string;
    if (this.state.preview) {
      const uploadTask = storageService
        .ref(`users/${uid}`)
        .putString(this.state.preview, 'data_url');
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => { 
          storageService.ref('users')
          .child(uid)
          .getDownloadURL()
          .then((url) => {
            dbService.collection('users').doc(uid).update({
              profilePictureURL: url
            });
            this.setState({
              preview: null,
            })
          })
        },
      )
    }
    this.setState({ preview: null })
  }

  render() {
    const SubmitButton = styled.button`

    `
    return (
      <div>
        <Avatar
          width={390}
          height={300}
          onCrop={this.onCrop}
          onClose={this.onClose}
          onBeforeFileLoad={this.onBeforeFileLoad}
          src={this.state.src}
        />
        {
          this.state.preview
            ?
            <img src={this.state.preview} alt="Preview" />
            :
            <></>
        }
        <SubmitButton onClick={this.handlePictureSubmit} disabled={this.state.preview === null} >Submit Profile Image</SubmitButton>

      </div>
    )
  }
}

export default ProfilePicker;
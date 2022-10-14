import React from 'react';
import Avatar from 'react-avatar-edit'
import { User } from '../../types/User';

type PickerProps = {
  userData: User
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
  }

  onClose() {
    this.setState({ preview: null })
  }

  onCrop(preview: any) {
    this.setState({
      preview,
    })
  }

  render() {
    return (
      <div>
        <Avatar
          width={390}
          height={300}
          onCrop={this.onCrop}
          onClose={this.onClose}
          src={this.state.src}
        />
        {
          this.state.preview
            ?
            <img src={this.state.preview} alt="Preview" />
            :
            <></>
        }
      </div>
    )
  }
}

export default ProfilePicker;
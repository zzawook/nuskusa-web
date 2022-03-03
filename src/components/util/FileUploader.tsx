import React from 'react';
import styled from 'styled-components';
import { Headline } from '../../utils/ThemeText';

const Container = styled.div`
    display: flex;
    flex-direction: column;
`

const Button = styled.button`
    background: #BDA06D;
    width: 96px;
    height: 48px;
    margin: 10px auto;
    border: none;
    text-decoration: none;
    :hover {
        transform: scale(1.05);
    };
    text-align: center;
    color: white;
    font-weight: 600;
    font-size: 14px;
`

const FileUploader = (props: any) => {
    // Create a reference to the hidden file input element
    const hiddenFileInput = React.useRef<HTMLInputElement>(null);

    // Programatically click the hidden file input element
    // when the Button component is clicked
    const handleClick = (event: any) => {
        if (hiddenFileInput.current) {
            hiddenFileInput.current.click();
        }
    };
    // Call a function (passed as a prop from the parent component)
    // to handle the user-selected file 
    return (
        <Container>
            <Button onClick={handleClick} type="button">
                Upload
            </Button>
            <input
                required
                name="verificationFile"
                type="file"
                ref={hiddenFileInput}
                onChange={props.onChange}
                style={{ width: "0px", height: "0px" }}
            />
            {
                props.verificationFile ?
                    <Headline color="black" style={{ margin: "0px auto" }}>{props.verificationFile.name}</Headline>
                    :
                    <Headline color="black" style={{ margin: "0px auto" }}>No File Uploaded!</Headline>
            }
        </Container>
    );
}
export default FileUploader;
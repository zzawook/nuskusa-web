import React from 'react'
import styled from 'styled-components'
import { authService, dbService, storageService } from '../../utils/firebaseFunctions'
import { darkTheme, Theme } from '../../utils/ThemeColor'
import { Headline } from '../../utils/ThemeText'
import FileUploader from '../util/FileUploader'

type FormProps = {

}

type FormState = {
    fullname: string,
    schoolEmail: string,
    major: string,
    faculty: string,
    enrolledYear: string,
    verificationFile: File | undefined,
    theme: Theme,
    error: string,
}

const Wrapper = styled.div`
    margin: 0 10%;
    display: flex;
    flex-direction: column;
`
const FormContentWrapper = styled.div`
    display: flex;
    flex-direction: row;
`
const FormInputWrapper = styled.div`
    display: flex;
    flex-direction: column;
`
const FormInput = styled.input`
    border: none;
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
    margin: 25px 0;
    font-size: 16px;
    line-height: 24px;
    font-weight: 700;
`
const GoldenInput = styled.input`
    margin: auto;
    margin-top: 50%;
    background: #BDA06D;
    filter: drop-shadow(0px 0px 20px rgba(189, 160, 109, 0.6));
    width: 10vw;
    height: 7.5vh;
    border: none;
    text-decoration: none;
    :hover {
        transform: scale(1.05);
    };
    text-align: center;
    color: white;
    font-weight: 800;
    font-size: 22px;
`

class VerificationForm extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props)
        this.handleChange.bind(this)
        this.handleSubmit.bind(this)
        this.state = {
            fullname: "",
            schoolEmail: "",
            major: "",
            faculty: "",
            enrolledYear: "",
            verificationFile: undefined,
            theme: darkTheme,
            error: "",
        }
    }

    handleChange = (event: any) => {
        event.preventDefault()
        const value = event.target.value
        if (event.target.name === "fullname") {
            this.setState({
                fullname: value
            })
        }
        else if (event.target.name === 'schoolEmail') {
            this.setState({
                schoolEmail: value
            })
        }
        else if (event.target.name === 'major') {
            this.setState({
                major: value
            })
        }
        else if (event.target.name === 'faculty') {
            this.setState({
                faculty: value
            })
        }
        else if (event.target.name === 'enrollmentYear') {
            this.setState({
                enrolledYear: value
            })
        }
    }

    handleFileChange = (event: any) => {
        event.preventDefault();
        if (event.target.files[0]) {
            this.setState({
                verificationFile: event.target.files[0]
            })
        }
    }

    checkFile = (event: any) => {
        event.preventDefault();
        if (!this.state.verificationFile) {
            this.setState({
                error: "You must select a file!",
            })
        }
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();

        const verificationRef = dbService.collection("verifications").doc(authService.currentUser?.uid);
        if (this.state.verificationFile) {
            const uploadTask = storageService
                .ref(`verifications/${verificationRef.id}`)
                .put(this.state.verificationFile);

            uploadTask.on('state_changed',
                (snapshot) => { },
                (error) => {
                    console.error(error);
                },
                () => {
                    if (this.state.verificationFile) {
                        storageService.ref('verifications')
                            .child(verificationRef.id)
                            .getDownloadURL()
                            .then(async (url) => {
                                const batch = dbService.batch()
                                try {
                                    const userRef = dbService.collection("users").doc(authService.currentUser?.uid)
                                    batch.set(verificationRef, {
                                        downloadURL: url,
                                        owner: authService.currentUser?.email,
                                        ownerUID: authService.currentUser?.uid,
                                        fullname: this.state.fullname,
                                        schoolEmail: this.state.schoolEmail,
                                        enrolledYear: this.state.enrolledYear,
                                        major: this.state.major,
                                        faculty: this.state.faculty
                                    });
                                    batch.update(userRef, {
                                        isVerified: true
                                    });
                                    batch.commit();
                                } catch (e) {
                                    console.error(e)
                                }
                            })
                    }
                }
            )

        }
    }

    render = () => {
        return (
            <Wrapper>
                <FormContentWrapper>
                    <form id="myForm" style={{ display: "flex", flexDirection: "row" }} onSubmit={this.handleSubmit}>
                        <FormInputWrapper>
                            <FormInput
                                required
                                name="fullname"
                                type="text"
                                placeholder="이름 / Name"
                                value={this.state.fullname}
                                onChange={this.handleChange}>
                            </FormInput>
                            <FormInput
                                required
                                name="schoolEmail"
                                type="email"
                                placeholder="학교 이메일 / School Email"
                                value={this.state.schoolEmail}
                                onChange={this.handleChange}>
                            </FormInput>
                            <FormInput
                                required
                                name="major"
                                placeholder="전공 / Major"
                                value={this.state.major}
                                onChange={this.handleChange}>
                            </FormInput>
                            <FormInput
                                required
                                name="faculty"
                                placeholder="학과 / Faculty"
                                value={this.state.faculty}
                                onChange={this.handleChange}>
                            </FormInput>
                            <FormInput
                                required
                                name="enrollmentYear"
                                placeholder="입학 연도 / Enrollment Year"
                                value={this.state.enrolledYear}
                                onChange={this.handleChange}>
                            </FormInput>
                        </FormInputWrapper>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <Headline color="black" style={{ margin: "0px auto", textAlign: "center" }} >
                                Upload Your NUS Student Card<br />(NOT Singapore Student Pass!)
                            </Headline>
                            <FileUploader
                                required
                                verificationFile={this.state.verificationFile}
                                onChange={this.handleFileChange}
                            >
                            </FileUploader>
                            <Headline color="red" style={{ margin: "auto", height: "40vh" }}>{this.state.error}</Headline>
                        </div>
                        <GoldenInput type="submit" onClick={this.checkFile} onSubmit={this.handleSubmit} style={{ marginBottom: '5%' }}  value="Submit" />
                    </form>
                </FormContentWrapper>
            </Wrapper>
        )
    }
}

export default VerificationForm
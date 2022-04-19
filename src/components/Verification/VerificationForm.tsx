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
    success: string,
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
            success: "",
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
        const file = event.target.files[0];
        console.log(file)
        if (file) {
            const fileTypeArray = file.type.split("/");
            if (file.size > 5000000) {
                this.setState({
                    error: "File size must be 5 MB or less!",
                })
                return false;
            } else if (fileTypeArray[0] !== "image") {
                this.setState({
                    error: "Not an image; acceptable types are png, jpg, and jpeg.",
                })
                return false;
            } else if (fileTypeArray[0] === "image") {
                const validImageFormats = ["png", "jpeg"];
                if (!validImageFormats.includes(fileTypeArray[1])) {
                    this.setState({
                        error: "Not an image; acceptable types are png, jpg, and jpeg.",
                    })
                    return false;
                }
                else {
                    this.setState({
                        verificationFile: file,
                    })
                }
            } else {
                this.setState({
                    error: "Unknown error occurred while uploading file.",
                })
                return false;
            }
        }
    }

    checkFile = (event: any) => {
        event.preventDefault();
        if (!this.state.verificationFile) {
            this.setState({
                error: "You must select a file!",
            })
            return false;
        }
        return true;
    }

    handleSubmit = async (event: any) => {
        event.preventDefault();
        if (!this.checkFile(event)) {
            return;
        }
        const verificationRef = dbService.collection("verifications").doc(authService.currentUser?.uid);
        if (this.state.verificationFile) {
            const uploadTask = storageService
                .ref(`verifications/${verificationRef.id}`)
                .put(this.state.verificationFile);
            console.log(uploadTask)
            uploadTask.on('state_changed',
                (snapshot: any) => { },
                (error: any) => {
                    console.error(error);
                    this.setState({
                        error: "File upload has failed.",
                    })
                },
                () => {
                    if (this.state.verificationFile) {
                        storageService.ref('verifications')
                            .child(verificationRef.id)
                            .getDownloadURL()
                            .then(async (url: any) => {
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
                                    await batch.commit().then(() => {
                                        this.setState({
                                            success: "업로드 성공! 인증이 며칠 내로 완료됩니다. It will take a few days to verify.",
                                        })
                                    }).catch(() => {
                                        this.setState({
                                            error: "업로드 실패. 잠시 후 다시 시도해주세요. Upload failed. Please try again later.",
                                        })
                                    });
                                } catch (e: any) {
                                    console.error(e)
                                    this.setState({
                                        error: e.toString(),
                                    })
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
                                Upload Your NUS Student Card<br />(NOT Green Card!)
                            </Headline>
                            <FileUploader
                                required
                                verificationFile={this.state.verificationFile}
                                onChange={this.handleFileChange}
                            >
                            </FileUploader>
                            <Headline color="red" style={{ margin: "auto", height: "40vh" }}>{this.state.error}</Headline>
                        </div>
                        <GoldenInput type="submit" onClick={this.handleSubmit} style={{ marginBottom: '5%' }} value="Submit" />
                    </form>
                </FormContentWrapper>
            </Wrapper>
        )
    }
}

export default VerificationForm
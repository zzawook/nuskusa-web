import React from 'react'
import styled from 'styled-components'
import { authService, dbService, storageService } from '../../utils/firebaseFunctions'
import { DisplayMedium } from '../../utils/ThemeText'

type FormProps = {

}

type FormState = {
    fullname: string,
    schoolEmail: string,
    major: string,
    faculty: string,
    enrolledYear: string,
    verificationFile: File | undefined,
    isVisible: boolean
}

const Wrapper = styled.form`
    margin: 0 10%;
    display: flex;
    flex-direction: column;
`
const FormContentWrapper = styled.div`
    display: flex;
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
const GoldenButton = styled.button`
    margin: auto;
    margin-right: 0;
    margin-top: 40%;
    background: #BDA06D;
    filter: drop-shadow(0px 0px 20px rgba(189, 160, 109, 0.6));
    width: 10vw;
    height: 7.5vh;
    border: none;
    text-decoration: none;
    :hover {
        transform: scale(1.05);
    }
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
            isVisible: true
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

    handleSubmit = async (event: any) => {
        event.preventDefault();
        if (this.state.verificationFile) {
            const uploadTask = storageService
                .ref(`verifications/${this.state.verificationFile.name}`)
                .put(this.state.verificationFile);

            uploadTask.on('state_changed',
                (snapshot) => { },
                (error) => {
                    console.error(error);
                },
                () => {
                    if (this.state.verificationFile) {
                        storageService.ref('verifications')
                            .child(this.state.verificationFile.name)
                            .getDownloadURL()
                            .then(async (url) => {
                                const batch = await dbService.batch()
                                try {
                                    const verificationRef = dbService.collection("verifications").doc()
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
                                    })
                                    batch.update(userRef, {
                                        isVerified: true
                                    })
                                    batch.commit()
                                } catch (e) {
                                    console.error(e)
                                }
                            })
                    }

                }
            )
            this.setState({
                isVisible: false
            })
        }
    }

    render = () => {
        return (
            <>{this.state.isVisible ?
                <Wrapper>
                    <FormContentWrapper>
                        <FormInputWrapper>
                            <FormInput
                                required
                                name="fullname"
                                type="text"
                                placeholder="이름/Name"
                                value={this.state.fullname}
                                onChange={this.handleChange}>
                            </FormInput>
                            <FormInput
                                required
                                name="schoolEmail"
                                type="email"
                                placeholder="학교 이메일/School Email"
                                value={this.state.schoolEmail}
                                onChange={this.handleChange}>
                            </FormInput>
                            <FormInput
                                required
                                name="major"
                                placeholder="전공/Major"
                                value={this.state.major}
                                onChange={this.handleChange}>
                            </FormInput>
                            <FormInput
                                required
                                name="faculty"
                                placeholder="학과/Faculty"
                                value={this.state.faculty}
                                onChange={this.handleChange}>
                            </FormInput>
                            <FormInput
                                required
                                name="enrollmentYear"
                                placeholder="입학 연도/Enrollment Year"
                                value={this.state.enrolledYear}
                                onChange={this.handleChange}>
                            </FormInput>
                        </FormInputWrapper>
                        <FormInput
                            required
                            name="verificationFile"
                            type="file"
                            onChange={this.handleFileChange}
                            style={{ border: "none", justifySelf: "right", marginLeft: "20px" }}>
                        </FormInput>
                        <GoldenButton onClick={this.handleSubmit}>
                            <DisplayMedium color={"#FFFFFF"}>
                                Submit
                            </DisplayMedium>
                        </GoldenButton>
                    </FormContentWrapper>
                </Wrapper>
                :
                <></>
            }</>

        )
    }
}

export default VerificationForm
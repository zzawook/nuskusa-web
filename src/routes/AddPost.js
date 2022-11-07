import React from "react";
import Navbar from "../components/Navbar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import firebase from "firebase";
import styled from "styled-components";
import Select from "react-select";
import "../components/Post/custom.css";
import Checkbox from "../components/AddPost/Checkbox";

class Uploader {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then((file) => {
      return new Promise(async (resolve, reject) => {
        const formData = new FormData()
        formData.append('file', file)
        const url = process.env.REACT_APP_HOST + "/api/post/uploadPostAttachment/" + file.name
        const response = await fetch(url, {
          method: "POST",
          body: formData,
        })

        if (response.status == 200) {
          const json = await response.json()
          resolve({
            urls: {
              default: json.url,
            },
          });
        }
        else {
          reject("An error has occurred");
        }
      });
    });
  }
}

const height = window.innerHeight;
const width = window.innerWidth;

const Form = styled.form`
  position: absolute;
  top: ${height * 0.1 + 85}px;
  left: ${width * 0.15 + 150}px;
`;
const Title = styled.input`
  left: 20px;
  color: ${(props) => (props.value == "Enter title..." ? "gray" : "white")};
  font-size: 14px;
  width: 400px;
  height: 40px;
  background-color: #0b121c;
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid white;
  outline: none;
`;
const Container = styled.div`
  background: #0b121c;
  width: ${width}px;
  height: ${height}px;
  z-index: 100;
`;
const Back = styled.button`
  width: 95px;
  height: 41px;
  background-color: #18202b;
  position: absolute;
  top: ${height * 0.1 + 20}px;
  left: 15%;
  padding-top: 0px;
  color: #bfbfbf;
  border: none;
  font-weight: 600;
  padding-left: 30px;
  cursor: pointer;
  :hover {
    color: white;
  }
`;
const Editor = styled.div`
  position: absolute;
  top: ${height * 0.1 + 150}px;
  left: 15%;
  width: 70%;
  height: 60%;
`;
const Submit = styled.button`
  position: absolute;
  bottom: 50px;
  left: 15%;
  width: 190px;
  height: 63px;
  background-color: #bda06d;
  font-weight: 700;
  font-size: 17px;
  color: white;
`;
const SelectContainer = styled.div`
  position: absolute;
  width: 130px;
  height: 34px;
  left: 15%;
  top: ${height * 0.1 + 85}px;
  font-size: 10px;
  background-color: #0b121c;
`;
const CheckBoxContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 50px;
  width: ${450}px;
  position: absolute;
  bottom: 110px;
  left: ${width * 0.15}px;
`;
const LoadingBlocker = styled.div`
  opacity: 0.5;
  background-color: black;
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000000;
`;
const LoadingText = styled.span`
  background-color: black;
  color: white;
  font-size: 16px;
  font-weight: 600;
  z-index: 1000000;
`;
class AddPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      state: {
        title: "Enter title...",
        content: `<p></p>`,
        isAnnouncement: false,
        isAnonymous: false,
        isPinned: false,
        isHidden: false,
        lastModified: new Date(),
      },
      selectedBoard: this.props.boardId,
      boardData: [],
      boardDataProcessed: [],
      dummy: false,
      bc: "#FFFFFF",
      loading: false,
    };
  }

  content = "<p></p>";

  componentDidMount = async () => {
    const boardProcessed = [];
    const boardRaw = [];
    const url = process.env.REACT_APP_HOST + "/api/board/getEditableBoard"
    const response = await fetch(url, {
      method: "GET"
    })

    if (response.status == 200) {
      const boards = await response.json();

      for (let i = 0; i < boards.length; i++) {
        let board = boards[i]
        boardProcessed.push({
          value: board.boardId,
          label: board.title,
        })
        boardRaw.push(board);
      }
      let backgroundColor = "#FFFFFF";
      if (boardRaw.find((elem) => elem.boardId == this.props.boardId)) {
        backgroundColor = boardRaw.find(
          (elem) => elem.boardId == this.props.boardId
        ).boardColor;
      }
      const stateCopy = this.state.state;
      stateCopy.author = this.props.userData.name;

      this.setState((prevState) => {
        return {
          state: stateCopy,
          boardDataProcessed: boardProcessed,
          boardData: boardRaw,
          selectedBoard: this.props.boardId,
          bc: backgroundColor,
        };
      });
    }
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    if (this.state.selectedBoard === null) {
      window.alert(
        "Please select a board to post your article. \n \n 게시판을 선택해주세요."
      );
      return;
    }
    if (this.content === "<p></p>") {
      window.alert("Your post is empty! \n \n 포스트를 작성해주세요.");
      return;
    }
    if (
      this.state.state.title.trim() === "" ||
      this.state.state.title === "Enter title..."
    ) {
      window.alert("Please enter title. \n \n 제목을 작성해주세요.");
      return;
    }
    if (this.state.state.title.length > 30) {
      window.alert(
        "Your title is too long. Please ensure it's below 30 characters \n \n 제목이 너무 깁니다. 30자 이하로 제한해주세요."
      );
      return;
    }
    this.setState({
      loading: true,
    });
    const url = process.env.REACT_APP_HOST + "/api/post/addPost/" + this.state.selectedBoard;
    const postObject = {
      title: this.state.state.title,
      content: this.content,
      isAnnouncement: this.state.state.isAnnouncement,
      isAnonymous: this.state.state.isAnonymous,
      isHidden: this.state.state.isHidden,
      isPinned: this.state.state.isPinned,
      isEvent: false,
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(postObject),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (response.status == 201) {
      const postId = await response.text();
      this.setState({
        loading: false,
      });
      window.location.href = "#/boards/" + this.state.selectedBoard + "/" + postId;
      return;
    }
    else {
      const errMsg = await response.text();
      window.alert("게시글 업로드 도중 문제가 발생하였습니다." + errMsg);
    }
    const stateCopy = this.state.state;
    stateCopy.content = this.content;
    stateCopy.title = "Enter title...";
    this.setState({
      state: stateCopy,
      loading: false,
    });
  };

  handleTitleChange = (e) => {
    e.preventDefault();
    const target = e.target;
    const prevState = this.state.state;
    prevState.title = target.value;
    this.setState({
      state: prevState,
    });
  };

  handleTitleBlur = (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.value.trim() == "") {
      const prevState = this.state.state;
      prevState.title = "Enter title...";
      this.setState({
        state: prevState,
      });
    }
  };

  handleTitleFocus = (e) => {
    e.preventDefault();
    const target = e.target;
    if (target.value == "Enter title...") {
      const prevState = this.state.state;
      prevState.title = "";
      this.setState({
        state: prevState,
      });
    }
  };

  handleSelectChange = (selected) => {
    let backgroundColor = "#FFFFFF";
    if (this.state.boardData.find((elem) => elem.boardId == selected.value)) {
      backgroundColor = this.state.boardData.find(
        (elem) => elem.boardId == selected.value
      ).boardColor;
    }
    this.setState({
      selectedBoard: selected.value,
      bc: backgroundColor,
    });
  };

  componentDidUpdate() {
  }

  render = () => {
    const custom_config = {
      extraPlugins: [MyCustomUploadAdapterPlugin],
      toolbar: {
        items: [
          "heading",
          "|",
          "bold",
          "italic",
          "link",
          "bulletedList",
          "numberedList",
          "|",
          "blockQuote",
          "insertTable",
          "|",
          "imageUpload",
          "undo",
          "redo",
        ],
      },
      table: {
        contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
      },
    };

    function MyCustomUploadAdapterPlugin(editor) {
      editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
        return new Uploader(loader);
      };
    }

    const imageStyle = {
      position: "absolute",
      top: "12px",
      left: "15px",
      height: "15px",
    };

    const customStyle = {
      valueContainer: (provided, state) => ({
        ...provided,
        backgroundColor: this.state.bc,
      }),
      option: (provided, state) => ({
        ...provided,
        backgroundColor: "#18202B",
        color: "white",
      }),
      control: (provided, state) => ({
        ...provided,
        width: "inherit",
        fontSize: "10px",
        backgroundColor: this.state.bc,
        color: "white",
        borderRadius: "0px",
        border: "1px solid white",
      }),
      singleValue: (provided, state) => {
        return {
          ...provided,
          fontSize: "10px",
          backgroundColor: this.state.bc,
          color: "black",
        };
      },
      menu: (provided, state) => {
        return {
          ...provided,
          backgroundColor: "#18202B",
          color: "white",
        };
      },
      menuList: (provided, state) => {
        return {
          ...provided,
          backgroundCcolor: "#18202B",
          color: "white",
        };
      },
      indicatorSeparator: (provided, state) => {
        return {
          ...provided,
          backgroundColor: "#0B121C",
          border: "none",
        };
      },
    };

    /*
    const setAnnonymous = () => {
        const copy = this.state.state;
        copy.isAnonymous = ! copy.isAnonymous
        this.setState({
            state: copy,
        })
    }
    */

    const setPinned = () => {
      const copy = this.state.state;
      copy.isPinned = !copy.isPinned;
      this.setState({
        state: copy,
      });
    };
    const setHidden = () => {
      const copy = this.state.state;
      copy.isHidden = !copy.isHidden;
      this.setState({
        state: copy,
      });
    };
    /*
    const setAnnouncement = () => {
        const copy = this.state.state;
        copy.isAnnouncement = !copy.isAnnouncement
        this.setState({
            copy
        })
    }
    */
    return (
      <>
        {this.state.loading ? (
          <LoadingBlocker>
            <LoadingText>거의 다 됐어요! 조금만 기다려주세요 :)</LoadingText>
          </LoadingBlocker>
        ) : (
          <></>
        )}
        <Container>
          <Navbar userData={this.props.userData} />
          <Back onClick={() => window.history.back()}>
            <img
              src={
                "https://nuskusa-storage.s3.ap-southeast-1.amazonaws.com/source/whiteArrow.png"
              }
              style={imageStyle}
            />
            Back
          </Back>
          <SelectContainer>
            <Select
              options={this.state.boardDataProcessed}
              styles={customStyle}
              onChange={this.handleSelectChange}
              value={this.state.boardDataProcessed.find(
                (data) => data.value == this.state.selectedBoard
              )}
            />
          </SelectContainer>
          <Form>
            <Title
              type="text"
              key="titleInput"
              value={this.state.state.title}
              onChange={this.handleTitleChange}
              onBlur={this.handleTitleBlur}
              onFocus={this.handleTitleFocus}
            />
          </Form>
          <Editor>
            <CKEditor
              editor={ClassicEditor}
              data={this.content}
              config={custom_config}
              onChange={(event, editor) => {
                this.content = editor.getData();
              }}
              onReady={(editor) => {
                editor.editing.view.change((writer) => {
                  writer.setStyle(
                    "height",
                    `${height * 0.9 - 380}px`,
                    editor.editing.view.document.getRoot()
                  );
                  writer.setStyle(
                    "color",
                    "#0B121C",
                    editor.editing.view.document.getRoot()
                  );
                });
              }}
              id={"myCKEditor"}
            />
          </Editor>
          <CheckBoxContainer>
            {this.props.userData.role == "Admin" ? (
              <Checkbox
                label="Pinned"
                setter={setPinned}
                init={this.state.state.isPinned}
              />
            ) : (
              <div />
            )}
            {this.props.userData.role == "Admin" ? (
              <Checkbox
                label="Hidden"
                setter={setHidden}
                init={this.state.state.isHidden}
              />
            ) : (
              <div />
            )}
          </CheckBoxContainer>
          <Submit onClick={this.handleSubmit}>Post</Submit>
        </Container>
      </>
    );
  };
}

/*
{this.props.userData.role == 'Admin' ? <Checkbox label="Anonymous" setter={setAnnonymous} init={false} /> : this.state.selectedBoard == 'grove' ? <Checkbox label='Anonymous' setter={setAnnonymous} init={true} /> : <div />}
{this.props.userData.role == 'Admin' ? <Checkbox label='Announcement' setter={setAnnouncement} init={false}/> : <div />}
*/

export default AddPost;

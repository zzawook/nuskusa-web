import styled from "styled-components";

const Title = styled.p`
    position: relative;
    text-align: center;
    font-style: normal;
    font-weight: bold;
    font-size: 42px;
    line-height: 49px;
    text-align: left;

    color: ${props => props.color};
`
const SectionTitle = styled.p`
    margin-left: 10%;
    margin-right: 10%;
    font-size: 20px;
    font-weight: 800;
    word-wrap: break-word;
    box-sizing: border-box;
    text-align: left;
    color: ${props => props.color};
`

const SectionDescription = styled.p`
    margin-left: 10%;
    margin-right: 10%;
    font-size: 14px;
    font-weight: 700;
    word-wrap: break-word;
    box-sizing: border-box;
    text-align: left;
`


export { Title, SectionTitle, SectionDescription }
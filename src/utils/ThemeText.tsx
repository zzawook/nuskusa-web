import styled from "styled-components";

const Title = styled.p`
    font-style: normal;
    font-weight: bold;
    font-size: 42px;
    line-height: 42px;
    text-align: left;

    color: ${props => props.color};
`

const SectionTitle = styled.p`
    margin-left: 10%;
    margin-right: 10%;
    font-size: 20px;
    font-weight: bold;
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
    color: ${props => props.color}
`


export { Title, SectionTitle, SectionDescription }
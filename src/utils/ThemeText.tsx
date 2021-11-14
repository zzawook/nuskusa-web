import styled from "styled-components";

const DisplayLarge = styled.p` // Title
    font-style: normal;
    font-weight: bold;
    font-size: 40px;
    line-height: 48px;
    text-align: left;
    color: ${props => props.color};
`

const DisplayMedium = styled.p` // Section Title
    margin-left: 10%;
    margin-right: 10%;
    font-size: 22px;
    line-height: 30px;
    font-weight: bold;
    word-wrap: break-word;
    box-sizing: border-box;
    text-align: left;
    color: ${props => props.color};
`

const DisplaySmall = styled.p` // Section Description
    margin-left: 10%;
    margin-right: 10%;
    font-size: 18px;
    line-height: 24px;
    font-weight: 700;
    word-wrap: break-word;
    box-sizing: border-box;
    text-align: left;
    color: ${props => props.color};
`
const Headline = styled.p` // Text
    margin-left: 10%;
    margin-right: 10%;
    font-size: 14px;
    line-height: 22px;
    font-weight: 700;
    word-wrap: break-word;
    box-sizing: border-box;
    text-align: left;
    color: ${props => props.color};
`

const SubHeadline = styled.p`
    margin-left: 10%;
    margin-right: 10%;
    font-size: 10px;
    line-height: 20px;
    font-weight: 700;
    word-wrap: break-word;
    box-sizing: border-box;
    text-align: left;
    color: ${props => props.color};
`

export { DisplayLarge, DisplayMedium, DisplaySmall, Headline, SubHeadline  }
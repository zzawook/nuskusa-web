import React from 'react';
import styled from 'styled-components'
import CSS from 'csstype';

type ActivityProps = {
    image: string, // link of image to use in img tag
    title: string,
    content: string
}
const Container = styled.div`
    min-width: 360px;
    min-height: 500px;
    max-height: 50vh;
    margin-left: 10px;
    margin-right: 10px;
    font-family: var(--font-family-roboto);
    color: var(--indigo);
    letter-spacing: 0;
    background: #FFFFFF;
    border: 1px solid rgba(11, 18, 28, 0.3);
    box-sizing: border-box;
`;
const Inner = styled.div`
    width: 100%;
    height: 40%;
    position: absolute;
`
const Image = styled.img`
    width: 75%;
    margin-top: 15%;
    margin-left: 12.5%;
`
const Header = styled.div`
    position: absolute;
    left: 20px;
    top: 53px;
    width: 10px;
    height: 10px;
    background-color: #BDA06D;
`
const DisplayMedium = styled.p`
    position: absolute;
    left: 45px;
    top: 45px;
    margin-top: 0px;
    margin-bottom: 0px;
    color: black;
    font-weight: 800;
    font-size: 19px;
    font-family: var(--font-family-roboto);
`
const Headline = styled.p`
    position: absolute;
    left: 45px;
    top: 90px;
    margin-top: 0px;
    margin-bottom: 0px;
    color: black;
    font-weight: 800;
    font-size: 15px;
    font-family: var(--font-family-roboto);
`

class ActivityList extends React.Component<ActivityProps, {}> {
    constructor(props: ActivityProps) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props.image);
    }

    contentStyle: CSS.Properties = {
        color: '#7a7a7a',
    }
    titleStyle: CSS.Properties = {
        
    }

    render = () => {
        return (
            <Container>
                {<Image src={this.props.image} />}
                <Inner>
                    <Header />
                    <DisplayMedium style={this.titleStyle}>
                        {this.props.title}
                    </DisplayMedium>
                    <Headline style={this.contentStyle}>
                        {this.props.content}
                    </Headline>
                </Inner>
                
            </Container>
        )
    }

}

export default ActivityList
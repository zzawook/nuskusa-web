import React from 'react';
import styled from 'styled-components'
import { SectionTitle, SectionDescription, Title } from '../utils/ThemeText';

type ActivityProps = {
    image?: string, // link of image to use in img tag
    title: string,
    content: string
}

class ActivityList extends React.Component<ActivityProps, {}> {
    constructor(props: ActivityProps) {
        super(props);
    }


    render = () => {
        const ActivityList = styled.div`
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
        
        return (
            <ActivityList>
                {/* <img src={this.props.image} style={{maxHeight=640px, maxWidth=640px}}> </img> */}
                <SectionTitle color='#0B121C'>
                    {this.props.title}
                </SectionTitle>
                <SectionDescription>
                    {this.props.content}
                </SectionDescription>
            </ActivityList>
        )
    }

}

export default ActivityList
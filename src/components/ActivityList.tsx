import React from 'react';
import styled from 'styled-components'
import { SectionTitle, SectionDescription } from '../utils/ThemeText';

type ActivityProps = {
    link: string
}

class ActivityList extends React.Component<{}, ActivityProps> {
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
                <SectionTitle color='#0B121C'>
                    Yoo
                </SectionTitle>
                <SectionDescription>
                    Description
                </SectionDescription>
            </ActivityList>
        )
    }

}

export default ActivityList
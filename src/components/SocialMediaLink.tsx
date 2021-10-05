import React from 'react';

type MediaProps = {
    mediaType: string, // facebook, instagram, kakaotalk
    link: string
}

class SocialMediaLink extends React.Component<{}, MediaProps> {
    constructor(props: MediaProps) {
        super(props);
    }

    
}
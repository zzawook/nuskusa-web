import styled from 'styled-components'
import { Link } from 'react-router-dom'

const GoldenButton = styled(Link)`
    background: #BDA06D;
    filter: drop-shadow(0px 0px 20px rgba(189, 160, 109, 0.6));
    width: 10vw;
    border: none;
    text-decoration: none;
    :hover {
        transform: scale(1.05);
    }
`

export { GoldenButton }
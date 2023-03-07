import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';

const Loading= () => {
	return (
		<StyledDiv>
			<CircularProgress />
		</StyledDiv>
	);
};
const StyledDiv=styled.div`
display: flex; 
padding-top: 1rem;
padding-bottom: 1rem; 
flex-direction: row; 
flex: 1 1 0%; 
justify-content: center; 
align-items: center; 
height: 100%; 
`
export default Loading;
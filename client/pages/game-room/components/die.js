import React, { PropTypes } from 'react'
import { Block } from 'jsxstyle'

const Die = ({ color, pips }) => (
	<Block
		boxSizing="border-box"
		width="20px"
		height="20px"
		lineHeight="20px"
		textAlign="center"
		background={color === 'BLACK' ? '#000' : '#fff'}
		border={color === 'BLACK' ? 'none' : '1px solid #000'}
		color={color === 'BLACK' ? '#fff' : '#000'}>
		{pips}
	</Block>
)

Die.propTypes = {
	pips: PropTypes.number.isRequired,
	color: PropTypes.oneOf(['WHITE', 'BLACK']),
}

export default Die

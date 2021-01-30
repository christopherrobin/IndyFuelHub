import React, { useState } from 'react';
import { Row, Col, Collapse, Button } from 'reactstrap';

const ScoreBoard = (props) => {
	const {
		homeScore, awayScore
	} = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const buttonColor = isOpen ? 'secondary' : 'danger';

  return (
		<div id="ScoreBoard-Container">

			<div className={isOpen ? 'display-none' : null}>
				<Row style={{ margin: '1em 0' }}>
					<Col xs={12} style={{ paddingLeft: 0 }}>
						<Button color={buttonColor} onClick={toggle} block style={{marginTop: '1em', padding: '1em'}}>Reveal Score</Button>
					</Col>
				</Row>
			</div>

			<Collapse isOpen={isOpen}>
				<Row>
					<Col xs={3}>
						<p className="score">{homeScore}</p>
					</Col>
					<Col xs={3}>
						<p className="score">{awayScore}</p>
					</Col>
				</Row>
			</Collapse>

		</div>
  );
}

export default ScoreBoard;

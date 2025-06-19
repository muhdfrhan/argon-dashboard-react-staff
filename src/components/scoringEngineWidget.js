// src/components/ScoringEngineWidget.js
import React from 'react';
import { Card, CardHeader, CardBody, Row, Col, Badge, Progress } from 'reactstrap';

const ScoringEngineWidget = ({ scoreData }) => {
  if (!scoreData) {
    return (
      <Card className="shadow mt-4">
        <CardHeader><h3 className="mb-0">Priority Score Analysis</h3></CardHeader>
        <CardBody><p className="text-muted">Score has not been calculated yet. It will be generated upon first view.</p></CardBody>
      </Card>
    );
  }

  const getScoreColor = (score) => {
    if (score >= 85) return "danger";
    if (score >= 70) return "warning";
    if (score >= 50) return "info";
    return "success";
  };

  return (
    <Card className="shadow mt-4">
      <CardHeader>
        <Row className="align-items-center">
          <Col xs="8">
            <h3 className="mb-0">Priority Score Analysis</h3>
            <p className="text-sm text-muted mb-0">System Recommendation: 
              <strong className={`text-${getScoreColor(scoreData.total_priority_score)}`}> {scoreData.system_recommendation}</strong>
            </p>
          </Col>
          <Col xs="4" className="text-right">
            <Badge color={getScoreColor(scoreData.total_priority_score)} pill style={{ fontSize: '1.2rem' }}>
              {scoreData.total_priority_score} / 100
            </Badge>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <p>This score reflects the applicant's level of need based on submitted data.</p>
        <div className="mb-3">
            <strong>Total Priority Score</strong>
            <Progress className="progress-lg" value={scoreData.total_priority_score} color={getScoreColor(scoreData.total_priority_score)}>
                {scoreData.total_priority_score}%
            </Progress>
        </div>
        <hr />
        <h6 className="heading-small text-muted mb-3">Score Breakdown</h6>
        <Row>
          <Col lg="4"><strong>Financial Score:</strong> {scoreData.financial_score} pts</Col>
          <Col lg="4"><strong>Household Score:</strong> {scoreData.household_score} pts</Col>
          <Col lg="4"><strong>Circumstances Score:</strong> {scoreData.circumstances_score} pts</Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ScoringEngineWidget;
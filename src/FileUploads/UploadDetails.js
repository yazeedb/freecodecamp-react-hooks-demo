import React from 'react';
import { ProgressBar, Badge } from 'react-bootstrap';
import { format } from 'date-fns';

const selectedProgressBarStyle = percentage =>
  percentage === 100 ? 'success' : 'info';

const UploadDetails = ({
  uploadId,
  stepsCompleted,
  totalSteps,
  startTime,
  startedBy,
  department
}) => {
  const percentage = (stepsCompleted / totalSteps) * 100;
  const progressBarLabel = `${percentage.toFixed(2)}%`;

  return (
    <div className="upload-details">
      {uploadId ? (
        <React.Fragment>
          <Badge
            variant="warning"
            style={{
              float: 'right'
            }}
          >
            {uploadId}
          </Badge>
          <p>
            <b>Started by:</b> {startedBy}
          </p>
          <p>
            <b>Department:</b> {department}
          </p>
          <p>
            <b>Requested:</b> {format(startTime, 'M/D/YY')} at{' '}
            {format(startTime, 'h:mmA')}
          </p>

          <div className="progress-container">
            <span>
              {percentage === 0
                ? 'Waiting'
                : percentage === 100
                ? 'Complete'
                : 'Done'}
            </span>
            <ProgressBar
              now={percentage}
              label={progressBarLabel}
              variant={selectedProgressBarStyle(percentage)}
            />
          </div>
        </React.Fragment>
      ) : (
        <h2>Select a job</h2>
      )}
    </div>
  );
};

export default UploadDetails;

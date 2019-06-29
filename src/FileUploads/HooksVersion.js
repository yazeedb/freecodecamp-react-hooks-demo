import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import UploadApi from './UploadApi';
import UploadDetails from './UploadDetails';

const HooksVersion = () => {
  const [uploadIds, setUploadIds] = React.useState([]);
  const [currentUploadId, setCurrentUploadId] = React.useState(null);
  const [uploadDetails, setUploadDetails] = React.useState({});

  React.useEffect(() => {
    const subscription = UploadApi.getAllUploadIds.subscribe(setUploadIds);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (!currentUploadId) {
      return;
    }

    const subscription = UploadApi.getUploadDetails(currentUploadId).subscribe(
      setUploadDetails
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [currentUploadId]);

  return (
    <div className="upload-app">
      <h2 className="title">Upload Progress Viewer</h2>

      <div className="content">
        <ListGroup className="upload-ids">
          {uploadIds.map(id => {
            const listClassName = id === currentUploadId ? 'active' : '';

            return (
              <ListGroupItem
                className={listClassName}
                onClick={() => {
                  setCurrentUploadId(id);
                }}
                key={id.toString()}
              >
                {id}
              </ListGroupItem>
            );
          })}
        </ListGroup>

        <UploadDetails {...uploadDetails} />
      </div>
    </div>
  );
};

export default HooksVersion;

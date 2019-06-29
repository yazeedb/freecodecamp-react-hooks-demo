import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import UploadApi from './UploadApi';
import UploadDetails from './UploadDetails';

class ClassVersion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadIds: [],
      currentUploadId: null,
      uploadDetails: {}
    };

    this.setUploadIds = this.setUploadIds.bind(this);
    this.setCurrentUploadId = this.setCurrentUploadId.bind(this);
    this.setUploadDetails = this.setUploadDetails.bind(this);
  }

  setUploadIds(ids) {
    this.setState({
      ...this.state,
      uploadIds: ids
    });
  }

  setCurrentUploadId(id) {
    this.setState({
      ...this.state,
      currentUploadId: id
    });
  }

  setUploadDetails(details) {
    this.setState({
      ...this.state,
      uploadDetails: details
    });
  }

  componentDidMount() {
    this.allIdsSubscription = UploadApi.getAllUploadIds.subscribe(
      this.setUploadIds
    );
  }

  componentDidUpdate(previousProps, previousState) {
    if (!this.state.currentUploadId) {
      return;
    }

    if (this.state.currentUploadId !== previousState.currentUploadId) {
      if (this.uploadDetailsSubscription) {
        this.uploadDetailsSubscription.unsubscribe();
      }

      this.uploadDetailsSubscription = UploadApi.getUploadDetails(
        this.state.currentUploadId
      ).subscribe(this.setUploadDetails);
    }
  }

  componentWillUnmount() {
    this.allIdsSubscription.unsubscribe();
    this.uploadDetailsSubscription.unsubscribe();
  }

  render() {
    const { uploadIds, currentUploadId, uploadDetails } = this.state;

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
                    this.setCurrentUploadId(id);
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
  }
}

export default ClassVersion;

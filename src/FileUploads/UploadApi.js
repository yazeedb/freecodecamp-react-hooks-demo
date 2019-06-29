import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import faker from 'faker';

const aDateUpToTenYearsAgo = () =>
  faker.date.past(Math.round(Math.random() * 10));

let uploadUID = 123;

const createUpload = () => {
  const newUpload = {
    uploadId: uploadUID++,
    stepsCompleted: 0,
    totalSteps: 10,
    startTime: aDateUpToTenYearsAgo(),
    startedBy: faker.name.findName(),
    department: faker.commerce.department()
  };

  const randomIntervalTimeout = Math.round(Math.random() * 3000);
  const incrementUploadIntervalId = setInterval(() => {
    if (newUpload.stepsCompleted < newUpload.totalSteps) {
      newUpload.stepsCompleted += 1;
    } else {
      clearInterval(incrementUploadIntervalId);
    }
  }, randomIntervalTimeout);

  return newUpload;
};

let allUploads = [createUpload(), createUpload(), createUpload()];

const allUploads$ = new BehaviorSubject(allUploads);
const allUploadIds$ = allUploads$.pipe(
  map(uploads => uploads.map(u => u.uploadId))
);

setInterval(() => {
  const newUpload = createUpload();

  allUploads.push(newUpload);
  allUploads$.next(allUploads);
}, 5000);

const UploadApi = {
  getAllUploadIds: allUploadIds$,
  getUploadDetails: uploadId =>
    allUploads$.pipe(map(uploads => uploads.find(u => u.uploadId === uploadId)))
};

export default UploadApi;

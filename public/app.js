const { useEffect } = React;

const ReactVouched = ({ id, config }) => {
  useEffect(() => {
    var vouched = Vouched({ ...config });
    console.log(id);
    vouched.mount(`#${id}`);
  });
  return null;
};
const App = (props) => {
  return (
    <ReactVouched
      id="vouched-element"
      config={{
        verification: {
          // verify the user's information
          // firstName: "Gladys",
          // lastName: "West",
          // // used for the crosscheck feature
          // email: "test@test.id",
          // phone: "000-111-2222",
        },

        appId: "!nbd5lw3Pgqeig*x*k-mDnfD4Q*K.i",
        type: 'id',
        // your webhook for POST verification processing
        callbackURL: "https://d498-217-24-162-42.ngrok.io/api/v1/accounts/ebacdcc0-b3df-4936-9c7c-5174dd71194b/owner_licence_verification",

        // mobile handoff
        crossDevice: true,
          // sandbox: true,
        crossDeviceQRCode: true,
        // crossDeviceSMS: true,
        onInit: ({ token, job }) => {
          console.log("initialization");
        },

        // callback executed after every time Job was posted
        onSubmit: ({ stage, attempts, job }) => {},

        // called when the verification is completed.
        onDone: (job) => {
          // token used to query jobs
          console.log("Scanning complete", { token: job.token });

          // An alternative way to update your system based on the
          // results of the job. Your backend could perform the following:
          // 1. query jobs with the token
          // 2. store relevant job information such as the id and
          //    success property into the user's profile
          // fetch(`/yourapi/idv?job_token=${job.token}`);

          // // Redirect to the next page based on the job success
          if (job.result.success) {
              console.log('success', job)
            // window.location.replace("https://website.com/success/");
          } else {
              console.log('error', job)
              // window.location.replace("https://website.com/failed/");
          }
        },
        onSurveyDone: (job) => {
          // callback when survey is submitted
        },

        // callback executed after attempt to find camera device
        onCamera: ({ hasCamera, hasPermission }) => {},

        // callback executed after DOM changes to Camera
        onCameraEvent: (cameraEvent: CameraEvent) => {},
        // theme
        theme: {
          name: "avant",
        },
      }}
    />
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

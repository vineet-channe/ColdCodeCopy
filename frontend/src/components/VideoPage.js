import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import {
  Call,
  CallControls,
  StreamCall,
  StreamTheme,
  StreamVideo,
  SpeakerLayout,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const userdata = JSON.parse(localStorage.getItem('user-info'));
const name = "Joruus_C_Baoth"
const user = { id: name };

const apiKey = "mmhfdzb5evj2";
const tokenProvider = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0pvcnV1c19DX0Jhb3RoIiwidXNlcl9pZCI6IkpvcnV1c19DX0Jhb3RoIiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3Mjc3MDQ3MzMsImV4cCI6MTcyODMwOTUzM30.YgYLPwL7i8opI1bWxi2OtVuDtSBeXaqo2EDb3M7WZCU";

export default function Videocall() {
    const { callId } = useParams(); 
  const [client, setClient] = useState();
  const [call, setCall] = useState();

  useEffect(() => {
    const myClient = new StreamVideoClient({ apiKey, user, tokenProvider });
    setClient(myClient);
    return () => {
      myClient.disconnectUser();
      setClient(undefined);
    };
  }, []);

  useEffect(() => {
    if (!client) return;
    const myCall = client.call("default", callId);
    myCall.join({ create: true }).catch((err) => {
      console.error(`Failed to join the call`, err);
    });

    setCall(myCall);

    return () => {
      setCall(undefined);
      myCall.leave().catch((err) => {
        console.error(`Failed to leave the call`, err);
      });
    };
  }, [client]);

  if (!client || !call) return null;

  return (
    <StreamVideo client={client}>
      <StreamTheme className="my-theme-overrides">
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls />
        </StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
}

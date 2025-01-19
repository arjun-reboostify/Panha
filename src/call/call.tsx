import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import { authToken, createMeeting } from "./api";

import { useMediaDevice } from "@videosdk.live/react-sdk";

interface JoinScreenProps {
  getMeetingAndToken: (meeting?: string) => void;
}

interface MeetingViewProps {
  onMeetingLeave: () => void;
  meetingId: string;
}

interface ParticipantViewProps {
  participantId: string;
}

const ParticipantView: React.FC<ParticipantViewProps> = ({ participantId }) => {
  const micRef = useRef<HTMLAudioElement>(null);
  const { checkPermissions } = useMediaDevice();
  
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(participantId);
    const { enableWebcam, disableWebcam, enableMic, disableMic } =
    useParticipant("<participant-id>");

  const handleEnableWebcam = () => {
    // This will emit an event called "onWebcamRequested" to that particular participant
    enableWebcam();
  };

  const handleEnableMic = () => {
    // This will emit an event called "onMicRequested" to that particular participant
    enableMic();
  };

  const handleDisableWebcam = () => {
    // This will disable the webcam of that particular participant
    disableWebcam();
  };

  const handleDisableMic = () => {
    // This will disable the mic of that particular participant
    disableMic();
  };
  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div key={participantId}>
         
      <p>
        Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
        {micOn ? "ON" : "OFF"}
      </p>
      <audio ref={micRef} autoPlay muted={isLocal} />
      {webcamOn && (
        <ReactPlayer
          playsinline
          pip={false}
          light={false}
        
          muted={true}
          playing={true}
          url={videoStream}
          height="200px"
          width="300px"
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
      
    </div>
  );
};

const JoinScreen: React.FC<JoinScreenProps> = ({ getMeetingAndToken }) => {
  const [meetingId, setMeetingId] = useState<string>();

  const onClick = async () => {
    getMeetingAndToken(meetingId);
  };

  return (
    <div className="flex gap-4 items-center">
      <input
        type="text"
        className="border p-2 rounded"
        placeholder="Enter Meeting Id"
        onChange={(e) => {
          setMeetingId(e.target.value);
        }}
      />
      <button 
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={onClick}
      >
        Join
      </button>
      <span>or</span>
      <button 
        className="bg-green-500 text-white px-4 py-2 rounded"
        onClick={onClick}
      >
        Create Meeting
      </button>
    </div>
  );
};

const MeetingView: React.FC<MeetingViewProps> = ({ onMeetingLeave, meetingId }) => {
  const [joined, setJoined] = useState<string | null>(null);
  
  const { join, participants } = useMeeting({
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    onMeetingLeft: () => {
      onMeetingLeave();
    },
  });

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-xl font-bold mb-4">Meeting Id: {meetingId}</h3>
      {joined && joined === "JOINED" ? (
        <div className="grid gap-4">
          {Array.from(participants.keys()).map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          ))}
        </div>
      ) : joined && joined === "JOINING" ? (
        <p className="text-gray-600">Joining the meeting...</p>
      ) : (
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={joinMeeting}
        >
          Join
        </button>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [meetingId, setMeetingId] = useState<string | null>(null);

  const getMeetingAndToken = async (id?: string) => {
    const meetingId =
      id == null ? await createMeeting({ token: authToken }) : id;
    setMeetingId(meetingId);
  };

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return authToken && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: "C.V. Raman",
        mode: "CONFERENCE",
        multiStream: true,
        debugMode: false
      }}
      token={authToken}
    >
      <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
    </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
};

export default App;
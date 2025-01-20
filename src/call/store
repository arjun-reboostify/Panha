import React, { useEffect, useRef, useState } from "react";
import { MeetingProvider, useMeeting, useParticipant } from "@videosdk.live/react-sdk";
import { authToken, createMeeting } from "./api";
import { Phone, PhoneOff, Mic, MicOff, Globe } from "lucide-react";
import { noterFirestore, firebaseTimestamp,noterAuth } from "../firebase/index";
import getCurrentUser from '../firebase/utils/getCurrentUser';
interface UserProfile {
 
    uid: string;
    displayName?: string;
    email?: string;
  }
interface JoinScreenProps {
  getMeetingAndToken: (meeting?: string) => void;
  isAdmin?: boolean; // Make this optional
}

interface MeetingViewProps {
  onMeetingLeave: () => void;
  meetingId: string;
}
interface WorldMeetingsCounterProps {
    className?: string;
  }

interface ParticipantViewProps {
  participantId: string;
}
interface ActiveMeeting {
    id: string;
    createdAt: Date;
    participantCount: number;
  }
  const ADMIN_EMAILS = ['ee@ee.com', 'superadmin@noter.com'];
  
  const WorldMeetings: React.FC<{ onJoinMeeting: (meetingId: string) => void }> = ({ onJoinMeeting }) => {
    const [meetings, setMeetings] = useState<ActiveMeeting[]>([]);
  
    useEffect(() => {
      const unsubscribe = noterFirestore
        .collection("active-meetings")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          const activeMeetings = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          } as ActiveMeeting));
          setMeetings(activeMeetings);
        });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <div className="space-y-4">
        
        <h3 className="text-lg font-semibold text-gray-700">Active Meetings</h3>
        <div className="grid grid-cols-1 gap-4">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">Meeting: {meeting.id}</p>
                  <p className="text-sm text-gray-500">
                    Participants: {meeting.participantCount}
                  </p>
                </div>
                <button
                  onClick={() => onJoinMeeting(meeting.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-all flex items-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Join</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const JoinScreen: React.FC<JoinScreenProps> = ({ getMeetingAndToken }) => {
    const [meetingId, setMeetingId] = useState<string>();
    const [showWorld, setShowWorld] = useState(false);
      const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
   const [isAdmin, setIsAdmin] = useState(false);
    const onClick = async () => {
      getMeetingAndToken(meetingId);
    };
    const [meetingsCount, setMeetingsCount] = useState<number>(0);
    useEffect(() => {
        const unsubscribe = noterFirestore
          .collection("active-meetings")
          .onSnapshot((snapshot) => {
            setMeetingsCount(snapshot.docs.length);
          });
    
        return () => unsubscribe();
      }, []);
      useEffect(() => {
        const unsubscribe = noterAuth.onAuthStateChanged(async (user) => {
          if (user) {
            const userProfile: UserProfile = {
          
              uid: user.uid,
              displayName: user.displayName || 'Anonymous',
              email: user.email || ''
            };
            setCurrentUser(userProfile);
            setIsAdmin(ADMIN_EMAILS.includes(userProfile.email || ''));
          } else {
            setCurrentUser(null);
            setIsAdmin(false);
          }
        });
    
        return () => unsubscribe();
      }, []);
      const getThemeClasses = () => {
        if (meetingsCount > 0) {
          return "bg-green-50 border-green-200 text-green-700";
        }
        return "bg-red-50 border-red-200 text-red-700";
      };
    return (<> <div className={`flex items-center justify-center p-4 border rounded-lg ${getThemeClasses()} `}>
    <div className="text-center">
      <h3 className="text-lg font-semibold mb-1">Status</h3>
      {meetingsCount > 0 ? (
        <p className="font-medium">
          {meetingsCount} {meetingsCount !== 1 ? 's' : ''} Buddy Online
        </p>
      ) : (
        <p className="font-medium">No Buddy Available right now</p>
      )}
    </div>
  </div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Join Audio Meeting
          </h2>
          <div className="space-y-6">
          <button
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center space-x-2"
                onClick={() => getMeetingAndToken()}
              >
                <Phone className="h-5 w-5" />
                <span>Create New Call</span>
              </button>
              {isAdmin && ( <button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center space-x-2"
                onClick={() => setShowWorld(!showWorld)}
              >
                <Globe className="h-5 w-5" />
                <span>Talk with a buddy</span>
              </button>)}
              {showWorld && (
              <div className="mt-6">
                <WorldMeetings onJoinMeeting={getMeetingAndToken} />
              </div>
            )}
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              placeholder="Enter Meeting Id"
              onChange={(e) => setMeetingId(e.target.value)}
            />
            <div className="flex flex-col space-y-4">
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center space-x-2"
                onClick={onClick}
              >
                <Phone className="h-5 w-5" />
                <span>Join with id</span>
              </button>
              <div className="flex items-center">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm">or</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>
              
            </div>
            
           
          </div>
        </div>
      </div></>
    );
  };
  
const ParticipantView: React.FC<ParticipantViewProps> = ({ participantId }) => {
  const micRef = useRef<HTMLAudioElement>(null);
  const { micStream, micOn, isLocal, displayName } = useParticipant(participantId);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);
        micRef.current.srcObject = mediaStream;
        micRef.current.play().catch((error) =>
          console.error("audioElem.current.play() failed", error)
        );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 transition-all hover:shadow-xl border border-gray-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
            <span className="text-lg font-semibold text-gray-700">
              {displayName[0]}
            </span>
          </div>
          <div>
            <p className="font-semibold text-gray-800">{displayName}</p>
            <div className="flex items-center space-x-2">
              {micOn ? (
                <Mic className="h-4 w-4 text-green-500" />
              ) : (
                <MicOff className="h-4 w-4 text-red-500" />
              )}
              <span className="text-sm text-gray-500">
                {micOn ? "Mic Active" : "Mic Off"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <audio ref={micRef} autoPlay muted={isLocal} />
    </div>
  );
};



const MeetingView: React.FC<MeetingViewProps> = ({ onMeetingLeave, meetingId }) => {
    const [joined, setJoined] = useState<string | null>(null);
    const { join, leave, participants, toggleMic, unmuteMic, muteMic, localMicOn } = useMeeting({
      onMeetingJoined: () => {
        setJoined("JOINED");
        noterFirestore.collection("active-meetings").doc(meetingId).set({
          id: meetingId,
          createdAt: firebaseTimestamp(),
          participantCount: 1,
          active: true
        });
      },
      onMeetingLeft: () => {
        noterFirestore.collection("active-meetings").doc(meetingId).delete();
        onMeetingLeave();
      },
      onParticipantJoined: () => {
        noterFirestore.collection("active-meetings").doc(meetingId).update({
          participantCount: participants.size + 1
        });
      },
      onParticipantLeft: () => {
        noterFirestore.collection("active-meetings").doc(meetingId).update({
          participantCount: Math.max(0, participants.size - 1)
        });
      }
    });
  
    const joinMeeting = () => {
      setJoined("JOINING");
      join();
    };
  
    const disconnectCall = () => {
      leave();
      setJoined(null);
    };
  
    const handleToggleMic = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      toggleMic();
    };
  
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Active Call
            </h3>
            <p className="text-gray-500">ID: {meetingId}</p>
          </div>
          
          {joined === "JOINED" && (
            <div className="flex items-center space-x-4">
              <button
                onClick={handleToggleMic}
                className={`${
                  localMicOn ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
                } text-white px-6 py-3 rounded-lg transition-all flex items-center space-x-2`}
              >
                {localMicOn ? (
                  <Mic className="h-5 w-5" />
                ) : (
                  <MicOff className="h-5 w-5" />
                )}
                <span>{localMicOn ? 'Mic On' : 'Mic Off'}</span>
              </button>
              
              <button
                onClick={disconnectCall}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-all flex items-center space-x-2"
              >
                <PhoneOff className="h-5 w-5" />
                <span>End Call</span>
              </button>
            </div>
          )}
        </div>
        
        {joined === "JOINED" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from(participants.keys()).map((participantId) => (
              <ParticipantView
                participantId={participantId}
                key={participantId}
              />
            ))}
          </div>
        ) : joined === "JOINING" ? (
          <div className="text-center py-12">
            <div className="animate-pulse text-gray-600">
              Joining the call...
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center space-x-2 mx-auto"
              onClick={joinMeeting}
            >
              <Phone className="h-6 w-6" />
              <span>Join Call</span>
            </button>
          </div>
        )}
      </div>
    );
  };
  

const App: React.FC = () => {
    const [meetingId, setMeetingId] = useState<string | null>(null);
    const [userName, setUserName] = useState<string>("Anonymous");
  
    useEffect(() => {
      // Get current user and set display name
      const user = getCurrentUser();
      if (user && user.displayName) {
        setUserName(user.displayName);
      } else if (user && user.email) {
        // Fallback to email if display name is not set
        setUserName(user.email.split('@')[0]);
      }
    }, []);
  
    const getMeetingAndToken = async (id?: string) => {
        const meetingId = id == null ? await createMeeting({ token: authToken }) : id;
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
            webcamEnabled: false,
            name: userName, // Use the dynamic userName instead of hardcoded value
            mode: "CONFERENCE",
            multiStream: true,
            debugMode: false
          }}
          token={authToken}
        >
          <MeetingView meetingId={meetingId} onMeetingLeave={onMeetingLeave} />
        </MeetingProvider>
      ) : (
        <JoinScreen  getMeetingAndToken={getMeetingAndToken} />
      );
    };
    
    export default App;
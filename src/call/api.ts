//This is the Auth token, you will use it to generate a meeting and connect to it
export const authToken: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiIzZTRlMWE1MS0yMGYwLTQwMzEtOWZkOS1lNDgzNzRlNTdlODIiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczNzI4MjMyNiwiZXhwIjoxNzM3ODg3MTI2fQ.blX9u9OhzjHN8e8-FlRhYSHmh4mGqKLtegXzZXcti7g";

// API call to create a meeting
export const createMeeting = async ({ token }: { token: string }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  //Destructuring the roomId from the response
  const { roomId }: { roomId: string } = await res.json();
  return roomId;
};
import React from "react";
import GroupChat from "./GroupChat";
import DMChat from "./DMChat";

function App() {
  return (
    <div>
      <h1>Dommy Chat Test</h1>
      <GroupChat />
      <DMChat targetUserId="SOME_OTHER_USER_ID" />
    </div>
  );
}

export default App;

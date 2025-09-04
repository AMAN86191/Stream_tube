import React, { createContext, useContext, useState } from 'react';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const [currentVideo, setCurrentVideo] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <VideoContext.Provider
      value={{
        currentVideo,
        setCurrentVideo,
        isMinimized,
        setIsMinimized,
        currentTime,
        setCurrentTime,
      }}
    >
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => useContext(VideoContext);

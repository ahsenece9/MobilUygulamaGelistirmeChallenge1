import React, { createContext, useContext, useState } from 'react';
import { patientExperiences } from '../data/mockData';

const LikesContext = createContext();

export const LikesProvider = ({ children }) => {
  const [likes, setLikes] = useState(
    Object.fromEntries(
      patientExperiences.map((e) => [e.id, { count: e.likes, liked: false }])
    )
  );

  const toggleLike = (id) => {
    setLikes((prev) => ({
      ...prev,
      [id]: {
        count: prev[id].liked ? prev[id].count - 1 : prev[id].count + 1,
        liked: !prev[id].liked,
      },
    }));
  };

  return (
    <LikesContext.Provider value={{ likes, toggleLike }}>
      {children}
    </LikesContext.Provider>
  );
};

export const useLikes = () => useContext(LikesContext);

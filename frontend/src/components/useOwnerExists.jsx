import { useEffect, useState } from "react";
export const useOwnerExists = () => {
  const [isOwnerExists, setIsOwnerExists] = useState();

  const setMode = (mode) => {
    window.localStorage.setItem("isOwnerExists", mode);
    setIsOwnerExists(mode);
  };

  const setOwnerExists = (mode) => {
    setMode(mode);
  };

  useEffect(() => {
    const localMode = window.localStorage.getItem("isOwnerExists");
    localMode && setIsOwnerExists(localMode);
  }, []);
  return [isOwnerExists, setOwnerExists];
};

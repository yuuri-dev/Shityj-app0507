import { createContext, useState } from 'react';

export const GroupContext = createContext();

export const GroupProvider = ({ children }) => {
  const [groupName, setGroupName] = useState('');
  const [memberArray, setMemberArray] = useState([]);
  const [groupRequireNumberArray, setGroupRequireNumberArray] = useState(
     Array.from({ length: 7}, () => Array(3).fill(0))
  );
  const [maxDateToWork, setMaxDateToWork] = useState(5);
  const [maxHoursToWork, setMaxHoursToWork] = useState(8);
  return (
    <GroupContext.Provider
      value={{
        groupName,
        setGroupName,
        memberArray,
        setMemberArray,
        groupRequireNumberArray,
        setGroupRequireNumberArray,
        maxDateToWork,
        setMaxDateToWork,
        maxHoursToWork,
        setMaxHoursToWork,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

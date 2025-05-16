import { createContext, useState } from 'react';

export const GroupContext = createContext();

const NUM_DAYS = 7;
const NUM_TIME_SLOTS = 3;

export const GroupProvider = ({ children }) => {
  const [groupName, setGroupName] = useState('');
  const [memberArray, setMemberArray] = useState([]);
  const [groupRequireNumberArray, setGroupRequireNumberArray] = useState(
    Array.from({ length: NUM_DAYS }, () => Array(NUM_TIME_SLOTS).fill(0))
  );

  const [timesToEnterArray, setTimesToEnterArray] = useState(Array([]));

  const [maxDateToWork, setMaxDateToWork] = useState(5);
  const [maxHoursToWork, setMaxHoursToWork] = useState(8);

  const initialShiftCandidates = Array(NUM_DAYS)
    .fill(null)
    .map(() =>
      Array(NUM_TIME_SLOTS)
        .fill(null)
        .map(() => [])
    );
  const [shiftCandidates, setShiftCandidates] = useState(
    initialShiftCandidates
  );
////////////////// shiftInfo/////////////////////
  // [
  //   {
  //     id:0;
  //     name: taro,
  //     timesToEnterDesired: 3,
  //     shiftArray:[[0,0,0],]
  //   },{
  //     id:0;
  //     name: taro,
  //     timesToEnterDesired: 3,
  //     shiftArray:[[false,false,false],[false,false,false],[false,false,false],[false,false,false],[false,false,false],[false,false,false]]
  //   },
  // ]

  const [shiftInfo, setShiftInfo] = useState([]);

  return (
    <GroupContext.Provider
      value={{
        groupName,
        setGroupName,
        //消す
        memberArray,
        setMemberArray,

        groupRequireNumberArray,
        setGroupRequireNumberArray,
        maxDateToWork,
        setMaxDateToWork,
        maxHoursToWork,
        setMaxHoursToWork,

        //けす
        shiftCandidates,
        setShiftCandidates,
        
        shiftInfo,
        setShiftInfo,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

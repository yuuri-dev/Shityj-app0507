import { createContext, useState } from 'react';

export const GroupContext = createContext();

const NUM_DAYS = 7;
const NUM_TIME_SLOTS = 3;

export const GroupProvider = ({ children }) => {
  const [groupName, setGroupName] = useState('');

  // [
  //   [2, 1, 0],
  //   [2, 1, 0],
  //   [2, 1, 0],
  //   [2, 1, 0],
  //   [2, 1, 0],
  //   [2, 1, 0],
  //   [2, 1, 0],
  // ];

  const [groupRequireNumberArray, setGroupRequireNumberArray] = useState(
    Array.from({ length: NUM_DAYS }, () => Array(NUM_TIME_SLOTS).fill(0))
  );

  const [maxDateToWork, setMaxDateToWork] = useState(5);
  const [maxHoursToWork, setMaxHoursToWork] = useState(8);

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

  const [shiftCompleted, setShiftCompleted] = useState(
    Array.from({ length: NUM_DAYS }, () =>
      Array.from({ length: NUM_TIME_SLOTS }, () => [])
    )
  );

  return (
    <GroupContext.Provider
      value={{
        groupName,
        setGroupName,

        groupRequireNumberArray,
        setGroupRequireNumberArray,
        maxDateToWork,
        setMaxDateToWork,
        maxHoursToWork,
        setMaxHoursToWork,

        shiftInfo,
        setShiftInfo,

        shiftCompleted,
        setShiftCompleted,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};

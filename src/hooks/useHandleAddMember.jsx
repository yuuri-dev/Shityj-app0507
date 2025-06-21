import { useCallback, useContext } from 'react';
import { GroupContext } from 'src/contexts/GroupContext';

const NUM_DAYS = 7;
const NUM_TIME_SLOTS = 3;

const useAddMember = () => {
  const { shiftInfo, setShiftInfo } = useContext(GroupContext);

  return useCallback((memberName, setMemberName) => {
    if (!memberName) {
      return;
    }
    for (let i = 0; i < shiftInfo.length; i++) {
      if (memberName === shiftInfo[i].name) {
        alert('同じ名前が既に追加されています');
        return;
      }
    }
    setShiftInfo((prevArray) => {
      const newArray = [
        ...prevArray,
        {
          name: memberName,
          timesToEnterDesired: 0,
          shiftArray: Array.from({ length: NUM_DAYS }, () =>
            Array(NUM_TIME_SLOTS).fill(0)
          ),
        },
      ];
      return newArray;
    });
    setMemberName('');
  }, [shiftInfo]);
    
};

export default useAddMember;

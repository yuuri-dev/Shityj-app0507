import React from 'react'

const ShiftSubmitState = ({ submitStatus, recruitingWeeksArray }) => {
  return (
    <div>
      {submitStatus.map((week,i) => (
        <div key={week.weekId}>
          <h3>週: {recruitingWeeksArray[i].week_start_date}</h3>
          <ul>
            {week.users.map((user) => (
              <li key={user.user_id}>
                {user.name} : {user.hasSubmitted ? '✅ 提出済み' : '❌ 未提出'}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ShiftSubmitState
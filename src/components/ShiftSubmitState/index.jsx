import Link from 'next/link';
import React from 'react'
import ButtonWhite from '../ButtonWhite';

const ShiftSubmitState = ({ submitStatus, recruitingWeeksArray,group_id }) => {
  return (
    <div>
      {submitStatus.map((week, i) => (
        <div key={week.weekId}>
          <h3>週: {recruitingWeeksArray[i].week_start_date}</h3>
          <ul>
            {week.users.map((user) => (
              <li key={user.user_id}>
                {user.name} : {user.hasSubmitted ? '✅ 提出済み' : '❌ 未提出'}
              </li>
            ))}
          </ul>
          <Link
            href={{
              pathname: '/group/[group_id]/weeks/[week_id]/addShift',
              query: { group_id, week_id:week.weekId },
            }}
          >
            <ButtonWhite>シフト入力のリンク</ButtonWhite>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ShiftSubmitState
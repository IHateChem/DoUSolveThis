import React from 'react';
import TopNavigation from '../../shared/layout/TopNavigation';
import ApplyCard from './components/ApplyCard';
import useGetMyApply from './hooks/api/useGetMyApply';

const ApplyList = () => {
  const { data } = useGetMyApply();

  return (
    <TopNavigation>
      <div className="px-8 py-10">
        <h1 className="text-gray-900 text-4xl font-bold mb-8">
          신청 목록 보기
        </h1>
        <div className="grid grid-cols-3 gap-6">
          {data &&
            data.map((item, idx) => (
              <ApplyCard
                key={`ApplyCard#${idx}`}
                data={item}
                onClick={() => {}}
              />
            ))}
        </div>
      </div>
    </TopNavigation>
  );
};

export default ApplyList;

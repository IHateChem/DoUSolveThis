import React from 'react';
import levelToRank from '../constants/levelToRank';
import { tierBgColor, tierTextColor } from '../constants/tierColor';
import { ReactComponent as Delete } from '../assets/delete.svg';
import { useStudyActions } from '../store/studyStore';

export const RankTag = ({ children }) => {
  const tierText = levelToRank[children];
  let bgColor = '';
  let textColor = '';
  if (children === 0) {
    bgColor = 'bg-grey-600';
    textColor = 'text-white';
  } else {
    const idx = parseInt((children - 1) / 5, 10);
    bgColor = tierBgColor[idx];
    textColor = tierTextColor[idx];
  }
  return (
    <span
      className={`${bgColor} ${textColor} text-sm font-medium me-2 px-2.5 py-0.5 rounded-2xl`}
    >
      {tierText}
    </span>
  );
};

export const BottomTag = ({ children }) => {
  return (
    <span className="text-brand-700 text-sm font-semibold">#{children}</span>
  );
};

export const BaekjoonIdTag = ({ children, id }) => {
  const { deleteMember } = useStudyActions();
  const handleClickDelete = () => {
    deleteMember(children);
  };

  return (
    <span
      id={id}
      className="w-fit flex gap-1 items-center px-2.5 py-0.5 text-gray-700 bg-gray-200 text-sm font-semibold rounded-2xl"
    >
      {children}
      <Delete onClick={handleClickDelete} />
    </span>
  );
};
import React from 'react';
import { Button, useDisclosure } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useDeleteNextProblem from '../../hooks/api/nextProblems/useDeleteNextProblem';
import { RankTag } from '../SearchStudy/Tag';
import UserTag from './UserTag';
import useGetNextProblems from '../../hooks/api/nextProblems/useGetNextProblems';
import { ReactComponent as Trash } from '../../assets/trash.svg';
import { useNextProbs } from '../../store/nextProbStore';
import DeleteModal from './modals/DeleteModal';

const Card = ({ data }) => {
  const { id } = useParams();

  const { deleteFetch } = useDeleteNextProblem(id, data.probNum);

  const handleClickOpenLink = () => {
    window.open(data.link);
  };
  const handleClickCopyLink = () => {
    navigator.clipboard.writeText(data.link).then(() => {
      console.log('copied toast message');
    });
  };

  const handleDelete = () => {
    deleteFetch();
  };

  return (
    <div className="max-w-[388px] p-6 shadow-sm rounded-xl border border-solid border-gray-200">
      <div className="flex justify-between items-start">
        <RankTag>{data.rank}</RankTag>
        <Trash onClick={handleDelete} className="cursor-pointer" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-900 mt-2 mb-5">
        {data.title}
      </h2>
      <div className="flex flex-wrap gap-2 mb-8">
        {data.types &&
          data.types.map((type, idx) => (
            <UserTag title={`#${type}`} tier={6} key={`type${idx}`} />
          ))}
      </div>
      <div className="w-full flex gap-3">
        <Button
          className="w-full py-2.5 !text-brand-700 !bg-white"
          onClick={handleClickOpenLink}
        >{`/<>${data.probNum}: ${data.title}`}</Button>
        <Button
          className="w-full py-2.5 !text-brand-700 !bg-brand-50"
          onClick={handleClickCopyLink}
        >
          문제 링크 복사
        </Button>
      </div>
    </div>
  );
};

const LoadingCard = () => (
  <div className="w-[388px] h-[240px] border border-solid border-gray-200 shadow-sm" />
);

const NextProblems = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams();
  const { isLoading } = useGetNextProblems(id);

  const nextProbs = useNextProbs();

  const renderCard = () => {
    if (isLoading) {
      return Array.from({ length: 3 }).map((_, idx) => (
        <LoadingCard key={`Card${idx}`} />
      ));
    }

    return (
      nextProbs &&
      nextProbs.length > 0 &&
      nextProbs.map((prob, idx) => <Card data={prob} key={`Card${idx}`} />)
    );
  };

  const title = '정말 문제를\n전체 삭제 하시겠습니까?😭';

  return (
    <div className="py-8">
      <DeleteModal isOpen={isOpen} onClose={onClose} title={title} />
      <div className="flex items-start justify-between">
        <h3 className="text-gray-900 text-[24px] font-semibold">
          📌 다음 스터디까지 풀 문제
        </h3>
        <Button
          className="!text-gray-700 !text-base !font-semibold !bg-white"
          onClick={onOpen}
        >
          전체 삭제
        </Button>
      </div>
      <div className="w-full flex flex-wrap gap-6 pt-8">{renderCard()}</div>
    </div>
  );
};

export default NextProblems;

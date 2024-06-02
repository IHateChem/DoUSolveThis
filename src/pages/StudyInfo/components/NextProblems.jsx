import { Button, useDisclosure, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useDeleteNextProblem from '../hooks/api/nextProblems/useDeleteNextProblem';
import { RankTag, UserTag } from '../../../shared/components/Tag';
import useGetNextProblems from '../hooks/api/nextProblems/useGetNextProblems';
import { ReactComponent as Trash } from '../../../assets/trash.svg';
import { useNextProbs } from '../../../store/nextProbStore';
import SimpleModal from '../../../shared/components/SimpleModal';
import EnterProblem from './modals/checkProblem/EnterProblem';
import useDeleteAllNextProblems from '../hooks/api/nextProblems/useDeleteAllNextProblems';

const Card = ({ data }) => {
  const toast = useToast();
  const { id } = useParams();

  const { deleteFetch } = useDeleteNextProblem(id, data.probNum);

  const handleClickOpenLink = () => {
    window.open(data.link);
  };
  const handleClickCopyLink = () => {
    navigator.clipboard.writeText(data.link).then(() => {
      // TODO. 스타일링 반영
      toast({
        position: 'top',
        title: '문제 링크가 복사되었습니다.',
        status: 'success',
        duration: 3000,
      });
    });
  };

  const handleDelete = () => {
    deleteFetch();
  };

  return (
    <div className="w-[388px] h-[240px] flex flex-col justify-between p-6 shadow-sm rounded-xl border border-solid border-gray-200">
      <div>
        <div className="flex justify-between items-start">
          <RankTag>{data.rank}</RankTag>
          <Trash onClick={handleDelete} className="cursor-pointer" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mt-2 mb-5">
          {data.title}
        </h2>
        <div className="flex flex-wrap gap-2">
          {data.types &&
            data.types.map((type, idx) => (
              <UserTag title={`#${type}`} tier={6} key={`type${idx}`} />
            ))}
        </div>
      </div>

      <div className="w-full flex gap-3">
        <Button
          className="w-full py-2.5 !text-brand-700 !bg-white"
          onClick={handleClickOpenLink}
        >문제 바로 가기</Button>
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
  const {
    isOpen: isOpenEnterProblem,
    onOpen: onOpenEnterProblem,
    onClose: onCloseEnterProblem,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteModal,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();
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

  const modalTitle = '정말 문제를\n전체 삭제 하시겠습니까?😭';
  const { deleteAllFetch } = useDeleteAllNextProblems();

  const handleClickDeleteButton = () => {
    deleteAllFetch();
    onCloseDeleteModal();
  };

  return (
    <div className="py-8">
      <EnterProblem isOpen={isOpenEnterProblem} onClose={onCloseEnterProblem} />
      <SimpleModal
        isOpen={isOpenDeleteModal}
        onClose={onCloseDeleteModal}
        title={modalTitle}
        buttonTitle="전체 삭제"
        onClick={handleClickDeleteButton}
      />
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <h3 className="text-gray-900 text-[24px] font-semibold">
            📌 다음 스터디까지 풀 문제
          </h3>
          <Button
            onClick={onOpenEnterProblem}
            className="!bg-brand-600 !text-white rounded-lg font-semibold text-sm"
          >
            문제 추가하기
          </Button>
        </div>
        <Button
          className="!text-gray-700 !text-base !font-semibold !bg-white"
          onClick={onOpenDeleteModal}
        >
          전체 삭제
        </Button>
      </div>
      <div className="w-full flex flex-wrap gap-6 pt-8">{renderCard()}</div>
    </div>
  );
};

export default NextProblems;

import React, { useState, useEffect } from 'react';
import { faker } from '@faker-js/faker';
import LoadMoreButton from '../common/LoadMoreButton';
import errorPersonImg from '../../../public/errorImage/profile-circle.svg';

const CollectorCard = ({ collector }) => (
  <div>
    <img
      src={collector.profileImage}
      alt={collector.nickname}
      style={{
        width: '120px',
        height: '120px',
        borderRadius: '50%',
        marginBottom: '0.5rem',
      }}
      onError={(e) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = errorPersonImg;
      }}
    />
    <div
      style={{
        maxWidth: '126px',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        textAlign: 'center',
        fontSize: '14/16rem',
        fontFamily: 'Noto Sans KR',
        color: '#777',
      }}
    >
      {collector.nickname}
    </div>
  </div>
);

const Collectors: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState(18); // 처음에 9x2로 보여주기 위해 18로 설정
  const [collectors, setCollectors] = useState([]);

  useEffect(() => {
    const fetchCollectors = () => {
      const dummyCollectors = Array.from({ length: 50 }, () => ({
        // 50개의 가짜 데이터 생성
        id: faker.datatype.uuid(),
        profileImage: faker.image.avatar(),
        nickname: faker.internet.userName(),
      }));
      setCollectors(dummyCollectors);
    };

    fetchCollectors();
  }, []);

  const handleLoadMore = () => {
    setVisibleItems((prevVisibleItems) => {
      if (prevVisibleItems >= collectors.length) {
        return 18; // 초기 값으로 설정
      }
      const newVisibleItems = prevVisibleItems + 18;
      return newVisibleItems > collectors.length
        ? collectors.length
        : newVisibleItems;
    });
  };

  const isAllItemsVisible = collectors.length <= visibleItems;

  return (
    <div className="my-8 flex flex-col items-center justify-center px-8">
      <div className="mx-4 border-b border-customGray6">
        <div className="pt-8">
          <p className="mb-1 ml-1 font-helveticaNeue text-xl">COLLECTORS</p>
          <div className="mb-4 grid grid-cols-2 gap-11 transition-all duration-700 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-9">
            {collectors.slice(0, visibleItems).map((collector) => (
              <CollectorCard key={collector.id} collector={collector} />
            ))}
          </div>
        </div>
        <LoadMoreButton
          onClick={handleLoadMore}
          isExpanded={isAllItemsVisible}
        />
      </div>
    </div>
  );
};

export default Collectors;

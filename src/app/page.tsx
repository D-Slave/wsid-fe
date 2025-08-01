'use client';

import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">오늘 뭐하지?</h1>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex justify-center space-x-2 mb-8 overflow-x-auto">
        <button className="bg-purple-600 text-white px-4 py-2 rounded-full font-semibold whitespace-nowrap shadow-md">
          전체
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold whitespace-nowrap hover:bg-gray-300 transition-colors">
          여행
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold whitespace-nowrap hover:bg-gray-300 transition-colors">
          운동
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold whitespace-nowrap hover:bg-gray-300 transition-colors">
          식사
        </button>
        <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold whitespace-nowrap hover:bg-gray-300 transition-colors">
          기타
        </button>
      </div>

      {/* 활동 카드 그리드 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {/* 첫 번째 카드: 근력 운동 */}
        <div className="bg-orange-100 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
          <div className="bg-orange-300 w-16 h-16 rounded-full mb-4"></div>
          <p className="text-lg font-bold text-gray-800 text-center">
            근력 운동
          </p>
        </div>

        {/* 두 번째 카드: 영화 보기 */}
        <div className="bg-teal-100 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
          <div className="bg-teal-300 w-16 h-16 rounded-full mb-4"></div>
          <p className="text-lg font-bold text-gray-800 text-center">
            영화 보기
          </p>
        </div>

        {/* 세 번째 카드: 새로운 맛집 가보기 */}
        <div className="bg-amber-100 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
          <div className="bg-amber-300 w-16 h-16 rounded-full mb-4"></div>
          <p className="text-lg font-bold text-gray-800 text-center">
            새로운 맛집 가보기
          </p>
        </div>

        {/* 네 번째 카드: 하이킹 가기 (이미지 없음, 추가 예시) */}
        <div className="bg-sky-100 p-6 rounded-2xl shadow-lg flex flex-col items-center justify-center">
          <div className="bg-sky-300 w-16 h-16 rounded-full mb-4"></div>
          <p className="text-lg font-bold text-gray-800 text-center">
            하이킹 가기
          </p>
        </div>
      </div>

      {/* More 버튼 */}
      <div className="text-center">
        <button className="bg-purple-600 text-white font-bold text-lg px-12 py-4 rounded-full w-full max-w-sm shadow-xl hover:bg-purple-700 transition-colors">
          More
        </button>
      </div>
    </div>
  );
};

export default HomePage;

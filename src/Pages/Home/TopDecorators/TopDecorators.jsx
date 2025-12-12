import React from 'react';
import MySection from '../../../Layouts/MySection';
import MyContainer from '../../../Layouts/MyContainer';
import { useQuery } from '@tanstack/react-query';
import useAxiosInstance from '../../../Hooks/useAxiosInstance';
import { Star } from 'lucide-react';

const TopDecorators = () => {
  const axiosInstance = useAxiosInstance();
  const { data: topDecorators = [] } = useQuery({
    queryKey: ['topDecorators'],
    queryFn: async () => {
      const res = await axiosInstance.get('/top-decorators');
      return res.data;
    },
  });

  // Dummy messages & ratings
  const dummyData = [
    { message: "Creative and punctual decorator!", rating: 4.8 },
    { message: "Transforms spaces beautifully!", rating: 4.6 },
    { message: "Highly professional and reliable.", rating: 4.9 },
  ];

  // Limit to top 3
  const top3 = topDecorators.slice(0, 3);

  return (
    <MySection>
      <MyContainer>
        <h2 className="text-3xl font-bold mb-6 text-center">
          Top Decorators
        </h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {top3.map((decorator, index) => {
            const { message, rating } = dummyData[index];
            return (
              <div
                key={decorator._id}
                className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-6 flex flex-col gap-3 border border-gray-100 hover:shadow-2xl transition transform hover:-translate-y-1 hover:scale-105"
              >
                {/* Avatar */}
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xl font-bold">
                  {decorator.name.charAt(0)}
                </div>

                {/* Name & Email */}
                <div>
                  <h3 className="text-xl font-semibold">{decorator.name}</h3>
                  <p className="text-sm text-gray-500">{decorator.email}</p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">({rating.toFixed(1)})</span>
                </div>

                {/* Message */}
                <p className="text-gray-600 text-sm mt-2 italic">
                  "{message}"
                </p>
              </div>
            );
          })}
        </div>
      </MyContainer>
    </MySection>
  );
};

export default TopDecorators;

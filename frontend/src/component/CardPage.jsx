import { useSelector } from 'react-redux';
import Card from './Card';

function CardPage() {
  const { courseData } = useSelector((state) => state.course);
  const popularCourses = courseData?.slice(0, 6) ?? [];



  return (
    <section className="relative flex flex-col items-center justify-center bg-[#fafafa] px-6 py-20">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
        Start learning today
      </p>
      <h1 className="mt-3 text-center text-3xl font-semibold md:text-4xl">
        Our Popular Courses
      </h1>

      <span className="lg:w-[50%] md:w-[80%] text-[15px] text-center mt-[30px] px-[20px]">
        Explore top-rated courses to enhance your skills and accelerate your learning.
      </span>

      <div className="flex w-full max-w-6xl flex-wrap items-start justify-center gap-6 pt-10">
        {popularCourses?.map((course, index) => (
          <Card
            key={index}
            thumbnail={course.thumbnail}
            title={course.title}
            category={course.category}
            price={course.price}
            id={course._id}
          />
        ))}
      </div>
    </section>
  );
}

export default CardPage;

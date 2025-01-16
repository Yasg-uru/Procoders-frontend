import { useAppSelector } from '@/redux/hook';
import CourseCategory from '@/components/CourseCategory';

export default function CategoryPage() {
  const { filteredResults } = useAppSelector((state) => state.course);

  return (
    <div className="tailwind.config.jscontainer tailwind.config.jsmx-auto tailwind.config.jspy-10">
      <CourseCategory courses={filteredResults} />
    </div>
  );
}


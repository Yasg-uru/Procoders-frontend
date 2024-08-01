
import {Loader2Icon} from "lucide-react"

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <Loader2Icon className="w-16 h-16 text-gray-600 dark:text-gray-300 animate-spin" />
    </div>
  );
};

export default Loader;

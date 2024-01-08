import { Loader2Icon } from "lucide-react";

const Loader = () => {
  return (
    <div className="w-full min-h-[60vh] flex justify-center items-center">
      <Loader2Icon className="animate-spin w-16 h-16 " />
    </div>
  );
};

export default Loader;

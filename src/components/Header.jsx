import { Link, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export default function Header() {
  const pathname = useLocation().pathname;

  return (
    <div className="my-8">
      <Tabs value={pathname} className="w-full">
        <TabsList className="w-full">
          <TabsTrigger className="w-1/2" value="/" asChild>
            <Link to={"/"}>Activity</Link>
          </TabsTrigger>
          <TabsTrigger className="w-1/2" value="/archive" asChild>
            <Link to={"/archive"}>Archive</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}

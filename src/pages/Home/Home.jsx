import { useEffect, useState } from "react";
import FeedRow from "../../components/FeedRow";
import Loader from "../../components/ui/loader";
import { Button } from "../../components/ui/button";
import {
  handleArchive,
  getActivitiesData,
} from "../../api-functions/activity.api";
import { useToast } from "../../components/ui/use-toast";
import { Loader2Icon } from "lucide-react";

function Home() {
  const [activitiesData, setActivitiesData] = useState([]);
  const [archiveLoading, setArchiveLoading] = useState(false);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await getActivitiesData();
    if(!data) {
      toast({
        title: "Error",
        description: "Unable to archive all selected activities",
        variant: "destructive",
      });
    }
    data && setActivitiesData(data.filter((activity) => !activity.is_archived));
    setIsLoading(false);
  };

  const handleSelect = (id) => {
    const data = activitiesData.map((activity) => {
      if (id == activity.id) {
        return { ...activity, isSelected: !activity.isSelected };
      }
      return activity;
    });
    setActivitiesData(data);
  };

  const isAllSelected = activitiesData.every((activity) => activity.isSelected);
  const isAnySelected = activitiesData.some((activity) => activity.isSelected);

  const handleSelectAll = () => {
    if (isAllSelected) {
      setActivitiesData((prev) =>
        prev.map((activity) => ({ ...activity, isSelected: false }))
      );
      return;
    }
    setActivitiesData((prev) =>
      prev.map((activity) => ({ ...activity, isSelected: true }))
    );
  };

  const handleArchiveSelected = async () => {
    setArchiveLoading(true);
    await Promise.all(
      activitiesData
        .filter((activity) => activity.isSelected)
        .map((activity) => handleArchive(activity.id))
    )
      .then((result) => {
        toast({
          title: "Success",
          description: "Selected Activities archived successfully",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Unable to archive all selected activities",
          variant: "destructive",
        });
      });
    getData();
    setArchiveLoading(false);
  };

  return (
    <div className=" w-full  px-2 sm:px-0 ">
      {isLoading ? (
        <Loader />
      ) : !!activitiesData?.length ? (
        <div className="flex flex-col gap-4 my-8">
          <div className="flex items-center justify-between gap-4 px-2">
            <div>Click on the below tiles to select or unselect</div>
            <div className="flex items-center gap-4 justify-end">
              {isAnySelected && (
                <Button
                  className=" flex items-center gap-4 "
                  disabled={archiveLoading}
                  onClick={handleArchiveSelected}
                >
                  Archive Selected
                  {archiveLoading && (
                    <Loader2Icon className="w-4 h-4 animate-spin" />
                  )}
                </Button>
              )}
              <Button onClick={handleSelectAll}>
                {isAllSelected ? "Unselect All" : "Select All"}
              </Button>
            </div>
          </div>
          {activitiesData.map((activity) => (
            <FeedRow
              key={activity.id}
              activity={activity}
              refetch={getData}
              handleSelect={handleSelect}
            />
          ))}
        </div>
      ) : (
        <div>No Data Found</div>
      )}
    </div>
  );
}

export default Home;

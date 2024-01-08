import { useEffect, useState } from "react";
import {
  getActivitiesData,
  handleUnarchive,
} from "../../api-functions/activity.api";
import UnarchivedRow from "../../components/UnarchivedRow";
import Loader from "../../components/ui/loader";
import { Button } from "../../components/ui/button";
import { useToast } from "../../components/ui/use-toast";
import { Loader2Icon } from "lucide-react";

function Archive() {
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [activitiesData, setActivitiesData] = useState([]);
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
    data && setActivitiesData(data.filter((activity) => activity.is_archived));
    setIsLoading(false);
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

  const handleSelect = (id) => {
    const data = activitiesData.map((activity) => {
      if (id == activity.id) {
        return { ...activity, isSelected: !activity.isSelected };
      }
      return activity;
    });
    setActivitiesData(data);
  };

  const handleUnarchiveSelected = async () => {
    setArchiveLoading(true);
    await Promise.all(
      activitiesData
        .filter((activity) => activity.isSelected)
        .map((activity) => handleUnarchive(activity.id))
    )
      .then((result) => {
        toast({
          title: "Success",
          description: "Selected Activities unarchived successfully",
        });
      })
      .catch(() => {
        toast({
          title: "Error",
          description: "Unable to unarchive all selected activities",
          variant: "destructive",
        });
      });
    getData();
    setArchiveLoading(false);
  };

  return (
    <div className=" flex flex-col gap-4 px-2 sm:px-0 ">
      {isLoading ? (
        <Loader />
      ) : activitiesData?.length ? (
        <div className="flex flex-col gap-4 my-8">
          <div className="flex items-center justify-between gap-4 px-1">
            <div>Click on the below tiles to select or unselect</div>
            <div className="flex items-center gap-4 justify-end">
              {isAnySelected && (
                <Button
                  disabled={archiveLoading}
                  onClick={handleUnarchiveSelected}
                  className="flex gap-4 items-center"
                >
                  Unarchive Selected
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
            <UnarchivedRow
              key={activity.id}
              activity={activity}
              refetch={getData}
              handleSelect={handleSelect}
            />
          ))}
        </div>
      ) : (
        <div className="text-center">No data available!</div>
      )}
    </div>
  );
}

export default Archive;

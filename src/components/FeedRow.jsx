import ActivityCard from "./ActivityCard";
import { useToast } from "./ui/use-toast";

function FeedRow({ activity, refetch, handleSelect }) {
  const { toast } = useToast();

  const handleArchive = async () => {
    try {
      const response = await fetch(
        `https://cerulean-marlin-wig.cyclic.app/activities/${activity.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_archived: true,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Unable to archive");
      }
      refetch();
      toast({
        title: "Success",
        description: "Activity archived successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <ActivityCard activity={activity} handleSelect={handleSelect} handleArchiveChange={handleArchive} />
  );
}

export default FeedRow;

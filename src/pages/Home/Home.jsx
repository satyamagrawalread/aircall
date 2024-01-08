import React, { useEffect, useState } from "react";
import FeedRow from "./FeedRow";
import "./home.css";
import { getActivitiesData } from "../../Utils/getActivitiesData";

function Home() {
  const [activitiesData, setActivitiesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const data = await getActivitiesData();
    setActivitiesData(data);
    setIsLoading(false);
  };

  const updateActivitiesData = (id) => {
    console.log(id);
    const data = activitiesData.map((activity) => {
      if (id == activity.id) {
        return { ...activity, is_archived: true };
      }
      return activity;
    });
    setActivitiesData(data);
  };
  return (
    <div className=" max-w-[1080px] mx-auto ">
      {isLoading ? (
        <div>Please wait...</div>
      ) : (
            !!activitiesData?.length ? (
              activitiesData
                .filter((activity) => !activity.is_archived)
                .map((activity) => (
                  <FeedRow
                    key={activity.id}
                    activity={activity}
                    reFetch={getData}
                    updateActivitiesData={updateActivitiesData}
                  />
                ))
            ) : (
              <div>No Data Found</div>
            )
      )}
    </div>
  );
}

export default Home;

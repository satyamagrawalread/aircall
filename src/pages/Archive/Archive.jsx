import React, { useEffect, useState } from "react";
import { getActivitiesData } from "../../Utils/getActivitiesData";
import UnarchivedRow from "./UnarchivedRow";
import "./archive.css";

function Archive() {
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
  return (
    <div className="archiveContainer">
      {isLoading ? (
        <div>Please wait...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Unarchive</th>
            </tr>
          </thead>
          <tbody>
            {!!activitiesData?.length ? (
              activitiesData
                .filter((activity) => activity.is_archived)
                .map((activity) => (
                  <UnarchivedRow key={activity.id} activity={activity} reFetch={getData} />
                ))
            ) : (
              <div>No Data Found</div>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Archive;

import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const MyAssingedProject = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: myAssignProjects = [], refetch } = useQuery({
    queryKey: ["myassignedProject"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-assigned-projects?email=${user.email}`
      );
      return res.data;
    },
  });
    
    
    // reusable function
    
    const handleUpdateServiceStatus = (id, serviceStatus) => {
        console.log('in the hadi', id, serviceStatus)
        axiosSecure.patch(`/update-service-status?id=${id}`, serviceStatus)
            .then(res => {
                refetch();
            console.log(res)
        })
    }


    // accecpt
    const handleAccept = (id) => {
        const serviceStatus = {
            service_status: 'planning_phase'
        };
        handleUpdateServiceStatus(id, serviceStatus)
    }

    // handleMaterialsPrepared
    const handleMaterialsPrepared = (id) => {
        const serviceStatus = {
            service_status: 'materials_prepared'
        };
        handleUpdateServiceStatus(id, serviceStatus)
    }

    // handleMaterialsPrepared
    const handleOntheWaytoVenue = (id) => {
        const serviceStatus = {
            service_status: 'on_the_way_to_venue'
        };
        handleUpdateServiceStatus(id, serviceStatus)
    }
    // handleMaterialsPrepared
    const handleSetupinProgress = (id) => {
        const serviceStatus = {
            service_status: 'setup_in_progress'
        };
        handleUpdateServiceStatus(id, serviceStatus)
    }
    // handleMaterialsPrepared
    const handleCompleted = (id) => {
        const serviceStatus = {
            service_status: 'completed'
        };
        handleUpdateServiceStatus(id, serviceStatus)
    }



  return (
    <div>
      My Assing parojcers {myAssignProjects.length}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Service Status</th>
              <th>Payment Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myAssignProjects.map((myAssignProject, i) => (
              <tr key={myAssignProject._id}>
                <th>{i + 1}</th>
                <td>{myAssignProject.service_name}</td>
                <td>{myAssignProject.service_status}</td>
                <td>{myAssignProject.payment_status}</td>
                    <td>
                        
                        <button onClick={()=> handleAccept(myAssignProject._id)} className="btn">Accept</button>
                        <button onClick={()=> handleMaterialsPrepared(myAssignProject._id)} className="btn">Materials Prepared</button>
                        <button onClick={()=> handleOntheWaytoVenue(myAssignProject._id)} className="btn">On the Way to Venue</button>
                        <button onClick={()=> handleSetupinProgress(myAssignProject._id)} className="btn">Setup in Progress</button>
                        <button onClick={()=> handleCompleted(myAssignProject._id)} className="btn">Completed</button>
                       
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssingedProject;

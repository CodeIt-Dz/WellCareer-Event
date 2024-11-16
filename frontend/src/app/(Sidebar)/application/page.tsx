import ApplicationCard from "@/components/application-card";
import { getMyApplications } from "@/data/offers";




export default async function ApplicationPage  () {
    const data = await getMyApplications();
    const myApplications = data?.results;

    return ( 
        <div className="flex flex-col items-center justify-center p-8 gap-12">
            <h1 className=" text-xl items-start  self-start  ">
            Mes Candidatures
            </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {
                myApplications?.map((application:any) => (
                    <div key={application.id} className="flex">
                        <ApplicationCard application={application}  />
                    </div>
                ))
            }
        </div>
        </div>
        
     );
}


import { getSession } from "@/data/session";
import Sections from "./sections";
import { getUser } from "@/lib/api";

export default async function Profile() {
  try {
    const user = await getSession();
    console.log("User", user);
    if (!user || !user.user_id) {
      return <div>Error 500</div>
    }
    
    const data = await getUser(user.user_id);
    if (!data) {
      return <div>Error 500</div>
    }


    return <Sections user={data} />;
  } catch (error) {
    console.error("Error in Profile component:", error);
    return <div>Error loading profile</div>;
  }
}

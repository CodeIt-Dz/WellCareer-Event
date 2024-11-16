import JobCard from "@/components/jobcard";
import Search from "./components/search";
import { fetchFyOffers, fetchOffers } from "@/data/offers";
import { useAuth } from "@/hooks/useAuth";
import HomeOffers from "./components/homeOffers";
import { getSession } from "@/data/session";
import ConnectHome from "./(Sections)/connect-home";




export default async function Home() {

  const { isAuthenticated } = useAuth();
  const user = await getSession();
  const recentOffers = await fetchOffers();
  const foryouOffers = user?.user_id ? await fetchFyOffers(user.user_id) : null;
  

  


  return (
    <>
      <div>
        <section
          id="home"
          className="grid h-[100dvh] overflow-hidden relative place-items-center"
        >
          <div className="absolute right-24 top-[-8rem] rounded-full bg-[#5AE9FD] opacity-70 blur-3xl h-80 w-96"></div>
          <div className="absolute right-[-8rem] top-10 rounded-full bg-[#544BFF] opacity-70 blur-3xl h-80 w-80"></div>
          <div className="absolute left-28 bottom-[-8rem] rounded-full bg-[#5AE9FD] opacity-70 blur-3xl h-80 w-96"></div>
          <div className="absolute left-[-8rem] bottom-4 rounded-full bg-[#544BFF] opacity-70 blur-3xl h-80 w-80"></div>
          <div className="flex flex-col gap-8 items-center">
            <h2 className="font-bold text-primary justify-items-center text-3xl">
              Trouver le meilleur qui vous convient.
            </h2>
            <Search />
          </div>
        </section>
      </div>

      {!isAuthenticated && <ConnectHome/>}

      <section className="bg-white mx-12 py-8 px-20">
       
       <HomeOffers recentOffers={recentOffers ? recentOffers : []} 
       isAuthenticated={isAuthenticated} foryouOffers={foryouOffers ? foryouOffers : []}  />

      </section>
    </>
  );
}

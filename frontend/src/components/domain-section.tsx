'use client'
import React, { useEffect, useState } from "react";
import { mdiAccountCircle, mdiAccountGroup, mdiArrowLeft, mdiArrowRight ,mdiBottleTonicPlus, mdiFinance, mdiLaptop, mdiShield, mdiStorefront, mdiTools} from "@mdi/js";
import Icon from "@mdi/react";
import { Button, Card, CardBody, CardFooter, CardHeader } from "@nextui-org/react";

const DomainesExpertise = () => {
  const [activePage, setActivePage] = useState(0); // State to track the active page (0, 1, 2, etc.)
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const categories = [
    { title: "Médical et Pharmaceutique", icon: mdiBottleTonicPlus, description: "Découvrez les opportunités dans le secteur médical et pharmaceutique." },
    { title: "Vente et Marketing", icon: mdiStorefront, description: "Explorez les stratégies et les talents dans le secteur de la vente et du marketing." },
    { title: "Ingénierie et Technique", icon: mdiTools, description: "L'innovation et les solutions techniques dans le domaine de l'ingénierie." },
    { title: "Ressources Humaines", icon: mdiAccountGroup, description: "Optimisation de la gestion des talents et des stratégies RH." },
    { title: "Administration et Support", icon: mdiAccountCircle, description: "Gestion administrative et soutien pour la croissance de l'entreprise." },
    { title: "Finance et Comptabilité", icon: mdiFinance, description: "Gestion financière, comptabilité et optimisation fiscale." },
    { title: "Technologies de l'Information", icon: mdiLaptop, description: "Solutions innovantes en développement et gestion informatique." },
    { title: "Sécurité et Sûreté", icon: mdiShield, description: "Services et solutions pour la sécurité des personnes et des biens." }
  ];

  // Dynamically adjust the number of items per page based on screen size
    useEffect(() => {
        const handleResize = () => {
        setItemsPerPage(window.innerWidth < 640 ? 2 : 3);
        };

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);
  const totalPages = Math.ceil(categories.length / itemsPerPage); // Calculate total pages

  const handlePrev = () => {
    if (activePage > 0) setActivePage(activePage - 1);
  };

  const handleNext = () => {
    if (activePage < totalPages - 1) setActivePage(activePage + 1);
  };

  const displayedCategories = categories.slice(
    activePage * itemsPerPage,
    (activePage + 1) * itemsPerPage
  );

  return (
    <div className="mt-28 flex flex-col gap-4">
      <div className="flex justify-between mx-4 md:mx-16">
        <h1 className="xl:text-5xl text-xl xl:ml-0 mx-auto font-bold">Domaines d&apos;expertise</h1>
        
        {/* Display arrows on all screen sizes */}
        <div className="flex  gap-2">
          <Button radius="full" size="lg" className="hidden md:inline " onClick={handlePrev}>
            <Icon path={mdiArrowLeft} size={2} />
          </Button>
          <Button radius="full" size="sm" className="md:hidden " onClick={handlePrev}>
            <Icon path={mdiArrowLeft} size={1} />
          </Button>
          <Button radius="full" size="lg" className="hidden md:inline" onClick={handleNext}>
            <Icon path={mdiArrowRight} size={2} />
          </Button>
          <Button radius="full" size="sm" className="md:hidden" onClick={handleNext}>
            <Icon path={mdiArrowRight} size={1} />
          </Button>
        </div>
      </div>

      {/* Transition Wrapper with Smooth Slide-in Animation */}
      <div
        className={`transition-transform duration-500 ease-in-out transform ${activePage === 0 ? "translate-x-0" : `-translate-x-[${activePage * 100}%]`} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 mx-12`}
      >
        {displayedCategories.map((category, index) => (
          <Card
            key={index}
            className="bg-white border-primary border-1 hover:scale-105 transform transition duration-300 hover:shadow-lg hover:text-white hover:bg-primary group"
          >
            <CardHeader className="flex flex-col p-4 gap-8">
              <div className="border-none rounded-xl xl:p-4 p-2 bg-[#EAE9FF]">
                <Icon path={category.icon} size={3} className="text-primary" />
              </div>
              <h1 className="xl:text-3xl text-xl text-center flex justify-start items-center font-bold">{category.title}</h1>
            </CardHeader>
            <CardBody className="xl:p-12 p-8">{category.description}</CardBody>
            <CardFooter>
              
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DomainesExpertise;

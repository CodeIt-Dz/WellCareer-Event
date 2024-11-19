"use client"
import {  Button, Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import React from "react";
import Icon from "@mdi/react";
import {  mdiAccountBoxPlusOutline, mdiAccountCash, mdiAccountGroup, mdiChatOutline, mdiClipboardList, mdiCurrencyUsd, mdiEmoticonHappy, mdiFileDocument, mdiHandshake, mdiHelpCircleOutline, mdiHomeCity, mdiShield, mdiTruckDelivery } from "@mdi/js";
import Link from "next/link";
import HoverDisplay from "@/components/hover-card";
import {
  mdiAccountSearch} from '@mdi/js';
import DomainesExpertise from "@/components/domain-section";



export default  function Home() {

  


  return (
    
    <>
      <div>

        <section
          id="home"
          className=" h-[90dvh] flex xl:mt-10"
        >
          <div className=" hidden w-1/2 lg:flex px-8  rounded-3xl">
              <div className="flex flex-col  w-1/2 ">
                <Card radius="lg" shadow="none" className="bg-[#EAE9FF] rounded-r-none  ">
                  <Card radius="lg" className="p-3 m-3 mr-0 ">
                      <CardHeader className="flex-col items-start gap-2 ">
                        <div className="border-3 border-[#A7A7A7]  text-[#8A8A8A] bg-white rounded-full flex w-fit py-2 px-8 text-xs mb-2 font-bold ">New Experience</div>
                        <p className="text-black font-bold text-xl">Recrutement Rigoureux,</p>
                        <p className="font-semibold text-gray-400 text-xl">Accompagnement Personnalisé</p>
                      </CardHeader>
                      <CardBody>
                        <p className="text-xs text-gray-400 font-bold">sélectionner, développer et à connecter les meilleurs talents avec les entreprises à quête d&apos;excellence.</p>
                      </CardBody>
                    </Card>
                </Card> 
                <Card radius="none" shadow="none" className="bg-[#EAE9FF] rounded-r-none   ">
                  <Card shadow="none" radius="none" className="p-9 bg-white rounded-tr-xl ">
                    <Image
                    className="w-full h-auto"
                    alt ="working space"
                    src="/landing-page-card.png"  />
                  </Card>
                </Card>
              </div>
              <div className="w-1/2  p-3 px-8 pb-8 bg-[#EAE9FF] border-transparent rounded-3xl h-full rounded-tl-none">
                <Card radius="lg" shadow="none" className="h-full bg-primary flex justify-end">
                  <Image 
                    className=""
                    alt ="student"
                    src = "/student-portrait.png"
                  />
                </Card>
              </div>
          </div>
          <div className="hidden lg:flex flex-col gap-8 w-1/2 p-8 ">
            <div className="border-3 border-[#A7A7A7]  text-[#8A8A8A] bg-white rounded-full flex w-fit py-3 px-14 text-lg font-bold ">Start your career</div>
            <h1 className="text-5xl font-bold leading-[1.5]">Découvrez notre plateforme et donnez un nouvel élan à votre<p className="text-primary"> Carrière !</p></h1>
            <div className="flex flex-col gap-4">
              <p className="font-semibold">Qui Sommes-nous?</p>
              <p className="text-[#09090999] bg-opacity-60 text-lg ">Well Career, filiale de Well Pharma, est un Organisme Privé Agréé de Placement de personnel fondée en 2020, dédié à sélectionner, développer et à connecter les meilleurs talents avec les entreprises en quête d&apos;excellence</p>
            </div>
            <Link href="/auth/register/" passHref>
              <Button  size="lg" color="primary" radius="sm" className="text-3xl lg:text-xl lg:p-6 text-white font-bold w-1/3 p-8">S&apos;inscrire</Button>
            </Link>
          </div>
          {/*mobile hero*/}
          <div className="lg:hidden bg-primary   w-full flex">
            <div className="w-1/2 text-white text-3xl font-bold flex flex-col ml-10 gap-14 mt-44 md:mt-24 ">
              <p>Découvrez notre plateforme et donnez un nouvel élan à votre carrière !</p>
              <Link href="/auth/register/" passHref>
                <Button  size="md"  radius="sm" className="text-medium text-primary bg-white font-bold mr-8 py-6">S&apos;inscrire</Button>
              </Link>
            </div>
            <div className="w-1/2  flex mt-44 md:mt-4">
              <Image src="/student-portrait.png" alt="bullhorn" className="max-h-full" />
            </div>
          </div>
        </section>
        
        {/*mission section */}
        <section id="Mission">
          <div className="m-12 flex flex-col gap-4 mt-28 ">
              <h1 className="hidden xl:inline text-5xl font-bold pl-1">Notre mission</h1>
              <h1 className="xl:hidden text-xl font-semibold mx-auto">Qui sommes-nous ?</h1>
              <div className="rounded-2xl border-1 border-primary xl:p-14 p-6 pt-2 text-sm text-[#8A8A8A]  xl:text-2xl font-bold leading-relaxed ">
                <div className="flex justify-end text-primary"><Icon path={mdiChatOutline} size={2} /></div>
                <p>Well Career, en tant Qu&apos;Organisme Privé Agréé de Placement, Notre Mission est de sélectionner, développer et accompagner les professionnels pour qu&apos;ils s&apos;épanouissent dans leur parcours. Grâce à des processus de Recrutement Rigoureux, des Formations Ciblées et un Accompagnement Personnalisé, nous aidons chaque talent à trouver sa place dans un environnement où il pourra exceller. Notre Mission est d&apos;Etre un Partenaire de Confiance pour les Entreprises, En Répondant A Leurs Besoins De Compétences Et En Assurant Un Avenir Prometteur Aux Talents Que Nous Plaçons.</p>
              </div>
          </div>
        </section>

        <section id="domaine">
          {/*Domain section */}
          <DomainesExpertise></DomainesExpertise>
        </section>

        {/*services section */}
        <section id="services" className="lg:mx-12 mt-20">
            {/* <div className=" p-8  mt-28">
            <TabsView >
               Tab Header 
              <div className="flex ">
                <TabsHead tabs={["Gestion des carrieres", "Recrutement et selection", "Relations de travail","Insertion professionnelle"]} className="lg:mb-8 lg:ml-12 lg:mr-8 ml-8 mr-4 w-1/2" />

                {/* Tab Content 
                
                <TabsPage>
                  {(activeTab) => (
                    <div className=" bg-gray-1R00 rounded-xl w-1/2">
                      {activeTab === 0 && <div className="flex flex-col "> <div className="flex justify-center h-1/2"> <Image src="/office-worker.png" alt="office" className="p-6 max-md:hidden"/>  </div> <h1 className="xl:text-4xl md:text-2xl max-md:text-medium max-md:mt-24 font-bold my-4">Gestion des Carrieres</h1> <p className="lg:text-xl max-md:text-sm max-md:align-middle text-[#8A8A8A]">selectionner, developper et a connecter les meilleurs talents avec les entreprises en quete d excellence</p></div>}
                      {activeTab === 1 && <p>Recrutement et selection</p>}
                      {activeTab === 2 && <p>Relations de travail</p>}
                      {activeTab === 3 && <p>Recrutement et selection</p>}
                    </div>
                  )}
                </TabsPage>
              </div>
            </TabsView>
          </div> 
          */}
          <div>
            <h1 className="lg:text-5xl text-xl font-bold mb-4">Nos services</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <HoverDisplay 
              title="Recrutement et sélection" 
              description="Processus de recherche et sélection des meilleurs talents." 
              icon={mdiAccountSearch} 
              width="w-full"
            />
            <HoverDisplay 
              title="Gestion de la performance" 
              description="Suivi et évaluation de la performance des employés." 
              icon={mdiClipboardList} 
              width="w-full"
            />
            <HoverDisplay 
              title="Gestion des carrières" 
              description="Accompagnement des employés dans le développement de leur carrière." 
              icon={mdiAccountGroup} 
              width="w-full"
            />
            <HoverDisplay 
              title="Gestion de la paie et des avantages sociaux" 
              description="Gestion des rémunérations, primes et avantages sociaux." 
              icon={mdiCurrencyUsd} 
              width="w-full"
            />
            <HoverDisplay 
              title="Relations de travail" 
              description="Gestion des relations entre employeurs et employés." 
              icon={mdiAccountCash} 
              width="w-full"
            />
            <HoverDisplay 
              title="Gestion des ressources humaines stratégiques" 
              description="Alignement des stratégies RH avec les objectifs organisationnels." 
              icon={mdiHandshake} 
              width="w-full"
            />
            <HoverDisplay 
              title="Prise en charge des formalités administratives liées à l'hébergement" 
              description="Aide à l'administration des démarches pour l'hébergement." 
              icon={mdiHomeCity} 
              width="w-full"
            />
            <HoverDisplay 
              title="Assistance pour l'obtention des autorisations nécessaires lors de l'expatriation" 
              description="Accompagnement dans l'obtention des documents nécessaires." 
              icon={mdiFileDocument} 
              width="w-full"
            />
            <HoverDisplay 
              title="Support à l'intégration" 
              description="Assistance à l'intégration des nouveaux employés." 
              icon={mdiShield} 
              width="w-full"
            />
            <HoverDisplay 
              title="Placement temporaire / permanent du personnel" 
              description="Services de placement pour des missions temporaires ou permanentes." 
              icon={mdiHelpCircleOutline} 
              width="w-full"
            />
            <HoverDisplay 
              title="Insertion professionnelle" 
              description="Aide à l'intégration professionnelle des individus dans le marché du travail." 
              icon={mdiAccountBoxPlusOutline} 
              width="w-full"
            />
            <HoverDisplay 
              title="Suivi post-placement" 
              description="Suivi des candidats après leur placement pour assurer leur réussite." 
              icon={mdiTruckDelivery} 
              width="w-full"
            />
          </div>
        </section>

        <section id="contact">

          <div className="xl:m-12 xl:p-20 p-8 bg-primary lg:flex-row flex-wrap-reverse flex xl:rounded-3xl mt-28">
            <div className="lg:hidden flex w-full justify-center">
              <Link href="https://wellpharmagroup.com/fr#contact" passHref>
                <Button  size="md"  radius="sm" className="text-xl bg-white text-primary font-bold p-4 mt-16">Contact</Button>
              </Link>
              <Image
                src="/arrow.png"
                height={150}
                className="transform -rotate-15"
              />
            </div>
            <p className=" xl:hidden  text-md text-center mt-4  text-white">Well Career, filiale de Well Pharma, est un Organisme Prive agree de placement de personnel fondee  en 2020, dedie a selectionner, developper et a connecter les meilleurs talents avec les entreprises en quete excellence </p>
            <div className="lg:w-1/2 w-full xl:h-auto  h-64 p-4">
              <div className="grid grid-cols-5 grid-rows-1 h-full mx-auto lg:w-5/6 sm:w-4/6 md:w-3/6 w-5/6 2xl:max-w-md  relative  ">
                <div className="h-1/2  bg-white rounded-3xl rounded-t-[34px] border-transparent self-end"></div>
                <div className="col-span-2  "></div>
                <div className="flex-col ">
                  <div className="bg-white h-1/5">
                    <div className="bg-primary h-full rounded-br-3xl"></div>
                  </div>
                  <div className="h-4/5 bg-white rounded-3xl border-transparent rounded-r-none "></div>
                </div>
                <div className="bg-white h-full rounded-3xl rounded-bl-none border-transparent "></div>
                <div className="hidden xl:inline xl:-ml-16 absolute bottom-0  z-10  ">
                  <Image
                    src="/footer-student.png"
                    width={520}
                    height={340} // Specify height for better rendering
                    alt="Footer Student"
                    className="rounded-3xl max-w-none"
                  />

                  <div className="border-3 border-white  text-white  rounded-full absolute z-10 2xl:-top-16 -top-28 left-12 py-2 px-4 text-2xl flex items-center gap-2 font-bold "><Icon path={mdiEmoticonHappy} size={2} /> New Experiernce</div>
                
                </div>
                {/*for mobile */}
                <div className="xl:hidden absolute max-[425px]:-ml-6 bottom-0 sm:ml-8 md:ml-6 z-10">
                  <Image
                    src="/footer-student.png"
                    width={280}
                    height={190}
                    alt="footer student"
                    className="max-w-none rounded-3xl"
                  />
                  <div className="border-3 border-white  text-white  rounded-full absolute z-10 max-sm:text-xs  -top-14 left-8 py-1 px-2  flex items-center gap-1 font-bold "><Icon path={mdiEmoticonHappy} size={1} /> New Experiernce</div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 w-full p-4">
              <h1 className="lg:text-4xl text-xl  text-white font-bold leading-[1.8] mb-8 text-center">Découvrez notre plateforme et donnez un nouvel élan à votre carrière !</h1>
              <p className="hidden xl:inline  text-lg  text-white">Well Career, filiale de Well Pharma, est un Organisme Prive agree de placement de personnel fondee  en 2020, dedie a selectionner, developper et a connecter les meilleurs talents avec les entreprises en quete excellence </p>
              <div className="hidden lg:flex">
                <Link href="https://wellpharmagroup.com/fr#contact" passHref>
                  <Button  size="lg"  radius="sm" className="text-3xl bg-white text-primary font-bold p-8 mt-20">Contact</Button>
                </Link>
                <Image
                  src="/arrow.png"
                  height={200}
                  className="transform -rotate-15"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      

    </>
  );
}

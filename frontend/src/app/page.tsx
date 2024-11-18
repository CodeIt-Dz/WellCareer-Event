"use client"
import {  Button, Card, CardBody, CardFooter, CardHeader, Image } from "@nextui-org/react";
import React from "react";
import Icon from "@mdi/react";
import {  mdiArrowBottomRight, mdiArrowLeft, mdiArrowRight, mdiBullhorn, mdiChatOutline, mdiEmoticonHappy, mdiEmoticonHappyOutline } from "@mdi/js";
import { TabsView, TabsHead, TabsPage } from "./components/tabs";




export default  function Home() {

  


  return (
    
    <>
      <div>
        <section
          id="home"
          className=" h-[100dvh] flex xl:mt-14"
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
                        <p className="text-xs text-gray-400 font-bold">selectionner, developper et a connecter les meilleurs talents avec les etnreprises a quete d'excellence.</p>
                      </CardBody>
                    </Card>
                </Card> 
                <Card radius="none" shadow="none" className="bg-[#EAE9FF] rounded-r-none  ">
                  <Card shadow="none" radius="none" className="p-9 bg-white rounded-tr-xl ">
                    <Image
                    className="w-full h-auto"
                    alt ="working space"
                    src="/landing-page-card.png"  />
                  </Card>
                </Card>
              </div>
              <div className="w-1/2 h-5/6 p-3 px-8 pb-8 bg-[#EAE9FF] border-transparent rounded-3xl rounded-tl-none">
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
            <h1 className="text-5xl font-bold leading-[1.5]">Step into Our Salon and Transform Your <span className="text-primary">Future!</span></h1>
            <div className="flex flex-col gap-4">
              <p className="font-semibold">Qui Sommes-nous?</p>
              <p className="text-[#09090999] bg-opacity-60 text-lg ">Well Career, filiale de Well Pharma, est un Organisme Prive agree de placement de personnel fondee  en 2020, dedie a selectionner, developper et a connecter les meilleurs talents avec les entreprises en quete excellence</p>
            </div>
            <Button size="lg" color="primary" radius="sm" className="text-3xl text-white font-bold w-1/3 p-8">Get in Touch</Button>
          </div>
          {/*mobile hero*/}
          <div className="lg:hidden bg-primary w-full flex">
            <div className="w-1/2 text-white text-xl font-bold flex flex-col ml-10 gap-14 mt-44 ">
              <p>Step into Our Salon and Transform Your Future!</p>
              <Button size="md"  radius="sm" className="text-sm text-primary bg-white font-bold mr-8 py-6">Get in Touch</Button>
            </div>
            <div className="w-1/2 flex mt-44">
              <Image src="/student-portrait.png" />
            </div>
          </div>
        </section>
        <div className="hidden p-8 mt-28">
        <TabsView >
          {/* Tab Header */}
          <div className="flex ">
            <TabsHead tabs={["Gestion des carrieres", "Recrutement et selection", "Relations de travail","Insertion professionnelle"]} className="mb-8 ml-3 mr-8 w-1/2" />

            {/* Tab Content */}
            
            <TabsPage>
              {(activeTab) => (
                <div className=" bg-gray-1R00 rounded-xl w-1/2">
                  {activeTab === 0 && <div className="flex flex-col"> <div className="flex justify-center h-1/2"> <Image src="/office-worker.png" className="p-6"/>  </div> <h1 className="text-4xl font-bold my-4">Gestion des Carrieres</h1> <p className="text-xl text-[#8A8A8A]">selectionner, developper et a connecter les meilleurs talents avec les entreprises en quete d excellence</p></div>}
                  {activeTab === 1 && <p>Recrutement et selection</p>}
                  {activeTab === 2 && <p>Relations de travail</p>}
                  {activeTab === 3 && <p>Recrutement et selection</p>}
                </div>
              )}
            </TabsPage>
          </div>
        </TabsView>
      </div>
        <div className="m-12 flex flex-col gap-4 mt-28 ">
            <h1 className="hidden xl:inline text-5xl font-bold pl-1">Notre mission</h1>
            <h1 className="xl:hidden text-xl font-semibold mx-auto">Qui sommes-nous ?</h1>
            <div className="rounded-2xl border-1 border-primary xl:p-14 p-6 pt-2 text-sm text-[#8A8A8A]  xl:text-2xl font-bold leading-relaxed ">
              <div className="flex justify-end text-primary"><Icon path={mdiChatOutline} size={2} /></div>
              <p>Well Career, ent tant Qu'Organisme Prive Agree de placement, Notre Mission est de selectionner, developper et accompagner les professionnels pour qu'ils sepanouissent dans leur parcours. Grace a des processus de Recruitement Rigoureux, de Formations Ciblees et un Accompagnement Personnalise, nous aidons chaque talent a trouver sa place dans un environnement out il pourra exceller. Notre Mission est d'Etre un Partenaire de Confiance pour les Entreprises, En Repondant A Leurs Besions De compoetences Et En Assurant Un Avenir Prometteur Aux Talents que Nous placons.</p>
            </div>
        </div>
        <div className="mt-28 flex flex-col gap-4">
          <div className="flex justify-between mx-16">
            <h1 className="xl:text-5xl text-xl mx-auto font-bold ">Domaines d expertise</h1>
            <div className="hidden xl:inline">
              <Button radius="full" size="lg"><Icon path={mdiArrowLeft} size={2}/></Button>
              <Button radius="full" size="lg"><Icon path={mdiArrowRight} size={2}/></Button>
            </div>
          </div>
          <div className="flex xl:flex-nowrap flex-wrap justify-around gap-4 mx-12">
            <Card  className="bg-white border-primary border-1 hover:scale-105 transform transition duration-300 hover:shadow-lg hover:text-white hover:bg-primary group">
              <CardHeader className="flex flex-col p-4 gap-8">
                <div className="border-none rounded-xl xl:p-4 p-2 bg-[#EAE9FF] ">
                  <Image src="/bullhorn.png"  />
                </div>
                <h1 className="xl:text-3xl text-xl font-bold ">Marketing</h1>
              </CardHeader>
              <CardBody className="xl:p-12 p-8">
                lorem ipsum is simply dummy text of the printing and tpyesetting industry.lorem has been the industry's standard
              </CardBody>
              <CardFooter>
                <span className="underline-offset-4 underline text-xl mx-auto text-primary font-bold group-hover:text-white">More</span>
              </CardFooter>
            </Card>
            <Card  className="bg-white border-primary border-1 hover:scale-105 transform transition duration-300 hover:shadow-lg hover:text-white hover:bg-primary group">
              <CardHeader className="flex flex-col p-4 gap-8">
                <div className="border-none rounded-xl p-4 bg-[#EAE9FF] ">
                  <Image src="/bullhorn.png"  />
                </div>
                <h1 className="xl:text-3xl text-xl font-bold ">Marketing</h1>
              </CardHeader>
              <CardBody className="p-12">
                lorem ipsum is simply dummy text of the printing and tpyesetting industry.lorem has been the industry's standard
              </CardBody>
              <CardFooter>
                <span className="underline-offset-4 underline text-xl mx-auto text-primary font-bold group-hover:text-white">More</span>
              </CardFooter>
            </Card>
            <Card  className="bg-white border-primary border-1 hover:scale-105 transform transition duration-300 hover:shadow-lg hover:text-white hover:bg-primary group">
              <CardHeader className="flex flex-col p-4 gap-8">
                <div className="border-none rounded-xl p-4 bg-[#EAE9FF] ">
                  <Image src="/bullhorn.png"  />
                </div>
                <h1 className="text-3xl font-bold ">Marketing</h1>
              </CardHeader>
              <CardBody className="p-12">
                lorem ipsum is simply dummy text of the printing and tpyesetting industry.lorem has been the industry's standard
              </CardBody>
              <CardFooter>
                <span className="underline-offset-4 underline text-xl mx-auto text-primary font-bold group-hover:text-white">More</span>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="xl:m-12 xl:p-20 p-8 bg-primary xl:flex-row flex-wrap-reverse flex xl:rounded-3xl mt-28">
          <div className="xl:hidden flex">
            <Button size="md"  radius="sm" className="text-xl bg-white text-primary font-bold p-4 mt-16">Get in Touch</Button>
            <Image
              src="/arrow.png"
              height={150}
              className="transform -rotate-15"
            />
          </div>
          <p className=" xl:hidden  text-md text-center mt-4  text-white">Well Career, filiale de Well Pharma, est un Organisme Prive agree de placement de personnel fondee  en 2020, dedie a selectionner, developper et a connecter les meilleurs talents avec les entreprises en quete excellence </p>
          <div className="xl:w-1/2 w-full xl:h-auto h-64 p-4">
            <div className="grid grid-cols-5 grid-rows-1 h-full relative  xl:px-12 px-8 ">
              <div className="h-1/2  bg-white rounded-3xl rounded-t-[34px] border-transparent self-end"></div>
              <div className="col-span-2 "></div>
              <div className="flex-col ">
                <div className="bg-white h-1/5">
                  <div className="bg-primary h-full rounded-br-3xl"></div>
                </div>
                <div className="h-4/5 bg-white rounded-3xl border-transparent rounded-r-none "></div>
              </div>
              <div className="bg-white h-full rounded-3xl rounded-bl-none border-transparent "></div>
              <div className="hidden xl:inline absolute bottom-0  z-10  ">
                <Image
                  src="/footer-student.png"
                  width={560}
                  height={380} // Specify height for better rendering
                  alt="Footer Student"
                  className="rounded-3xl max-w-none"
                />

                <div className="border-3 border-white  text-white  rounded-full absolute z-10 -top-28 left-12 py-2 px-4 text-3xl flex items-center gap-2 font-bold "><Icon path={mdiEmoticonHappy} size={2} /> New Experiernce</div>
              
              </div>
              {/*for mobile */}
              <div className="xl:hidden absolute bottom-0  z-10">
                <Image
                  src="/footer-student.png"
                  width={280}
                  height={190}
                  alt="footer student"
                  className="max-w-none rounded-3xl"
                />
                <div className="border-3 border-white  text-white  rounded-full absolute z-10 -top-14 left-8 py-1 px-2  flex items-center gap-1 font-bold "><Icon path={mdiEmoticonHappy} size={1} /> New Experiernce</div>
              </div>
            </div>
          </div>
          <div className="xl:w-1/2 p-4">
            <h1 className="xl:text-4xl text-xl text-white font-bold leading-[1.8] mb-8 text-center">Step into Our Salon and Transform Your Future!</h1>
            <p className="hidden xl:inline  text-lg  text-white">Well Career, filiale de Well Pharma, est un Organisme Prive agree de placement de personnel fondee  en 2020, dedie a selectionner, developper et a connecter les meilleurs talents avec les entreprises en quete excellence </p>
            <div className="hidden xl:flex">
              <Button size="lg"  radius="sm" className="text-3xl bg-white text-primary font-bold p-8 mt-20">Get in Touch</Button>
              <Image
                src="/arrow.png"
                height={200}
                className="transform -rotate-15"
              />
            </div>
          </div>
        </div>
      </div>
      

    </>
  );
}

"use client";
import Icon from '@mdi/react';
import { mdiDomain, mdiMapMarker, mdiTimerSand } from '@mdi/js';
import Image from 'next/image';
import { Button } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { ApplyOffer, saveOffer } from '@/data/offers';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

interface OfferHeaderProps {
  title: string;
  companyName: string;
  location: string;
  created: string;
  offer_id: string;
  isAuthenticated?: boolean;
}

export default function OfferHeader({ 
  title, companyName, location, created, offer_id, isAuthenticated 
}: OfferHeaderProps) {

  const router = useRouter();

  const handleApply = async () => {
    if (isAuthenticated) {
      try {
        toast.loading('Envoi de votre candidature...');
  
        const { data, status } = await ApplyOffer(offer_id);
  
        toast.dismiss(); 
  
        if (status === 201) {
          toast.success('Candidature soumise avec succès !');
        } else if (status === 400) {
          toast(
            "Vous avez déjà postulé à cette offre.",
            {
              icon:"💫"
            }
          )
        } else {
          toast.error('Échec de la soumission de la candidature. Veuillez réessayer.');
        }
      } catch (error) {
        toast.dismiss();
        toast.error('Échec de la soumission de la candidature. Veuillez réessayer.');
        console.error(error);
      }
    } else {
      router.push('/auth/login');
    }
  };
  

  const handleSave = async () => {
    if(isAuthenticated) {
      try {
        toast.loading('Enregistrement de l\'offre...');
  
        const { data, status } = await saveOffer(offer_id);
  
        toast.dismiss(); 
  
        if (status === 201) {
          toast.success('Offre enregistrée avec succès !');
        } else if (status === 400) {
          toast(
            "Vous avez déjà enregistré cette offre.",
            {
              icon:"💫"
            }
          )
        } else {
          toast.error('Échec de l\'enregistrement de l\'offre. Veuillez réessayer.');
        }
      } catch (error) {
        toast.dismiss();
        toast.error('Échec de l\'enregistrement de l\'offre. Veuillez réessayer.');
        console.error(error);
      }

    }
    else {
      router.push('/auth/login')
    }

  }


  

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex justify-between py-4 m-4 w-4/11 rounded-xl bg-[rgba(217,217,217,0.2)]">
        <div className="flex items-center gap-0 mx-6 my-6 px-8">
          <Image 
            src="" 
            alt="Profile Picture" 
            width={112} 
            height={112} 
            className="object-cover rounded-full overflow-hidden border border-black"
          />
          <div className="flex flex-col justify-center h-full mx-4 gap-1">
            <span className="text-xl font-semibold">{title}</span>
            <div className="flex items-center ml-2">
              <Icon path={mdiDomain} size={0.7} color={"#666666"} className='mr-1 mb-1' />
              <span className="text-sm text-[#666666]">******</span>
            </div>
            <div className="flex items-center ml-2">
              <Icon path={mdiMapMarker} size={0.62} color={"#666666"} className='mr-1' />
              <span className="text-xs text-[#666666]">{location}</span>
            </div>
            <div className="flex items-center ml-2">
              <Icon path={mdiTimerSand} size={0.62} color={"#666666"} className='mr-1' />
              <span className="text-xs text-[#666666]">{created}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center px-12">
          <Button
            type="submit"
            variant="solid"
            color="primary"
            className="px-12"
            onPress={handleApply}
          >
            <p>Postuler</p>
          </Button>

          <Button
            type="submit"
            variant="faded"
            color="primary"
            className="px-12"
            onPress={handleSave}
          >
            <p>Enregistrer</p>
          </Button>
        </div>
      </div>
    </>
  );
}

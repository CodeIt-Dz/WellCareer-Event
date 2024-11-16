import OfferHeader from "@/app/components/offer-header";
import OfferDescription from "@/app/components/offer-description";
import ItemList from "@/app/components/offer-details-card";
import Icon from "@mdi/react";
import { mdiAccountGroup, mdiBriefcaseEdit, mdiCash, mdiEmail, mdiFacebook, mdiFileDocumentEditOutline, mdiLanConnect, mdiLinkedin, mdiPhone, mdiTwitter } from "@mdi/js";
import { fetchById } from "@/data/offers";
import { OfferById } from "@/types";
import { Badge } from '@/components/ui/badge';
import { useAuth } from "@/hooks/useAuth";


interface Item {
    icon: JSX.Element;
    info: string;
}



export default async function OfferPage({ params }: { params: { id: string } }) {


    const  {id}  = (params);
    const offer: OfferById | null = await fetchById(id);
    const { isAuthenticated } = useAuth();

    if (!offer) {
        return <div>Offer not found</div>;
    }

    const items: Item[] = [
        {
            icon: <Icon path={mdiAccountGroup} size={0.9} color="#423BCA" />,
            info: `${offer.candidates} candidates`,
        },
        {
            icon: <Icon path={mdiCash} size={0.9} color="#423BCA" />,
            info: `${offer.salary} DA`,
        },
        {
            icon: <Icon path={mdiFileDocumentEditOutline} size={0.9} color="#423BCA" />,
            info: offer.contract_type,
        },
        {
            icon: <Icon path={mdiLanConnect} size={0.9} color="#423BCA" />,
            info: offer.localisation,
        },
        {
            icon: <Icon path={mdiBriefcaseEdit} size={0.9} color="#423BCA" />,
            info: offer.job_level,
        },
    ];
    const contactItems: Item[] = offer.company.contacts?.map((contact) => ({
        icon: (
            <Icon 
                path={contact.type === 'Phone' ? mdiPhone : mdiEmail} 
                size={0.9} 
                color="#423BCA" 
            />
        ),
        info: contact.info,
    }));

    const socialItems: Item[] = offer.company.socials?.map((social) => {
        let iconPath;
        switch (social.label) {
            case 'Facebook':
                iconPath = mdiFacebook;
                break;
            case 'LinkedIn':
                iconPath = mdiLinkedin;
                break;
            case 'Twitter':
                iconPath = mdiTwitter;
                break;
            default:
                iconPath = mdiAccountGroup; // Default icon if label doesn't match
        }
    
        return {
            icon: <Icon path={iconPath} size={0.9} color="#423BCA" />,
            info: `${offer.company.name} ${social.label}`,
        };
    })

    return (
        <div className="grid grid-cols-4 gap-4 mx-6 mb-20">
            <div className="col-span-1 p-4 text-center">
                <div className="w-full py-2">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51172.78851063292!2d2.9659223216796984!3d36.715372900000006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128fadbd327670ad%3A0xd6b961d39efc4a29!2sEURL%20WELL%20PHARMA!5e0!3m2!1sen!2sdz!4v1730097594536!5m2!1sen!2sdz"
                        height="200"
                        className="border-0 w-full rounded-xl"
                        loading="lazy"
                    ></iframe>
                </div>
                <div className="my-5 flex flex-col gap-10">
                    <ItemList title="Information" items={items} />
                    <ItemList title="Contact" items={contactItems} />
                    <ItemList title="Socials" items={socialItems} />
                </div>
            </div>

            <div className="col-span-3 mt-6 ">
                <OfferHeader title={offer.title}
                 companyName={offer.company?.name} 
                 location={`${offer.wilaya}, ${offer.daira}`}
                  created="Il ya 10 jours"
                  offer_id={id} 
                  isAuthenticated={isAuthenticated}
                  />
                <div className="h-2/4 ">
                    <h1 className="text-medium font-semibold m-8">&Agrave; propos de l&apos;offre d&apos;emploi</h1>
                    
                    <OfferDescription
                        title="Responsibilities"
                        values={offer.responsibilities}
                    />
                    <OfferDescription
                        title="Qualifications"
                        values = {offer.qualifications}
                    />
                    <div className="flex flex-col gap-1">
                        <h2 className="text-sm font-semibold pl-16 text-[#333333] mb-2">Skills</h2>
                        <div className="ml-16 flex gap-4">
                            {offer.skills?.map((skill, index) => (
                                <Badge key={index} className="bg-[#3028C8] bg-opacity-20 text-[#3028C8] px-3 py-1 rounded-full">
                                    {skill.label}
                                </Badge>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

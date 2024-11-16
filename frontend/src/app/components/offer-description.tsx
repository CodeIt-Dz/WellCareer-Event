
interface OfferDescriptionProps {
    title: string;
    values: Array<{description:string}>;
}

export default function OfferDescription({ title, values }: OfferDescriptionProps) {
    console.log(values)
    return (
        <div className="px-8 bg-[rgba(217,217,217,0.2)] rounded-lg py-6 m-6 h-auto">
            <h2 className="text-sm font-semibold pl-1 text-[#333333] mb-2">{title}</h2>
            <ul className="text-gray-700 text-xs list-disc pl-5">
                {values?.map((item, index) => (
                    <li key={index}>{item.description}</li>
                ))}
            </ul>
        </div>
    );
}

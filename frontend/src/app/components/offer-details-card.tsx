import Icon from "@mdi/react";
import {mdiAccountGroup,mdiCash} from "@mdi/js";
// Define your props
interface Item{
    icon : JSX.Element;
    info : string;
}
interface ItemListProps {
    items: Item[];
    title: string;
}

// Define your component without using React.FC
const ItemList = ({ title,items }: ItemListProps) => {
    return (
        <div className="p-5 flex justify-center flex-col rounded-xl bg-[rgba(217,217,217,0.2)]">
            <h1 className="text-left text-sm pb-5">{title}</h1>
            <ul className="list-disc ">
                {items?.map((item, index) => (
                    <li key={index} className="flex items-center mb-2">
                        {item.icon}
                        <a href={item.info} target="_blank" rel="noopener noreferrer" className="ml-2  text-xs">
                            {item.info}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
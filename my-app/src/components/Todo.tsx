"use client";

import Image from "next/image";
import React, {useState} from "react";

type Props = {
	status: number;
	content: string;
	added: string;
	publishBy: string;
	id: string;
	itemKey: number;
	style: React.CSSProperties;
    garden: string;
    parcel : string;
    line : string;
    className?: string;
    onStatusChange : (id: string, newStatus: number) => void;
    handleEdit : (e: React.FormEvent) => void;
};

const Todo = ({ 
    status,
    style,
    content, 
    garden, 
    parcel, 
    line, 
    added, 
    itemKey, 
    id,
    className,
    onStatusChange, 
    handleEdit
    }: Props) => {

    const [checked, setChecked] = useState(false)

    const handleCheck = () => {
        console.log("checked")
        setChecked(prev => !prev)
        onStatusChange(id, 0)
        //TODO Changer le status dans la DB + faire disparaitre de l'écran pour afficher todo suivant
    }

	return (
		<section
			className={` mx-1 relative col-start-${itemKey + 1} col-end-${itemKey + 2} row-start-2 row-end-7 ${className}`}
			style={style}
		>
			<section
				className={`col-start-${itemKey + 1} col-end-${
					itemKey + 2
				} row-start-2 row-end-7 w-full h-full`}
			>
				<div
					className={`p-1 mb-2 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-all w-full ${
						status === 0
							? "bg-white"
							: status === 1
							? "bg-green-200"
                            : status === 2
                            ? "bg-green-400"
                            : status === 3
                            ? "bg-yellow-200"
                            : status === 4
                            ? "bg-yellow-400"
							: "bg-red-400"
					} flex flex-col justify-between`}
				>
					{/* Add profile picture from the publishBy props */}
					<p className="text-2xl text-black">{content}</p>
                    <p className="text-lg">garden :{garden}</p>
                    <p className="text-lg">parcel :{parcel}</p>
                    <p className="text-lg">line :{line}</p>
					<p className="text-sm text-gray-500 text-right mr-2">
						{added}
					</p>
				</div>
			</section>
			<div 
            onClick={handleCheck}
            className="absolute h-8 w-8 bg-white border-2 rounded-md top-1 right-1"></div>
            <div 
            onClick={handleCheck}
            style={{display : checked || status === 0 ? "block" : "none"}} className="absolute text-5xl -top-1 right-2"> X </div>
            <div 
            onClick={handleEdit}
            className="absolute h-8 w-8 top-10 right-1 bg-white rounded-md border-2  ">
                <Image src="/image/divers/pen.png" alt="" width={80} height={80}/>
            </div>
		</section>
	);
};

export default Todo;

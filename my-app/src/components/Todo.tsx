"use client";

import Link from "next/link";
import React, { FormEvent, useState } from "react";

type Props = {
	status: string;
	content: string;
	added: number; //A CHANGER
	publishBy: string;
	id: string;
	itemKey: number;
	style: React.CSSProperties
};

const Todo = ({ status, style, content, added, publishBy, itemKey, id }: Props) => {

    const [checked, setChecked] = useState(false)

    const handleCheck = () => {
        console.log("checked")
        setChecked(prev => !prev)
        //TODO Changer le status dans la DB + faire disparaitre de l'écran pour afficher todo suivant
    }

	return (
		<section
			className={` mx-1 relative col-start-${itemKey + 1} col-end-${itemKey + 2} row-start-2 row-end-7`}
			style={style}
		>
			<Link
				href={`/todo/${id}`}
				className={`col-start-${itemKey + 1} col-end-${
					itemKey + 2
				} row-start-2 row-end-7 w-full`}
			>
				<section
					className={`p-1 mb-3 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-all w-full ${
						status === "chill"
							? "bg-green-200"
							: status === "normal"
							? "bg-amber-200"
							: "bg-red-200"
					} flex flex-col justify-between`}
				>
					{/* Add profile picture from the publishBy props */}
					<p>id : {id}</p>
					<p className="text-2xl text-green-700">{content}</p>
					<p className="text-sm text-gray-500 text-right mr-2">
						{added}
					</p>
				</section>
			</Link>
			<div 
            onClick={handleCheck}
            className="absolute h-8 w-8 bg-white border-2 rounded-md top-1 right-1"></div>
            <div 
            onClick={handleCheck}
            style={{display : checked ? "block" : "none"}} className="absolute text-5xl -top-1 right-2"> X </div>
		</section>
	);
};

export default Todo;

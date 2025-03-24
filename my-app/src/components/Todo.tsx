"use client"

import Link from "next/link";
import React, { FormEvent } from "react";

type Props = {
	status: string;
	content: string;
	added: number; //A CHANGER
	publishBy: string;
	id: string;
    itemKey: number;

};

const Todo = ({ status, content, added, publishBy, itemKey,  id }: Props) => {
	return (
		<Link 
        href={`/todo/${id}`} 
        style={{display : itemKey > 1 ? "none" : "flex"}} 
        className={`col-start-${itemKey + 1} col-end-${itemKey + 2} row-start-2 row-end-7`}>
            <section
                className={`p-1 mb-3 rounded-lg w-full ${
                    status === "chill"
                        ? "bg-green-200"
                        : status === "normal"
                        ? "bg-amber-200"
                        : "bg-red-200"
                } flex flex-col justify-between`}
                
            >
                {/* Add profile picture from the publishBy props */}
                <p>id : {id}</p>
                <p className="text-lg">{content}</p>
                <p>{added}</p>
            </section>
		</Link>
	);
};

export default Todo;

"use client"

import Link from "next/link";
// import React, { FormEvent } from "react";

type Props = {
	status: string;
	content: string;
	added: number; //A CHANGER
	publishBy: string;
	id: string;
    key: number
};

const Todo = ({ status, content, added, key,  id }: Props) => {
	return (
		<Link href={`/todo/${id}`} style={{display : key > 1 ? "none" : "flex"}}>
            <section
                className={`p-1 my-1 rounded-lg w-full ${
                    status === "chill"
                        ? "bg-green-400"
                        : status === "normal"
                        ? "bg-amber-300"
                        : "bg-red-400"
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

/* eslint-disable react-hooks/rules-of-hooks */
"use client"

import Card from '../../components/UI/Card'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import data from '../data/data.js'
import Todo from '../../components/UI/Todo'
import Link from 'next/link';
import BentoCardHeader from '../../components/UI/BentoCardHeader'

const page = () => {
    const [processedData, setProcessedData] = useState(data.todos)


//TODO AJOUTER RERENDER QUAND ON CHECK UN TODO
    const handleStatusChange = (id: string, newStatus: number) => {
        const updatedData = processedData.map(todo => 
          todo.id === id ? { ...todo, status: newStatus } : todo
        );
        setProcessedData(updatedData);
    };

    useEffect(() => {
        const tempData = [...data.todos];
        tempData.sort((a, b) => b.status - a.status);
        setProcessedData([...tempData]);
    }, []);
 
    return (
        <section className='grid grid-cols-4 grid-rows-7 h-screen gap-2 p-2 max-w-4xl m-auto'>

            {/* Profile */}
            <div className="row-start-1 row-end-2 col-start-1 col-end-2 h-full w-full flex justify-center mt-5">
                <Link href="/profile">
                    <Image
                        src={"/image/divers/profile.png"}
                        alt="Profile page"
                        width={72}
                        height={72}
                        title="Profil"
                        className="relative rounded-full border-2 border-border hover:border-4 transition-all duration-50"
                    />
                </Link>
            </div>

            {/* Post */}
            <div className="row-start-1 row-end-2 col-start-2 col-end-3 h-full w-full flex justify-center mt-5">
                <Link href="/post">
                    <Image
                        src="/image/divers/post.png"
                        alt="Post page"
                        width={72}
                        height={72}
                        title="Post"
                        className="relative rounded-full border-2 border-border hover:border-4 transition-all duration-50"
                    />
                </Link>
            </div>


            {/* Explore */}
            <div className="row-start-1 row-end-2 col-start-3 col-end-4 h-full w-full flex justify-center mt-5">
                <Link href="/explore">
                    <Image
                        src="/image/divers/explore.png"
                        alt="Explore page"
                        width={72}
                        height={72}
                        title="Explore"
                        className="relative rounded-full border-2 border-border hover:border-4 transition-all duration-50"
                    />
                </Link>
            </div>


            {/* Logout/Login */}
            <div className="row-start-1 row-end-2 col-start-4 col-end-5 h-full w-full flex justify-center mt-5">
                <Link href="/login">
                    <Image
                        src="/image/divers/logged-out.png"
                        alt="Login page"
                        width={72}
                        height={72}
                        title="Login"
                        className="relative rounded-full border-2 border-border hover:border-4 transition-all duration-50"
                    />
                </Link>
            </div>

                        {/* TodoList */}
                        <Card className={'row-start-2 row-end-4 col-start-1 col-end-5 h-full px-3 grid grid-cols-2 grid-rows-6 gap-2 w-full'}>
                <BentoCardHeader
                    className="row-start-1 row-end-2 col-start-1 col-end-3" containerName={'Todo'} ></BentoCardHeader>
                {processedData.map((todo, index) => (
                    <Todo
                        key={todo.id}
                        itemKey={index}
                        status={todo.status}
                        content={todo.content}
                        added={todo.update_at}
                        publishBy={todo.publishBy}
                        garden={todo.garden_id}
                        parcel={todo.parcel_id}
                        line={todo.line_id}
                        id={todo.id}
                        onStatusChange={handleStatusChange}
                        style={{ display: index > 1 ? "none" : "flex" }} 
                        handleEdit={function (): void {
                            throw new Error('Function not implemented.')
                        } }                    />
                ))}
                
                    

            </Card>



            {/* Garden */}
            <Card className='row-start-4 row-end-7 col-start-1 col-end-3 h-full w-full px-3'>
            <BentoCardHeader
                    className="row-start-1 row-end-2 col-start-1 col-end-3" containerName={'Garden-manager'} ></BentoCardHeader>


            </Card>

            {/* Message */}
            <Card className='row-start-7 row-end-8 col-start-1 col-end-3 h-full w-full px-3'>
            <BentoCardHeader
                    className="row-start-1 row-end-2 col-start-1 col-end-3" containerName={'Message'} >
                        Choose your Garden
                    </BentoCardHeader>

            </Card>

            {/* Feed */}
            <Card className='row-start-4 row-end-8 col-start-3 col-end-5 h-full w-full px-3'>
            <BentoCardHeader
                    className="row-start-1 row-end-2 col-start-1 col-end-3" containerName={'Feed'} ></BentoCardHeader>

            </Card>

        </section>
    )
}

export default page
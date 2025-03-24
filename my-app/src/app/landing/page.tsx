import Card from '@/components/Card'
import React from 'react'
import Image from 'next/image'
import data from '../data/data.js'
import Todo from '@/components/Todo'
import Link from 'next/link';

const page = () => {
  return (
    <section className='grid grid-cols-4 grid-rows-7 h-screen w-screen gap-2 p-4'>

        {/* Profile */}
        {/* <Card className='row-start-1 row-end-2 col-start-1 col-end-2 h-full w-full px-0 flex justify-center items-center'>
        <Image src="/image/avatar/test-profile.png" alt="Profile" width={100} height={100} />
        </Card> */}

        <div className="row-start-1 row-end-1 col-start-1 col-end-1 h-p-3">
            <Link href="/profile">
                <Image
                    src={"/image/avatars/PI_01.png"}
                    alt="Profile page"
                    width={96}
                    height={96}
                    title="Profil"
                    className="relative rounded-full border-2 border-border hover:border-4 transition-all duration-50"
                />
            </Link>
        </div>

        {/* Post */}
        {/* <Card className='row-start-1 row-end-2 col-start-2 col-end-3 h-full w-full px-3'>
            Post
        </Card> */}

        <div className='row-start-1 row-end-2 col-start-2 col-end-3 px-3'>
            <Link href="/post">
                <Image
                    src=""
                    alt="Post page"
                    width={96}
                    height={96}
                    title='Post'
                    className="relative rounded-full border-2 border-border hover:border-4 transition-all duration-50"
                />
            </Link>
        </div>

        {/* Explore */}
        {/* <Card className='row-start-1 row-end-1 col-start-3 col-end-4 h-full w-full px-3'>
            Explore
        </Card> */}

        <div className='row-start-1 row-end-1 col-start-3 col-end-4 h-full w-full px-3'>
            <Link href="/explore">
                <Image
                    src=""
                    alt="Explore page"
                    width={96}
                    height={96}
                    title='Explore'
                    className="relative rounded-full border-2 border-border hover:border-4 transition-all duration-50"
                />
            </Link>
        </div>

        {/* Logout/Login */}
        {/* <Card className='row-start-1 row-end-2 col-start-4 col-end-5 h-full w-full px-3'>
            Login
        </Card> */}

        <div className='row-start-1 row-end-2 col-start-4 col-end-5  h-full w-full px-3'>
            <Link href="/login">
                <Image
                    src=""
                    alt="Login page"
                    width={96}
                    height={96}
                    title='Login'
                    className="relative rounded-full border-2 border-border hover:border-4 transition-all duration-50"
                />
            </Link>
        </div>

        {/* TodoList */}
        <Card className={'row-start-2 row-end-4 col-start-1 col-end-5 h-full px-3 grid grid-cols-2 gap-2'}>
        {
            data.todos.map((todo, index) => (
                <Todo
                    itemKey={index}
                    status={todo.status}
                    content={todo.content}
                    added={todo.added}
                    publishBy={todo.publishBy}
                    id={todo.id} 
                />
            ))
        }

        </Card>



        {/* Garden */}
        <Card className='row-start-4 row-end-7 col-start-1 col-end-3 h-full w-full px-3'>
            Garden
        </Card>

        {/* Message */}
        <Card className='row-start-7 row-end-8 col-start-1 col-end-3 h-full w-full px-3'>
            Message
        </Card>

        {/* Feed */}
        <Card className='row-start-4 row-end-8 col-start-3 col-end-5 h-full w-full px-3'>
            Feed
        </Card>

    </section>
  )
}

export default page
"use client"

import React from 'react'
import data from '../data/data'
import Button from '@/components/Button'
import Todo from '@/components/Todo'

const page = () => {

    const addTask = () => {
        console.log("add task")
    }

    return (
        <>
            <section className='font-(family-name:--font-jersey) text-lg flex justify-center items-center bg-cardbackground'>
                <Button
                    type={'action'}
                    handleAction={addTask}>
                    Add task
                </Button>

                <p>
                    sort by :
                </p> 
                <select name="sortBy" id="sortBy">
                    <option value="nameAsc">Name ascendant</option>
                    <option value="nameDesc">Name descendant</option>
                    <option value="dateAsc">Date ascendant</option>
                    <option value="dateDesc">Date descendant</option>
                    <option value="statusAsc">Status ascendant</option>
                    <option value="statusDesc">Status descendant</option>
                </select>
            </section>

            <section className='font-(family-name:--font-jersey) text-lg flex flex-col bg-cardbackground'>
            {
                data.todos.map((todo, index) => (
                    <Todo
                        key={todo.id}
                        itemKey={index}
                        status={todo.status}
                        content={todo.content}
                        added={todo.added}
                        publishBy={todo.publishBy}
                        id={todo.id} 
                        style={{}}/>
                ))
            }

            </section>
        </>
    )
}

export default page
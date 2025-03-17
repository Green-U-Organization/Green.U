"use client"
import React, { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'
import Card from '@/components/Card'
import TextInput from '@/components/TextInput'
import Button from '@/components/Button'

const page = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState(false)

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!email.trim()) {
            setError(true)
        } else {
            setError(false)
            // ça fonctionne. Prévoir la route pour log in!
            console.log(email)
        }
    }

    return (
        <>
            <Card>
                <form onSubmit={handleSubmit}>

                    <div className="flex flex-col items-center justify-center">
                        <h2>Green.U</h2>

                        <TextInput
                            type='text'
                            label='Email'
                            value={email}
                            name='email'
                            placeholder=''
                            onChange={handleEmailChange} />
                        <br />
                        <TextInput
                            label='Password' />
                        <br />
                        <div className="flex flex-row justify-between">
                            <Button 
                            type='submit'
                            handleSubmit={handleSubmit}
                            >Log In</Button>
                            <Button
                            type='link'
                            href='/signin'
                            >Sign In</Button>
                        </div>
                    </div>
                </form>
            </Card>
        </>
    )
}

export default page
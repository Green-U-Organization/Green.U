"use client"

import React, { ChangeEvent, FormEvent, useEffect } from 'react'
import { useState } from 'react'
import Card from '@/components/Card'
import TextInput from '../../components/TextInput'
import Button from '@/components/Button'

const page = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | boolean>(false)
    const [checkPass, setCheckPass] = useState<Boolean>(false)

    const specialChar = ["²", "&", "~", "'", "#", "{", "(", "[", "-", "|", "`", "_", "^", "@", ")", "]", "=", "}", "+", "°", "^", "¨", "¤", "$", "£", "%", "!", "§", ":", "/", ";", ".", "?"]

    const checkPassword = (password: string) => {
        console.log("checking password...")
        if (password.length <= 8) {
            setCheckPass(false)
            console.log("password too short")
            return
        }
        const hasSpecialChar = specialChar.some((char) => password.includes(char))
        setCheckPass(hasSpecialChar)
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value
        setPassword(newPassword)
        checkPassword(newPassword)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        checkPassword(password)
        if (!email) {
            alert('please enter a valid email')
        } else if
            (!checkPass) { 
            alert(`Your password must at least contain 8 characters and 1 special character`)
        } else {
            setError(false)
            // ça fonctionne. Prévoir la route pour log in!
            console.log(email)
            console.log(password)
        }
    }

    return (
            <section className=''>

                <Card
                    colStart={2}
                    colEnd={5} 
                    rowStart={0} 
                    rowEnd={0}>

                    <form onSubmit={handleSubmit}>

                        <div className="flex flex-col items-center justify-center">
                            <h2>Green-U</h2>

                            <div className='flex flex-col justify-center items-left'>
                                <TextInput
                                    type='email'
                                    label='Email'
                                    value={email}
                                    name='email'
                                    placeholder='Enter your email'
                                    onChange={handleEmailChange} 
                                    error={false} />
                                <br />
                                <TextInput
                                    type='password'
                                    label='Password'
                                    value={password}
                                    name='password'
                                    placeholder='Enter your password'
                                    onChange={handlePasswordChange} 
                                    error={false} />
                            </div>
                            <br />
                            <div className="flex flex-row justify-between">
                                <Button
                                    type='submit'
                                    handleSubmit={handleSubmit}
                                    href=''>
                                        Log in
                                </Button>
                                <Button
                                    type='link'
                                    href='/signin'>
                                        Sign in
                                </Button>
                            </div>
                        </div>
                    </form>
                </Card>
            </section>
    )
}

export default page
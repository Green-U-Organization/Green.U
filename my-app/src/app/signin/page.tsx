"use client"

import React, { ChangeEvent } from 'react'
import { useState } from 'react'
import Card from '@/components/Card'
import TextInput from '@/components/TextInput'

const page = () => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVerify, setPasswordVerify] = useState('')
  const [surname, setSurname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [sexe, setSexe] = useState('')
  const [birthDate, setBirthDate] = useState('')



const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
  setLogin(e.target.value)
}
const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
  setPassword(e.target.value)
}
const handlePasswordVerifyChange = (e: ChangeEvent<HTMLInputElement>) => {
  setPasswordVerify(e.target.value)
}
const handleSurnameChange = (e: ChangeEvent<HTMLInputElement>) => {
  setSurname(e.target.value)
}
const handleLastnameChange = (e: ChangeEvent<HTMLInputElement>) => {
  setLastname(e.target.value)
}
const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
  setEmail(e.target.value)
}
const handlePostalCodeChange = (e: ChangeEvent<HTMLInputElement>) => {
  setPostalCode(e.target.value)
}





  return (
<section>

  <Card 
  colStart={0} 
  colEnd={0} 
  rowStart={0} 
  rowEnd={0}>
    
    <h1 className='text-4xl'>Sign In : </h1>

    <TextInput 
    type='text' 
    label='Username'
    value={login} 
    name='login' 
    placeholder='Enter your user name' 
    error={false}
    onChange={handleLoginChange}/>

    <TextInput 
    type='password'
    label='Password'
    value={password} 
    name='password' 
    placeholder='Enter your password' 
    error={false} 
    onChange={handlePasswordChange}/>

<TextInput 
    type='password'
    label='Password Verification'
    value={passwordVerify} 
    name='passwordVerify' 
    placeholder='Enter your password again' 
    error={false} 
    onChange={handlePasswordVerifyChange}/>


  <TextInput 
    type='text'
    label='Surname'
    value={surname} 
    name='surname' 
    placeholder='Enter your surname' 
    error={false} 
    onChange={handleSurnameChange}/>

    {/* Add radio button for sexe and calendar for birthdate */}


<TextInput 
type='text'
label='lastname'
value={lastname} 
name='lastname' 
placeholder='Enter your lastname' 
error={false} 
onChange={handleLastnameChange}/>


<TextInput 
    type='email'
    label='Email'
    value={email} 
    name='email' 
    placeholder='Enter your email' 
    error={false} 
    onChange={handleEmailChange}/>


  <TextInput 
    type='number'
    label='Postal Code'
    value={postalCode} 
    name='postalCode' 
    placeholder='Enter your postal code' 
    error={false} 
    onChange={handlePostalCodeChange}/>

  </Card>
</section>
  )
}

export default page
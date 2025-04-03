import React from 'react';
import TextInput from './UI/TextInput';

const RegisterForm = () => {
  return (
    <>
      {/* Input natif */}
      <input type="text" />
      
      {/* Votre TextInput avec le même comportement */}
      <TextInput type="text" />
      
      {/* Version avec label et gestion d'erreur */}
      <TextInput 
        type="text"
        label="Email"
        name="email"
        placeholder="Entrez votre email"
        error={false}
      />
    </>
  );
};

export default RegisterForm;
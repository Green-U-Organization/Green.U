import React from 'react';
import RegisterForm from '../../components/Page/RegisterForm';

const page = () => {
  //#region FETCH FUNCTION

  console.log('registerForm : ', RegisterForm);
  //#endregion

  // DISPLAY
  return (
    <section className="flex h-full items-center justify-center">
      <RegisterForm></RegisterForm>
    </section>
  );
};

export default page;

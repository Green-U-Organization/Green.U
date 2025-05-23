import React, { ChangeEvent, useState } from 'react';
import Card from '../Atom/Card';
import TextInput from '../Atom/TextInput';
import Button from '../Atom/Button';

const TodoPopUp = () => {
  const [content, setContent] = useState<string>('');

  const handleContentChange = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    const form = document.getElementById('todoPopup') as HTMLFormElement;
    if (form) {
      form.submit();
    } else {
      console.error('Form nor found');
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-15px)] items-center justify-center overflow-auto">
      <Card className={'bg-cardbackground max-w-5xl px-8 pt-5'}>
        <form id="todoPopup">
          <div>
            <TextInput
              type="text"
              label="Todo: "
              value={content}
              name="content"
              placeholder="what is to do?"
              onChange={handleContentChange}
              error={false}
            ></TextInput>
          </div>
          <Button
            className="bg-bgbutton relative m-5 px-6 py-2"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default TodoPopUp;

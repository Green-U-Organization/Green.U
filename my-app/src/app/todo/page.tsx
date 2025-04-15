/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import React, { useEffect, useState } from 'react';
import data from '../data/data';
import Button from '@/components/Atom/Button';
import Todo from '@/components/Molecule/Todo';
import Card from '@/components/Atom/Card';
import TodoPopUp from '@/components/UI/TodoPopUp';

const page = () => {
  const [processedData, setProcessedData] = useState(data.todos);
  const [edit, setEdit] = useState(false);

  const addTask = () => {
    console.log('add task');
  };

  //Sorting des Todos
  //https://www.javascripttutorial.net/array/javascript-sort-an-array-of-objects/
  const handleProcess = (e: { target: { value: unknown } }) => {
    const tempData = [...data.todos];
    console.log(e.target.value);
    switch (e.target.value) {
      case 'nameAsc':
        tempData.sort((a, b) => a.content.localeCompare(b.content));
        setProcessedData([...tempData]);
        break;

      case 'nameDesc':
        tempData.sort((a, b) => b.content.localeCompare(a.content));
        setProcessedData([...tempData]);
        break;

      case 'dateAsc':
        tempData.sort(
          (a, b) =>
            new Date(a.update_at).getTime() - new Date(b.update_at).getTime()
        );
        setProcessedData([...tempData]);
        break;

      case 'dateDesc':
        tempData.sort(
          (a, b) =>
            new Date(b.update_at).getTime() - new Date(a.update_at).getTime()
        );
        setProcessedData([...tempData]);
        break;

      case 'statusAsc':
        tempData.sort((a, b) => a.status - b.status);
        setProcessedData([...tempData]);
        break;

      case 'statusDesc':
        tempData.sort((a, b) => b.status - a.status);
        setProcessedData([...tempData]);
        break;
    }
  };
  useEffect(() => {
    console.log('yolo');
  }, [processedData]);

  const handleStatusChange = (id: string, newStatus: number) => {
    const updatedData = processedData.map((todo) =>
      todo.id === id ? { ...todo, status: newStatus } : todo
    );
    setProcessedData(updatedData);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  return (
    <Card className="max-w-screen">
      <section
        style={{ display: edit ? 'none' : 'block' }}
        className="bg-cardbackground flex items-center justify-center font-(family-name:--font-jersey) text-lg"
      >
        <div className="flex items-center justify-center">
          <Button onClick={addTask}>Add task</Button>

          <div className="mr-5 flex">
            <p>sort by :</p>
            <select
              className="rounded-md border-1"
              onChange={handleProcess}
              name="sortBy"
              id="sortBy"
            >
              <option value="nameAsc">Name ascendant</option>
              <option value="nameDesc">Name descendant</option>
              <option value="dateAsc">Date ascendant</option>
              <option value="dateDesc">Date descendant</option>
              <option value="statusAsc">Status ascendant</option>
              <option value="statusDesc">Status descendant</option>
            </select>
          </div>
        </div>
      </section>

      <section
        style={{ display: edit ? 'none' : 'block' }}
        className="bg-cardbackground flex flex-col font-(family-name:--font-jersey) text-lg"
      >
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
            style={{}}
            className="mx-5"
            onStatusChange={handleStatusChange}
            handleEdit={handleEdit}
          />
        ))}
      </section>

      <section style={{ display: edit ? 'block' : 'none' }}>
        <TodoPopUp></TodoPopUp>
      </section>
    </Card>
  );
};

export default page;

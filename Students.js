// src/Students.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import Modal from 'react-modal';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [studentData, setStudentData] = useState({ name: '', class: '', section: '', rollNumber: '' });

  const fetchStudents = async () => {
    const studentsCollection = collection(db, 'students');
    const studentSnapshot = await getDocs(studentsCollection);
    const studentList = studentSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setStudents(studentList);
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, 'students'), studentData);
    setModalIsOpen(false);
    fetchStudents();
  };

  const handleDeleteStudent = async (id) => {
    await deleteDoc(doc(db, 'students', id));
    fetchStudents();
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div>
      <h2>Students</h2>
      <button onClick={() => setModalIsOpen(true)}>Add Student</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Roll Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.rollNumber}</td>
              <td>
                <FaEye onClick={() => console.log('View', student.id)} />
                <FaEdit onClick={() => console.log('Edit', student.id)} />
                <FaTrash onClick={() => handleDeleteStudent(student.id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <h2>Add Student</h2>
        <form onSubmit={handleAddStudent}>
          <input type="text" placeholder="Name" onChange={(e) => setStudentData({ ...studentData, name: e.target.value })} required />
          <input type="text" placeholder="Class" onChange={(e) => setStudentData({ ...studentData, class: e.target.value })} required />
          <input type="text" placeholder="Section" onChange={(e) => setStudentData({ ...studentData, section: e.target.value })} required />
          <input type="text" placeholder="Roll Number" onChange={(e) => setStudentData({ ...studentData, rollNumber: e.target.value })} required />
          {/* Add more fields as needed */}
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default Students;
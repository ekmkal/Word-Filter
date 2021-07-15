import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { updateWords } from '../actions/wordActions';

const NewWordForm = () => {
  // const [myNewWords, setMyNewWords] = useState(['some', 'new', 'words']);
  const [myNewWords, setMyNewWords] = useState([]);
  const [newWord, setNewWord] = useState('');

  const dispatch = useDispatch();

  const wordListMy = useSelector((state) => state.wordListMy);
  const { myWords } = wordListMy;

  const addNewWord = (n) => {
    if (!myWords.includes(n) && !myNewWords.includes(n)) {
      setNewWord('');
      setMyNewWords([...myNewWords, n]);
    }
  };

  const removeNewWord = (n) => {
    const updatedNewWordsArr = [...myNewWords];
    console.log(updatedNewWordsArr);
    const index = updatedNewWordsArr.indexOf(n);
    console.log(index);
    if (index !== -1) {
      updatedNewWordsArr.splice(index, 1);
      setMyNewWords(updatedNewWordsArr);
    }
  };

  const updateHandler = () => {
    if (window.confirm('Are you sure to add these words to your store?')) {
      dispatch(updateWords([...myWords, ...myNewWords]));
    }
  };

  return (
    <>
      <Form>
        <Form.Label>Add New Words To Your Store</Form.Label>
        {myNewWords.map((newWord, index) => (
          <Form.Group as={Row} key={index} className="mb-3" controlId="formAddNewWord">
            <Col sm="3">
              <Form.Control type="text" readOnly defaultValue={newWord} />
            </Col>
            <Col>
              <Button variant="danger" className="btn-sm" onClick={() => removeNewWord(newWord)}>
                <i className="fas fa-trash"></i>
              </Button>
            </Col>
          </Form.Group>
        ))}
        <Form.Group as={Row} className="mb-3" controlId="formAddNewWord">
          <Col sm="8">
            <Form.Control
              type="text"
              placeholder="Add word.."
              value={newWord}
              onChange={(e) => {
                setNewWord(e.target.value);
              }}
            />
          </Col>
          <Col sm="4">
            <Button
              variant="info"
              className="btn-sm"
              onClick={() => {
                addNewWord(newWord);
              }}
            >
              Add
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </>
  );
};

export default NewWordForm;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Container, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { listMyWords, updateWords } from '../actions/wordActions';

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [myWordsInState, setMyWordsInState] = useState([]);
  const [myNewWords, setMyNewWords] = useState([]);
  const [text, setText] = useState('');
  const [wordsNotInStore, setWordsNotInStore] = useState([]);

  const wordListMy = useSelector((state) => state.wordListMy);
  const { loading, error, myWords } = wordListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!myWords) {
      dispatch(listMyWords());
    } else {
      history.push('/');
      setMyWordsInState(myWords);
    }
  }, [dispatch, history, myWords, userInfo]);

  const extractText = (e) => {
    e.preventDefault();
    const extractedWordsArr = [];
    // eslint-disable-next-line array-callback-return
    text.split(' ').map((word) => {
      if (!myWordsInState.includes(word)) {
        console.log(word);
        extractedWordsArr.push(word);
      }
    });
    setWordsNotInStore(extractedWordsArr);
  };

  const addNewWord = (n) => {
    setMyNewWords([...myNewWords, n]);
  };

  const updateHandler = () => {
    if (window.confirm('Are you sure to add these words to your store?')) {
      dispatch(updateWords([...myWords, ...myNewWords]));
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <Meta />
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <h1>HOME PAGE</h1>
      {userInfo && (
        <Message style={{ color: '#b36458' }} variant="success">
          Welcome {capitalizeFirstLetter(userInfo.username)}!
        </Message>
      )}

      <Row>
        <Col sm="6">
          <Form onSubmit={extractText}>
            <Form.Label>Input the text you want to extract</Form.Label>
            <Form.Group className="mb-3" controlId="inputText">
              <Form.Control
                type="text"
                placeholder="Write a text.."
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />
            </Form.Group>
            <Button type="submit" variant="warning">
              Extract
            </Button>
          </Form>
        </Col>
        <Col sm="6">
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>The Words Not In Your Store</th>
                <th>ADD TO MY STORE</th>
              </tr>
            </thead>
            <tbody>
              {wordsNotInStore.map((word, index) => (
                <tr key={index}>
                  <td>{word}</td>
                  <td>
                    <Button variant="danger" className="btn-sm" onClick={() => addNewWord(word)}>
                      <i className="fas fa-plus"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button type="submit" variant="warning" onClick={updateHandler}>
            Update My Words
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default HomeScreen;

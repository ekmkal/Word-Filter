import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Container, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { listMyWords, updateWords } from '../actions/wordActions';
import { WORD_UPDATE_RESET } from '../constants/wordConstants';

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [myWordsInState, setMyWordsInState] = useState([]);
  const [myNewWords, setMyNewWords] = useState([]);
  const [text, setText] = useState('');
  const [wordsNotInStore, setWordsNotInStore] = useState([]);
  const [knownWordCount, setKnownWordCount] = useState(0);
  const [noText, setNoText] = useState(false);

  const wordListMy = useSelector((state) => state.wordListMy);
  const { loading, error, myWords } = wordListMy;

  const wordUpdate = useSelector((state) => state.wordUpdate);
  const { success } = wordUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!myWords || success) {
      dispatch({ type: WORD_UPDATE_RESET });

      dispatch(listMyWords());
    } else {
      history.push('/');
      setMyWordsInState(myWords);
    }
  }, [dispatch, history, myWords, userInfo, success]);

  const suffixes = [
    's',
    'es',
    'ing',
    'd',
    'ed',
    'ly',
    'er',
    'r',
    'st',
    'tion',
    'ion',
    'y',
    'en',
    'ment',
    'able',
    'ity',
    'lity',
    'al',
    'n',
    'less',
    'ness',
    'est',
    'ful',
    'fully',
  ];

  const extractText = (e) => {
    e.preventDefault();
    if (text.split(' ').length === 1 && text.split(' ')[0] === '') {
      setNoText(true);
      setWordsNotInStore([]);
    } else {
      setNoText(false);
      setWordsNotInStore([]);
      setKnownWordCount(0);
      const extractedWordsArr = [];
      let count = 0;
      const textWordsArr = text
        .split(' ')
        .filter((n) => n !== '' && !/[^a-zA-Z]/.test(n) && n.length > 2);
      for (let suffix of suffixes) {
        // eslint-disable-next-line array-callback-return
        // eslint-disable-next-line no-loop-func
        textWordsArr.map((m) => {
          if (textWordsArr.includes(m) && textWordsArr.includes(m + suffix)) {
            const index = textWordsArr.indexOf(m + suffix);
            if (index !== -1) {
              count += 1;
              textWordsArr.splice(index, 1);
            }
          }
        });
        for (let word of myWordsInState) {
          // eslint-disable-next-line array-callback-return
          // eslint-disable-next-line no-loop-func
          textWordsArr.map((k) => {
            if (k === word + suffix) {
              const index = textWordsArr.indexOf(k);
              if (index !== -1) {
                count += 1;
                textWordsArr.splice(index, 1);
              }
            }
          });
        }
      }
      console.log(textWordsArr);
      // eslint-disable-next-line array-callback-return
      textWordsArr.map((word) => {
        if (!myWordsInState.includes(word) && !extractedWordsArr.includes(word)) {
          extractedWordsArr.push(word);
        } else {
          count += 1;
        }
      });
      setWordsNotInStore(extractedWordsArr);
      setKnownWordCount(count);
    }
  };

  const addNewWord = (n) => {
    setMyNewWords([...myNewWords, n]);
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
      setMyNewWords([]);
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
            {noText && <Message variant="warning">Please input some text..</Message>}
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
        {wordsNotInStore.length !== 0 && (
          <Col sm="6">
            <h3>Known Words Count: {knownWordCount}</h3>
            <Table striped bordered hover responsive className="table-sm">
              <thead>
                <tr>
                  <th>The Words Not In Your Store: {wordsNotInStore.length}</th>
                  <th>ADD TO MY STORE</th>
                </tr>
              </thead>
              <tbody>
                {wordsNotInStore.map((word, index) => (
                  <tr key={index}>
                    <td>{word}</td>
                    <td>
                      {!myNewWords.includes(word) ? (
                        <Button variant="info" className="btn-sm" onClick={() => addNewWord(word)}>
                          <i className="fas fa-plus"></i>
                        </Button>
                      ) : (
                        <Button
                          variant="danger"
                          className="btn-sm"
                          onClick={() => removeNewWord(word)}
                        >
                          <i className="fas fa-trash"></i>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Button type="submit" variant="warning" onClick={() => updateHandler}>
              Update My Words
            </Button>
          </Col>
        )}
      </Row>
    </>
  );
};

export default HomeScreen;

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Row, Col, Container, Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import PaginationTabs from '../components/PaginationTabs';
import Meta from '../components/Meta';
import { listMyWords, updateWords } from '../actions/wordActions';
import { WORD_UPDATE_RESET } from '../constants/wordConstants';
import { suffixes } from '../suffixes.json';

const HomeScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [myWordsInState, setMyWordsInState] = useState([]);
  const [myNewWords, setMyNewWords] = useState([]);
  const [text, setText] = useState('');
  const [textWordsToFilter, setTextWordsToFilter] = useState([]);
  const [wordsNotInStore, setWordsNotInStore] = useState([]);
  const [knownWordCount, setKnownWordCount] = useState(0);
  const [synonyms, setSynonyms] = useState({});
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
  }, [dispatch, history, myWords, userInfo, success, wordsNotInStore]);

  const extractText = () => {
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
        // Removing punctuations from the text
        .replace(/[.,/#!?'"@%|<>$%^&*;:{}=\-_`~()]/g, '')
        // Making all text lowercase
        .toLowerCase()
        // Making an array of the words in the text
        .split(' ')
        // Filtering the words includes only alphabetics and more than 2 letters
        .filter((n) => n !== '' && !/[^a-zA-Z]/.test(n) && n.length > 2);
      setTextWordsToFilter(textWordsArr);
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
      dispatch({ type: WORD_UPDATE_RESET });
      setWordsNotInStore(wordsNotInStore.filter((x) => !myNewWords.includes(x)));
      extractText();
      setMyNewWords([]);
    }
  };

  const showSynonyms = async (word) => {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`);
    const data = await response.json();
    console.log(
      data[0].meanings[0].definitions[0].synonyms !== undefined
        ? data[0].meanings[0].definitions[0].synonyms
        : data[0].meanings[1].definitions[0].synonyms
    );
    setSynonyms({
      ...synonyms,
      word:
        data[0].meanings[0].definitions[0].synonyms !== undefined
          ? data[0].meanings[0].definitions[0].synonyms
          : data[0].meanings[1].definitions[0].synonyms,
    });
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

      {userInfo && (
        <Row>
          <Col sm="6">
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                extractText();
              }}
            >
              <Form.Label>Input the text you want to extract</Form.Label>
              {noText && <Message variant="warning">Please input some text..</Message>}
              <Form.Group className="mb-3" controlId="inputText">
                <Form.Control
                  as="textarea"
                  placeholder="Write a text.."
                  rows={15}
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
              <h3>Total Words: {textWordsToFilter.length}</h3>
              <h3>Known Words Count: {knownWordCount}</h3>
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th>The Words Not In Your Store: {wordsNotInStore.length}</th>
                    <th>ADD TO MY STORE</th>
                    <th>ADD TO FAVS</th>
                  </tr>
                  <tr>
                    <th colSpan={2} style={{ textAlign: 'center' }}>
                      {/* <PaginationTabs words={wordsNotInStore} /> */}
                      Pagination Tabs
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {wordsNotInStore.map((word, index) => (
                    <tr key={index}>
                      <td>
                        <button
                          className="btn-sm"
                          style={{ border: 'none', background: 'none', fontSize: '1rem' }}
                          onClick={() => showSynonyms(word)}
                        >
                          {word}
                        </button>
                        {synonyms.word && <span>: {synonyms.word[0]}</span>}
                        {synonyms.word && console.log(synonyms.word[0])}
                      </td>
                      <td>
                        {!myNewWords.includes(word) ? (
                          <Button
                            variant="info"
                            className="btn-sm"
                            onClick={() => addNewWord(word)}
                          >
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
                      <td>
                        {!myNewWords.includes(word) ? (
                          <Button
                            variant="warning"
                            className="btn-sm"
                            // onClick={() => addNewWord(word)}
                          >
                            <i className="far fa-star"></i>
                          </Button>
                        ) : (
                          <Button
                            variant="secondary"
                            className="btn-sm"
                            // onClick={() => removeNewWord(word)}
                          >
                            <i style={{ color: 'orange' }} className="fas fa-star"></i>
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button
                type="submit"
                variant="warning"
                disabled={myNewWords.length === 0}
                onClick={updateHandler}
              >
                Update My Words
              </Button>
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;

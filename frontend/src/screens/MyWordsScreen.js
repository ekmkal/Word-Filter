import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listMyWords, updateWords } from '../actions/wordActions';
import { WORD_UPDATE_RESET } from '../constants/wordConstants';

const MyWordsScreen = ({ history }) => {
  const [myWordsInState, setMyWordsInState] = useState([]);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const wordListMy = useSelector((state) => state.wordListMy);
  const { loading, error, myWords } = wordListMy;

  const wordUpdate = useSelector((state) => state.wordUpdate);
  const { success } = wordUpdate;

  useEffect(() => {
    if (!myWords || success) {
      dispatch({ type: WORD_UPDATE_RESET });

      dispatch(listMyWords());
    } else {
      history.push('/mywords');
      setMyWordsInState(myWords);
    }
  }, [dispatch, history, myWords, success, userInfo]);

  const removeHandler = (index) => {
    if (window.confirm('Are you sure to update word list?')) {
      const updatedWordsArr = myWordsInState;
      updatedWordsArr.splice(index, 1);
      dispatch(updateWords(updatedWordsArr));
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>WORDS</th>
                <th>REMOVE FROM MY WORDS</th>
              </tr>
            </thead>
            <tbody>
              {myWordsInState.map((word, index) => (
                <tr key={index}>
                  <td>{word}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => removeHandler(index)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default MyWordsScreen;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
// import { ACTIONS.. } from '../actions/wordActions';

const HomeScreen = () => {
  // const dispatch = useDispatch();

  const wordListMy = useSelector((state) => state.wordListMy);
  const { loading, error, myWords } = wordListMy;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // useEffect(() => {
  //   dispatch(ACTIONS..);
  // }, [dispatch]);

  return (
    <>
      <Meta />
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      <h1>HOME PAGE</h1>
      {userInfo && (
        <Message style={{ color: '#b36458' }} variant="success">
          Welcome {userInfo.username}!
        </Message>
      )}
    </>
  );
};

export default HomeScreen;

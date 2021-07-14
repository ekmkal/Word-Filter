import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MyWordsScreen from './screens/MyWordsScreen';
// import MyFavsScreen from './screens/MyFavsScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/login" component={LoginScreen} />
          <Route path="/mywords" component={MyWordsScreen} />
          {/* <Route path="/myfavs" component={MyFavsScreen} /> */}
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;

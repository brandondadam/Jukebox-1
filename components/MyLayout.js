import Header from './Header';
import Head from 'next/head';

const Layout = props => (
  <div>
    <style jsx>{`
      div {
        color: #333;
        font-family: 'Nunito Sans', sans-serif;
        font-size: 15px;
      }
    `}</style>
    <Header />
      {props.children}
  </div>
);

export default Layout;

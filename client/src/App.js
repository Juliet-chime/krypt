// import logo from './logo.svg';
// import './App.css';

import { Navbar,Welcome,Footer,Services,Transactions } from "./compoenent";

function App() {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar/>
        <Welcome/>
      </div>
    {/* <Services/>
    <Transactions/>
    <Footer/> */}
    </div>
  );
}

export default App;

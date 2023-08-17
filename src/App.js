import React from "react";
import Navigation from "./components/Navigation";
import { AuthWrapper } from "./context/authContext";
import { CartWrapper } from "./context/cartContext";

function App() {
  return (
    <div className="App">
      <AuthWrapper>
        <CartWrapper>
          <Navigation />
        </CartWrapper>
      </AuthWrapper>
    </div>
  );
}

export default App;

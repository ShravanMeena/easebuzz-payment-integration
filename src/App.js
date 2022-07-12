import { useState } from "react";
import "./App.css";
import { loadScript } from "./helper/loadScript";

function App() {
  const [token, setToken] = useState("");

  const onScriptLoad = async () => {
    const res = await loadScript(
      "https://securegw.paytm.in/merchantpgpui/checkoutjs/merchants/ZHMpwy77672646700865.js"
    );

    if (!res) {
      alert("SDK failed to load. Are you online?");
      return;
    }

    if (res) {
      console.log("script loaded!", process.env.REACT_APP_PAYMENT_MODE);

      var easebuzzCheckout = new window.EasebuzzCheckout(
        process.env.REACT_APP_EASEBUZZ_KEY, // key
        process.env.REACT_APP_EASEBUZZ_ENV //test||prod
      );
      var options = {
        access_key: token, // access key received via Initiate Payment
        onResponse: (response) => {
          console.log(response, "response");

          if (response.status === "userCancelled") {
          }

          if (response.status === "success") {
          }
          console.log(response, "response");
        },
        theme: "#123456", // color hex
      };
      easebuzzCheckout.initiatePayment(options);
    }
  };

  return (
    <div className="App">
      <br />

      <input
        onChange={(e) => setToken(e.target.value)}
        type="text"
        placeholder="Enter Your Token"
      />
      <br />

      {/* <button onClick={onScriptLoad}>TEST PAYTM</button> */}

      <br />
      <br />
      <br />

      <button onClick={onScriptLoad}>TEST EASEBUZZ</button>
    </div>
  );
}

export default App;

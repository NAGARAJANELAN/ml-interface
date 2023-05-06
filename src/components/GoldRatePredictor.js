import React, { useState , useEffect} from "react";
import "./GoldRatePredictor.css";

function GoldRatePredictor() {
  const [attributes, setAttributes] = useState({
    SPX: 2164.900024,
    USO: 26,
    SLV: 13.49,
    EURUSD: 1.272426,
  });

  const [predictedPrice, setPredictedPrice] = useState("");

  //activating api
  useEffect(() => {
    const setUp = async () => {
      const result = await fetch("https://gold-ml-api.onrender.com/gold_rate_prediction",
      {
        method: "GET"
      });
      console.log(result)
    };
  
    setUp(); // run it, run it
  
    return () => {
      // this now gets called when the component unmounts
    };
  }, []);

  async function predictPrice(event) {
    // console.log("attribute state");
    event.preventDefault();
    console.log(attributes);
    const result = await fetch(
      "https://gold-ml-api.onrender.com/gold_rate_prediction",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(attributes),
      }
    );

    const price = await result.json();
    console.log(price);
    setPredictedPrice(Number(price).toPrecision(7));
  }

  function handleChange(event) {
    var value = event.target.value;
    console.log(value);
    setAttributes((prevState)=>({
      ...prevState,
      [event.target.name]: value,
    }));
  }

  return (
    <>
      <div className="heading">Gold Price Predictor</div>
      <div className="gold-card">
        <form onSubmit={predictPrice} className="form-field">
          <div className="input-section">
            <div>SPX</div>
            <input
              type="number"
              step="any"
              min="0"
              className="input-field"
              placeholder="Enter SPX"
              name="SPX"
              onChange={handleChange}
              />
          </div>

          <div className="input-section">
            <div>USO</div>
            <input
              type="number"
              step="any"
              min="0"
              className="input-field"
              placeholder="Enter USO"
              name="USO"
              onChange={handleChange}
              />
          </div>

          <div className="input-section">
            <div>SILVER</div>
            <input
              type="number"
              step="any"
              min="0"
              className="input-field"
              placeholder="Enter Silver Rate"
              name="SLV"
              onChange={handleChange}
            />
          </div>

          <div className="input-section">
            <div>EUR/USD</div>
            <input
              type="number"
              step="any"
              min="0"
              className="input-field"
              placeholder="Enter EUR/USD"
              name="EURUSD"
              onChange={handleChange}
            />
          </div>
          <button className="submit-button" type="submit">Predict</button>
        </form>

        <div className="result-section">Predicted Price: <br></br>{predictedPrice} $</div>
      </div>
    </>
  );
}

export default GoldRatePredictor;

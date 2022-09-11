import React, { useState, useRef, useEffect } from 'react';
import randomColor from "randomcolor";

function App() {

  const cards = [1, 2, 3, 4, 5, 6, 7, 8];
  const [picked, setPicked] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [cardno, setCardno] = useState(-1);
  const [colours, setColours] = useState([]);
  const arrLength = cards.length;
  var cardRefs = useRef([]);
  cardRefs.current = [];
  cardRefs = Array(arrLength).fill().map((_, i) => cardRefs.current[i] || React.createRef());


  useEffect(() => {
    console.log('setting colors');
    var temp = 0
    var tempColours = []
    while (temp < cards.length) {
      tempColours.push(randomColor());
      temp += 1;
    }
    console.log(tempColours);
    setColours(tempColours);
  }, []);


  useEffect(() => {
    console.log('rendered');
    console.log(cardno);
    console.log(picked);
  });


  const pickCard = (e) => {
    console.log(cardno);
    console.log('picked');
    if (cardno < 9) {
      let newPicked = new Array(8).fill(0);
      newPicked[cardno - 1] = 1;
      setPicked(newPicked);
      var tempColours = [...colours];
      colours[cardno - 1] = randomColor();
      cardRefs[cardno - 1].current.scrollIntoView({ behavior: 'smooth' });
    }
  }


  const CardnoUtil = (e) => {
    let newPicked = new Array(8).fill(0);
    setPicked(newPicked);
    if (e.target.validity.valid)
      setCardno(e.target.value);
    else
      setCardno(-1);
  }


  return (
    <>
      <h1 className="text-amber-700 text-center text-xl"> Enter a card number: </h1>

      <div className='flex items-center justify-center'>
        <input className='bg-slate-100 border-red-500 border'
          type="text"
          pattern="[1-9][0-9]*"
          id="message"
          name="message"
          onChange={(e) =>
            CardnoUtil(e)
          }
        />
      </div>

      <div className='flex items-center justify-center'>
        <button onClick={pickCard} className='border-green-800 border mt-4 rounded-md bg-green-500 w-32'>Pick</button>
      </div>

      <ul className='bg-slate-200 w-2/5 mx-auto overflow-hidden h-96 m-5 overflow-y-auto'>
        {
          cards.map((item, index) =>
            (picked[index]) ? <div style={{ backgroundColor: colours[index] }} ref={cardRefs[index]} className='w-11/12 h-56 m-5 text-lg text-slate-50 bg-red-900 rounded-md mx-auto  ease-in duration-200 text-center'>
              Card {index + 1}
            </div> :
              <div style={{ backgroundColor: colours[index] }} ref={cardRefs[index]} className='w-11/12 h-56 m-5 text-lg text-slate-50 bg-red-500 rounded-md mx-auto  ease-in duration-200 text-center'>
                Card {index + 1}
              </div>
          )
        }
      </ul>

    </>
  );
}

export default App;


// Create a basic vertical scrollable list with cards having different background colors. 
// There should be text field that takes in a number as input (index of card in the list). 
// On submitting the text input value (using a button or enter key), the card at the corresponding 
// index should scrollIntoView and the background color should be changed.
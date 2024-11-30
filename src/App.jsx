import { useState, useRef } from 'react'
import excuses from './data/excuses'
import { Typewriter } from "react-simple-typewriter"
import './wheel.css'

function App() {
  const [selectedType, setSelectedType] = useState('')
  const [selectedExcuse, setSelectedExcuse] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [wheelRotation, setWheelRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showPopup, setShowPopup] = useState(false)
  const wheelRef = useRef(null)

  const chaosExcuses = [
    "Mercury is in retrograde and my chakras are misaligned",
    "A time traveler warned me about today",
    "My parallel universe self needed emotional support",
    "My pet unicorn had an existential crisis",
    "The universe sent me a sign through my toast",
    "My horoscope said to avoid all responsibility",
    "Had to attend an emergency meeting with my plant council",
    "My aura needed emergency recharging",
    "Got stuck in a temporal anomaly",
    "My crystals were giving off bad vibes",
    "The alignment of the stars said absolutely not",
    "My fortune cookie specifically advised against it"
  ];


  const generateExcuse = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setSelectedExcuse(null);
    setShowPopup(false);

    const excuseList = selectedType === 'chaos' ? chaosExcuses : excuses[selectedType];
    const selectedIndex = Math.floor(Math.random() * excuseList.length);
    const selectedExcuse = excuseList[selectedIndex];

    // Calculate the final position
    const petalAngle = 360 / excuseList.length;
    const targetRotation = 360 - (petalAngle * selectedIndex);
    const extraSpins = 5; // Number of full rotations before stopping
    const finalRotation = targetRotation + (extraSpins * 360);

    // Remove any existing spinning classes
    wheelRef.current.className = 'wheel';

    // Force a reflow
    void wheelRef.current.offsetWidth;

    // Add acceleration class
    wheelRef.current.classList.add('spin-accelerate');

    // After acceleration, add deceleration to target
    setTimeout(() => {
      wheelRef.current.className = 'wheel';
      void wheelRef.current.offsetWidth;
      wheelRef.current.classList.add('spin-decelerate');
      wheelRef.current.style.transform = `rotate(${finalRotation}deg)`;
    }, 500);

    // Show result after spinning
    setTimeout(() => {
      setSelectedExcuse(selectedExcuse);
      setShowPopup(true);
      setIsSpinning(false);
    }, 4000); // Adjust timing based on animation duration
  };

  const continueSpinning = () => {
    setShowPopup(false);
    wheelRef.current.className = 'wheel spinning';
  };


  const renderWheel = () => {
    if (!selectedType) return null

    const excuseList = selectedType === 'chaos' ? chaosExcuses : excuses[selectedType]

    return (
      <div className="wheel-container mb-8">
        <div
          className={`wheel ${!isGenerating && !showPopup ? 'spinning' : ''}`}
          ref={wheelRef}
        >
          {excuseList.map((excuse, index) => (
            <div
              key={index}
              className={`petal ${selectedExcuse === excuse ? 'selected' : ''}`}
              style={{
                transform: `rotate(${(360 / excuseList.length) * index}deg)`
              }}
            >
              <div className="petal-content">
                <span className="petal-text">{excuse.slice(0, 20)}...</span>
              </div>
            </div>
          ))}
          <div className="wheel-center">
            <div className="center-circle"></div>
          </div>
        </div>
        <div className="pointer"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 p-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-purple-600">
          ✨ Oopsie Daisy ✨
        </h1>
        <span className="text-black mb-2">
          <Typewriter
            words={[
              "Late for work again? ",
              "Forgot to do your homework? ",
              "Need a way out of a boring family dinner? ",
              "Double-booked plans and can't decide? ",
              "Avoiding a call from your boss? ",
              "Skipped leg day (again)? ",
              "Forgot your friend's birthday? ",
              "Need to get out of a group project meeting? ",
              "Trying to dodge an awkward date? ",
              "Didn't read the book for book club? "
            ]}

            loop={false}
            cursor
            cursorStyle='🌼'
            typeSpeed={20}
            deleteSpeed={40}
            delaySpeed={2000}
          />
          There will always be an excuse for that.
        </span>

        {/* Category Selector */}
        <div className="category-selector mb-8">
          <button
            onClick={() => setSelectedType('work')}
            className={`category-btn ${selectedType === 'work' ? 'active' : ''}`}
          >
            🏢 Work
          </button>
          <button
            onClick={() => setSelectedType('family')}
            className={`category-btn ${selectedType === 'family' ? 'active' : ''}`}
          >
            👨‍👩‍👧‍👦 Family
          </button>
          <button
            onClick={() => setSelectedType('school')}
            className={`category-btn ${selectedType === 'school' ? 'active' : ''}`}
          >
            🧠 School
          </button>
          <button
            onClick={() => setSelectedType('chaos')}
            className={`category-btn ${selectedType === 'chaos' ? 'active' : ''}`}
          >
            🌪️ Chaos
          </button>
        </div>

        {renderWheel()}

        {selectedType && (
          <button
            onClick={generateExcuse}
            disabled={isGenerating || showPopup}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-all"
          >
            Pick an Excuse!
          </button>
        )}

        {/* Popup Modal */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h3 className="text-xl font-bold mb-4">Your Excuse:</h3>
              <p className="text-lg mb-6">{selectedExcuse}</p>
              <div className="flex gap-4">
                <button
                  onClick={continueSpinning}
                  className="popup-btn continue"
                >
                  Continue Spinning
                </button>
                <button
                  onClick={() => setShowPopup(false)}
                  className="popup-btn close"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

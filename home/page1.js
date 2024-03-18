const { useEffect, useRef, useState } = React;
function Cursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: '50%', y: '50%' });
  const [isClicked, setIsClicked] = useState(false); 

  const updateCursor = e => {
    let clientX = e.clientX;
    let clientY = e.clientY + window.scrollY; 
    setCursorPosition({ x: clientX + 'px', y: clientY + 'px' });
  };

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', updateCursor);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', updateCursor);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <div 
      className={`cursor ${isClicked ? 'cursor-clicked' : ''}`} 
      style={{ left: cursorPosition.x, top: cursorPosition.y }}
    ></div>
  );
}

function PageSwitcher({ currentPage, setCurrentPage }) {
  const homeTextRef = useRef(null);
  const aboutTextRef = useRef(null);
  const revealHomeTextRef = useRef(null);
  const revealAboutTextRef = useRef(null);
  const backgroundRef = useRef(null);

  const homeImg = "https://images.unsplash.com/photo-1698417749491-72bba47caf07?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg8MTg5NTN8&ixlib=rb-4.0.3&q=85";
  const aboutImg = "https://images.unsplash.com/photo-1695531332171-d2e0087dc263?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzMjM4NDZ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTg8MTg5MDl8&ixlib=rb-4.0.3&q=85";

  const handleClick = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentPage(currentPage === "home" ? "about" : "home");
      }
    });
    if (currentPage === "home") {
      tl.to(homeTextRef.current, 0.5, { opacity: 0, ease: "power2.out" })
        .to(backgroundRef.current, 1.5, { xPercent: -100, ease: "power3.inOut" });
    } else {
      tl.to(aboutTextRef.current, 0.5, { opacity: 0, ease: "power2.out" })
        .to(backgroundRef.current, 1.5, { xPercent: 0, ease: "power3.inOut" });
    }
  };
    const handleTransition = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentPage(currentPage === "home" ? "about" : "home");
      }
    });
    if (currentPage === "home") {
      tl.to(homeTextRef.current, 0.5, { opacity: 0, ease: "power2.out" })
        .to(backgroundRef.current, 1.5, { xPercent: -100, ease: "power3.inOut" });
    } else {
      tl.to(aboutTextRef.current, 0.5, { opacity: 0, ease: "power2.out" })
        .to(backgroundRef.current, 1.5, { xPercent: 0, ease: "power3.inOut" });
    }
  };


  return (
    <div className="page-container" onClick={handleClick}>
      <div className="page-background" style={{ backgroundImage: `url(${aboutImg})` }}></div>
      <div className="overlay-text" ref={revealHomeTextRef} style={{ opacity: 0 }}>Home Page (click on picture)</div>
      <div className="overlay-text" ref={aboutTextRef} style={{ opacity: currentPage === "home" ? 0 : 1 }}>About Us</div>
      <div className="page-background" style={{ backgroundImage: `url(${homeImg})` }} ref={backgroundRef}></div>
      <div className="overlay-text" ref={revealAboutTextRef} style={{ opacity: 0 }}>About Us</div>
      <div className="overlay-text" ref={homeTextRef} style={{ opacity: currentPage === "home" ? 1 : 0 }}>Home Page</div>
    </div>
  );
}

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    console.log(`Currently on ${currentPage} page`);
  }, [currentPage]);

  return (
    <>
      <Cursor />
      <PageSwitcher currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="section-two">This is section two on {currentPage === "home" ? "Home Page" : "About Us"}, click the image to change the page</div>
    </>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

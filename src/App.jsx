/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import './App.css';
import './Stack.css';


import React, { useState, useEffect } from 'react';


function App() {

// Usestate Button Handler Stuff and Local Page Storage Stuff
const [currState, setCurrState] = useState("home");
useEffect(() => {
  const storedPage = localStorage.getItem("currentPage");
  if (storedPage) {
    setCurrState(storedPage);
  }
}, []); 

const handleStateChange = (newState) => {
  setTimeout(() => {
    setCurrState(newState);
    localStorage.setItem("currentPage", newState);
  }, 500); // 500ms delay, adjust as needed
};

// makes sure that the sidebar re-hides when a new state is envoked
const handleNavClick = (nav_title) => {
  handleStateChange(nav_title);
  toggleSidebar();
};

const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);
};

const sidebar = (isOpen, toggleSidebar) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="flex vstack">
        <img src="/Images/Close-Menu.png" className="sidebar-close-button" onClick={toggleSidebar} />
        <ul>
          <li><a onClick={() => handleNavClick("home")}>Home</a></li>
          <li><a onClick={() => handleNavClick("menu")}>Menu</a></li>
          <li><a onClick={() => handleNavClick("aboutUs")}>About Us</a></li>
          <li><a href="mailto:info@middleburghcoffee.com">Contact</a></li>
        </ul>
      </div>
    </div>
  );
};


// headerbar for most pages
const header = (
  <>
    <div className="header">
      <div className="flex hstack">
        <h1 className="header-logo">Co</h1>
        <img src="/Images/Hamburger-Menu.png" className="header-hamburger_menu" onClick={toggleSidebar} alt="Hamburger Menu" />
      </div>
    </div>
    {sidebar(isSidebarOpen, toggleSidebar)}
  </>
)


// home landing page
const homepage = (
  <>
    <div className="home-main">
      {header}
      <div className="home-main-content_container">
        <p className="home-main-shpeal">We are more then just a coffee shop in upstate NY. We are an escape from the everyday craziness. We are here for those who need a break, a push, a reset an extra deep breath of fresh air. </p>
        <img src="/Images/home-main.png" className="home-main-image" />
      </div>
    </div>
  </>
)

// Menu Lists w/ Names and Prices (Price Default to Small)
let drink_menu_items = [
  {
    "Coffee":"1.75"
  },
  {
    "Americano":"3"
  },
  {
    "Late":"3.75"
  },
  {
    "Cappuccino":"3.75"
  },
  {
    "Cortado":"3.5"
  },
  {
    "Macchiato":"3.5"
  },
  {
    "Hot Chocolate":"3.25"
  },
  {
    "Lemonade":"3.5"
  },
  {
    "Matcha":"4"
  },
  {
    "Chai Latte":"3.75"
  },
  {
    "Espresso":"2.3"
  }
];
let addon_menu_items = [
  {
    "Ice":"0.75"
  },
  {
    "Oat Milk":"0.75"
  },
  {
    "Flavor":"0.75"
  }
];

// menu page
const menupage = (
  <>
    <div className="menu-main">
      {header}
      <div className="menu-main-content_container">
        <h1 className="menu-main-item-type-label">Drinks</h1>
        {drink_menu_items.map((item, index) => {
          const drinkName = Object.keys(item)[0];
          const drinkPrice = item[drinkName];
          return (
            <div key={index} className="menu-main-item">
              <div className="flex hstack" style={{width: '60vW'}}>
                <p className="menu-main-item-title">{drinkName}</p>
                <p className="menu-main-item-price">${drinkPrice}</p>
              </div>
            </div>
          );
        })}
        <h1 className="menu-main-item-type-label">Addons</h1>
        {addon_menu_items.map((item, index) => {
          const drinkName = Object.keys(item)[0];
          const drinkPrice = item[drinkName];
          return (
            <div key={index} className="menu-main-item">
              <div className="flex hstack" style={{width: '60vW'}}>
                <p className="menu-main-item-title">{drinkName}</p>
                <p className="menu-main-item-price">${drinkPrice}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </>
)

// about us page
const aboutUspage = (
  <>
    <div className="menu-main">
      {header}
      <div className="aboutus-main-content_container">
        <p className="aboutus-main-desc-content">Hey...</p>
        <p className="aboutus-main-desc-content">We're Middleburgh Coffee Company, a small coffee shop in Middleburgh New York, but really we're more, we're an escape from the everyday craziness. We're here for those who need a break, a push, a reset an extra deep breath of fresh air. </p>
        <p className="aboutus-main-desc-content">Our Socials are below, check us out!!!</p>
        
      </div>
    </div>
  </>
)



// Dict to hold value for page state const names and page titiles
let page_directory = {
  "home":[
    homepage,
    "Home"
  ],
  "menu":[
    menupage,
    "Menu"
  ],
  "aboutUs":[
    aboutUspage,
    "About Us"
  ],
}

// modifies page title based on value held within 'page_directory'
useEffect = () => {
  document.title = `Coffee Co | ${page_directory[currState][1]}`;
}

return (page_directory[currState][0]);
}

export default App;

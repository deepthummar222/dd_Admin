import { Button, Nav, NavItem } from "reactstrap";
import { Link, json, useHref, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const navigation = [
  {
    title: "Dashboard",
    href: "/starter",
    icon: "bi bi-speedometer2",
  },
  {
    title: "UserData",
    href: "/data",
    icon: "bi bi-person-workspace ",
  },

  {
    title: "Online User",
    href: "/online",
    icon: "bi bi-people",
  },
  {
    title: "festival list",
    href: "/favimg",
    icon: "bi bi-images",
  },
  {
    title: "Add emojis",
    href: "/Addemojis",
    icon: "bi bi-emoji-heart-eyes-fill",
  },
  {
    title: "Add Profile Frems",
    href: "/AddFrems",
    icon: "bi bi-app",
  },
  
  {
    title: "Coin transaction",
    href: "/coinData",
    icon: "bi bi-person-plus-fill",
  },
  {
    title: "CoinValue",
    href: "/coinValue",
    icon: "bi bi-person-plus-fill",
  },

];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle('showSidebar');
  };
  let location = useLocation();
  const [route, setRoute] = useState({ 
    to: location.pathname,
    from: location.pathname 
  });
  localStorage.setItem("data",JSON.stringify(route))
  const pathdata= localStorage.getItem("data")
  const parsedData = JSON.parse(pathdata);
  useEffect(()=> {
    setRoute((prev)=> ({to: location.pathname, from: prev.to}) )
  }, [location]);

      if(parsedData.to == parsedData.from){
      }
      else{
        window.location.reload()
        console.log("reloaddata")
      }
  return (
    <div className="bg-dark">
      <div className="d-flex">
        <Button
          color="white"
          className="ms-auto text-white d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <i className="bi bi-x"></i>
        </Button>
      </div>
      <div className="p-3 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation.map((navigation, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navigation.href}
                className={
                  location.pathname === navigation.href
                    ? "active nav-link py-3"
                    : "nav-link py-3"
                }
              >
                <i className={navigation.icon}></i>
                <span className="ms-3 d-inline-block">{navigation.title}</span>
              </Link>
            </NavItem>
          ))}

        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;

import React from "react";
import { withStyles } from "@material-ui/core";
import Home from "@material-ui/icons/Home";
import Terrain from "@material-ui/icons/Terrain";
import Link from "@material-ui/core/Link";

// withStyles & makeStyles

const style = {
  sideMenu: {
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    left: "0px",
    width: "80px",
    height: "100%",
    backgroundColor: "#000",
  } 
};

const SideMenu = (props) => {
  const { classes } = props;
  return (
    <div className={classes.sideMenu}>
      <div style={{padding: 20,paddingTop:80}}>
        <Link href="#" color={"primary"} onClick={() => alert("ola mundo")}>
          <Home />
        </Link>
      </div>
      <div style={{padding: 20,paddingTop:10}}>
        <Link href="/lotes" >
          <Terrain />
        </Link>
      </div>
    </div>
  );
};

export default withStyles(style)(SideMenu);

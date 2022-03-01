import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import Link from "@material-ui/core/Link";
import { AuthContext } from "../../contexts/auth";
import { CloseSharp } from "@material-ui/icons";


export const mainListItems = () => {
  return (
    <div>
      <Link href="/">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </Link>

      <Link href="/entrada">
        <ListItem button>
          <ListItemIcon>
            <LocalAtmIcon />
          </ListItemIcon>
          <ListItemText primary="Entradas" />
        </ListItem>
      </Link>
    </div>
  );
};

export const secondaryListItems = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {signOut} = React.useContext(AuthContext);
  return (
    <div>
      <ListSubheader inset>Opções</ListSubheader>
      <ListItem button>
        <ListItemIcon>
         <CloseSharp/>
        </ListItemIcon>
        <ListItemText primary="Sair" onClick={() => signOut()} />
      </ListItem>
    </div>
  );
};

import React from 'react';
import DashboardIcon from '@material-ui/icons/Dashboard';
import HomeIcon from '@material-ui/icons/Home';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

const menuLinks = [
    {title: 'Dashboard', icon: <DashboardIcon />, pathname: "/dashboard"},
    {title: 'Faults', icon: <ConfirmationNumberIcon />, pathname: "/faults"},
    {title: 'Properties', icon: <HomeIcon />, pathname: "/properties"},
    {title: 'Account', icon: <AccountBoxIcon />, pathname: "/account"}
]

export default menuLinks;
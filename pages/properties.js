import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import WidgetHeader from "../components/WidgetHeader";
import EmptyTable from "../components/EmptyTable";
import CreatePropertyModal from "../components/CreatePropertyModal";
import PropertiesTable from '../components/PropertiesTable';
import Authentication from '../services/authentication'

const properties = [2];

export default function Properties() {
  const [open, setOpen] = useState(false);
  const [properties, setProperties] = useState([])
  const [tenants, setTenants] = useState([])

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    fetchProperties();
  };

  useEffect(() => {
    Authentication.getProperties().then(res => {
      setProperties(res.data)
    })
    Authentication.getTenants().then(res => {
      debugger
      setTenants(res.data)
    })
  }, [])

  const fetchProperties = () => {
    Authentication.getProperties().then(res => {
      setProperties(res.data)
    })
  }

  return (
    <DashboardLayout>
      <WidgetHeader label="Overview" handler={handleOpen}/>
      {properties.length === 0 && (
        <EmptyTable
          handler={handleOpen}
          label="No properties available, create one."
        />
      )}
      <PropertiesTable properties={properties}/>
      <CreatePropertyModal tenants={tenants} open={open} handleClose={handleClose} />
    </DashboardLayout>
  );
}

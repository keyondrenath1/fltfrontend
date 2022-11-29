import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import WidgetHeader from "../components/WidgetHeader";
import EmptyTable from "../components/EmptyTable";
import CreatePropertyModal from "../components/CreatePropertyModal";
import FaultTable from '../components/FaultTable';
import Authentication from '../services/authentication'

const properties = [2];

export default function Faults() {
  const [faults, setFaults] = useState([])

  useEffect(() => {
    Authentication.getFaults().then(res => {
      setFaults(res.data)
    })
  }, [])

  const markCompleted = (id) => {
    updateFault(id)
    Authentication.getFaults().then(res => {
      setFaults(res.data)
    })
  }

  function updateFault(id) {
    Authentication.updateFault(id).then(res => {
      Authentication.getFaults().then(res => {
        setFaults(res.data)
      })
    })
  }

  return (
    <DashboardLayout>
      <WidgetHeader label="Overview"/>
      {properties.length === 0 && (
        <div style={{
          textAlign: 'center'
        }}>No faults as of yet</div>
      )}
      <FaultTable faults={faults} markCompleted={(id) => markCompleted(id)}/>
    </DashboardLayout>
  );
}

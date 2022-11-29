import React, { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import AccountGrid from "../grids/AccountGrid";
import ProfileColumn from "../components/ProfileColumn";
import AccountDetailsColumn from "../components/AccountDetailsColumn";
import Authentication from "../services/authentication";

export default function Account() {
  return (
    <DashboardLayout>
      <AccountGrid
        column4={<ProfileColumn />}
        column8={<AccountDetailsColumn />}
      />
    </DashboardLayout>
  );
}

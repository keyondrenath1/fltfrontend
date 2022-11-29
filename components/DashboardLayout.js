import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import MaterialUIDashboard from "../material-ui-components/MaterialUIDashboard";
import Authentication from "../services/authentication";
import menuLinks from "../components/MenuLinks";
import tenantMenuLinks from "../components/TenantMenuLinks";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [accountType, setAccoutType] = useState("");

  const logoutHandler = () => {
    Authentication.logout();
    router.push("/signin");
  };

  const goToPageHandler = (pathname) => {
    router.push(pathname);
  };

  useEffect(() => {
    const accountType = sessionStorage.getItem("accountType");
    console.log("Account TYPE", accountType);
    setAccoutType(accountType);
  }, []);

  return (
    <>
      {accountType && (
        <MaterialUIDashboard
          pathname={router.pathname}
          menuLinks={accountType === "TENANT" ? tenantMenuLinks : menuLinks}
          logout={logoutHandler}
          goToPage={(pathname) => goToPageHandler(pathname)}
        >
          {children}
        </MaterialUIDashboard>
      )}
    </>
  );
}

/**
 * A page which gets displayed for authenticated user with some rudimentary
 * information about the authenticatedf user and monitoring checks they have.
 */

// Vendor imports
import { Button } from "evergreen-ui";
// App imports
import { useAuthStore } from "/src/state/auth.store.ts"

const Dashboard = () => {
  const logUserOut = useAuthStore.use.logout();

  // TODO: list of monitoring checks (<CheckList>)
  // TODO: basical user information (obtained via https://uptime.com/api/v1/docs/#/auth/get_auth_me)
  // Use, e.g., tabbed UI from Evergreen-UI.

  return (
    <>
      <h1>Well, hello!</h1>
      <Button
        appearance="secondary"
        onClick={ () => logUserOut() }
      >
        Kindly forget me
      </Button>
    </>
  )
};

export default Dashboard;

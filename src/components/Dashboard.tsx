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

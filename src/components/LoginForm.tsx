// FW imports
import { useEffect, useRef, useState } from "react"

// Vendor imports
import {
  Alert,
  Button,
  Card,
  Heading,
  TextInputField,
} from  "evergreen-ui"

// App imports
import { useAuthStore } from "/src/state/auth.store.ts"
import { attemptLogin } from "/src/api/auth.ts";
import {
  API_RESPONSE_GENERAL_ERRORS,
  flattenErrors,
} from "/src/api/errors.ts";

const LoginForm = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const [ formErrors, setFormErrors ] = useState({
    [API_RESPONSE_GENERAL_ERRORS]: undefined,
    email: undefined,
    password: undefined
  });

  useEffect(() => resetInputFieldStatus("email"), [email]);
  useEffect(() => resetInputFieldStatus("password"), [password]);

  const resetInputFieldStatus = (fieldName: string) => {
    setFormErrors((was) => ({
      ...was,
      [fieldName]: undefined,
      // Reset general error message as well
      [API_RESPONSE_GENERAL_ERRORS]: undefined,
    }));
  };

  const logUserIn = useAuthStore.use.login();

  const tryToLogIn = async () => {
    let outcome = await attemptLogin(email, password);
    console.log("attempt to log in literally ended with:", outcome);

    if (typeof outcome === "string") {
      logUserIn(outcome);
      return;
    }

    // Map error messages to fields
    if ("error_fields" in outcome) {
      setFormErrors(
        flattenErrors(outcome.error_fields)
      );
    } else {
      setFormErrors({
        [API_RESPONSE_GENERAL_ERRORS]: outcome.error_message ?? "Huh, sorry, something went astray",
      });
    }
  }

  return (
    <>
      <Card
        padding={32}
        border="default"
      >
        { !!formErrors[API_RESPONSE_GENERAL_ERRORS] && (
          <Alert intent="danger" isRemoveable={true} marginBottom={16}>
            { formErrors[API_RESPONSE_GENERAL_ERRORS] }
          </Alert>
        )}

        <Heading height={48}>Please, remember Your Self!</Heading>

        <TextInputField
          required
          label="Email"
          type="email"
          value={email}
          isInvalid={ !!formErrors['email'] }
          validationMessage={ formErrors['email'] }
          onChange={ e => setEmail(e.target.value) }
        />

        <TextInputField
          required
          label="Password"
          type="password"
          value={password}
          isInvalid={ !!formErrors['password'] }
          validationMessage={ formErrors['password'] }
          onChange={ e => setPassword(e.target.value) }
        />

        <Button
          size="large"
          appearance="primary"
          disabled={!email && !password}
          isLoading={false}
          onClick={ () => tryToLogIn() }
        >
          Knock, knock!
        </Button>
      </Card>
    </>
  )
}

export default LoginForm;

import React, { FC } from "react";
import { Button } from "@mui/material";

interface CreateAccountLinkProps {
  navigateToCreateAccount: () => void;
}

const CreateAccountLink: FC<CreateAccountLinkProps> = ({ navigateToCreateAccount }) => {
  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={navigateToCreateAccount}
      className="create-account-button"
    >
      Not registered? Create an account
    </Button>
  );
};

export default CreateAccountLink;

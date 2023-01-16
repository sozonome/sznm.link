import { Button, Flex, Grid, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";

import ControlledInput from "lib/components/shared/form/ControlledInput";
import { adminAll } from "lib/constants/routes";

const EditorLoginPage = () => {
  const router = useRouter();
  const toast = useToast();
  const [password, setPassword] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleLogin = async () => {
    setIsLoading(true);
    await fetch("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    }).then(async (res) => {
      if (res.status === 200) {
        router.push(adminAll);
        return;
      }

      const error = await res.json();
      toast({
        title: "Login Failed",
        status: "error",
        position: "top",
        description: error.message,
      });
    });
    setIsLoading(false);
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.code === "Enter") {
      await handleLogin();
    }
  };

  return (
    <Flex height="70vh" alignItems="center">
      <Grid
        marginX="auto"
        gap={2}
        width="80%"
        alignItems="center"
        onKeyDown={handleKeyDown}
      >
        <ControlledInput
          label="Input Password"
          value={password}
          onChange={handleChangePassword}
          type="password"
          isDisabled={isLoading}
        />
        <Button isLoading={isLoading} onClick={handleLogin}>
          Login
        </Button>
      </Grid>
    </Flex>
  );
};

export default EditorLoginPage;

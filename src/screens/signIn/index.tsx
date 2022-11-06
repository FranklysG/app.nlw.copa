import React, { useCallback } from "react";
import { Fontisto } from "@expo/vector-icons";
import { Center, Icon, Text } from "native-base";

import Logo from "../../assets/logo.svg";
import { Button } from "../../components/button";
import { useAuth } from "../../hooks/useAuth";

export default function SignIn() {
  const { signIn } = useAuth();

  const handleUserLogin = useCallback(async () => {
    await signIn()
  }, [signIn]);

  return (
    <Center
      flex={1}
      bgColor="gray.900"
      alignItems={"center"}
      justifyContent="center"
      p={7}
    >
      <Logo width={200} height={40}/>
      <Button
        title="ENTRAR COM GOOGLE"
        type="second"
        leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />}
        mt={12}
        onPress={handleUserLogin}
      />
      <Text color={"white"} mt={4}>
        Não ultilizamos nenhuma informação além {'\n'} do seu e-mail para ciração de
        sua conta
      </Text>
    </Center>
  );
}

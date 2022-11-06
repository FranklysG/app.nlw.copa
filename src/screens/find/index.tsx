import React from "react";
import { Heading, Text, VStack } from "native-base";

import Logo from "../../assets/logo.svg";

import { Header } from "../../components/header";
import { Input } from "../../components/input";
import { Button } from "../../components/button";

export default function Find() {
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Buscar por código" showBackButton={true}/>
      <VStack mt={8} mx={5} alignItems={"center"}>
        <Heading
          fontFamily={"heading"}
          color={"white"}
          fontSize={"xl"}
          mb={8}
          textAlign={"center"}
        >
          Encontre um bolão através de {'\n'} seu codigo único
        </Heading>
        <Input mb={2} placeholder={"Qual o codigo do bolão?"} />
        <Button title="BUSCAR BOLÃO" />
      </VStack>
    </VStack>
  );
}

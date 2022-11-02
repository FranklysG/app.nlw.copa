import React from "react";
import { Text, Center } from "native-base";

export default function SignIn() {
  return (
    <Center
      flex={1}
      bgColor="black"
      alignItems={"center"}
      justifyContent="center"
    >
      <Text color={"white"} fontSize={24} fontFamily="heading">SignIn</Text>
    </Center>
  );
}

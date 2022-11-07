import React from "react";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Icon, VStack } from "native-base";

import { Header } from "../../components/header";
import { Button } from "../../components/button";

export default function Pool() {
  const { navigate } = useNavigation();
  return (
    <VStack flex={1} bgColor="gray.900">
      <Header title="Meus bolões" />
      <VStack
        mt={6}
        mx={5}
        pb={4}
        mb={4}
        borderBottomWidth={1}
        borderBottomColor={"gray.600"}
        alignItems={"center"}
      >
        <Button
          title="BUSCAR BOLÃO"
          leftIcon={
            <Icon as={Fontisto} name="search" color="black" size="md" />
          }
          onPress={() => navigate('find')}
        />
      </VStack>
    </VStack>
  );
}

import { Button as ButtonNativeBse, Text, IButtonProps } from "native-base";
import { YellowBox } from "react-native";

interface Props extends IButtonProps {
  title: string;
  type?: "first" | "second";
}

export function Button({ title, type, ...rest }: Props) {
  return (
    <ButtonNativeBse
      w="full"
      h={14}
      rounded="sm"
      fontSize={"md"}
      textTransform="uppercase"
      bg={type === "second" ? "red.500" : "yellow.500"}
      _pressed={{
        bg: type === "second" ? "red.600" : "yellow.600",
      }}
      _loading={{
        _spinner: { color: "black" },
      }}
      {...rest}
    >
      <Text
        fontSize={"sm"}
        fontFamily={"heading"}
        color={type === "second" ? "white" : "black"}
      >
        {title}
      </Text>
    </ButtonNativeBse>
  );
}

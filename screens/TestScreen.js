import { useColorMode, Box, Center, Button, Text } from "native-base";

export default function TestScreen() {
  const {
    colorMode,
    toggleColorMode
  } = useColorMode();
  return (
    <Center>
      <Box p="4" flex="1" mt="20" maxW="300" w="100%" h="600" bg={colorMode === "dark" ? "coolGray.800" : "warmGray.50"}>
        <Text fontSize="lg" display="flex" mb="20">
          The active color mode is{" "}
          <Text bold fontSize="lg">
            {colorMode}
          </Text>
        </Text>
        <Button onPress={toggleColorMode}>Toggle</Button>
      </Box>
    </Center>
  );
}
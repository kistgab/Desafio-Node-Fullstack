import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
  handleValues: (values: string[]) => void;
  placeholder: string;
  iconAriaLabel: string;
  id: string;
  label: string;
  isRequired?: boolean;
};

export function MultipleValuesInput({
  handleValues,
  placeholder,
  iconAriaLabel,
  id,
  label,
  isRequired,
}: Props) {
  const [values, setValues] = useState<string[]>([]);
  const [currentValue, setCurrentValue] = useState("");

  useEffect(() => {
    handleValues(values);
  }, [values]);

  function handleAddValue() {
    if (!currentValue) return;
    if (values.includes(currentValue)) return;
    setValues((oldValues) => [...oldValues, currentValue]);
    setCurrentValue("");
  }

  function removeValue(value: string) {
    const valuesWithoutRemoved = values.filter((e) => e !== value);
    setValues(valuesWithoutRemoved);
  }

  return (
    <FormControl>
      <FormLabel htmlFor={id}>{label}</FormLabel>
      <InputGroup>
        <Input
          type="text"
          id={id}
          placeholder={placeholder}
          value={currentValue}
          onChange={(event) => setCurrentValue(event.target.value)}
        />
        <InputRightElement>
          <IconButton
            color="white"
            borderRadius={"4px"}
            onClick={handleAddValue}
            aria-label={iconAriaLabel}
            bg={"#051D41"}
            icon={<AddIcon />}
          />
        </InputRightElement>
      </InputGroup>

      <Flex mt={"1rem"} gap={"16px"} flexWrap={"wrap"} maxW={"100%"}>
        {values.map((value) => (
          <Button
            h={"1.5rem"}
            bg={"#9ED0E6"}
            color={"#10141D"}
            rightIcon={<CloseIcon w={"8px"} />}
            key={value}
            onClick={() => removeValue(value)}
          >
            {value}
          </Button>
        ))}
      </Flex>
    </FormControl>
  );
}

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputProps,
  Select,
  SelectProps,
  Text,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

type SelectOption = { label: string; value: string };

type Props<T extends FieldValues> = {
  errors: FieldErrors<T>;
  register?: UseFormRegister<T>;
  fieldId: Path<T>;
  placeholder: string;
  otherRegisterValidations?: RegisterOptions<T, Path<T>>;
  isRequired?: boolean;
  label: string;
  type?: React.HTMLInputTypeAttribute | "select";
  options?: SelectOption[];
  multiple?: boolean;
};

export function FormField<T extends FieldValues>({
  errors,
  register,
  fieldId,
  placeholder,
  otherRegisterValidations,
  isRequired,
  label,
  type,
  options,
  multiple,
}: Props<T>) {
  return (
    <FormControl isInvalid={!!errors[fieldId]}>
      <FormLabel htmlFor={fieldId}>{`${label}${
        isRequired ? "*" : ""
      }`}</FormLabel>
      {getInput(
        fieldId,
        type ?? "text",
        otherRegisterValidations,
        placeholder,
        register,
        isRequired,
        options,
        multiple
      )}
      <FormErrorMessage>
        <Text textAlign={"end"} w={"100%"}>
          {errors[fieldId] && (errors[fieldId]?.message as ReactNode)}
        </Text>
      </FormErrorMessage>
    </FormControl>
  );
}

function getInput<T extends FieldValues>(
  fieldId: Path<T>,
  type: React.HTMLInputTypeAttribute | "select",
  otherRegisterValidations?: RegisterOptions<T, Path<T>>,
  placeholder?: string,
  register?: UseFormRegister<T>,
  isRequired?: boolean,
  options?: SelectOption[],
  multiple?: boolean
) {
  const commomProps: InputProps & SelectProps = {
    id: fieldId,
    placeholder,
    multiple,
    ...register?.(fieldId, {
      ...(isRequired && { required: "Campo vazio" }),
      ...otherRegisterValidations,
    }),
  };
  if (type === "select") {
    return <Select {...commomProps}>{mapOptions(options ?? [])}</Select>;
  }
  return <Input {...commomProps} />;
}

function mapOptions(options: SelectOption[]) {
  return options.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ));
}

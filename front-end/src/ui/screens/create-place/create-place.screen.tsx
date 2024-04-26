import { Box, Button, Divider, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { FormField } from "@ui/components/form-field/form-field.component";
import { Header } from "@ui/components/header/header.component";
import { MultipleValuesInput } from "@ui/components/multiple-values-input/multiple-values-input.component";
import { ScreenContentWrapper } from "@ui/components/screen-content-wrapper/screen-content-wrapper.component";
import { BRAZIL_STATES } from "@utils/Helpers";
import { PlaceType } from "@utils/place-type.enum";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  name: string;
  nickname?: string;
  type: PlaceType;
  cnpj?: string;
  city: string;
  state: string;
  cep: string;
  address: string;
  complement?: string;
  email: string;
  phone?: string;
};

export function CreatePlaceScreen() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const [entries, setEntries] = useState<string[]>([]);
  const [gates, setGates] = useState<string[]>([]);

  function onSubmit(data: Inputs) {
    console.log("data", data);
    console.log("entries", entries);
    console.log("gates", gates);
  }

  return (
    <>
      <Header />
      <ScreenContentWrapper variant="center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Text as={"h2"} mb={"1.5rem"}>
              Informações básicas
            </Text>
            <SimpleGrid columns={2} spacing={10}>
              <FormField<Inputs>
                fieldId="name"
                errors={errors}
                placeholder="Informe o nome do local"
                register={register}
                isRequired
                label="Nome do local"
              />
              <FormField<Inputs>
                fieldId="nickname"
                errors={errors}
                placeholder="Informe um apelido (caso exista)"
                register={register}
                label="Apelido"
              />
              <FormField<Inputs>
                fieldId="type"
                errors={errors}
                placeholder="Selecione um tipo"
                register={register}
                isRequired
                label="Selecione um tipo"
                type="select"
                options={[
                  { label: "Estadio", value: PlaceType.Stadium },
                  { label: "Teatro", value: PlaceType.Teather },
                  { label: "Outro", value: PlaceType.Other },
                ]}
              />
              <FormField<Inputs>
                fieldId="cnpj"
                errors={errors}
                placeholder="Informe o cnpj (caso exista)"
                register={register}
                label="CNPJ"
                mask="99.999.999/9999-99"
              />
            </SimpleGrid>
          </Box>

          <Divider m={"1.5rem 0"} />

          <Box>
            <Text as={"h2"} mb={"1.5rem"}>
              Localização
            </Text>
            <SimpleGrid columns={2} spacing={10}>
              <FormField<Inputs>
                fieldId="city"
                errors={errors}
                placeholder="Informe a Cidade"
                register={register}
                isRequired
                label="Cidade"
              />
              <FormField<Inputs>
                fieldId="state"
                errors={errors}
                placeholder="Selecione um estado"
                register={register}
                isRequired
                type="select"
                options={BRAZIL_STATES.map((state) => ({
                  label: state.name,
                  value: state.abbreviation,
                }))}
                label="Estado"
              />
              <FormField<Inputs>
                fieldId="cep"
                errors={errors}
                placeholder="Informe o CEP"
                register={register}
                isRequired
                label="CEP"
              />
              <FormField<Inputs>
                fieldId="address"
                errors={errors}
                placeholder="Informe o Endereço"
                register={register}
                isRequired
                label="Endereço"
              />
              <FormField<Inputs>
                fieldId="complement"
                errors={errors}
                placeholder="Informe o complemento"
                register={register}
                label="Complemento"
              />
            </SimpleGrid>
          </Box>

          <Divider m={"1.5rem 0"} />

          <Box>
            <Text as={"h2"} mb={"1.5rem"}>
              Contato
            </Text>
            <SimpleGrid columns={2} spacing={10}>
              <FormField<Inputs>
                fieldId="email"
                errors={errors}
                placeholder="Informe um e-mail"
                register={register}
                isRequired
                label="E-mail"
              />
              <FormField<Inputs>
                fieldId="phone"
                errors={errors}
                placeholder="Informe um telefone"
                register={register}
                label="Telefone"
              />
            </SimpleGrid>
          </Box>

          <Divider m={"1.5rem 0"} />

          <Box>
            <Text as={"h2"} mb={"1.5rem"}>
              Cadastro de entradas e catracas
            </Text>
            <SimpleGrid columns={2} spacing={10}>
              <MultipleValuesInput
                handleValues={setEntries}
                placeholder="Insira as entradas"
                iconAriaLabel="Adicionar entrada"
                id="entries"
                label="Cadastre as entradas"
              />
              <MultipleValuesInput
                handleValues={setGates}
                placeholder="Insira as catracas"
                iconAriaLabel="Adicionar catraca"
                id="gates"
                label="Cadastre as catracas"
              />
            </SimpleGrid>
          </Box>

          <Flex justifyContent={"flex-end"} gap={"1.5rem"}>
            <Button
              variant={"outline"}
              type="submit"
              color={"#EBF0F9"}
              borderColor={"#EBF0F9"}
            >
              Cancelar
            </Button>

            <Button
              isLoading={isSubmitting}
              bg={"#EBF0F9"}
              color={"#333B49"}
              _hover={{ bg: "#d4d8e0" }}
            >
              Cadastrar
            </Button>
          </Flex>
        </form>
      </ScreenContentWrapper>
    </>
  );
}

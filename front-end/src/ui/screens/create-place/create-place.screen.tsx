import {
  Box,
  Button,
  Divider,
  Flex,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCreatePlace } from "@hooks/api/use-create-place";
import { FormField } from "@ui/components/form-field/form-field.component";
import { Header } from "@ui/components/header/header.component";
import { MultipleValuesInput } from "@ui/components/multiple-values-input/multiple-values-input.component";
import { ScreenContentWrapper } from "@ui/components/screen-content-wrapper/screen-content-wrapper.component";
import { BRAZIL_STATES } from "@utils/Helpers";
import { PlaceMapper } from "@utils/mappers/Place.mapper";
import { PlaceType } from "@utils/place-type.enum";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, redirect } from "react-router-dom";

export type CreatePlaceFormInputs = {
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
  } = useForm<CreatePlaceFormInputs>();
  const [entries, setEntries] = useState<string[]>([]);
  const [gates, setGates] = useState<string[]>([]);
  const { createPlace, data, error: creatingError } = useCreatePlace();
  const toast = useToast();

  useEffect(() => {
    if (data) {
      toast({
        title: "Sucesso",
        status: "success",
        description: "Um novo local foi adicionado",
        position: "bottom-left",
      });
      redirect("/locais");
    }
  }, [data]);

  useEffect(() => {
    if (creatingError) {
      toast({
        title: "Errro",
        status: "error",
        description: "Não foi possível salvar a edição",
        position: "bottom-left",
      });
    }
  }, [creatingError]);

  function onSubmit(data: CreatePlaceFormInputs) {
    const request = PlaceMapper.mapRequestCreatePlaceDto(data, entries, gates);
    console.log(request);
    createPlace(request);
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
              <FormField<CreatePlaceFormInputs>
                fieldId="name"
                errors={errors}
                placeholder="Informe o nome do local"
                register={register}
                isRequired
                label="Nome do local"
              />
              <FormField<CreatePlaceFormInputs>
                fieldId="nickname"
                errors={errors}
                placeholder="Informe um apelido (caso exista)"
                register={register}
                label="Apelido"
              />
              <FormField<CreatePlaceFormInputs>
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
              <FormField<CreatePlaceFormInputs>
                fieldId="cnpj"
                errors={errors}
                placeholder="Informe o cnpj (caso exista)"
                register={register}
                label="CNPJ"
                type="number"
                otherRegisterValidations={{
                  pattern: {
                    value: /^\d{2}\d{3}\d{3}\d{4}\d{2}$/,
                    message: "CNPJ inválido (digite apenas números)",
                  },
                }}
              />
            </SimpleGrid>
          </Box>

          <Divider m={"1.5rem 0"} />

          <Box>
            <Text as={"h2"} mb={"1.5rem"}>
              Localização
            </Text>
            <SimpleGrid columns={2} spacing={10}>
              <FormField<CreatePlaceFormInputs>
                fieldId="city"
                errors={errors}
                placeholder="Informe a Cidade"
                register={register}
                isRequired
                label="Cidade"
              />
              <FormField<CreatePlaceFormInputs>
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
              <FormField<CreatePlaceFormInputs>
                fieldId="cep"
                errors={errors}
                placeholder="Informe o CEP"
                register={register}
                isRequired
                label="CEP"
                otherRegisterValidations={{
                  pattern: {
                    value: /^[0-9]{5}[0-9]{3}$/,
                    message: "CEP inválido (digite apenas números)",
                  },
                }}
              />
              <FormField<CreatePlaceFormInputs>
                fieldId="address"
                errors={errors}
                placeholder="Informe o Endereço"
                register={register}
                isRequired
                label="Endereço"
              />
              <FormField<CreatePlaceFormInputs>
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
              <FormField<CreatePlaceFormInputs>
                fieldId="email"
                errors={errors}
                placeholder="Informe um e-mail"
                register={register}
                isRequired
                label="E-mail"
                otherRegisterValidations={{
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                    message: "E-mail inválido",
                  },
                }}
              />
              <FormField<CreatePlaceFormInputs>
                fieldId="phone"
                errors={errors}
                placeholder="Informe um telefone"
                register={register}
                label="Telefone"
                otherRegisterValidations={{
                  pattern: {
                    value:
                      /(?:(^\+\d{2})?)(?:([1-9]{2})|([0-9]{3})?)(\d{4,5})(\d{4})/,
                    message: "Telefone inválido",
                  },
                }}
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

          <Divider m={"1.5rem 0"} />

          {creatingError && (
            <Box>
              <Text color={"#F6285F"}>
                Erro recebido: {JSON.stringify(creatingError)}
              </Text>
            </Box>
          )}

          <Flex justifyContent={"flex-end"} gap={"1.5rem"}>
            <Link to={"/locais"}>
              <Button
                variant={"outline"}
                color={"#EBF0F9"}
                borderColor={"#EBF0F9"}
              >
                Cancelar
              </Button>
            </Link>

            <Button
              isLoading={isSubmitting}
              bg={"#EBF0F9"}
              type="submit"
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

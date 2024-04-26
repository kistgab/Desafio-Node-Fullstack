import { RequestCreatePlaceDto } from "@hooks/api/use-create-place";
import { OutputGetPlacesDto } from "@hooks/api/use-get-places";
import { CreatePlaceFormInputs } from "@ui/screens/create-place/create-place.screen";
import { PlaceDataSummary } from "@ui/screens/places/places.screen";
import { toBrazillianStringDate } from "@utils/Helpers";

export abstract class PlaceMapper {
  public static mapPlaceDataSummary(
    data: OutputGetPlacesDto
  ): PlaceDataSummary {
    return {
      id: data.id,
      name: data.name,
      address: data.address.line,
      cityAndState: `${data.address.city}, ${data.address.state}`,
      gates: data.ticketGates.join(", "),
      updatedAt: toBrazillianStringDate(data.updatedAt || ""),
    };
  }

  static mapRequestCreatePlaceDto(
    data: CreatePlaceFormInputs,
    entries: string[],
    ticketGates: string[]
  ): RequestCreatePlaceDto {
    return {
      name: data.name,
      nickname: this.mapIfEmptyStringToUndefined(data.nickname),
      type: data.type,
      cnpj: this.mapIfEmptyStringToUndefined(data.cnpj),
      address: {
        city: data.city,
        state: data.state,
        zipCode: data.cep,
        line: data.address,
        complement: this.mapIfEmptyStringToUndefined(data.complement),
      },
      contact: {
        mail: data.email,
        phone: this.mapIfEmptyStringToUndefined(data.phone),
      },
      entries,
      ticketGates,
    };
  }

  private static mapIfEmptyStringToUndefined(
    value: string | undefined
  ): string | undefined {
    return value === "" ? undefined : value;
  }
}

import { OutputGetPlacesDto } from "@hooks/api/use-get-places";
import { PlaceDataSummary } from "@ui/screens/places-screen/places-screen.screen";

export abstract class PlaceMapper {
  public static mapPlaceDataSummary(
    data: OutputGetPlacesDto
  ): PlaceDataSummary {
    console.log("entrou no mapper", data);
    return {
      id: data.id,
      name: data.name,
      address: data.address.line,
      cityAndState: `${data.address.city}, ${data.address.state}`,
      gates: data.ticketGates.join(", "),
      updatedAt: toBrazillianStringDate(data.updatedAt || ""),
    };
  }
}
function toBrazillianStringDate(date: string): string {
  return new Date(date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

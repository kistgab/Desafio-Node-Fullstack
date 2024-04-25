import { OutputGetPlacesDto } from "@hooks/api/use-get-places";
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
}

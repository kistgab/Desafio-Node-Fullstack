import { OutputGetEventsDto } from "@hooks/api/use-get-events";
import { EventDataSummary } from "@ui/screens/events/events-screen.screen";
import { toBrazillianStringDate } from "@utils/Helpers";

export abstract class EventMapper {
  public static mapEventDataSummary(
    data: OutputGetEventsDto
  ): EventDataSummary {
    return {
      id: data.id,
      name: data.name,
      placeName: data.place.name,
      type: data.type,
      address: `${data.place.address.line}`,
      gates: data.place.entries.join(", "),
      startsAt: toBrazillianStringDate(data.duration.startsAt),
    };
  }
}

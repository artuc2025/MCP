import { EntrypointInterface } from "./entrypoint/interface";
import { selectEntrypoint } from "./entrypoint/selector";

selectEntrypoint().then((entrypoint: EntrypointInterface) => {
  entrypoint.run();
});
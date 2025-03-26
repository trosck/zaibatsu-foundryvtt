import { ZAIBATSU } from "../config";
import { joinPath } from "./joinPath";

export function templatesPath(...args: string[]) {
  return joinPath(ZAIBATSU.SYSTEM_FOLDER, "templates", ...args);
}

export function assetsPath(...args: string[]) {
  return joinPath(ZAIBATSU.SYSTEM_FOLDER, "assets", ...args);
}

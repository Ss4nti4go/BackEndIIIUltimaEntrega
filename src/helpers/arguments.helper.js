import { Command } from "commander";
const argvs = new Command();

argvs.option("--mode <mode>", "mode of the app", "dev");
argvs.parse();

export default argvs.opts();
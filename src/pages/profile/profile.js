import { template } from "./profile.tmpl";
import { Templator } from "../../utils";

const tmpl = new Templator(template);

document.getElementById("root").innerHTML = tmpl.compile();

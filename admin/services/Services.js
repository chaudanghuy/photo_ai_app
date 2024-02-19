import { endpoint } from "../config/config";

export async function services() {
     let response = await fetch(`${endpoint}/services`);
}
import "./styles/style.scss";
import { Router } from "./core/router";
import { Firebase } from "./shared/firebase";
import { environment } from './environements/environment';
import { Profile } from "./shared/profile";

export const router = new Router();
export const firebase = new Firebase(environment.firebase);
export const profile = new Profile();
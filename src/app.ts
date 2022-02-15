import "./styles/style.scss";
import { Router } from "./core/router";
import { Firebase } from "./shared/firebase";
import { environment } from './environements/environment';

export const router = new Router();
export const firebase = new Firebase(environment.firebase);
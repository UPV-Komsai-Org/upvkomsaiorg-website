/**
 * @file state.ts
 * @description This file contains the state of the website. It is used to store the current page of the website.
 * @note By default, it points to the index.astro page.
 * @note Relative paths must have "import.meta.env.BASE_URL" at the start of the path/URL. 
 *      This is due to hosting sometimes being confused with URLs and paths. Refer to examples from the pages files.
 */

import { atom } from "nanostores";

export const href = atom(`${import.meta.env.BASE_URL}`);
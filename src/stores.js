import { writable } from 'svelte/store';

export const v_list = writable([]);
export const v_total = writable({});
export const v_saves = writable(false); // Used to detect changes to saves
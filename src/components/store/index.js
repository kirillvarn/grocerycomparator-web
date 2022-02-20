import { atom } from "recoil";

export const items = atom({
    key: 'items',
    default: {}
  })
export const dates = atom({
    key: 'dates',
    default: []
})
export const modal = atom({
    key: 'modal',
    default: false
})
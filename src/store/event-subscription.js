import { atom, map } from 'nanostores'
import Prospect from '../class/Prospect'
import EventSubscription from '../class/EventSubscription'

export const isSendingSubscription = atom(false)
export const prospect = atom<Prospect>({});
export const event = atom<EventSubscription>({});
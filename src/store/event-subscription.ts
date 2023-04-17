import {atom, map, MapStore, WritableAtom} from 'nanostores'
import type Prospect from '../class/Prospect'
import type EventSubscription from '../class/EventSubscription'
import emailjs, {EmailJSResponseStatus} from '@emailjs/browser'

export const isSendingSubscription: WritableAtom<unknown> & {} = atom(false)
export const prospect: MapStore<Record<string, Prospect>> & {} = map<Record<string, Prospect>>({});
export const event: MapStore<Record<string, EventSubscription>> & {} = map<Record<string, EventSubscription>>({});

export async function subscribe(): Promise<any> {
    isSendingSubscription.set(true)
    const data: { prospect: Record<string, Prospect>; event: Record<string, EventSubscription> } = {
        prospect: prospect.get(),
        event: event.get()
    }
    try {
        const result: EmailJSResponseStatus = await emailjs.send('service_ny9nyun', 'template_tvro2n8', data, 'FtwyS4qAWaYbFflLR')
        console.log(result)
    } catch (e) {
        console.log(e)
    }
    isSendingSubscription.set(false)
}
import {atom, map, MapStore, WritableAtom} from 'nanostores'
import type Prospect from '../class/Prospect'
import type EventSubscription from '../class/EventSubscription'
import emailjs, {EmailJSResponseStatus} from '@emailjs/browser'
import { EmailJsTemplates, EmailJsServices } from '../class/EmailJsServices'
export const errorMsg: WritableAtom<unknown> & {} = atom('')
export const prospect: MapStore<Record<string, Prospect>> & {} = map<Record<string, Prospect>>({});
export const event: MapStore<Record<string, EventSubscription>> & {} = map<Record<string, EventSubscription>>({});

export async function subscribe(): Promise<boolean> {
    errorMsg.set('')
    const data: { prospect: Record<string, Prospect>; event: Record<string, EventSubscription> } = {
        prospect: prospect.get(),
        event: event.get()
    }
    try {
        const result: EmailJSResponseStatus = await emailjs.send(EmailJsServices.DEFAULT, EmailJsTemplates.EVENT, data, import.meta.env.PUBLIC_EMAILJS)
        if(result.status && result.status%200 === 0){
            return true
        }
    } catch (e) {
        console.log(e)
    }
    errorMsg.set('Une erreur est survenue, veuillez nous en excuser. Merci de me contacter par téléphone.')
    return false
}
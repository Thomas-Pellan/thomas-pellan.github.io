import {atom, map, MapStore, WritableAtom} from 'nanostores'
import type Prospect from '../class/Prospect'
import type EventSubscription from '../class/EventSubscription'
import { EmailJsTemplates, EmailJsServices } from '../class/EmailJsServices'
import {sendEmailJsData} from '../pages/helper/emailjs'
export const errorMsg: WritableAtom<unknown> & {} = atom('')
export const prospect: MapStore<Record<string, Prospect>> & {} = map<Record<string, Prospect>>({});
export const event: MapStore<Record<string, EventSubscription>> & {} = map<Record<string, EventSubscription>>({});

export async function subscribe(): Promise<boolean> {
    errorMsg.set('')
    const data: { prospect: Record<string, Prospect>; event: Record<string, EventSubscription> } = {
        prospect: prospect.get(),
        event: event.get()
    }
    const emailjsValue = sendEmailJsData(EmailJsServices.DEFAULT, EmailJsTemplates.EVENT, data)
    if(!emailjsValue){
        errorMsg.set('Une erreur est survenue, veuillez nous en excuser. Merci de me contacter par téléphone.')
    }
    return emailjsValue
}
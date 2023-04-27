import emailjs, {EmailJSResponseStatus} from '@emailjs/browser';
import {EmailJsServices, EmailJsTemplates} from '../../class/EmailJsServices';

export async function sendEmailJsData(service : EmailJsServices, template : EmailJsTemplates, data: any): Promise<boolean> {
    try {
        const result: EmailJSResponseStatus = await emailjs.send(EmailJsServices.DEFAULT, EmailJsTemplates.EVENT, data, import.meta.env.PUBLIC_EMAILJS)
        if(result.status && result.status%200 === 0){
            return true
        }
    } catch (e) {
        console.log(e)
    }
    return false
}
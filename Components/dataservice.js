import { BehaviorSubject } from 'rxjs';

const bhsub = new BehaviorSubject('');
export const messageService = {
    sendMessage: message => bhsub.next({ text: message }),
   // clearMessages: () => bhsub.next(),
    getMessage: () => bhsub.asObservable()
};
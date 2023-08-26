import Queue from 'bull';
import thirdparty from '../thirdparty/index.js';
import config from '../config/config.js';
import singletons from '../singletons/index.js';

const emailQueue = new Queue('emailQueue');

emailQueue.process(async job => {
    const { to, subject, text } = job.data;
    const from = config.Config.Email.SendInBlue.Host
    const mailObj = {
        from,to,subject,text
    }
    const result = await thirdparty.sendEmail(mailObj);
});

emailQueue.on('completed', (job) => {
    singletons.log.info("[task/email.js]",`Job ${job.id} completed, ${job.data}`);
});

emailQueue.on('failed', (job, err) => {
    singletons.log.error("[task/email.js]",`Job ${job.id} failed: ${err}`);
});


export default emailQueue;

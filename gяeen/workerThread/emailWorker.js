import emailQueue from '../task/email.js'; 

// Start processing jobs from the queue
emailQueue.on('completed', (job) => {
    console.log(`Job ${job.id} completed`);
});

emailQueue.on('failed', (job, err) => {
    console.log(`Job ${job.id} failed: ${err}`);
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cron_1 = require("cron");
class CronTask {
    constructor(task) {
        this.task = task;
        this.isTaskRunning = false;
        this.executeCronTask = async () => {
            if (this.isTaskRunning) {
                return;
            }
            try {
                this.isTaskRunning = true;
                await this.task();
            }
            catch (error) {
                console.error('Ocorreu um erro durante a execução da tarefa:', error);
            }
            finally {
                this.isTaskRunning = false;
            }
        };
    }
    start() {
        const job = new cron_1.CronJob('*/1 * * * * *', this.executeCronTask);
        job.start();
    }
}
//const sendAttendanceScheduleTask = new CronTask(sendAttendanceSchedule)
//sendAttendanceScheduleTask.start()

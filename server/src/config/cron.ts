import { sendAttendanceSchedule } from '../schedule/sendAttendance/sendAttendanceSchedule'
import { findCidToProcess} from '../schedule/sendAttendance/repository/findCidToProcess'
import { CronJob } from 'cron'

class CronTask {
  private isTaskRunning = false

  constructor(private task: () => Promise<void>) {}

  private executeCronTask = async () => {
    if (this.isTaskRunning) {
      return
    }

    try {
      this.isTaskRunning = true
      await this.task()
    } catch (error) {
      console.error('Ocorreu um erro durante a execução da tarefa:', error)
    } finally {
      this.isTaskRunning = false
    }
  }

  public start() {
    const job = new CronJob('*/1 * * * * *', this.executeCronTask)
    job.start()
  }
}

//const sendAttendanceScheduleTask = new CronTask(sendAttendanceSchedule)

//sendAttendanceScheduleTask.start()

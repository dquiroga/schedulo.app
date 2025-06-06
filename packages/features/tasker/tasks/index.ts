import { IS_PRODUCTION } from "@calcom/lib/constants";

import type { TaskHandler, TaskTypes } from "../tasker";

/**
 * This is a map of all the tasks that the Tasker can handle.
 * The keys are the TaskTypes and the values are the task handlers.
 * The task handlers are imported dynamically to avoid circular dependencies.
 */
const tasks: Record<TaskTypes, () => Promise<TaskHandler>> = {
  sendEmail: () => import("./sendEmail").then((module) => module.sendEmail),
  sendWebhook: () => import("./sendWebook").then((module) => module.sendWebhook),
  triggerHostNoShowWebhook: () =>
    import("./triggerNoShow/triggerHostNoShow").then((module) => module.triggerHostNoShow),
  triggerGuestNoShowWebhook: () =>
    import("./triggerNoShow/triggerGuestNoShow").then((module) => module.triggerGuestNoShow),
  triggerFormSubmittedNoEventWebhook: () =>
    import("./triggerFormSubmittedNoEvent/triggerFormSubmittedNoEventWebhook").then(
      (module) => module.triggerFormSubmittedNoEventWebhook
    ),
  sendSms: () => Promise.resolve(() => Promise.reject(new Error("Not implemented"))),
  translateEventTypeData: () =>
    import("./translateEventTypeData").then((module) => module.translateEventTypeData),
  createCRMEvent: () => import("./crm/createCRMEvent").then((module) => module.createCRMEvent),
  scanWorkflowBody: () => import("./scanWorkflowBody").then((module) => module.scanWorkflowBody),
};

export const tasksConfig = {
  createCRMEvent: {
    minRetryIntervalMins: IS_PRODUCTION ? 10 : 1,
    maxAttempts: 10,
  },
};
export default tasks;

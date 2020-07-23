import LeadCartEvents from './leadcartEvents';
import { logRocketEvents, mixPanelEvents, userPilotEvents } from './trackersIntegrations';
const notDevelopment = process.env.NODE_ENV !== 'development';

export default () => (next) => (action) => {
  const leadcartEvents = LeadCartEvents(action);

  if (notDevelopment) {
    leadcartEvents.register({
      source: 'userPilot',
      events: userPilotEvents
    });
    leadcartEvents.register({
      source: 'mixPanel',
      events: mixPanelEvents
    });
    leadcartEvents.register({
      source: 'logRocket',
      events: logRocketEvents
    });
  }
  next(action);
};


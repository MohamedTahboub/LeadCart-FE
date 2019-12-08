import LeadCartEvents from './leadcartEvents';
import { userPilotEvents, mixPanelEvents, logRocketEvents } from './trackersIntegrations';

export default () => (next) => (action) => {
  const leadcartEvents = LeadCartEvents(action);
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
  next(action);
};


import LeadCartEvents from './leadcartEvents';
import { userPilotEvents, mixPanelEvents } from './trackersIntegrations';

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


  next(action);
};


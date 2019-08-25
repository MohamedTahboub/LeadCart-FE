import LeadCartEvents from './leadcartEvents';
import { userPilotEvents } from './trackersIntegrations';

export default () => (next) => (action) => {
  const leadcartEvents = LeadCartEvents(action);
  leadcartEvents.register({
    source: 'userPilot',
    events: userPilotEvents
  });


  next(action);
};


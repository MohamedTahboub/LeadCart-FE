import * as boxes from './boxes';
import * as buttons from './Buttons';
import * as inputs from './Inputs';
import * as logos from './logos';
import * as search from './search';
import * as titles from './Titles';
import * as cards from './Cards';
import List from './List';
import * as navigators from './Navigators';
import * as wrappers from './Wrappers';
import * as Layout from './Layout';
import * as Notes from './Notes';
import * as Links from './Links';
import Timeline from './Timeline';
import * as ColorPickers from './ColorPickers';
import * as Collapsable from './Collapse';
import * as prefixes from './Prefixes';
import Table from './Tables';
import * as messages from './Messages';
import Dialog from './Dialog';
import * as Nodes from './Nodes';
import Badge from './Badge';


export default {
  Table,
  Badge,
  ...boxes,
  ...buttons,
  ...inputs,
  Timeline,
  ...logos,
  ...ColorPickers,
  ...search,
  ...wrappers,
  ...Layout,
  ...Notes,
  ...Links,
  List,
  ...titles,
  ...cards,
  ...navigators,
  ...prefixes,
  ...messages,
  ...Collapsable,
  ...Nodes,
  Dialog
}
;
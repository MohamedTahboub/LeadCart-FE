import * as boxes from './boxes'
import * as buttons from './Buttons'
import * as inputs from './Inputs'
import * as logos from './logos'
import * as search from './search'
import * as titles from './Titles'
import * as cards from './Cards'
import List from './List'
import * as navigators from './Navigators'
import * as wrappers from './Wrappers'


export default {
    ...boxes,
    ...buttons,
    ...inputs,
    ...logos,
    ...search,
    ...wrappers,
    List,
    ...titles,
    ...cards,
    ...navigators
}
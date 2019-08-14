/**
 * Action类型
 */
import types from '../types'

export function switchMenu(menuName) {
    return {
        type: types.SWITCH_MENU,
        menuName
    }
}
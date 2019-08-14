/**
 * reducer数据处理
 */
import types from '../types'
const initState = {
    cityId: '',
    menuName: '首页'
}

export default function(state = initState, action) {
    switch (action.type) {
        case types.SWITCH_MENU:
            return {
                ...state,
                menuName: action.menuName
            }
            break;
        default:
            return {
                ...state
            }
            break;
    }
}
const initState = {
    themeId: 1 as themeIdType
}

type InitialStateType = {
    themeId: themeIdType
}
export type themeIdType = (1 | 2 | 3)

type ActionType = changeThemeIdActionType
export const themeReducer = (state:InitialStateType = initState, action: ActionType): InitialStateType => { // fix any
    switch (action.type) {
        case 'SET_THEME_ID':
            return {
                ...state, themeId: action.id
            }
        default:
            return state
    }
}

export type changeThemeIdActionType = ReturnType<typeof changeThemeId>
export const changeThemeId = (id: number): any => ({ type: 'SET_THEME_ID', id } as const ) // fix any


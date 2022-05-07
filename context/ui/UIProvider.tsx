import { FC, PropsWithChildren, useReducer } from "react";
import { UIContext, UIReducer } from "./";

export interface UIState {
    sideMenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
}

interface Props {
    children?: React.ReactNode | undefined,
}

export const UIProvider: FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(UIReducer, UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({type: 'UI - Open Sidebar'});
    }

    const closeSideMenu = () => {
        dispatch({type: 'UI - Close Sidebar'});
    }

    return (
        // <UIContext.Provider value={{sideMenuOpen: state.sideMenuOpen}}>
        <UIContext.Provider value={{...state, openSideMenu, closeSideMenu}}>
            {children}
        </UIContext.Provider>
    )
}

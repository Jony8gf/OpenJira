import { FC, PropsWithChildren, useReducer } from "react";
import { UIContext, UIReducer } from "./";

export interface UIState {
    sideMenuOpen: boolean;
    isAddingEntry: boolean;
    isDragging: boolean;
}

const UI_INITIAL_STATE: UIState = {
    sideMenuOpen: false,
    isAddingEntry: false,
    isDragging: false
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

    const setIsAddingEntry = (isAddingEntry: boolean) => {
        dispatch({type: 'UI - Set isAddingEntry', payload: isAddingEntry});
    }

    const startDragging = () => {
        dispatch({type: 'UI - Start Dragging'});
    }

    const endDragging = () => {
        dispatch({type: 'UI - End Dragging'});
    }

    return (
        // <UIContext.Provider value={{sideMenuOpen: state.sideMenuOpen}}>
        <UIContext.Provider value={{...state, openSideMenu, closeSideMenu, setIsAddingEntry, startDragging, endDragging}}>
            {children}
        </UIContext.Provider>
    )
}

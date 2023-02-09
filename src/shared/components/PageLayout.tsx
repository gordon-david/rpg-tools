
import { PropsWithChildren } from "react";
import { Header } from "./Header";

/**
 * Page Layout component is a standard layout used for pages of the application
 * @param props Children nodes (this component adds a 'main' wrapper, so there is no need to wrap its children)
 * @returns 
 */
export function PageLayout(props: PropsWithChildren) {
    return <>
        <Header />
        <main>
            {props.children}
        </main>
    </>
}
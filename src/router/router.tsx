/*
 * @Author: Moody
 * @Date: 2024-06-21 10:01:45
 * @LastEditTime: 2024-06-21 16:27:05
 * @FilePath: /add_ons/src/router/router.tsx
 */
import {useRoutes} from "react-router-dom"
import route from "./route"
export function Router_() {
	const routerTab = useRoutes(route)
	return <div>{routerTab}</div>
}

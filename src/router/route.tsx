/*
 * @Author: Moody
 * @Date: 2024-06-20 18:28:03
 * @LastEditTime: 2024-06-21 16:30:37
 * @FilePath: /add_ons/src/router/route.tsx
 */

import {LauoutMain} from "../layout/layout_main"
import HomeIndex from "../modules/home/home-index"
import {ShowImage} from "../modules/show_image"

const route = [
	{
		path: "/",
		element: <LauoutMain />,
		children: [
			{
				path: "/home",
				element: <HomeIndex />
			},
			{
				path: "/img",
				element: <ShowImage />
			}
		]
	}
]

export default route

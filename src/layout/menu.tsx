/*
 * @Author: Moody
 * @Date: 2024-06-21 10:14:48
 * @LastEditTime: 2024-06-21 16:24:06
 * @FilePath: /add_ons/src/layout/menu.tsx
 */

import {Tabs, TabsProps} from "antd"
import {useNavigate} from "react-router-dom"
export const Menu = () => {
	const navigator = useNavigate()
	const items: TabsProps["items"] = [
		{
			key: "home",
			label: "主页"
		},
		{
			key: "img",
			label: "文件夹图片"
		}
	]
	const handleChangeRoute = (value: string) => {
		navigator(`/${value}`)
	}
	return (
		<>
			<div style={{maxWidth: "100%", margin: "0 auto"}}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center"
					}}
				>
					<Tabs
						defaultActiveKey="community"
						size={"large"}
						items={items}
						onChange={(value) => {
							handleChangeRoute(value)
						}}
					/>
				</div>
				<div className="content"></div>
			</div>
		</>
	)
}

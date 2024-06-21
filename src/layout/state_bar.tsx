/*
 * @Author: Moody
 * @Date: 2024-06-20 17:52:51
 * @LastEditTime: 2024-06-21 16:08:56
 * @FilePath: /add_ons/src/layout/state_bar.tsx
 */
import {GlobalOutlined, SettingOutlined} from "@ant-design/icons"
import {appWindow} from "@tauri-apps/api/window"
import type {MenuProps} from "antd"
import {Menu, Popover} from "antd"
type MenuItem = Required<MenuProps>["items"][number]
export const StateBar: React.FC = () => {
	const items: MenuItem[] = [
		{
			key: "sub1",
			label: "语言切换",
			icon: <GlobalOutlined />,
			children: [
				{
					key: "1-1",
					label: "",
					type: "group",
					children: [
						{key: "chinese", label: "简体中文"},
						{key: "chinese2", label: "繁体中文"},
						{key: "english", label: "English"}
					]
				}
			]
		}
	]
	const onClick: MenuProps["onClick"] = (e) => {
		console.log("e :>> ", e.key)
	}
	const settings = () => {
		return (
			<Menu
				onClick={onClick}
				style={{width: 256}}
				mode="inline"
				items={items}
			/>
		)
	}
	return (
		<>
			<div id="titlebar" data-tauri-drag-region>
				<div id="title" data-tauri-drag-region>
					AddOns Tool
				</div>
				<div id="controls" data-tauri-drag-region>
					<div id="minimize" className="button">
						<Popover content={settings} trigger="click">
							<SettingOutlined />
						</Popover>
					</div>
					<div
						id="minimize"
						className="button"
						onClick={() => appWindow.minimize()}
					>
						_
					</div>
					<div
						id="maximize"
						className="button"
						onClick={() => appWindow.toggleMaximize()}
					>
						[ ]
					</div>
					<div id="close" className="button" onClick={() => appWindow.close()}>
						X
					</div>
				</div>
			</div>
		</>
	)
}

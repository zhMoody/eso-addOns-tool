/*
 * @Author: Moody
 * @Date: 2024-06-21 15:52:11
 * @LastEditTime: 2024-06-21 16:43:24
 * @FilePath: /add_ons/src/layout/layout_main.tsx
 */
import {FileDoneOutlined, HomeOutlined} from "@ant-design/icons"
import {Layout, Menu, theme} from "antd"
import React, {useState} from "react"
import {Outlet, useNavigate} from "react-router-dom"
import "../style/common.css"
import {StateBar} from "./state_bar"
const {Sider, Content} = Layout
export const LauoutMain: React.FC = () => {
	const {
		token: {colorBgContainer, borderRadiusLG}
	} = theme.useToken()
	const navigator = useNavigate()
	const [selectMenu, setSelectMeny] = useState("home")
	return (
		<>
			<StateBar></StateBar>
			<Layout
				className="laypit-main"
				style={{
					background: colorBgContainer
				}}
			>
				<Sider trigger={null} collapsible collapsed={true}>
					<Menu
						theme="light"
						mode="inline"
						className="laypit-main"
						defaultSelectedKeys={[selectMenu]}
						selectedKeys={[selectMenu]}
						items={[
							{
								key: "home",
								icon: <HomeOutlined />,
								label: "主页"
							},
							{
								key: "img",
								icon: <FileDoneOutlined />,
								label: "文件夹"
							}
						]}
						onClick={(e) => {
							setSelectMeny(e.key)
							navigator(`/${e.key}`)
						}}
					/>
				</Sider>
				<Layout
					style={{
						background: colorBgContainer
					}}
				>
					<Content
						style={{
							margin: "0 24px 24px 16px",
							padding: 10,
							minHeight: 280,
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
							overflow: "auto"
						}}
						className="contents"
					>
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</>
	)
}

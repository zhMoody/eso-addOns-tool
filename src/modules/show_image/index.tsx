/*
 * @Author: Moody
 * @Date: 2024-06-05 10:20:54
 * @LastEditTime: 2024-06-21 16:34:33
 * @FilePath: /add_ons/src/modules/show_image/index.tsx
 */
import {BaseDirectory, FileEntry, readDir} from "@tauri-apps/api/fs"
import {invoke} from "@tauri-apps/api/tauri"
import {Breadcrumb, Button, Image} from "antd"
import {useCallback, useEffect, useState} from "react"
import "../../style/style.css"
interface Image {
	name?: string
	path: string
}

export const ShowImage: React.FC = () => {
	const [dir, setDir] = useState("")
	const [nowDir, setNowDir] = useState<FileEntry[]>([])
	const [images, setImages] = useState<Image[]>([])
	const [imageUrls, setImageUrls] = useState<{[key: string]: string}>({})
	useEffect(() => {
		handleLoadImages()
	}, [])

	const readDirFiles = async () => {
		const entries = await readDir("AddOns", {
			dir: BaseDirectory.Desktop,
			recursive: true
		})
		setNowDir(entries)
	}

	// Function to load images from a specific folder
	const handleLoadImages = useCallback(async () => {
		try {
			let path: string = await invoke("greet")
			setDir(path)
			const fileDataList: Image[] = await invoke("get_images_from_folder", {
				folderPath: path
			})
			setImages(fileDataList)
		} catch (error) {
			console.error(`Error loading images:${error}`)
		}
	}, [dir])
	useEffect(() => {
		const loadUrls = async () => {
			const urls: {[key: string]: string} = {}
			for (const image of images) {
				let url: string = await invoke("read_file", {path: image.path})
				urls[image.path] = `data:image/jpeg;base64,${url}`
			}
			setImageUrls(urls)
		}

		if (images.length > 0) {
			loadUrls()
		}
	}, [images])

	const breadcrumb = (d: string) => {
		if (d == "0") return <div>找不到文件夹</div>
		const tempDir = d.split("/").filter((value) => Boolean(value))
		const newDir = tempDir.map((item: string) => {
			return {title: item}
		})
		return (
			<Breadcrumb
				separator="/"
				items={[{title: "当前"}, {separator: ":"}, ...newDir]}
			/>
		)
	}

	return (
		<div className="container">
			{breadcrumb(dir)}
			<div className="img-box">
				<div className="image-gallery">
					<Image.PreviewGroup
						preview={{
							onChange: (current, prev) =>
								console.log(`current index: ${current}, prev index: ${prev}`)
						}}
					>
						{images.map((image) => (
							<div key={image.name} className="image-item">
								{imageUrls[image.path] ? (
									<Image
										className="imgFile"
										src={imageUrls[image.path]}
										alt={image.name}
										onError={() =>
											console.error(`"加载图片失败:"${image.path}`)
										}
									/>
								) : (
									<p>Loading...</p>
								)}
								<p className="imgName">{image.name}</p>
							</div>
						))}
					</Image.PreviewGroup>
				</div>
			</div>
			<Button onClick={readDirFiles}>其他文件</Button>
			<div>
				{nowDir.map((item) => (
					<div key={item.path}>
						<div> {item.name} </div>
					</div>
				))}
			</div>
		</div>
	)
}

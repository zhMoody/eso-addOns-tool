/*
 * @Author: Moody
 * @Date: 2024-06-20 16:33:15
 * @LastEditTime: 2024-06-20 16:34:59
 * @FilePath: /add_ons/src-tauri/src/funcs/image.rs
 */
use serde::Serialize;
use std::fs;
use std::fs::File;
use std::io::Read;
use std::path::Path;
use tauri::command;
#[command]
pub fn read_file(path: String) -> Result<String, String> {
    let mut file = File::open(&path).map_err(|e| e.to_string())?;
    let mut contents = Vec::new();
    file.read_to_end(&mut contents).map_err(|e| e.to_string())?;
    let base64_contents = base64::encode(&contents);
    Ok(base64_contents)
}

#[command]
pub async fn into_(path: String) -> String {
    path.into()
}

#[derive(Serialize)]
pub struct FileData {
    name: String,
    path: String,
}

#[command]
pub fn get_images_from_folder(folder_path: String) -> Result<Vec<FileData>, String> {
    let path = Path::new(&folder_path);
    let mut file_data_list = Vec::new();

    if path.is_dir() {
        for entry in fs::read_dir(path).map_err(|e| e.to_string())? {
            let entry = entry.map_err(|e| e.to_string())?;
            let path = entry.path();

            if path.is_file() {
                if let Some(extension) = path.extension() {
                    if extension == "jpg"
                        || extension == "jpeg"
                        || extension == "png"
                        || extension == "gif"
                    {
                        let file_name = path.file_name().unwrap().to_string_lossy().to_string();
                        let file_path = path.to_string_lossy().to_string();
                        file_data_list.push(FileData {
                            name: file_name,
                            path: file_path,
                        });
                    }
                }
            }
        }
        Ok(file_data_list)
    } else {
        Err("The provided path is not a directory".into())
    }
}

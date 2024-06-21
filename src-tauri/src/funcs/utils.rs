/*
 * @Author: Moody
 * @Date: 2024-06-20 16:09:08
 * @LastEditTime: 2024-06-21 13:45:53
 * @FilePath: /add_ons/src-tauri/src/funcs/utils.rs
 */

use std::fs;
use tauri::{command, Manager, Runtime};
use window_shadows::set_shadow;
#[command]
pub fn greet() -> String {
    let user_name = whoami::username();
    let specific_folder = format!("/Users/{}/Desktop/AddOns", user_name);
    let is_exist = fs::metadata(specific_folder)
        .map(|meta| meta.is_dir())
        .unwrap_or(false);

    if is_exist {
        format!("/Users/{}/Desktop/AddOns", user_name)
    } else {
        format!("找不到文件目录")
    }
}

pub fn set_window_shadow<R: Runtime>(app: &tauri::App<R>) {
    let window = app.get_window("addons").unwrap();
    set_shadow(&window, true).expect("Unsupported platform!")
}

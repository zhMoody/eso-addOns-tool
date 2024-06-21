/*
 * @Author: Moody
 * @Date: 2024-06-05 10:19:19
 * @LastEditTime: 2024-06-21 13:18:06
 * @FilePath: /add_ons/src-tauri/src/main.rs
 */
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
use crate::funcs::image::{get_images_from_folder, into_, read_file};
use crate::funcs::utils::{greet, set_window_shadow};
pub mod funcs;
fn main() {
    tauri::Builder::default()
        .setup(|app| {
            set_window_shadow(app);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            read_file,
            into_,
            get_images_from_folder
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

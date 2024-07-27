#![no_main]
use std::ffi::{CStr, CString};

#[no_mangle]
pub extern "C" fn handle(arg1: *const u8, arg2: *const u8) -> *mut u8 {
    let arg1 = unsafe { CStr::from_ptr(arg1 as *const i8) };
    let arg2 = unsafe { CStr::from_ptr(arg2 as *const i8) };

    let str1 = arg1.to_str().unwrap();
    let str2 = arg2.to_str().unwrap();

    let result = format!("Processed: {} and {}", str1, str2);

    CString::new(result).unwrap().into_raw() as *mut u8
}

#[no_mangle]
pub extern "C" fn free_string(ptr: *mut u8) {
    unsafe {
        if ptr.is_null() { return }
        let _ = CString::from_raw(ptr as *mut i8);
    }
}

#[no_mangle]
pub extern "C" fn malloc(size: usize) -> *mut u8 {
    let mut buffer = Vec::with_capacity(size);
    let ptr = buffer.as_mut_ptr();
    std::mem::forget(buffer);
    ptr
}

#[no_mangle]
pub extern "C" fn free_memory(ptr: *mut u8) {
    unsafe {
        if ptr.is_null() { return }
        let _buffer = Vec::from_raw_parts(ptr, 0, 0);
    }
}

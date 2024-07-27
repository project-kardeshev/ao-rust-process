# Hello WASM

This project demonstrates building a Rust library for WebAssembly using Emscripten. The resulting WebAssembly module can be used in a JavaScript environment.

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [Emscripten](https://emscripten.org/docs/getting_started/downloads.html)
- [Node.js](https://nodejs.org/)

## Setting Up

### Install Rust

If you haven't already, install Rust using `rustup`:

```sh
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

### Install Emscripten
Follow the Emscripten installation instructions.

Make sure to activate the Emscripten environment:

```sh
source /path/to/emsdk/emsdk_env.sh

```

### Install Node.js
Download and install Node.js from the official website.

### Building the Project
1. Clone the repository:

```sh
git clone https://github.com/yourusername/hello_wasm.git
cd hello_wasm
```

2. Ensure wasm32-unknown-emscripten target is added:
```sh
rustup target add wasm32-unknown-emscripten
```

3. Set the environment variable for the build:

```sh
export CARGO_TARGET_WASM32_UNKNOWN_EMSCRIPTEN_RUNNER=emrun
```

4. Build the project:
```sh
cargo build --target wasm32-unknown-emscripten --release
```
If the above command fails due to linker issues, you can manually invoke emcc:
```sh
emcc target/wasm32-unknown-emscripten/release/deps/hello_wasm*.o -o hello_wasm.js --no-entry -s EXPORTED_FUNCTIONS='["_handle","_free_string","_malloc","_free_memory"]' -s ENVIRONMENT=node
```
